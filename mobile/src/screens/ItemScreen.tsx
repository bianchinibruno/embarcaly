import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Ticket } from '../components/Ticket';
import { VersoSheet } from '../components/VersoSheet';
import { Button, DataRow, Divider, InfoButton, Label } from '../components/primitives';
import { font, space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { useApp } from '../state/AppState';
import { countdown, dayKey, dayMonth, duration, hhmm } from '../domain/time';
import { flightTimeline, nextStepIndex } from '../domain/timeline';
import type { RootStackParamList } from '../navigation/types';

export function ItemScreen() {
  const t = useTheme();
  const { items, now } = useApp();
  const route = useRoute<RouteProp<RootStackParamList, 'Item'>>();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [verso, setVerso] = useState<string | null>(null);

  const item = items.find((i) => i.id === route.params.id);
  if (!item) return <View style={{ flex: 1, backgroundColor: t.paper2 }} />;

  const n = now();
  const steps = item.type === 'air' ? flightTimeline(item) : [];
  const nextIdx = nextStepIndex(steps, n);

  return (
    <View style={{ flex: 1, backgroundColor: t.paper2 }}>
      <ScrollView contentContainerStyle={styles.body}>
        <Ticket item={item} onInfo={setVerso} />

        {item.type === 'air' ? (
          <>
            <Divider>Linha do tempo deste voo</Divider>
            {item.delay ? (
              <View style={[styles.flag, { backgroundColor: t.stock.car, borderColor: t.edge.car }]}>
                <Text style={[styles.flagText, { color: t.ink2 }]}>
                  Horários recalculados após o atraso de {duration(item.delay.minutes)} ·{' '}
                  {item.delay.reason}.
                </Text>
              </View>
            ) : null}

            <View style={[styles.card, { backgroundColor: t.paper, borderColor: t.rule }]}>
              <View style={{ height: 4, backgroundColor: t.edge.air }} />
              <View style={styles.cardBody}>
                {steps.map((s, i) => {
                  const done = n > s.at;
                  const isNext = i === nextIdx;
                  const showDate = i === 0 || dayKey(s.at) !== dayKey(steps[i - 1].at);
                  return (
                    <View key={`${s.title}-${i}`} style={styles.step}>
                      <View style={styles.stepTime}>
                        {showDate ? (
                          <Text style={[styles.stepDate, { color: t.ink3 }]}>
                            {dayMonth(s.at)}
                          </Text>
                        ) : null}
                        <Text
                          style={[
                            styles.stepHour,
                            { color: s.estimated ? t.ink2 : t.ink },
                            s.estimated && { fontFamily: font.mono },
                          ]}
                        >
                          {hhmm(s.at)}
                        </Text>
                      </View>

                      <View style={styles.rail}>
                        <View
                          style={[
                            styles.dot,
                            {
                              borderColor: isNext ? t.stamp : s.estimated ? t.ink3 : t.ink,
                              backgroundColor: isNext ? t.stamp : done ? t.ink : t.paper,
                              borderStyle: s.estimated ? 'dashed' : 'solid',
                            },
                          ]}
                        />
                        {i < steps.length - 1 ? (
                          <View style={[styles.line, { backgroundColor: t.rule }]} />
                        ) : null}
                      </View>

                      <View style={[styles.stepBody, done && { opacity: 0.5 }]}>
                        <View style={styles.stepTitleRow}>
                          <Text style={[styles.stepTitle, { color: t.ink }]}>{s.title}</Text>
                          {s.info ? (
                            <InfoButton hot={s.estimated} onPress={() => setVerso(s.info!)} />
                          ) : null}
                        </View>
                        {s.detail ? (
                          <Text style={[styles.stepDetail, { color: t.ink3 }]}>{s.detail}</Text>
                        ) : null}
                        {isNext ? (
                          <Text style={[styles.stepNext, { color: t.stamp }]}>
                            {countdown(s.at, n)}
                          </Text>
                        ) : null}
                      </View>
                    </View>
                  );
                })}

                <View style={styles.legend}>
                  <LegendDot solid /> <Text style={[styles.legendText, { color: t.ink3 }]}>do documento</Text>
                  <View style={{ width: space.md }} />
                  <LegendDot /> <Text style={[styles.legendText, { color: t.ink3 }]}>calculado por nós</Text>
                </View>
              </View>
            </View>

            <View style={{ paddingHorizontal: 2 }}>
              <DataRow
                k="Portão"
                v={item.gate ? `${item.gate}${item.gateChangedFrom ? ` · era ${item.gateChangedFrom}` : ''}` : 'a definir'}
                onInfo={() => setVerso(item.gate ? 'gateChange' : 'gate')}
              />
              <DataRow k="Bagagem" v="1 despachada" />
            </View>

            <Button title="Ver cartão de embarque" variant="ghost" onPress={() => nav.navigate('Passes')} />
          </>
        ) : (
          <>
            <Divider>Detalhes</Divider>
            <View style={[styles.card, { backgroundColor: t.paper, borderColor: t.rule }]}>
              <View style={{ height: 4, backgroundColor: t.edge[item.type] }} />
              <View style={styles.cardBody}>
                <DataRow k="Início" v={`${dayMonth(item.start)} ${hhmm(item.start)}`} />
                {item.end ? <DataRow k="Fim" v={`${dayMonth(item.end)} ${hhmm(item.end)}`} /> : null}
                {item.pnr ? <DataRow k="Reserva" v={item.pnr} onInfo={() => setVerso('pnr')} /> : null}
                {item.leaveBy ? (
                  <View
                    style={[styles.flag, { backgroundColor: t.stock.act, borderColor: t.edge.act }]}
                  >
                    <Text style={[styles.flagText, { color: t.ink2 }]}>
                      Saia até {hhmm(item.leaveBy)}.
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
            {item.pass === 'external' ? (
              <Button
                title="Ver como abrir este bilhete"
                variant="ghost"
                onPress={() => nav.navigate('Passes')}
              />
            ) : null}
          </>
        )}

        <Button
          title="Editar reserva"
          variant="ghost"
          onPress={() => nav.navigate('ItemForm', { id: item.id })}
        />

        <Divider>Anexos</Divider>
        <View style={styles.docs}>
          {(item.documents ?? [{ id: 'x', kind: 'pdf' as const, name: 'Comprovante', meta: '—' }]).map(
            (doc) => (
              <View key={doc.id} style={[styles.doc, { backgroundColor: t.paper, borderColor: t.rule }]}>
                <Label>{doc.kind === 'email' ? 'E-mail' : 'PDF'}</Label>
                <Text style={[styles.docName, { color: t.ink }]}>{doc.name}</Text>
                <Text style={[styles.docMeta, { color: t.ink3 }]}>{doc.meta}</Text>
              </View>
            ),
          )}
        </View>
      </ScrollView>

      <VersoSheet versoKey={verso} onClose={() => setVerso(null)} />
    </View>
  );
}

function LegendDot({ solid = false }: { solid?: boolean }) {
  const t = useTheme();
  return (
    <View
      style={[
        styles.legendDot,
        {
          borderColor: solid ? t.ink : t.ink3,
          backgroundColor: t.paper,
          borderStyle: solid ? 'solid' : 'dashed',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  body: { padding: space.md, gap: space.md, paddingBottom: space.xxl },
  card: { borderWidth: 1, overflow: 'hidden' },
  cardBody: { paddingHorizontal: 12, paddingTop: 12, paddingBottom: 12 },
  step: { flexDirection: 'row', alignItems: 'flex-start' },
  stepTime: { width: 58 },
  stepDate: { fontFamily: font.mono, fontSize: 9.5, letterSpacing: 1 },
  stepHour: { fontFamily: font.monoBold, fontSize: 12.5 },
  rail: { width: 16, alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, borderWidth: 1.5, marginTop: 3 },
  line: { width: 1, flex: 1, minHeight: 22, marginTop: 2 },
  stepBody: { flex: 1, paddingBottom: space.md, paddingLeft: 6 },
  stepTitleRow: { flexDirection: 'row', alignItems: 'center' },
  stepTitle: { fontFamily: font.uiBold, fontSize: 13.5 },
  stepDetail: { fontFamily: font.ui, fontSize: 11, marginTop: 1 },
  stepNext: { fontFamily: font.monoBold, fontSize: 11, marginTop: 3 },
  legend: { flexDirection: 'row', alignItems: 'center', marginTop: space.sm },
  legendDot: { width: 8, height: 8, borderRadius: 4, borderWidth: 1.5, marginRight: 5 },
  legendText: { fontFamily: font.mono, fontSize: 9, letterSpacing: 1, textTransform: 'uppercase' },
  flag: { borderWidth: 1, padding: space.sm },
  flagText: { fontFamily: font.ui, fontSize: 11.5, lineHeight: 16 },
  docs: { flexDirection: 'row', gap: space.sm, flexWrap: 'wrap' },
  doc: { borderWidth: 1, padding: 10, flexGrow: 1, flexBasis: '46%' },
  docName: { fontFamily: font.uiBold, fontSize: 13, marginTop: 4 },
  docMeta: { fontFamily: font.mono, fontSize: 10, marginTop: 3 },
});
