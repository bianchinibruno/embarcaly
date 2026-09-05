import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Wordmark } from '../components/Wordmark';
import { Button, DataRow, Divider, Label, Stamp } from '../components/primitives';
import { DevClock } from '../components/DevClock';
import { font, space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { useApp } from '../state/AppState';
import { dayMonth, daysUntil } from '../domain/time';
import type { RootStackParamList } from '../navigation/types';

export function TripsScreen() {
  const t = useTheme();
  const { ready, trips, activeTrip, items, now, selectTrip, seedSample } = useApp();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (!ready) {
    return <View style={{ flex: 1, backgroundColor: t.paper2 }} />;
  }

  const n = now();

  return (
    <View style={{ flex: 1, backgroundColor: t.paper2 }}>
      <View style={[styles.bar, { backgroundColor: t.paper, borderBottomColor: t.hair }]}>
        <View>
          <Wordmark />
          <View style={{ marginTop: 4 }}>
            <Label>
              {trips.length === 0
                ? 'nenhuma viagem ainda'
                : `${trips.length} ${trips.length === 1 ? 'viagem' : 'viagens'}`}
            </Label>
          </View>
        </View>
        {activeTrip && n >= activeTrip.start && n <= activeTrip.end ? <Stamp>Em viagem</Stamp> : null}
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {trips.length === 0 ? (
          <View style={[styles.emptyCard, { backgroundColor: t.paper, borderColor: t.rule }]}>
            <Text style={[styles.emptyTitle, { color: t.ink }]}>Comece pela sua viagem.</Text>
            <Text style={[styles.emptyText, { color: t.ink2 }]}>
              Crie a viagem, adicione as reservas e o Embarcaly monta a sequência: o que fazer
              agora, o que vem depois e qual documento você precisa ter em mãos.
            </Text>
            <View style={{ height: space.md }} />
            <Button title="Criar minha viagem" onPress={() => nav.navigate('TripForm', {})} />
            <View style={{ height: space.sm }} />
            <Button title="Ver com dados de exemplo" variant="ghost" onPress={seedSample} />
          </View>
        ) : null}

        {trips.map((trip) => {
          const isActive = trip.id === activeTrip?.id;
          const started = n >= trip.start;
          const finished = n > trip.end;
          const days = started
            ? Math.max(1, Math.ceil((n.getTime() - trip.start.getTime()) / 86400000))
            : daysUntil(trip.start, n);

          return (
            <View
              key={trip.id}
              style={[styles.card, { backgroundColor: t.paper, borderColor: isActive ? t.ink : t.rule }]}
            >
              {/* O cartao inteiro abre a viagem, mas "Editar" fica FORA deste
                  Pressable: botao dentro de botao e HTML invalido e quebra o
                  toque na web. */}
              <Pressable
                onPress={() => {
                  selectTrip(trip.id);
                  nav.navigate('Tabs', { screen: 'Itinerary' });
                }}
                accessibilityRole="button"
                accessibilityLabel={`Abrir viagem ${trip.name}`}
              >
                <View style={{ height: 4, backgroundColor: finished ? t.edge.bed : t.edge.air }} />
                <View
                  style={[
                    styles.head,
                    { backgroundColor: finished ? t.stock.bed : t.stock.air, borderBottomColor: t.rule },
                  ]}
                >
                  <Text style={[styles.kind, { color: t.ink2 }]}>
                    {finished ? 'Concluída' : started ? 'Em viagem' : 'Próxima viagem'}
                  </Text>
                  <Text style={[styles.time, { color: t.ink }]}>
                    {dayMonth(trip.start)} – {dayMonth(trip.end)}
                  </Text>
                </View>

                <View style={styles.cardBody}>
                  <Text style={[styles.tripName, { color: t.ink }]}>{trip.name}</Text>
                  {trip.subtitle ? (
                    <Text style={[styles.tripSub, { color: t.ink3 }]}>{trip.subtitle}</Text>
                  ) : null}

                  {!finished ? (
                    <View style={styles.hero}>
                      <Text style={[styles.heroNum, { color: t.ink }]}>{days}</Text>
                      <Text style={[styles.heroUnit, { color: t.ink3 }]}>
                        {started ? 'dia de viagem' : 'dias para embarcar'}
                      </Text>
                    </View>
                  ) : null}

                  {isActive ? (
                    <>
                      <View style={[styles.perf, { borderTopColor: t.rule }]} />
                      <DataRow k="Reservas" v={String(items.length)} />
                      <DataRow k="Pendências" v={String(items.filter((i) => i.needs).length)} />
                    </>
                  ) : null}

                </View>
              </Pressable>

              <View style={[styles.actions, { borderTopColor: t.hair }]}>
                <Pressable
                  onPress={() => nav.navigate('TripForm', { id: trip.id })}
                  hitSlop={10}
                  accessibilityRole="button"
                  accessibilityLabel={`Editar viagem ${trip.name}`}
                >
                  <Text style={[styles.action, { color: t.stamp }]}>Editar</Text>
                </Pressable>
                <Text style={[styles.action, { color: t.ink3 }]}>
                  {isActive ? 'Selecionada' : 'Toque para abrir'}
                </Text>
              </View>
            </View>
          );
        })}

        {trips.length > 0 ? (
          <Button title="Nova viagem" onPress={() => nav.navigate('TripForm', {})} />
        ) : null}

        <DevClock />
      </ScrollView>
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
  time: { fontFamily: font.monoBold, fontSize: 11 },
  cardBody: { paddingHorizontal: 12, paddingTop: 10, paddingBottom: 12 },
  tripName: { fontFamily: font.uiBold, fontSize: 17, letterSpacing: -0.3 },
  tripSub: { fontFamily: font.ui, fontSize: 11.5, marginTop: 2 },
  hero: { alignItems: 'center', paddingVertical: space.md },
  heroNum: { fontFamily: font.mono, fontSize: 48, lineHeight: 52, letterSpacing: -2 },
  heroUnit: {
    fontFamily: font.mono,
    fontSize: 10,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginTop: 6,
  },
  perf: { borderTopWidth: 1, borderStyle: 'dashed', marginVertical: space.sm },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  action: { fontFamily: font.monoBold, fontSize: 9.5, letterSpacing: 1.6, textTransform: 'uppercase' },
  emptyCard: { borderWidth: 1, padding: space.lg },
  emptyTitle: { fontFamily: font.uiBold, fontSize: 19, letterSpacing: -0.4 },
  emptyText: { fontFamily: font.ui, fontSize: 13.5, lineHeight: 20, marginTop: 6 },
});
