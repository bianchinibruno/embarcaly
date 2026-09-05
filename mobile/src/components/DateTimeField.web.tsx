import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { font } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { Label } from './primitives';
import type { DateTimeFieldProps } from './DateTimeField';

const p2 = (n: number) => String(n).padStart(2, '0');

/** Date -> "AAAA-MM-DDTHH:MM", o formato que o input do navegador espera. */
function toLocalInput(d: Date): string {
  return (
    `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}` +
    `T${p2(d.getHours())}:${p2(d.getMinutes())}`
  );
}

/**
 * Data e hora — versão web.
 *
 * O `@react-native-community/datetimepicker` é só nativo, então aqui usamos o
 * seletor do próprio navegador. O Metro escolhe este arquivo sozinho quando a
 * plataforma é web, pela extensão `.web.tsx`.
 */
export function DateTimeField({ label, value, onChange, error }: DateTimeFieldProps) {
  const t = useTheme();

  return (
    <View style={styles.field}>
      <Label>{label}</Label>
      <input
        type="datetime-local"
        aria-label={label}
        value={toLocalInput(value)}
        onChange={(e) => {
          const next = new Date(e.target.value);
          if (!Number.isNaN(next.getTime())) onChange(next);
        }}
        style={{
          border: 'none',
          borderBottom: `1px solid ${error ? t.stamp : t.rule}`,
          background: 'transparent',
          color: t.ink,
          font: `15px ${font.monoMedium}, monospace`,
          padding: '8px 2px',
          width: '100%',
          outline: 'none',
        }}
      />
      {error ? <Text style={[styles.error, { color: t.stamp }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 4 },
  error: { fontFamily: font.ui, fontSize: 11.5 },
});
