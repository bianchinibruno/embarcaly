import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Mark } from './Mark';
import { font } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

/** Assinatura: "embarca" em tinta, "ly" em carimbo. Sempre nessa divisão. */
export function Wordmark({ size = 19, showMark = true }: { size?: number; showMark?: boolean }) {
  const t = useTheme();
  return (
    <View style={styles.row}>
      {showMark ? <Mark size={size} /> : null}
      <Text style={[styles.text, { fontSize: size * 0.95, color: t.ink }]}>
        embarca<Text style={{ color: t.stamp }}>ly</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  text: { fontFamily: font.uiBold, letterSpacing: -0.6 },
});
