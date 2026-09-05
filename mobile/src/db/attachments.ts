import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import { Directory, File, Paths } from 'expo-file-system';
import { Linking } from 'react-native';

import { getDb, newId } from './client';
import type { Attachment } from '../domain/types';

/**
 * Anexos — versão nativa.
 *
 * O arquivo é **copiado** para dentro da pasta do app. O URI que o seletor
 * devolve aponta para um cache temporário do sistema, que o iOS e o Android
 * limpam quando querem: guardar só esse caminho daria um anexo que some
 * sozinho depois de uns dias — exatamente no meio da viagem.
 *
 * Na web a implementação é outra, em attachments.web.ts.
 */

const FOLDER = 'attachments';

interface Row {
  id: string;
  item_id: string;
  name: string;
  mime_type: string | null;
  size: number | null;
  uri: string;
  created_at: number;
}

const toAttachment = (r: Row): Attachment => ({
  id: r.id,
  itemId: r.item_id,
  name: r.name,
  mimeType: r.mime_type ?? undefined,
  size: r.size ?? undefined,
  uri: r.uri,
  createdAt: new Date(r.created_at),
});

function folder(): Directory {
  const dir = new Directory(Paths.document, FOLDER);
  if (!dir.exists) dir.create({ intermediates: true });
  return dir;
}

export async function listByItem(itemId: string): Promise<Attachment[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<Row>(
    'SELECT * FROM attachments WHERE item_id = ? ORDER BY created_at ASC;',
    itemId,
  );
  return rows.map(toAttachment);
}

/** Abre o seletor do sistema e guarda o que for escolhido. Null se cancelar. */
export async function pickAndAdd(itemId: string): Promise<Attachment | null> {
  const res = await DocumentPicker.getDocumentAsync({
    type: ['application/pdf', 'image/*'],
    copyToCacheDirectory: true,
    multiple: false,
  });
  if (res.canceled || !res.assets?.length) return null;

  const asset = res.assets[0];
  const id = newId('att');
  const ext = asset.name.includes('.') ? asset.name.split('.').pop() : 'bin';

  const source = new File(asset.uri);
  const target = new File(folder(), `${id}.${ext}`);
  source.copy(target);

  const db = await getDb();
  const now = Date.now();
  await db.runAsync(
    `INSERT INTO attachments (id, item_id, name, mime_type, size, uri, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?);`,
    id,
    itemId,
    asset.name,
    asset.mimeType ?? null,
    asset.size ?? null,
    target.uri,
    now,
  );

  return {
    id,
    itemId,
    name: asset.name,
    mimeType: asset.mimeType,
    size: asset.size,
    uri: target.uri,
    createdAt: new Date(now),
  };
}

export async function remove(att: Attachment): Promise<void> {
  // Arquivo primeiro: se a linha sumisse antes, o arquivo viraria órfão
  // sem ninguém para apagá-lo depois.
  try {
    const f = new File(att.uri);
    if (f.exists) f.delete();
  } catch {
    // Arquivo já não existe: seguimos e limpamos a linha mesmo assim.
  }
  const db = await getDb();
  await db.runAsync('DELETE FROM attachments WHERE id = ?;', att.id);
}

/** Apaga os arquivos de uma reserva antes de a linha cair por cascata. */
export async function removeAllForItem(itemId: string): Promise<void> {
  const list = await listByItem(itemId);
  for (const att of list) {
    try {
      const f = new File(att.uri);
      if (f.exists) f.delete();
    } catch {
      // segue
    }
  }
}

export async function open(att: Attachment): Promise<void> {
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(att.uri, {
      mimeType: att.mimeType,
      dialogTitle: att.name,
      UTI: att.mimeType === 'application/pdf' ? 'com.adobe.pdf' : undefined,
    });
    return;
  }
  await Linking.openURL(att.uri);
}
