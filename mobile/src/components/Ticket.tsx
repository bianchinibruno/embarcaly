import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { font, space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import type { Item, ItemType } from '../domain/types';
import { hhmm } from '../domain/time';
import { DataRow } from './primitives';

const KIND_LABEL: Record<ItemType, string> = {
  air: 'Voo',
  bed: 'Hotel',
  rail: 'Trem',
  act: 'Passeio',
  car: 'Carro',
};

/**
 * O bilhete. Componente central da interface.
 *
 * Cada tipo de reserva tem seu papel tintado — você reconhece o tipo pela cor
 * antes de ler qualquer palavra. Cor não decora, classifica.
 */
export function Ticket({
  item,
  headLeft,
  headRight,
  onPress,
  onInfo,
  children,
}: {
  item: Item;
  headLeft?: string;
  headRight?: React.ReactNode;
  onPress?: () => void;
  onInfo?: (key: string) => void;
  children?: React.ReactNode;
}) {
  const t = useTheme();
  const stock = t.stock[item.type];
  const edge = t.edge[item.type];

  const time =
    headRight !== undefined ? (
      headRight
    ) : item.delay ? (
      <Text style={[styles.time, { color: t.ink }]}>
        <Text style={[styles.was, { color: t.ink3 }]}>{hhmm(item.delay.originalStart)} </Text>
        {hhmm(item.start)}
      </Text>
    ) : (
      <Text style={[styles.time, { color: t.ink }]}>{hhmm(item.start)}</Text>
    );

  const body =
    item.type === 'air' ? (
      <>
        <View style={styles.route}>
          <View>
            <Text style={[styles.code, { color: t.ink }]}>{item.from}</Text>
            <Text style={[styles.city, { color: t.ink3 }]}>{item.fromCity}</Text>
          </View>
          <View style={[styles.dash, { borderTopColor: t.ink3 }]} />
          <View>
            <Text style={[styles.code, { color: t.ink }]}>{item.to}</Text>
            <Text style={[styles.city, { color: t.ink3 }]}>{item.toCity}</Text>
          </View>
        </View>
        {item.flight ? <DataRow k="Voo" v={item.flight} /> : null}
        {item.pnr ? (
          <DataRow k="Localizador" v={item.pnr} onInfo={onInfo ? () => onInfo('pnr') : undefined} />
        ) : null}
        {item.seat ? <DataRow k="Assento" v={item.seat} /> : null}
      </>
    ) : (
      <>
        <Text style={[styles.title, { color: t.ink }]}>{item.title}</Text>
        {item.subtitle ? <Text style={[styles.sub, { color: t.ink3 }]}>{item.subtitle}</Text> : null}
        {item.seat ? <DataRow k="Assento" v={item.seat} /> : null}
        {item.pnr ? (
          <DataRow k="Reserva" v={item.pnr} onInfo={onInfo ? () => onInfo('pnr') : undefined} />
        ) : null}
      </>
    );

  const content = (
    <View style={[styles.card, { backgroundColor: t.paper, borderColor: t.rule }]}>
      <View style={{ height: 4, backgroundColor: edge }} />
      <View style={[styles.head, { backgroundColor: stock, borderBottomColor: t.rule }]}>
        <Text style={[styles.kind, { color: t.ink2 }]}>{headLeft ?? KIND_LABEL[item.type]}</Text>
        {time}
      </View>
      <View style={styles.body}>
        {body}
        {item.needs ? (
          <View style={[styles.flag, { backgroundColor: t.stock.car, borderColor: t.edge.car }]}>
            <Text style={[styles.flagText, { color: t.ink2 }]}>{item.needs}</Text>
          </View>
        ) : null}
        {children}
      </View>
    </View>
  );

  if (!onPress) return content;
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
  kind: { fontFamily: font.monoBold, fontSize: 9.5, letterSpacing: 1.8, textTransform: 'uppercase' },
  time: { fontFamily: font.monoBold, fontSize: 12 },
  was: { fontFamily: font.mono, fontSize: 12, textDecorationLine: 'line-through' },
  body: { paddingHorizontal: 12, paddingTop: 10, paddingBottom: 12 },
  route: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  code: { fontFamily: font.monoBold, fontSize: 21, lineHeight: 22 },
  city: { fontFamily: font.ui, fontSize: 10, marginTop: 2 },
  dash: { flex: 1, borderTopWidth: 1, borderStyle: 'dashed', opacity: 0.6, marginHorizontal: 4 },
  title: { fontFamily: font.uiBold, fontSize: 15, letterSpacing: -0.2 },
  sub: { fontFamily: font.ui, fontSize: 11, marginTop: 2 },
  flag: { borderWidth: 1, padding: 8, marginTop: 10 },
  flagText: { fontFamily: font.ui, fontSize: 11.5, lineHeight: 16 },
});
