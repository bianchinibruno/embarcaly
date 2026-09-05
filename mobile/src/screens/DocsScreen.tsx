import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Divider, Label } from '../components/primitives';
import { HeaderBack } from '../components/HeaderBack';
import { font, space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { useApp } from '../state/AppState';
import { dayMonth } from '../domain/time';
import type { Item } from '../domain/types';
import type { RootStackParamList } from '../navigation/types';

/**
 * A carteira, agrupada pelo que a pessoa procura sob pressão.
 * O rótulo "offline" não é detalhe técnico: é a promessa que importa quando o
 * roaming acaba no meio da imigração.
 */
export function DocsScreen() {
  const t = useTheme();
  const { items } = useApp();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const groups: [string, Item[]][] = [
    ['Voos', items.filter((i) => i.type === 'air')],
    ['Hospedagem', items.filter((i) => i.type === 'bed')],
    ['Transporte', items.filter((i) => i.type === 'rail' || i.type === 'car')],
    ['Passeios', items.filter((i) => i.type === 'act')],
  ];

  return (
    <View style={{ flex: 1, backgroundColor: t.paper2 }}>
      <View style={[styles.bar, { backgroundColor: t.paper, borderBottomColor: t.hair }]}>
        <View>
          <HeaderBack label="Viagens" onPress={() => nav.navigate('Tabs', { screen: 'Trips' })} />
          <Text style={[styles.h1, { color: t.ink }]}>Documentos</Text>
          <Label>{`${items.length + 2} arquivos · offline`}</Label>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {groups.map(([name, arr]) =>
          arr.length ? (
            <View key={name} style={{ gap: space.sm }}>
              <Divider>{name}</Divider>
              <View style={styles.grid}>
                {arr.map((i) => (
                  <Card
                    key={i.id}
                    top={dayMonth(i.start)}
                    name={i.title}
                    meta={i.pnr ?? '—'}
                    onPress={() => nav.navigate('Item', { id: i.id })}
                  />
                ))}
              </View>
            </View>
          ) : null,
        )}

        <Divider>Pessoais</Divider>
        <View style={styles.grid}>
          <Card top="DOC" name="Passaporte" meta="val. 2031" />
          <Card top="DOC" name="Seguro viagem" meta="AP-55219" />
        </View>
      </ScrollView>
    </View>
  );
}

function Card({
  top,
  name,
  meta,
  onPress,
}: {
  top: string;
  name: string;
  meta: string;
  onPress?: () => void;
}) {
  const t = useTheme();
  return (
    <View
      style={[styles.card, { backgroundColor: t.paper, borderColor: t.rule }]}
      onTouchEnd={onPress}
    >
      <Label>{top}</Label>
      <Text style={[styles.cardName, { color: t.ink }]}>{name}</Text>
      <Text style={[styles.cardMeta, { color: t.ink3 }]}>{meta}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    borderBottomWidth: 1,
  },
  h1: { fontFamily: font.uiBold, fontSize: 20, letterSpacing: -0.5 },
  body: { padding: space.md, gap: space.md, paddingBottom: space.xxl },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  card: { borderWidth: 1, padding: 10, flexGrow: 1, flexBasis: '46%' },
  cardName: { fontFamily: font.uiBold, fontSize: 13, marginTop: 4 },
  cardMeta: { fontFamily: font.mono, fontSize: 10, marginTop: 3 },
});
