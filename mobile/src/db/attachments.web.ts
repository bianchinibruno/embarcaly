import type { Attachment } from '../domain/types';

/**
 * Anexos — versão web.
 *
 * Os bytes vão para o **IndexedDB**, não para o localStorage: um voucher em
 * PDF passa fácil do limite de ~5 MB que o localStorage impõe ao domínio
 * inteiro, e estourar esse limite derruba também as viagens já salvas.
 *
 * Os metadados ficam no localStorage junto com o resto, para o listar ser
 * síncrono e barato.
 */

const META_KEY = 'embarcaly.attachments';
const DB_NAME = 'embarcaly-files';
const STORE = 'files';

interface Meta {
  id: string;
  itemId: string;
  name: string;
  mimeType?: string;
  size?: number;
  createdAt: number;
}

function readMeta(): Meta[] {
  try {
    return JSON.parse(localStorage.getItem(META_KEY) || '[]') as Meta[];
  } catch {
    return [];
  }
}

function writeMeta(list: Meta[]): void {
  try {
    localStorage.setItem(META_KEY, JSON.stringify(list));
  } catch {
    // Sem espaço: o anexo não é registrado, e o app segue de pé.
  }
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx<T>(mode: IDBTransactionMode, run: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const store = db.transaction(STORE, mode).objectStore(STORE);
        const req = run(store);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      }),
  );
}

const toAttachment = (m: Meta): Attachment => ({
  id: m.id,
  itemId: m.itemId,
  name: m.name,
  mimeType: m.mimeType,
  size: m.size,
  uri: m.id,
  createdAt: new Date(m.createdAt),
});

export async function listByItem(itemId: string): Promise<Attachment[]> {
  return readMeta()
    .filter((m) => m.itemId === itemId)
    .sort((a, b) => a.createdAt - b.createdAt)
    .map(toAttachment);
}

/** Abre o seletor do navegador e guarda o arquivo. Null se cancelar. */
export async function pickAndAdd(itemId: string): Promise<Attachment | null> {
  const file = await pickFile();
  if (!file) return null;

  const id = `att_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  await tx('readwrite', (s) => s.put(file, id));

  const meta: Meta = {
    id,
    itemId,
    name: file.name,
    mimeType: file.type || undefined,
    size: file.size,
    createdAt: Date.now(),
  };
  writeMeta([...readMeta(), meta]);
  return toAttachment(meta);
}

function pickFile(): Promise<File | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf,image/*';
    input.style.display = 'none';
    document.body.appendChild(input);

    // "cancel" não é disparado por todos os navegadores; o foco de volta na
    // janela é o sinal confiável de que o diálogo fechou sem escolha.
    const cleanup = () => {
      window.removeEventListener('focus', onFocus);
      input.remove();
    };
    const onFocus = () => setTimeout(() => { if (!input.files?.length) { cleanup(); resolve(null); } }, 400);

    input.onchange = () => {
      const f = input.files?.[0] ?? null;
      cleanup();
      resolve(f);
    };
    window.addEventListener('focus', onFocus);
    input.click();
  });
}

export async function remove(att: Attachment): Promise<void> {
  await tx('readwrite', (s) => s.delete(att.id));
  writeMeta(readMeta().filter((m) => m.id !== att.id));
}

export async function removeAllForItem(itemId: string): Promise<void> {
  const list = readMeta().filter((m) => m.itemId === itemId);
  for (const m of list) await tx('readwrite', (s) => s.delete(m.id));
  writeMeta(readMeta().filter((m) => m.itemId !== itemId));
}

export async function open(att: Attachment): Promise<void> {
  const blob = await tx<Blob>('readonly', (s) => s.get(att.id));
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
  // Solta a memória depois que a aba nova já leu o conteúdo.
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
