import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ChipsField, DateTimeField, TextField } from '../components/form';
import { Button, Divider } from '../components/primitives';
import { useConfirm } from '../components/Confirm';
import { font, space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { useApp } from '../state/AppState';
import { defaultEnd, deriveFlightMarks, deriveLeaveBy } from '../domain/derive';
import type { ItemType, PassSource } from '../domain/types';
import type { RootStackParamList } from '../navigation/types';

const TYPES: { value: ItemType; label: string }[] = [
  { value: 'air', label: 'Voo' },
  { value: 'bed', label: 'Hotel' },
  { value: 'rail', label: 'Trem' },
  { value: 'car', label: 'Carro' },
  { value: 'act', label: 'Passeio' },
];

export function ItemFormScreen() {
  const t = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ItemForm'>>();
  const { items, createItem, updateItem, deleteItem } = useApp();
  const confirm = useConfirm();

  const editing = route.params?.id ? items.find((i) => i.id === route.params!.id) : null;

  const [type, setType] = useState<ItemType>(editing?.type ?? 'air');
  const [title, setTitle] = useState(editing?.title ?? '');
  const [subtitle, setSubtitle] = useState(editing?.subtitle ?? '');
  const [start, setStart] = useState(editing?.start ?? nextHour());
  const [end, setEnd] = useState(editing?.end ?? defaultEnd(editing?.type ?? 'air', nextHour()));
  const [from, setFrom] = useState(editing?.from ?? '');
  const [to, setTo] = useState(editing?.to ?? '');
  const [fromCity, setFromCity] = useState(editing?.fromCity ?? '');
  const [toCity, setToCity] = useState(editing?.toCity ?? '');
  const [flight, setFlight] = useState(editing?.flight ?? '');
  const [pnr, setPnr] = useState(editing?.pnr ?? '');
  const [seat, setSeat] = useState(editing?.seat ?? '');
  const [operator, setOperator] = useState(editing?.operator ?? '');
  const [international, setInternational] = useState<'sim' | 'nao'>('nao');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  // Ref porque o listener de beforeRemove enxerga o estado do render em que
  // foi registrado; sem isso, salvar dispara o aviso de descarte.
  const savingRef = useRef(false);
  const beginSave = () => { savingRef.current = true; setSaving(true); };

  const isFlight = type === 'air';

  const dirty =
    type !== (editing?.type ?? 'air') ||
    title !== (editing?.title ?? '') ||
    subtitle !== (editing?.subtitle ?? '') ||
    start.getTime() !== (editing?.start ?? start).getTime() ||
    from !== (editing?.from ?? '') ||
    to !== (editing?.to ?? '') ||
    flight !== (editing?.flight ?? '') ||
    pnr !== (editing?.pnr ?? '') ||
    seat !== (editing?.seat ?? '');

  /** Sair com alteração pendente pede confirmação. Ver TripFormScreen. */
  useEffect(() => {
    const unsub = nav.addListener('beforeRemove', (e) => {
      if (!dirty || savingRef.current) return;
      e.preventDefault();
      void confirm({
        title: 'Descartar alterações?',
        body: editing
          ? `As mudanças em «${editing.title}» não foram salvas. Sair agora perde o que você preencheu.`
          : 'Esta reserva ainda não foi adicionada. Sair agora perde o que você preencheu.',
        confirmLabel: 'Descartar',
        cancelLabel: 'Continuar editando',
        destructive: true,
      }).then((ok) => {
        if (ok) nav.dispatch(e.data.action);
      });
    });
    return unsub;
  }, [nav, dirty, confirm, editing]);

  async function save() {
    const next: Record<string, string> = {};
    if (!title.trim()) next.title = 'Dê um nome para a reserva';
    if (end <= start) next.end = 'O fim precisa ser depois do início';
    setErrors(next);
    if (Object.keys(next).length) return;

    if (editing) {
      const ok = await confirm({
        title: 'Salvar alterações?',
        body:
          `Os dados atuais de «${editing.title}» serão substituídos.` +
          (isFlight ? ' Os horários derivados do voo serão recalculados.' : ''),
        confirmLabel: 'Salvar',
      });
      if (!ok) return;
    }
    beginSave();

    const pass: PassSource = isFlight ? 'carrier' : type === 'rail' ? 'external' : 'none';

    const input = {
      type,
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      start,
      end,
      from: from.trim().toUpperCase() || undefined,
      to: to.trim().toUpperCase() || undefined,
      fromCity: fromCity.trim() || undefined,
      toCity: toCity.trim() || undefined,
      flight: flight.trim() || undefined,
      pnr: pnr.trim().toUpperCase() || undefined,
      seat: seat.trim() || undefined,
      operator: operator.trim() || undefined,
      pass,
      // Um horário digitado vira sete. Ver domain/derive.ts.
      ...(isFlight ? deriveFlightMarks(start, { international: international === 'sim' }) : {}),
      ...(type === 'act' ? { leaveBy: deriveLeaveBy(start) } : {}),
      ...(editing?.delay ? { delay: editing.delay } : {}),
      ...(editing?.gate ? { gate: editing.gate } : {}),
    };

    if (editing) await updateItem(editing.id, input);
    else await createItem(input);
    nav.goBack();
  }

  async function confirmDelete() {
    if (!editing) return;
    const ok = await confirm({
      title: 'Excluir esta reserva?',
      body: `«${editing.title}» sai do itinerário e os documentos ligados a ela deixam de aparecer. Não dá para desfazer.`,
      confirmLabel: 'Excluir',
      destructive: true,
    });
    if (!ok) return;
    beginSave();
    await deleteItem(editing.id);
    // Volta para a lista: o detalhe da reserva excluida nao existe mais.
    nav.navigate('Tabs', { screen: 'Itinerary' });
  }

  return (
    <ScrollView
      style={{ backgroundColor: t.paper2 }}
      contentContainerStyle={styles.body}
      keyboardShouldPersistTaps="handled"
    >
      <ChipsField
        label="Tipo"
        value={type}
        options={TYPES}
        onChange={(v) => {
          setType(v);
          setEnd(defaultEnd(v, start));
        }}
      />

      <TextField
        label={isFlight ? 'Trecho' : 'Nome'}
        value={title}
        onChangeText={setTitle}
        placeholder={isFlight ? 'POA → GRU' : 'Hotel Shinjuku'}
        error={errors.title}
      />
      <TextField
        label="Detalhe"
        value={subtitle}
        onChangeText={setSubtitle}
        placeholder={isFlight ? '' : '5 noites · Tóquio'}
      />

      <Divider>Quando</Divider>
      <DateTimeField label={isFlight ? 'Partida' : 'Início'} value={start} onChange={setStart} />
      <DateTimeField label={isFlight ? 'Chegada' : 'Fim'} value={end} onChange={setEnd} error={errors.end} />

      {isFlight ? (
        <>
          <ChipsField
            label="Internacional"
            value={international}
            options={[
              { value: 'nao', label: 'Não' },
              { value: 'sim', label: 'Sim' },
            ]}
            onChange={setInternational}
          />
          <View style={[styles.hint, { backgroundColor: t.stock.air, borderColor: t.edge.air }]}>
            <Text style={[styles.hintText, { color: t.ink2 }]}>
              Com a partida informada, calculamos abertura e fechamento do check-in, horário de
              chegada ao aeroporto, embarque e fechamento do portão. Tudo marcado como estimativa
              até você corrigir com o que estiver no documento.
            </Text>
          </View>

          <Divider>Aeroportos</Divider>
          <View style={styles.pair}>
            <View style={styles.half}>
              <TextField label="Origem" value={from} onChangeText={setFrom} placeholder="POA" mono autoCapitalize="characters" />
            </View>
            <View style={styles.half}>
              <TextField label="Destino" value={to} onChangeText={setTo} placeholder="GRU" mono autoCapitalize="characters" />
            </View>
          </View>
          <View style={styles.pair}>
            <View style={styles.half}>
              <TextField label="Cidade origem" value={fromCity} onChangeText={setFromCity} placeholder="Porto Alegre" />
            </View>
            <View style={styles.half}>
              <TextField label="Cidade destino" value={toCity} onChangeText={setToCity} placeholder="Guarulhos" />
            </View>
          </View>
          <TextField label="Voo" value={flight} onChangeText={setFlight} placeholder="LA 8172" mono autoCapitalize="characters" />
        </>
      ) : null}

      <Divider>Reserva</Divider>
      <TextField label="Localizador" value={pnr} onChangeText={setPnr} placeholder="QKZ4TP" mono autoCapitalize="characters" />
      <TextField label="Assento" value={seat} onChangeText={setSeat} placeholder="14A" mono autoCapitalize="characters" />
      {type === 'rail' ? (
        <TextField label="Operadora" value={operator} onChangeText={setOperator} placeholder="JR East" />
      ) : null}

      <View style={{ height: space.sm }} />
      <Button
        title={editing ? 'Salvar alterações' : 'Adicionar reserva'}
        onPress={save}
        disabled={saving}
      />

      {editing ? (
        <>
          <Divider>Zona de risco</Divider>
          <Button title="Excluir reserva" variant="ghost" onPress={confirmDelete} disabled={saving} />
        </>
      ) : null}
    </ScrollView>
  );
}

function nextHour(): Date {
  const d = new Date();
  d.setMinutes(0, 0, 0);
  d.setHours(d.getHours() + 1);
  return d;
}

const styles = StyleSheet.create({
  body: { padding: space.lg, gap: space.lg, paddingBottom: space.xxl * 2 },
  pair: { flexDirection: 'row', gap: space.md },
  half: { flex: 1 },
  hint: { borderWidth: 1, padding: space.md },
  hintText: { fontFamily: font.ui, fontSize: 12, lineHeight: 17 },
});
