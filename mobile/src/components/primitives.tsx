import React from 'react';
import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { font, label as labelStyle, space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

/** Rótulo em caixa alta com entreletra larga. */
export function Label({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return <Text style={[labelStyle, { color: t.ink3 }]}>{children}</Text>;
}

/** Separador com rótulo à esquerda e fio até a borda. */
export function Divider({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return (
    <View style={styles.divider}>
      <Label>{children}</Label>
      <View style={[styles.rule, { backgroundColor: t.hair }]} />
    </View>
  );
}

/** Linha de dado: rótulo, pontilhado, valor. Como formulário impresso. */
export function DataRow({
  k,
  v,
  onInfo,
}: {
  k: string;
  v: string;
  onInfo?: () => void;
}) {
  const t = useTheme();
  return (
    <View style={styles.dataRow}>
      <View style={styles.rowLeft}>
        <Label>{k}</Label>
        {onInfo ? <InfoButton onPress={onInfo} /> : null}
      </View>
      <View style={[styles.dots, { borderBottomColor: t.rule }]} />
      <Text style={[styles.value, { color: t.ink }]}>{v}</Text>
    </View>
  );
}

/** O (i) que vira o bilhete. */
export function InfoButton({ onPress, hot = false }: { onPress: () => void; hot?: boolean }) {
  const t = useTheme();
  const color = hot ? t.stamp : t.ink3;
  return (
    <Pressable
      onPress={onPress}
      hitSlop={12}
      accessibilityRole="button"
      accessibilityLabel="Explicação"
      style={[styles.info, { borderColor: color }]}
    >
      <Text style={[styles.infoText, { color }]}>i</Text>
    </Pressable>
  );
}

/** Carimbo de borracha, levemente torto. */
export function Stamp({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return (
    <View style={[styles.stamp, { borderColor: t.stamp }]}>
      <Text style={[styles.stampText, { color: t.stamp }]}>{children}</Text>
    </View>
  );
}

/** Intervalo entre dois itens: fio pontilhado e o tempo livre. */
export function Gap({ text, onInfo }: { text: string; onInfo?: () => void }) {
  const t = useTheme();
  return (
    <View style={styles.gap}>
      <View style={[styles.gapBar, { backgroundColor: t.rule }]} />
      <Text style={[styles.gapText, { color: t.ink3 }]}>{text}</Text>
      {onInfo ? <InfoButton onPress={onInfo} /> : null}
    </View>
  );
}

export function Button({
  title,
  onPress,
  variant = 'solid',
  disabled,
  style,
}: {
  title: string;
  onPress?: () => void;
  variant?: 'solid' | 'ghost' | 'stamp';
  disabled?: boolean;
  style?: ViewStyle;
}) {
  const t = useTheme();
  const bg = variant === 'solid' ? t.ink : variant === 'stamp' ? t.stamp : 'transparent';
  const fg = variant === 'ghost' ? t.ink : t.paper;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: bg, opacity: disabled ? 0.45 : pressed ? 0.82 : 1 },
        variant === 'ghost' && { borderWidth: 1, borderColor: t.ink },
        style,
      ]}
    >
      <Text style={[styles.btnText, { color: fg }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  divider: { flexDirection: 'row', alignItems: 'center', gap: space.sm, marginTop: space.xs },
  rule: { flex: 1, height: 1 },
  dataRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 4 },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  dots: { flex: 1, borderBottomWidth: 1, borderStyle: 'dotted', transform: [{ translateY: -3 }] },
  value: { fontFamily: font.monoMedium, fontSize: 12 },
  info: {
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  infoText: { fontFamily: font.monoBold, fontSize: 9, lineHeight: 12 },
  stamp: {
    borderWidth: 1.5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    transform: [{ rotate: '-3deg' }],
  },
  stampText: { fontFamily: font.monoBold, fontSize: 9, letterSpacing: 1.6, textTransform: 'uppercase' },
  gap: { flexDirection: 'row', alignItems: 'center', gap: space.sm, paddingLeft: space.sm },
  gapBar: { width: 1, height: 18 },
  gapText: { fontFamily: font.mono, fontSize: 10, letterSpacing: 1, textTransform: 'uppercase' },
  btn: { paddingVertical: 14, paddingHorizontal: 16, alignItems: 'center' },
  btnText: { fontFamily: font.monoBold, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' },
});
