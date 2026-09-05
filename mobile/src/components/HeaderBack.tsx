import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { font } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

/**
 * Saída explícita do cabeçalho.
 *
 * O botão nativo de voltar do stack não aparece na web, e telas em
 * apresentação modal não têm gesto de arrastar para baixo lá. O resultado era
 * ficar preso no formulário sem nenhuma saída além de enviar.
 *
 * Toda tela empilhada precisa de uma saída visível, em qualquer plataforma —
 * então desenhamos a nossa em vez de depender do comportamento de cada uma.
 */
export function HeaderBack({
  onPress,
  label = 'Voltar',
}: {
  onPress: () => void;
  label?: string;
}) {
  const t = useTheme();
  return (
    <Pressable
      onPress={onPress}
      hitSlop={16}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.55 : 1 }]}
    >
      <Text style={[styles.text, { color: t.stamp }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { paddingVertical: 6, paddingRight: 16, paddingLeft: 2 },
  text: {
    fontFamily: font.monoBold,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
});
