import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import * as attachments from '../db/attachments';
import type { Attachment } from '../domain/types';
import { font, space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { Button, Divider, Label } from './primitives';
import { useConfirm } from './Confirm';

function humanSize(bytes?: number): string {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/**
 * Anexos de uma reserva.
 *
 * O documento é o que a pessoa precisa ter em mãos no balcão — então ele mora
 * junto da reserva, não numa pasta separada. Tocar abre no visualizador do
 * sistema; remover pede confirmação, como toda ação que não volta.
 */
export function Attachments({ itemId }: { itemId: string }) {
  const t = useTheme();
  const confirm = useConfirm();
  const [list, setList] = useState<Attachment[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setList(await attachments.listByItem(itemId));
  }, [itemId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function add() {
    setError(null);
    setBusy(true);
    try {
      const created = await attachments.pickAndAdd(itemId);
      if (created) await refresh();
    } catch (e) {
      setError('Não foi possível anexar este arquivo. Tente outro.');
    } finally {
      setBusy(false);
    }
  }

  async function open(att: Attachment) {
    setError(null);
    try {
      await attachments.open(att);
    } catch {
      setError('Não foi possível abrir este arquivo.');
    }
  }

  async function askRemove(att: Attachment) {
    const ok = await confirm({
      title: 'Remover este anexo?',
      body: `«${att.name}» será apagado deste aparelho. Se você precisar dele de novo, terá que anexar outra vez.`,
      confirmLabel: 'Remover',
      destructive: true,
    });
    if (!ok) return;
    await attachments.remove(att);
    await refresh();
  }

  return (
    <>
      <Divider>{list.length ? `Anexos · ${list.length}` : 'Anexos'}</Divider>

      {list.length === 0 ? (
        <View style={[styles.empty, { borderColor: t.rule }]}>
          <Text style={[styles.emptyText, { color: t.ink3 }]}>
            Nenhum documento anexado. Guarde aqui o PDF do bilhete, o voucher ou a foto da reserva
            — fica disponível mesmo sem internet.
          </Text>
        </View>
      ) : (
        <View style={{ gap: space.sm }}>
          {list.map((att) => (
            <View
              key={att.id}
              style={[styles.row, { backgroundColor: t.paper, borderColor: t.rule }]}
            >
              <Pressable
                onPress={() => open(att)}
                style={styles.rowMain}
                accessibilityRole="button"
                accessibilityLabel={`Abrir ${att.name}`}
              >
                <Label>{att.mimeType?.includes('pdf') ? 'PDF' : 'Arquivo'}</Label>
                <Text style={[styles.name, { color: t.ink }]} numberOfLines={1}>
                  {att.name}
                </Text>
                <Text style={[styles.meta, { color: t.ink3 }]}>{humanSize(att.size)}</Text>
              </Pressable>

              <Pressable
                onPress={() => askRemove(att)}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel={`Remover ${att.name}`}
              >
                <Text style={[styles.remove, { color: t.stamp }]}>Remover</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}

      {error ? <Text style={[styles.error, { color: t.stamp }]}>{error}</Text> : null}

      <Button
        title={busy ? 'Abrindo seletor…' : 'Anexar documento'}
        variant="ghost"
        onPress={add}
        disabled={busy}
      />
    </>
  );
}

const styles = StyleSheet.create({
  empty: { borderWidth: 1, borderStyle: 'dashed', padding: space.md },
  emptyText: { fontFamily: font.ui, fontSize: 12.5, lineHeight: 18 },
  row: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
  },
  rowMain: { flex: 1 },
  name: { fontFamily: font.uiBold, fontSize: 13.5, marginTop: 3 },
  meta: { fontFamily: font.mono, fontSize: 10.5, marginTop: 2 },
  remove: {
    fontFamily: font.monoBold,
    fontSize: 9.5,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  error: { fontFamily: font.ui, fontSize: 12 },
});
