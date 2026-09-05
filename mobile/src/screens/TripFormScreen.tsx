import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { DateTimeField, TextField } from '../components/form';
import { Button, Divider } from '../components/primitives';
import { useConfirm } from '../components/Confirm';
import { space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { useApp } from '../state/AppState';
import type { RootStackParamList } from '../navigation/types';

export function TripFormScreen() {
  const t = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'TripForm'>>();
  const { trips, items, createTrip, updateTrip, deleteTrip } = useApp();
  const confirm = useConfirm();

  const editing = route.params?.id ? trips.find((x) => x.id === route.params!.id) : null;

  const [name, setName] = useState(editing?.name ?? '');
  const [subtitle, setSubtitle] = useState(editing?.subtitle ?? '');
  const [start, setStart] = useState(editing?.start ?? defaultStart());
  const [end, setEnd] = useState(editing?.end ?? defaultEndDate());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  // Ref porque o listener de beforeRemove enxerga o estado do render em que
  // foi registrado; sem isso, salvar dispara o aviso de descarte.
  const savingRef = useRef(false);
  const beginSave = () => { savingRef.current = true; setSaving(true); };

  const dirty =
    name !== (editing?.name ?? '') ||
    subtitle !== (editing?.subtitle ?? '') ||
    start.getTime() !== (editing?.start ?? defaultStart()).getTime() ||
    end.getTime() !== (editing?.end ?? defaultEndDate()).getTime();

  /**
   * Sair com alteração pendente pede confirmação. Pega o botão do cabeçalho,
   * o gesto de voltar e o botão físico do Android de uma vez só.
   */
  useEffect(() => {
    const unsub = nav.addListener('beforeRemove', (e) => {
      if (!dirty || savingRef.current) return;
      e.preventDefault();
      void confirm({
        title: 'Descartar alterações?',
        body: editing
          ? `As mudanças em «${editing.name}» não foram salvas. Sair agora perde o que você preencheu.`
          : 'Esta viagem ainda não foi criada. Sair agora perde o que você preencheu.',
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
    if (!name.trim()) next.name = 'Dê um nome para a viagem';
    if (end <= start) next.end = 'A volta precisa ser depois da ida';
    setErrors(next);
    if (Object.keys(next).length) return;

    if (editing) {
      const ok = await confirm({
        title: 'Salvar alterações?',
        body: `Os dados atuais de «${editing.name}» serão substituídos pelo que você preencheu.`,
        confirmLabel: 'Salvar',
      });
      if (!ok) return;
    }

    beginSave();
    const input = { name: name.trim(), subtitle: subtitle.trim(), start, end };
    if (editing) await updateTrip(editing.id, input);
    else await createTrip(input);
    nav.goBack();
  }

  async function confirmDelete() {
    if (!editing) return;
    const count = items.length;
    const ok = await confirm({
      title: 'Excluir esta viagem?',
      body:
        `«${editing.name}»` +
        (count > 0
          ? ` e as ${count} ${count === 1 ? 'reserva' : 'reservas'} dentro dela serão apagadas`
          : ' será apagada') +
        ' deste aparelho. Não dá para desfazer.',
      confirmLabel: 'Excluir',
      destructive: true,
    });
    if (!ok) return;
    beginSave();
    await deleteTrip(editing.id);
    // Volta para a lista de viagens, nao para o que foi apagado.
    nav.navigate('Tabs', { screen: 'Trips' });
  }

  return (
    <ScrollView
      style={{ backgroundColor: t.paper2 }}
      contentContainerStyle={styles.body}
      keyboardShouldPersistTaps="handled"
    >
      <TextField
        label="Nome"
        value={name}
        onChangeText={setName}
        placeholder="Japão"
        error={errors.name}
      />
      <TextField
        label="Roteiro"
        value={subtitle}
        onChangeText={setSubtitle}
        placeholder="Tóquio · Hakone · Kyoto"
      />

      <Divider>Período</Divider>
      <DateTimeField label="Ida" value={start} onChange={setStart} />
      <DateTimeField label="Volta" value={end} onChange={setEnd} error={errors.end} />

      <View style={{ height: space.sm }} />
      <Button
        title={editing ? 'Salvar alterações' : 'Criar viagem'}
        onPress={save}
        disabled={saving}
      />

      {editing ? (
        <>
          <Divider>Zona de risco</Divider>
          <Button title="Excluir viagem" variant="ghost" onPress={confirmDelete} disabled={saving} />
        </>
      ) : null}
    </ScrollView>
  );
}

function defaultStart(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  d.setHours(8, 0, 0, 0);
  return d;
}

function defaultEndDate(): Date {
  const d = defaultStart();
  d.setDate(d.getDate() + 7);
  d.setHours(20, 0, 0, 0);
  return d;
}

const styles = StyleSheet.create({
  body: { padding: space.lg, gap: space.lg, paddingBottom: space.xxl * 2 },
});
