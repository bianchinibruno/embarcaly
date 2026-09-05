import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { DateTimeField, TextField } from '../components/form';
import { Button, Divider } from '../components/primitives';
import { space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { useApp } from '../state/AppState';
import type { RootStackParamList } from '../navigation/types';

export function TripFormScreen() {
  const t = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'TripForm'>>();
  const { trips, createTrip, updateTrip, deleteTrip } = useApp();

  const editing = route.params?.id ? trips.find((x) => x.id === route.params!.id) : null;

  const [name, setName] = useState(editing?.name ?? '');
  const [subtitle, setSubtitle] = useState(editing?.subtitle ?? '');
  const [start, setStart] = useState(editing?.start ?? defaultStart());
  const [end, setEnd] = useState(editing?.end ?? defaultEndDate());
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function save() {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = 'Dê um nome para a viagem';
    if (end <= start) next.end = 'A volta precisa ser depois da ida';
    setErrors(next);
    if (Object.keys(next).length) return;

    const input = { name: name.trim(), subtitle: subtitle.trim(), start, end };
    if (editing) await updateTrip(editing.id, input);
    else await createTrip(input);
    nav.goBack();
  }

  function confirmDelete() {
    if (!editing) return;
    Alert.alert(
      'Excluir viagem',
      `"${editing.name}" e todas as reservas dela serão apagadas. Não dá para desfazer.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deleteTrip(editing.id);
            nav.goBack();
          },
        },
      ],
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: t.paper2 }}
      contentContainerStyle={styles.body}
      keyboardShouldPersistTaps="handled"
    >
      <TextField
        label="Nome"
        value={name}
        onChangeText={setName}
        placeholder="Japão"
        error={errors.name}
      />
      <TextField
        label="Roteiro"
        value={subtitle}
        onChangeText={setSubtitle}
        placeholder="Tóquio · Hakone · Kyoto"
      />

      <Divider>Período</Divider>
      <DateTimeField label="Ida" value={start} onChange={setStart} />
      <DateTimeField label="Volta" value={end} onChange={setEnd} error={errors.end} />

      <View style={{ height: space.sm }} />
      <Button title={editing ? 'Salvar alterações' : 'Criar viagem'} onPress={save} />

      {editing ? (
        <>
          <Divider>Zona de risco</Divider>
          <Button title="Excluir viagem" variant="ghost" onPress={confirmDelete} />
        </>
      ) : null}
    </ScrollView>
  );
}

function defaultStart(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  d.setHours(8, 0, 0, 0);
  return d;
}

function defaultEndDate(): Date {
  const d = defaultStart();
  d.setDate(d.getDate() + 7);
  d.setHours(20, 0, 0, 0);
  return d;
}

const styles = StyleSheet.create({
  body: { padding: space.lg, gap: space.lg, paddingBottom: space.xxl * 2 },
});
