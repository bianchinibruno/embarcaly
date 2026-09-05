import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Ticket } from '../components/Ticket';
import { VersoSheet } from '../components/VersoSheet';
import { Divider, Gap, Label } from '../components/primitives';
import { font, space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { useApp } from '../state/AppState';
import { dayKey, dayMonth, daysUntil, gapLabel, weekday } from '../domain/time';
import type { RootStackParamList } from '../navigation/types';

/**
 * O coração do produto: os bilhetes empilhados em ordem de acontecer.
 *
 * Entre um e outro aparece o intervalo — é o que transforma uma lista em um
 * plano, e é a informação que nenhum concorrente mostra.
 */
export function ItineraryScreen() {
  const t = useTheme();
  const { trip, items, now } = useApp();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [verso, setVerso] = useState<string | null>(null);

  const n = now();
  const started = n >= trip.start;

  let lastDay = '';
  const rows: React.ReactNode[] = [];

  items.forEach((item, idx) => {
    const key = dayKey(item.start);
    if (key !== lastDay) {
      rows.push(
        <Divider key={`d-${key}`}>
          {`${weekday(item.start)} · ${dayMonth(item.start).toLowerCase()}`}
        </Divider>,
      );
      lastDay = key;
    } else {
      const prev = items[idx - 1];
      const both = prev.type === 'air' && item.type === 'air';
      const text = gapLabel(prev.end ?? prev.start, item.start, both);
      if (text) {
        rows.push(
          <Gap
            key={`g-${item.id}`}
            text={text}
            onInfo={both ? () => setVerso('connection') : undefined}
          />,
        );
      }
    }
    rows.push(
      <Ticket
        key={item.id}
        item={item}
        onPress={() => nav.navigate('Item', { id: item.id })}
        onInfo={setVerso}
      />,
    );
  });

  return (
    <View style={{ flex: 1, backgroundColor: t.paper2 }}>
      <View style={[styles.bar, { backgroundColor: t.paper, borderBottomColor: t.hair }]}>
        <View>
          <Text style={[styles.h1, { color: t.ink }]}>Itinerário</Text>
          <Label>{`${items.length} reservas · ${trip.name}`}</Label>
        </View>
        <Text style={[styles.cd, { color: t.ink2 }]}>
          {started ? 'em viagem' : `D−${daysUntil(trip.start, n)}`}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>{rows}</ScrollView>
      <VersoSheet versoKey={verso} onClose={() => setVerso(null)} />
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
  h1: { fontFamily: font.uiBold, fontSize: 20, letterSpacing: -0.5 },
  body: { padding: space.md, gap: space.md, paddingBottom: space.xxl },
  cd: { fontFamily: font.monoBold, fontSize: 10.5, letterSpacing: 1, textTransform: 'uppercase' },
});
