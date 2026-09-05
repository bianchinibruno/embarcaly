import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Ticket } from '../components/Ticket';
import { VersoSheet } from '../components/VersoSheet';
import { Button, Divider, Gap, Label } from '../components/primitives';
import { HeaderBack } from '../components/HeaderBack';
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
  const { activeTrip, items, now } = useApp();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [verso, setVerso] = useState<string | null>(null);

  const n = now();

  if (!activeTrip) {
    return (
      <View style={[styles.blank, { backgroundColor: t.paper2 }]}>
        <Text style={[styles.blankText, { color: t.ink3 }]}>
          Selecione uma viagem na aba Viagens.
        </Text>
      </View>
    );
  }

  const started = n >= activeTrip.start;

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
        <View style={{ flex: 1 }}>
          <HeaderBack label="Viagens" onPress={() => nav.navigate('Tabs', { screen: 'Trips' })} />
          <Text style={[styles.h1, { color: t.ink }]}>Itinerário</Text>
          <Label>{`${items.length} ${items.length === 1 ? 'reserva' : 'reservas'} · ${activeTrip.name}`}</Label>
        </View>
        <Text style={[styles.cd, { color: t.ink2 }]}>
          {started ? 'em viagem' : `D−${daysUntil(activeTrip.start, n)}`}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {items.length === 0 ? (
          <View style={[styles.blankCard, { backgroundColor: t.paper, borderColor: t.rule }]}>
            <Text style={[styles.blankTitle, { color: t.ink }]}>Nenhuma reserva ainda.</Text>
            <Text style={[styles.blankText, { color: t.ink2, textAlign: 'left', marginTop: 6 }]}>
              Adicione o primeiro voo, hotel ou trem. Basta o horário de partida — o resto da linha
              do tempo a gente calcula.
            </Text>
          </View>
        ) : (
          rows
        )}
        <Button title="Adicionar reserva" onPress={() => nav.navigate('ItemForm', {})} />
      </ScrollView>
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
  blank: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: space.xl },
  blankCard: { borderWidth: 1, padding: space.lg },
  blankTitle: { fontFamily: font.uiBold, fontSize: 16 },
  blankText: { fontFamily: font.ui, fontSize: 13.5, lineHeight: 20, textAlign: 'center' },
});
