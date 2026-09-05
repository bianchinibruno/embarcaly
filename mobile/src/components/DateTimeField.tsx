import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { font } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { Label } from './primitives';
import { dayMonth, hhmm } from '../domain/time';

export interface DateTimeFieldProps {
  label: string;
  value: Date;
  onChange: (d: Date) => void;
  error?: string;
}

/**
 * Data e hora — versão nativa.
 *
 * No iOS o seletor resolve as duas coisas de uma vez. No Android o sistema
 * separa em dois diálogos, então encadeamos data e depois hora: comportamento
 * nativo de cada plataforma, em vez de um híbrido que não parece nenhuma.
 *
 * A web tem sua própria implementação em DateTimeField.web.tsx, porque
 * `@react-native-community/datetimepicker` não existe no navegador.
 */
export function DateTimeField({ label, value, onChange, error }: DateTimeFieldProps) {
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
          style={[styles.value, { color: t.ink, borderBottomColor: error ? t.stamp : t.rule }]}
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

const styles = StyleSheet.create({
  field: { gap: 4 },
  value: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    fontSize: 15,
    fontFamily: font.monoMedium,
  },
  error: { fontFamily: font.ui, fontSize: 11.5 },
});
