import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { font, space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { useApp } from '../state/AppState';
import { Divider } from './primitives';

const d = (iso: string) => new Date(`${iso}:00`);

/**
 * Painel de demonstração — só em desenvolvimento.
 *
 * Este produto depende inteiramente do momento da viagem, então sem poder
 * mover o relógio não há como testar a tela "Agora", os estados do cartão de
 * embarque, nem os cenários de exceção. Nada disso vai para a loja: o bloco
 * inteiro é removido pelo bundler quando __DEV__ é falso.
 */
const PRESETS: { id: string; label: string; at: Date | null }[] = [
  { id: 'real', label: 'Relógio real', at: null },
  { id: 'plan', label: 'Faltam 12 dias', at: d('2026-09-21T10:00') },
  { id: 'vesp', label: 'Noite anterior', at: d('2026-10-02T20:30') },
  { id: 'manha', label: 'Manhã do voo', at: d('2026-10-03T06:15') },
  { id: 'aero', label: 'No aeroporto', at: d('2026-10-03T07:50') },
  { id: 'toq', label: 'Chegando em Tóquio', at: d('2026-10-05T07:42') },
  { id: 'meio', label: 'Meio da viagem', at: d('2026-10-10T12:40') },
];

export function DevClock() {
  const t = useTheme();
  const { setSimulatedNow, now } = useApp();
  const [active, setActive] = useState('plan');

  if (!__DEV__) return null;

  return (
    <View style={{ gap: space.sm, marginTop: space.lg }}>
      <Divider>Demonstração · só em dev</Divider>
      <View style={styles.grid}>
        {PRESETS.map((p) => {
          const on = p.id === active;
          return (
            <Pressable
              key={p.id}
              onPress={() => {
                setActive(p.id);
                setSimulatedNow(p.at);
              }}
              style={[
                styles.chip,
                { borderColor: on ? t.ink : t.rule, backgroundColor: on ? t.ink : 'transparent' },
              ]}
            >
              <Text style={[styles.chipText, { color: on ? t.paper : t.ink2 }]}>{p.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={[styles.clock, { color: t.ink3 }]}>{now().toLocaleString('pt-BR')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { borderWidth: 1, paddingHorizontal: 10, paddingVertical: 6 },
  chipText: { fontFamily: font.uiMedium, fontSize: 11.5 },
  clock: { fontFamily: font.mono, fontSize: 10.5 },
});
