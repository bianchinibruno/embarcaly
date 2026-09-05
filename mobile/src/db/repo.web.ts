import type { Item, Trip } from '../domain/types';

/**
 * Repositório da web.
 *
 * O Metro escolhe este arquivo no lugar de `repo.ts` quando a plataforma é web,
 * pela extensão `.web.ts`. Mesma interface pública — nenhuma tela sabe a
 * diferença.
 *
 * Guarda em `localStorage` em vez de SQLite: no navegador o expo-sqlite depende
 * de WebAssembly e de cabeçalhos de isolamento que só complicam um ambiente
 * cujo propósito é ver o app rodando. O aparelho continua usando SQLite.
 *
 * Datas viram epoch em milissegundos na serialização e voltam a Date na
 * leitura — JSON não tem tipo de data, e deixar string ISO circular pelo
 * domínio seria uma porta aberta para bug de fuso.
 */

const TRIPS_KEY = 'embarcaly.trips';
const ITEMS_KEY = 'embarcaly.items';

type TripSummary = Omit<Trip, 'items'>;
export type TripInput = Omit<Trip, 'id' | 'items'>;
export type ItemInput = Omit<Item, 'id'>;

interface StoredItem extends Omit<ItemInput, 'start' | 'end'> {
  id: string;
  tripId: string;
}

function read<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, value: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Modo privado ou armazenamento cheio: o app segue funcionando em memória
    // até recarregar. Falhar aqui não pode derrubar a tela.
  }
}

const toMs = (d: Date | undefined) => (d ? d.getTime() : undefined);
const toDate = (n: unknown) => (typeof n === 'number' ? new Date(n) : undefined);

function newId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

/** Campos do item que são instantes e precisam de conversão nos dois sentidos. */
const DATE_FIELDS = [
  'start',
  'end',
  'checkinOpen',
  'arriveBy',
  'checkinClose',
  'boarding',
  'gateClose',
  'leaveBy',
] as const;

function serializeItem(id: string, tripId: string, input: ItemInput): Record<string, unknown> {
  const out: Record<string, unknown> = { ...input, id, tripId };
  for (const f of DATE_FIELDS) out[f] = toMs(input[f] as Date | undefined);
  if (input.delay) {
    out.delay = { ...input.delay, originalStart: input.delay.originalStart.getTime() };
  }
  return out;
}

function deserializeItem(raw: Record<string, unknown>): Item {
  const draft: Record<string, unknown> = { ...raw };
  for (const f of DATE_FIELDS) draft[f] = toDate(raw[f]);
  const out = draft as unknown as Item;
  const delay = raw.delay as { originalStart: number; minutes: number; reason: string } | undefined;
  out.delay = delay
    ? { originalStart: new Date(delay.originalStart), minutes: delay.minutes, reason: delay.reason }
    : undefined;
  return out;
}

export const trips = {
  async list(): Promise<TripSummary[]> {
    return read<Record<string, unknown>>(TRIPS_KEY)
      .map((r) => ({
        id: r.id as string,
        name: r.name as string,
        subtitle: (r.subtitle as string) ?? '',
        start: new Date(r.start as number),
        end: new Date(r.end as number),
      }))
      .sort((a, b) => b.start.getTime() - a.start.getTime());
  },

  async get(id: string): Promise<TripSummary | null> {
    return (await trips.list()).find((t) => t.id === id) ?? null;
  },

  async create(input: TripInput): Promise<string> {
    const id = newId('trip');
    const all = read<Record<string, unknown>>(TRIPS_KEY);
    all.push({
      id,
      name: input.name,
      subtitle: input.subtitle,
      start: input.start.getTime(),
      end: input.end.getTime(),
    });
    write(TRIPS_KEY, all);
    return id;
  },

  async update(id: string, input: TripInput): Promise<void> {
    const all = read<Record<string, unknown>>(TRIPS_KEY);
    const i = all.findIndex((t) => t.id === id);
    if (i >= 0) {
      all[i] = {
        id,
        name: input.name,
        subtitle: input.subtitle,
        start: input.start.getTime(),
        end: input.end.getTime(),
      };
      write(TRIPS_KEY, all);
    }
  },

  /** Apaga a viagem e as reservas dela — a cascata que o SQLite faz sozinho. */
  async remove(id: string): Promise<void> {
    write(
      TRIPS_KEY,
      read<Record<string, unknown>>(TRIPS_KEY).filter((t) => t.id !== id),
    );
    write(
      ITEMS_KEY,
      read<StoredItem>(ITEMS_KEY).filter((i) => i.tripId !== id),
    );
  },

  async count(): Promise<number> {
    return read(TRIPS_KEY).length;
  },
};

export const items = {
  async listByTrip(tripId: string): Promise<Item[]> {
    return read<Record<string, unknown>>(ITEMS_KEY)
      .filter((r) => r.tripId === tripId)
      .map(deserializeItem)
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  },

  async get(id: string): Promise<Item | null> {
    const raw = read<Record<string, unknown>>(ITEMS_KEY).find((r) => r.id === id);
    return raw ? deserializeItem(raw) : null;
  },

  async create(tripId: string, input: ItemInput): Promise<string> {
    const id = newId('item');
    const all = read<Record<string, unknown>>(ITEMS_KEY);
    all.push(serializeItem(id, tripId, input));
    write(ITEMS_KEY, all);
    return id;
  },

  async update(id: string, tripId: string, input: ItemInput): Promise<void> {
    const all = read<Record<string, unknown>>(ITEMS_KEY);
    const i = all.findIndex((r) => r.id === id);
    if (i >= 0) {
      all[i] = serializeItem(id, tripId, input);
      write(ITEMS_KEY, all);
    }
  },

  async remove(id: string): Promise<void> {
    write(
      ITEMS_KEY,
      read<Record<string, unknown>>(ITEMS_KEY).filter((r) => r.id !== id),
    );
  },
};
