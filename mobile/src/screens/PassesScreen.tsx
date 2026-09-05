import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import { VersoSheet } from '../components/VersoSheet';
import { Button, DataRow, InfoButton } from '../components/primitives';
import { font, space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { useApp } from '../state/AppState';
import { countdown, dayMonth, hhmm } from '../domain/time';
import { passLabel, passState } from '../domain/passes';

/**
 * Os três estados do cartão de embarque.
 *
 * Emitido, ainda não emitido e fora daqui. Nunca geramos um código — ver
 * domain/passes.ts para o porquê.
 */
export function PassesScreen() {
  const t = useTheme();
  const { items, now } = useApp();
  const [verso, setVerso] = useState<string | null>(null);

  const n = now();
  const relevant = items.filter((i) => i.type === 'air' || i.pass === 'external');

  return (
    <View style={{ flex: 1, backgroundColor: t.paper2 }}>
      <ScrollView contentContainerStyle={styles.body}>
        {relevant.map((item) => {
          const state = passState(item, n);
          return (
            <View
              key={item.id}
              style={[styles.card, { backgroundColor: t.paper, borderColor: t.rule }]}
            >
              <View style={{ height: 4, backgroundColor: t.edge[item.type] }} />
              <View
                style={[styles.head, { backgroundColor: t.stock[item.type], borderBottomColor: t.rule }]}
              >
                <Text style={[styles.kind, { color: t.ink2 }]}>{item.title}</Text>
                <Text style={[styles.time, { color: t.ink }]}>
                  {dayMonth(item.start)} · {hhmm(item.start)}
                </Text>
              </View>

              <View style={styles.cardBody}>
                <View
                  style={[
                    styles.box,
                    { borderColor: t.rule, borderStyle: state === 'issued' ? 'solid' : 'dashed' },
                  ]}
                >
                  <View style={styles.boxHead}>
                    <Text
                      style={[
                        styles.boxLabel,
                        { color: state === 'issued' ? t.edge.rail : t.ink3 },
                      ]}
                    >
                      {passLabel(state)}
                    </Text>
                    <InfoButton onPress={() => setVerso('pass')} />
                  </View>

                  {state === 'issued' ? (
                    <>
                      <Barcode color={t.ink} />
                      <Text style={[styles.barnum, { color: t.ink3 }]}>
                        M1BIANCHINI/B {item.pnr}
                      </Text>
                    </>
                  ) : state === 'pending' ? (
                    <>
                      <Text style={[styles.boxText, { color: t.ink2 }]}>
                        Só a companhia pode gerar seu cartão de embarque.
                      </Text>
                      {item.checkinOpen ? (
                        <Text style={[styles.boxBig, { color: t.stamp }]}>
                          abre {countdown(item.checkinOpen, n)}
                        </Text>
                      ) : null}
                    </>
                  ) : (
                    <Text style={[styles.boxText, { color: t.ink2 }]}>
                      Este bilhete só abre no app da {item.operator ?? 'operadora'}. Guardamos o
                      localizador e o horário.
                    </Text>
                  )}
                </View>

                {state === 'issued' ? (
                  <>
                    <DataRow k="Assento" v={item.seat ?? '—'} />
                    <DataRow k="Sequência" v={item.sequence ?? '—'} />
                    <Button title="Adicionar à Carteira" style={{ marginTop: space.sm }} />
                  </>
                ) : null}

                {state === 'pending' ? (
                  <Button
                    title="Avisar quando abrir"
                    variant="ghost"
                    style={{ marginTop: space.sm }}
                  />
                ) : null}

                {state === 'external' ? (
                  <>
                    <DataRow k="Localizador" v={item.pnr ?? '—'} onInfo={() => setVerso('pnr')} />
                    <Button
                      title={`Abrir app da ${item.operator ?? 'operadora'}`}
                      variant="ghost"
                      style={{ marginTop: space.sm }}
                    />
                  </>
                ) : null}
              </View>
            </View>
          );
        })}
      </ScrollView>

      <VersoSheet versoKey={verso} onClose={() => setVerso(null)} />
    </View>
  );
}

/** Representação visual. O código real vem do documento da companhia. */
function Barcode({ color }: { color: string }) {
  const widths = [1, 2, 1, 3, 1, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 1, 1, 2, 3, 1, 2];
  let x = 0;
  return (
    <Svg width="100%" height={38} style={{ marginTop: 8 }}>
      {widths.map((w, i) => {
        const el = i % 2 === 0 ? <Rect key={i} x={x} y={0} width={w * 2.2} height={38} fill={color} /> : null;
        x += w * 2.2 + 3;
        return el;
      })}
    </Svg>
  );
}

const styles = StyleSheet.create({
  body: { padding: space.md, gap: space.md, paddingBottom: space.xxl },
  card: { borderWidth: 1, overflow: 'hidden' },
  head: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    gap: space.sm,
  },
  kind: { fontFamily: font.monoBold, fontSize: 9.5, letterSpacing: 1.4, textTransform: 'uppercase', flex: 1 },
  time: { fontFamily: font.monoBold, fontSize: 11 },
  cardBody: { paddingHorizontal: 12, paddingTop: 10, paddingBottom: 12 },
  box: { borderWidth: 1, padding: 12, alignItems: 'center' },
  boxHead: { flexDirection: 'row', alignItems: 'center' },
  boxLabel: { fontFamily: font.monoBold, fontSize: 9.5, letterSpacing: 1.6, textTransform: 'uppercase' },
  boxText: { fontFamily: font.ui, fontSize: 12.5, textAlign: 'center', marginTop: 6, lineHeight: 17 },
  boxBig: { fontFamily: font.monoMedium, fontSize: 17, marginTop: 6 },
  barnum: { fontFamily: font.mono, fontSize: 10, letterSpacing: 4, marginTop: 4 },
});
