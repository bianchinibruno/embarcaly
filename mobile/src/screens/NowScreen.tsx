import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Ticket } from '../components/Ticket';
import { VersoSheet } from '../components/VersoSheet';
import { Button, Gap, InfoButton, Label, Stamp } from '../components/primitives';
import { HeaderBack } from '../components/HeaderBack';
import { font, space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { useApp, useUpcoming } from '../state/AppState';
import { countdown, dayMonth, duration, gapLabel, hhmm, isImminent, weekday } from '../domain/time';
import { passState } from '../domain/passes';
import type { Item } from '../domain/types';
import type { RootStackParamList } from '../navigation/types';

/**
 * A tela que se usa de pé, com mochila nas costas, num país onde você não lê
 * as placas. Um item ativo, e só "depois" e "mais tarde" abaixo — nunca o dia
 * inteiro, que é o Itinerário.
 */
export function NowScreen() {
  const t = useTheme();
  const { now } = useApp();
  const upcoming = useUpcoming();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [verso, setVerso] = useState<string | null>(null);

  const n = now();
  const [current, next, later] = upcoming;

  if (!current) {
    return (
      <View style={[styles.empty, { backgroundColor: t.paper2 }]}>
        <Text style={[styles.emptyText, { color: t.ink3 }]}>Nada pela frente. Boa viagem.</Text>
      </View>
    );
  }

  const disrupted = upcoming.find((i) => i.delay || i.gateChangedFrom);
  const cd = (i: Item) => (
    <Text
      style={[styles.cd, { color: isImminent(i.start, n) ? t.stamp : t.ink2 }]}
    >
      {countdown(i.start, n)}
    </Text>
  );

  return (
    <View style={{ flex: 1, backgroundColor: t.paper2 }}>
      <View style={[styles.bar, { backgroundColor: t.paper, borderBottomColor: t.hair }]}>
        <View style={{ flex: 1 }}>
          <HeaderBack label="Viagens" onPress={() => nav.navigate('Tabs', { screen: 'Trips' })} />
          <Text style={[styles.h1, { color: t.ink }]}>Agora</Text>
          <Label>{`${weekday(n)} · ${dayMonth(n).toLowerCase()} · ${hhmm(n)}`}</Label>
        </View>
        <Stamp>Em viagem</Stamp>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {disrupted ? <DisruptionNotice item={disrupted} onInfo={setVerso} /> : null}

        <Ticket item={current} headLeft="Agora" headRight={cd(current)} onInfo={setVerso} />

        {current.type === 'air' ? (
          <Button
            title={
              passState(current, n) === 'issued'
                ? 'Abrir cartão de embarque'
                : 'Ver cartões de embarque'
            }
            variant={passState(current, n) === 'issued' ? 'stamp' : 'ghost'}
            onPress={() => nav.navigate('Passes')}
          />
        ) : (
          <Button
            title="Abrir bilhete"
            variant="stamp"
            onPress={() => nav.navigate('Item', { id: current.id })}
          />
        )}

        {current.leaveBy ? (
          <View style={[styles.leave, { backgroundColor: t.stock.act, borderColor: t.edge.act }]}>
            <Text style={[styles.leaveText, { color: t.ink2 }]}>
              Saia até {hhmm(current.leaveBy)} para chegar a tempo.
            </Text>
          </View>
        ) : null}

        {next ? <GapRow a={current} b={next} onInfo={setVerso} /> : null}
        {next ? (
          <Ticket item={next} headLeft="Depois" headRight={cd(next)} onInfo={setVerso} />
        ) : null}
        {later ? (
          <Ticket item={later} headLeft="Mais tarde" headRight={cd(later)} onInfo={setVerso} />
        ) : null}
      </ScrollView>

      <VersoSheet versoKey={verso} onClose={() => setVerso(null)} />
    </View>
  );
}

function GapRow({ a, b, onInfo }: { a: Item; b: Item; onInfo: (k: string) => void }) {
  const bothFlights = a.type === 'air' && b.type === 'air';
  const text = gapLabel(a.end ?? a.start, b.start, bothFlights);
  if (!text) return null;
  return <Gap text={text} onInfo={bothFlights ? () => onInfo('connection') : undefined} />;
}

/** O aviso que só aparece quando o plano quebra — e é aí que o produto vale mais. */
function DisruptionNotice({ item, onInfo }: { item: Item; onInfo: (k: string) => void }) {
  const t = useTheme();
  const { items } = useApp();

  if (item.gateChangedFrom) {
    return (
      <View style={[styles.alert, { backgroundColor: t.paper, borderColor: t.stamp }]}>
        <View style={styles.alertHead}>
          <Text style={[styles.alertKicker, { color: t.stamp }]}>Mudou agora</Text>
          <Stamp>Portão</Stamp>
        </View>
        <Text style={[styles.alertText, { color: t.ink }]}>
          O portão do voo {item.flight} mudou de {item.gateChangedFrom} para {item.gate}.
          <InfoButton hot onPress={() => onInfo('gateChange')} />
        </Text>
        <Text style={[styles.alertExtra, { color: t.ink2, borderTopColor: t.rule }]}>
          Cerca de {item.gateWalkMinutes} min de caminhada dentro do terminal.
          {item.boarding ? ` Embarque às ${hhmm(item.boarding)}.` : ''}
        </Text>
      </View>
    );
  }

  if (!item.delay) return null;

  const idx = items.indexOf(item);
  const nxt = items[idx + 1];
  let consequence = '';
  if (nxt && item.end) {
    const novo = Math.round((nxt.start.getTime() - item.end.getTime()) / 60000);
    const velho = Math.round(
      (nxt.start.getTime() - (item.end.getTime() - item.delay.minutes * 60000)) / 60000,
    );
    consequence =
      `${nxt.type === 'air' ? 'Sua conexão' : `O intervalo até ${nxt.title}`} caiu de ` +
      `${duration(velho)} para ${duration(novo)} — ` +
      (novo < 90 ? 'ficou apertada.' : 'continua tranquila.');
  }

  return (
    <View style={[styles.alert, { backgroundColor: t.paper, borderColor: t.stamp }]}>
      <View style={styles.alertHead}>
        <Text style={[styles.alertKicker, { color: t.stamp }]}>Mudou agora</Text>
        <Stamp>Atraso</Stamp>
      </View>
      <Text style={[styles.alertText, { color: t.ink }]}>
        O voo {item.flight} atrasou {duration(item.delay.minutes)}. Nova partida às{' '}
        {hhmm(item.start)}.
        <InfoButton hot onPress={() => onInfo('delay')} />
      </Text>
      {consequence ? (
        <Text style={[styles.alertExtra, { color: t.ink2, borderTopColor: t.rule }]}>
          {consequence}
        </Text>
      ) : null}
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
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontFamily: font.ui, fontSize: 14 },
  alert: { borderWidth: 1, padding: space.md },
  alertHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  alertKicker: {
    fontFamily: font.monoBold,
    fontSize: 9.5,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  alertText: { fontFamily: font.ui, fontSize: 13.5, lineHeight: 19 },
  alertExtra: { fontFamily: font.ui, fontSize: 12, marginTop: 8, paddingTop: 8, borderTopWidth: 1 },
  leave: { borderWidth: 1, padding: space.sm },
  leaveText: { fontFamily: font.ui, fontSize: 12 },
});
