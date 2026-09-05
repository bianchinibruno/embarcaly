import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Wordmark } from '../components/Wordmark';
import { Button, DataRow, Divider, Label, Stamp } from '../components/primitives';
import { DevClock } from '../components/DevClock';
import { font, space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { useApp } from '../state/AppState';
import { daysUntil } from '../domain/time';
import type { RootStackParamList } from '../navigation/types';

/**
 * Home. A contagem regressiva é o maior elemento da tela porque, antes de
 * embarcar, a única pergunta que existe é quanto falta.
 */
export function TripsScreen() {
  const t = useTheme();
  const { trip, items, now } = useApp();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const n = now();
  const started = n >= trip.start;
  const days = started
    ? Math.max(1, Math.ceil((n.getTime() - trip.start.getTime()) / 86400000))
    : daysUntil(trip.start, n);
  const pending = items.filter((i) => i.needs).length;

  return (
    <View style={{ flex: 1, backgroundColor: t.paper2 }}>
      <View style={[styles.bar, { backgroundColor: t.paper, borderBottomColor: t.hair }]}>
        <View>
          <Wordmark />
          <View style={{ marginTop: 4 }}>
            <Label>3 guardadas · 1 a caminho</Label>
          </View>
        </View>
        {started ? <Stamp>Em viagem</Stamp> : null}
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={[styles.card, { backgroundColor: t.paper, borderColor: t.rule }]}>
          <View style={{ height: 4, backgroundColor: t.edge.air }} />
          <View style={[styles.head, { backgroundColor: t.stock.air, borderBottomColor: t.rule }]}>
            <Text style={[styles.kind, { color: t.ink2 }]}>
              {started ? 'Em viagem' : 'Próxima viagem'}
            </Text>
            <Text style={[styles.time, { color: t.ink }]}>03 – 22 OUT</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={[styles.tripName, { color: t.ink }]}>{trip.name}</Text>
            <Text style={[styles.tripSub, { color: t.ink3 }]}>{trip.subtitle}</Text>

            <View style={styles.hero}>
              <Text style={[styles.heroNum, { color: t.ink }]}>{days}</Text>
              <Text style={[styles.heroUnit, { color: t.ink3 }]}>
                {started ? 'dia de viagem' : 'dias para embarcar'}
              </Text>
            </View>

            <View style={[styles.perf, { borderTopColor: t.rule }]} />
            <DataRow k="Reservas" v={String(items.length)} />
            <DataRow k="Documentos" v={String(items.length + 2)} />
            <DataRow k="Pendências" v={String(pending)} />
          </View>
        </View>

        <Button title="Adicionar reservas" onPress={() => nav.navigate('Add')} />

        <Divider>Guardadas</Divider>
        <Archived name="Portugal & Espanha" meta="18 dias · 21 reservas" when="JAN 2026" tone="bed" />
        <Archived name="Argentina" meta="6 dias · 7 reservas" when="SET 2025" tone="rail" />

        <DevClock />
      </ScrollView>
    </View>
  );
}

function Archived({
  name,
  meta,
  when,
  tone,
}: {
  name: string;
  meta: string;
  when: string;
  tone: 'bed' | 'rail';
}) {
  const t = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: t.paper, borderColor: t.rule }]}>
      <View style={{ height: 4, backgroundColor: t.edge[tone] }} />
      <View style={[styles.head, { backgroundColor: t.stock[tone], borderBottomColor: t.rule }]}>
        <Text style={[styles.kind, { color: t.ink2 }]}>Concluída</Text>
        <Text style={[styles.time, { color: t.ink }]}>{when}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={[styles.tripName, { color: t.ink, fontSize: 15 }]}>{name}</Text>
        <Text style={[styles.tripSub, { color: t.ink3 }]}>{meta}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  body: { padding: space.md, gap: space.md, paddingBottom: space.xxl },
  card: { borderWidth: 1, overflow: 'hidden' },
  head: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  kind: { fontFamily: font.monoBold, fontSize: 9.5, letterSpacing: 1.8, textTransform: 'uppercase' },
  time: { fontFamily: font.monoBold, fontSize: 12 },
  cardBody: { paddingHorizontal: 12, paddingTop: 10, paddingBottom: 12 },
  tripName: { fontFamily: font.uiBold, fontSize: 17, letterSpacing: -0.3 },
  tripSub: { fontFamily: font.ui, fontSize: 11.5, marginTop: 2 },
  hero: { alignItems: 'center', paddingVertical: space.md },
  heroNum: { fontFamily: font.mono, fontSize: 52, lineHeight: 56, letterSpacing: -2 },
  heroUnit: {
    fontFamily: font.mono,
    fontSize: 10,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginTop: 6,
  },
  perf: { borderTopWidth: 1, borderStyle: 'dashed', marginVertical: space.sm },
});
