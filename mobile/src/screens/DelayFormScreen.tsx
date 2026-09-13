/**
 * Registrar atraso.
 *
 * A entrada é manual e isso é decisão de projeto, não limitação: fonte oficial
 * de status de voo custa por consulta, e antes de existir receita o produto não
 * pode depender dela. O viajante informa o atraso que o painel do aeroporto já
 * mostrou, e o Socorro faz o resto.
 */
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button, Divider, Label } from '../components/primitives';
import { ChipsField, TextField } from '../components/form';
import { useApp } from '../state/AppState';
import { useTheme } from '../theme/useTheme';
import { font, space } from '../theme/tokens';
import { hhmm } from '../domain/time';
import type { Item } from '../domain/types';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Rota = RouteProp<RootStackParamList, 'DelayForm'>;

/** Atalhos para o que o painel do aeroporto costuma mostrar. */
const ATALHOS = [
  { value: '30', label: '30 min' },
  { value: '60', label: '1h' },
  { value: '120', label: '2h' },
  { value: '180', label: '3h' },
  { value: '240', label: '4h' },
];

const MOTIVOS = [
  { value: 'Manutenção', label: 'Manutenção' },
  { value: 'Meteorologia', label: 'Meteorologia' },
  { value: 'Malha aérea', label: 'Malha aérea' },
  { value: 'Aeronave atrasada', label: 'Aeronave atrasada' },
  { value: 'Sem informação', label: 'Sem informação' },
];

/** Aceita "3h45", "225", "3:45". Devolve minutos, ou undefined se não entender. */
export function parseAtraso(texto: string): number | undefined {
  const s = texto.trim().toLowerCase().replace(',', '.');
  if (!s) return undefined;

  const hm = s.match(/^(\d{1,2})\s*[h:]\s*(\d{1,2})?$/);
  if (hm) {
    const h = Number(hm[1]);
    const m = hm[2] ? Number(hm[2]) : 0;
    if (m > 59) return undefined;
    return h * 60 + m;
  }

  const soH = s.match(/^(\d{1,2}(?:\.\d)?)\s*h$/);
  if (soH) return Math.round(Number(soH[1]) * 60);

  const soMin = s.match(/^(\d{1,4})\s*(?:min|m)?$/);
  if (soMin) return Number(soMin[1]);

  return undefined;
}

export function DelayFormScreen() {
  const t = useTheme();
  const nav = useNavigation<Nav>();
  const { id } = useRoute<Rota>().params;
  const { items, updateItem, activeTrip } = useApp();

  const item = items.find((i: Item) => i.id === id);

  const [texto, setTexto] = useState(
    item?.delay ? String(item.delay.minutes) : '',
  );
  const [motivo, setMotivo] = useState<string>(
    item?.delay?.reason || 'Sem informação',
  );
  const [erro, setErro] = useState<string | null>(null);

  if (!item || !activeTrip) {
    return (
      <View style={[styles.vazio, { backgroundColor: t.paper2 }]} testID="delay-vazio">
        <Text style={[styles.vazioTexto, { color: t.ink2 }]}>
          Esta reserva não está mais aberta.
        </Text>
        <Button title="Voltar" variant="ghost" onPress={() => nav.goBack()} />
      </View>
    );
  }

  const minutos = parseAtraso(texto);
  const original = item.delay?.originalStart ?? item.start;

  async function salvar() {
    if (minutos === undefined || minutos <= 0) {
      setErro('Não entendi o atraso. Escreva como 225, 3h45 ou 3:45.');
      return;
    }
    const { id: _ignora, ...resto } = item!;
    await updateItem(item!.id, {
      ...resto,
      delay: { originalStart: original, minutes: minutos, reason: motivo },
    });
    nav.navigate('Tabs', { screen: 'Socorro' });
  }

  async function limpar() {
    const { id: _ignora, ...resto } = item!;
    await updateItem(item!.id, { ...resto, delay: undefined });
    nav.goBack();
  }

  return (
    <ScrollView
      style={{ backgroundColor: t.paper2 }}
      contentContainerStyle={styles.page}
      testID="delay-scroll"
    >
      <View style={[styles.folha, { backgroundColor: t.paper, borderColor: t.rule }]}>
        <Label>Reserva</Label>
        <Text style={[styles.titulo, { color: t.ink }]}>{item.title}</Text>
        <Text style={[styles.sub, { color: t.ink2 }]}>
          {`Saída original ${hhmm(original)}`}
        </Text>

        <Divider>Quanto atrasou</Divider>
        <ChipsField
          label="Atalhos"
          value={texto}
          options={ATALHOS}
          onChange={(v) => {
            setTexto(v);
            setErro(null);
          }}
        />
        <TextField
          label="Ou escreva"
          value={texto}
          onChangeText={(v) => {
            setTexto(v);
            setErro(null);
          }}
          placeholder="225, 3h45 ou 3:45"
          autoCapitalize="none"
          mono
        />
        {minutos !== undefined && minutos > 0 ? (
          <Text style={[styles.eco, { color: t.ink3 }]} testID="delay-eco">
            {`Nova previsão de saída: ${hhmm(
              new Date(original.getTime() + minutos * 60000),
            )}`}
          </Text>
        ) : null}
        {erro ? (
          <Text style={[styles.erro, { color: t.stamp }]} testID="delay-erro">
            {erro}
          </Text>
        ) : null}

        <Divider>Motivo informado</Divider>
        <ChipsField
          label="Motivo"
          value={motivo}
          options={MOTIVOS}
          onChange={setMotivo}
        />
        <Text style={[styles.nota, { color: t.ink3 }]}>
          O motivo não muda o que a companhia deve. Mau tempo e problema técnico
          não isentam ninguém da assistência material.
        </Text>

        <View style={styles.acoes}>
          <Button title="Registrar atraso" variant="stamp" onPress={salvar} />
          {item.delay ? (
            <Button title="Remover atraso" variant="ghost" onPress={limpar} />
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { padding: space.md, paddingBottom: space.xl },
  folha: { borderWidth: 1, padding: space.md, gap: 4 },
  titulo: { fontFamily: font.uiBold, fontSize: 20, marginTop: 2 },
  sub: { fontFamily: font.ui, fontSize: 13 },
  eco: { fontFamily: font.monoMedium, fontSize: 11.5, marginTop: 6 },
  erro: { fontFamily: font.ui, fontSize: 12.5, marginTop: 6 },
  nota: { fontFamily: font.ui, fontSize: 12, lineHeight: 17, marginTop: 6 },
  acoes: { gap: space.sm, marginTop: space.md },
  vazio: { flex: 1, padding: space.lg, gap: space.md, justifyContent: 'center' },
  vazioTexto: { fontFamily: font.ui, fontSize: 15 },
});
