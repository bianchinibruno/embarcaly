import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { font, space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { Label } from './primitives';
import { dayMonth, hhmm } from '../domain/time';

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

/**
 * Data e hora.
 *
 * No iOS o seletor faz as duas coisas de uma vez. No Android o sistema separa
 * em dois diálogos, então encadeamos data e depois hora — comportamento nativo
 * de cada plataforma, em vez de um híbrido que não parece nenhum dos dois.
 */
export function DateTimeField({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: Date;
  onChange: (d: Date) => void;
  error?: string;
}) {
  const t = useTheme();
  const [mode, setMode] = useState<null | 'date' | 'time'>(null);

  const handle = (event: DateTimePickerEvent, picked?: Date) => {
    if (event.type === 'dismissed' || !picked) {
      setMode(null);
      return;
    }
    if (Platform.OS === 'ios') {
      onChange(picked);
      setMode(null);
      return;
    }
    if (mode === 'date') {
      const merged = new Date(value);
      merged.setFullYear(picked.getFullYear(), picked.getMonth(), picked.getDate());
      onChange(merged);
      setMode('time');
    } else {
      const merged = new Date(value);
      merged.setHours(picked.getHours(), picked.getMinutes(), 0, 0);
      onChange(merged);
      setMode(null);
    }
  };

  return (
    <View style={styles.field}>
      <Label>{label}</Label>
      <Pressable onPress={() => setMode('date')} accessibilityRole="button">
        <Text
          style={[
            styles.input,
            styles.dateValue,
            { color: t.ink, borderBottomColor: error ? t.stamp : t.rule },
          ]}
        >
          {`${dayMonth(value)} · ${hhmm(value)}`}
        </Text>
      </Pressable>
      {error ? <Text style={[styles.error, { color: t.stamp }]}>{error}</Text> : null}

      {mode ? (
        <DateTimePicker
          value={value}
          mode={Platform.OS === 'ios' ? 'datetime' : mode}
          display="default"
          onChange={handle}
        />
      ) : null}
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
  dateValue: { fontFamily: font.monoMedium },
  error: { fontFamily: font.ui, fontSize: 11.5 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 },
  chip: { borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8 },
  chipText: { fontFamily: font.uiMedium, fontSize: 12.5 },
});
