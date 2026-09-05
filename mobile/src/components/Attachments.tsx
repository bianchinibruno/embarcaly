import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import * as attachments from '../db/attachments';
import type { Attachment } from '../domain/types';
import { cleanAttachmentName, extensionOf } from '../domain/attachmentName';
import { font, space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { Button, Divider, Label } from './primitives';
import { TextField } from './form';
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
 *
 * Renomear é edição na própria linha, sem tirar a pessoa da tela: o nome que a
 * companhia aérea deu ao arquivo («e-ticket_8817263.pdf») não é o nome pelo
 * qual ela vai procurar o documento na fila do check-in.
 */
export function Attachments({ itemId }: { itemId: string }) {
  const t = useTheme();
  const confirm = useConfirm();
  const [list, setList] = useState<Attachment[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setList(await attachments.listByItem(itemId));
  }, [itemId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function add() {
    setError(null);
    setEditingId(null);
    setBusy(true);
    try {
      const { added, failed } = await attachments.pickAndAdd(itemId);
      if (added.length) await refresh();
      // Falha parcial merece nome: sem isso a pessoa conta os itens da lista
      // para descobrir qual dos cinco arquivos ficou de fora.
      if (failed.length === 1) {
        setError(`Não foi possível anexar «${failed[0]}». Tente outro arquivo.`);
      } else if (failed.length > 1) {
        setError(`Não foi possível anexar ${failed.length} arquivos: ${failed.join(', ')}.`);
      }
    } catch {
      setError('Não foi possível anexar. Tente outra vez.');
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

  function startRename(att: Attachment) {
    setError(null);
    setNameError(null);
    setEditingId(att.id);
    setDraft(att.name);
  }

  function cancelRename() {
    setEditingId(null);
    setNameError(null);
  }

  async function saveRename(att: Attachment) {
    const name = cleanAttachmentName(draft, att.name);
    if (!name) {
      setNameError('Dê um nome ao anexo.');
      return;
    }
    // Sem escrita quando nada mudou: renomear para o mesmo nome não é evento.
    if (name !== att.name) {
      try {
        await attachments.rename(att, name);
        await refresh();
      } catch {
        setNameError('Não foi possível renomear. Tente outra vez.');
        return;
      }
    }
    setEditingId(null);
    setNameError(null);
  }

  async function askRemove(att: Attachment) {
    // Limpa o aviso anterior: um erro de anexo que sobrevive à ação seguinte
    // vira acusação solta, apontando para um arquivo que não está mais ali.
    setError(null);
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
            Nenhum documento anexado. Guarde aqui o PDF do bilhete, o voucher ou a foto da
            reserva — dá para escolher vários de uma vez, e ficam disponíveis mesmo sem
            internet.
          </Text>
        </View>
      ) : (
        <View style={{ gap: space.sm }}>
          {list.map((att) => {
            const editando = editingId === att.id;
            const ext = extensionOf(att.name);

            return (
              <View
                key={att.id}
                style={[styles.row, { backgroundColor: t.paper, borderColor: t.rule }]}
              >
                {/* Editar e abrir são estados distintos da mesma linha: o campo
                    substitui o alvo de toque em vez de disputar espaço com ele. */}
                {editando ? (
                  <View style={styles.editBody}>
                    <TextField
                      label="Nome do anexo"
                      value={draft}
                      onChangeText={setDraft}
                      autoFocus
                      onSubmitEditing={() => void saveRename(att)}
                      error={nameError ?? undefined}
                    />
                    {ext ? (
                      <Text style={[styles.hint, { color: t.ink3 }]}>
                        A extensão .{ext} é mantida.
                      </Text>
                    ) : null}
                  </View>
                ) : (
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
                )}

                {/* Fora do Pressable acima: botão dentro de botão é HTML
                    inválido e quebra o toque na web. */}
                <View style={[styles.actions, { borderTopColor: t.hair }]}>
                  {editando ? (
                    <>
                      <Pressable onPress={cancelRename} hitSlop={10} accessibilityRole="button">
                        <Text style={[styles.action, { color: t.ink3 }]}>Cancelar</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => void saveRename(att)}
                        hitSlop={10}
                        accessibilityRole="button"
                      >
                        <Text style={[styles.action, { color: t.stamp }]}>Salvar nome</Text>
                      </Pressable>
                    </>
                  ) : (
                    <>
                      <Pressable
                        onPress={() => startRename(att)}
                        hitSlop={10}
                        accessibilityRole="button"
                        accessibilityLabel={`Renomear ${att.name}`}
                      >
                        <Text style={[styles.action, { color: t.ink2 }]}>Renomear</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => askRemove(att)}
                        hitSlop={10}
                        accessibilityRole="button"
                        accessibilityLabel={`Remover ${att.name}`}
                      >
                        <Text style={[styles.action, { color: t.stamp }]}>Remover</Text>
                      </Pressable>
                    </>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      )}

      {error ? <Text style={[styles.error, { color: t.stamp }]}>{error}</Text> : null}

      <Button
        title={
          busy ? 'Abrindo seletor…' : list.length ? 'Anexar outro documento' : 'Anexar documento'
        }
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
  row: { borderWidth: 1, overflow: 'hidden' },
  rowMain: { paddingHorizontal: 12, paddingVertical: 10 },
  editBody: { paddingHorizontal: 12, paddingTop: 10, paddingBottom: 4 },
  hint: { fontFamily: font.mono, fontSize: 9.5, letterSpacing: 0.8, marginTop: 2 },
  name: { fontFamily: font.uiBold, fontSize: 13.5, marginTop: 3 },
  meta: { fontFamily: font.mono, fontSize: 10.5, marginTop: 2 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: space.lg,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderTopWidth: 1,
  },
  action: {
    fontFamily: font.monoBold,
    fontSize: 9.5,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  error: { fontFamily: font.ui, fontSize: 12 },
});
