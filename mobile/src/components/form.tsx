import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { font, space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { Label } from './primitives';
export { DateTimeField } from './DateTimeField';

/** Campo de texto. Rótulo em caixa alta e fio embaixo, como formulário impresso. */
export function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  autoCapitalize = 'sentences',
  mono = false,
  error,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  mono?: boolean;
  error?: string;
}) {
  const t = useTheme();
  return (
    <View style={styles.field}>
      <Label>{label}</Label>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={t.ink3}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        style={[
          styles.input,
          {
            color: t.ink,
            borderBottomColor: error ? t.stamp : t.rule,
            fontFamily: mono ? font.monoMedium : font.ui,
          },
        ]}
      />
      {error ? <Text style={[styles.error, { color: t.stamp }]}>{error}</Text> : null}
    </View>
  );
}

/** Seleção por pastilhas. Poucas opções, todas visíveis — sem menu escondido. */
export function ChipsField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  const t = useTheme();
  return (
    <View style={styles.field}>
      <Label>{label}</Label>
      <View style={styles.chips}>
        {options.map((o) => {
          const on = o.value === value;
          return (
            <Pressable
              key={o.value}
              onPress={() => onChange(o.value)}
              accessibilityRole="radio"
              accessibilityState={{ selected: on }}
              style={[
                styles.chip,
                { borderColor: on ? t.ink : t.rule, backgroundColor: on ? t.ink : 'transparent' },
              ]}
            >
              <Text style={[styles.chipText, { color: on ? t.paper : t.ink2 }]}>{o.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 4 },
  input: { borderBottomWidth: 1, paddingVertical: 8, fontSize: 15 },
  error: { fontFamily: font.ui, fontSize: 11.5 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 },
  chip: { borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8 },
  chipText: { fontFamily: font.uiMedium, fontSize: 12.5 },
});
