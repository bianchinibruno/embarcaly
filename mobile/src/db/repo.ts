import { getDb, newId } from './client';
import type { Item, ItemType, PassSource, Trip } from '../domain/types';

/** Linha crua do banco. Instantes em epoch ms; campos ausentes viram null. */
interface TripRow {
  id: string;
  name: string;
  subtitle: string | null;
  start_at: number;
  end_at: number;
}

interface ItemRow {
  id: string;
  trip_id: string;
  type: string;
  title: string;
  subtitle: string | null;
  start_at: number;
  end_at: number | null;
  from_code: string | null;
  to_code: string | null;
  from_city: string | null;
  to_city: string | null;
  flight: string | null;
  pnr: string | null;
  seat: string | null;
  sequence: string | null;
  operator: string | null;
  checkin_open_at: number | null;
  arrive_by_at: number | null;
  checkin_close_at: number | null;
  boarding_at: number | null;
  gate_close_at: number | null;
  gate: string | null;
  gate_changed_from: string | null;
  gate_walk_minutes: number | null;
  leave_by_at: number | null;
  pass: string;
  needs: string | null;
  delay_original_at: number | null;
  delay_minutes: number | null;
  delay_reason: string | null;
}

const date = (ms: number | null): Date | undefined => (ms == null ? undefined : new Date(ms));
const ms = (d: Date | undefined | null): number | null => (d ? d.getTime() : null);
const str = (s: string | null): string | undefined => s ?? undefined;

function toTrip(r: TripRow): Omit<Trip, 'items'> {
  return {
    id: r.id,
    name: r.name,
    subtitle: r.subtitle ?? '',
    start: new Date(r.start_at),
    end: new Date(r.end_at),
  };
}

function toItem(r: ItemRow): Item {
  return {
    id: r.id,
    type: r.type as ItemType,
    title: r.title,
    subtitle: str(r.subtitle),
    start: new Date(r.start_at),
    end: date(r.end_at),
    from: str(r.from_code),
    to: str(r.to_code),
    fromCity: str(r.from_city),
    toCity: str(r.to_city),
    flight: str(r.flight),
    pnr: str(r.pnr),
    seat: str(r.seat),
    sequence: str(r.sequence),
    operator: str(r.operator),
    checkinOpen: date(r.checkin_open_at),
    arriveBy: date(r.arrive_by_at),
    checkinClose: date(r.checkin_close_at),
    boarding: date(r.boarding_at),
    gateClose: date(r.gate_close_at),
    gate: str(r.gate),
    gateChangedFrom: str(r.gate_changed_from),
    gateWalkMinutes: r.gate_walk_minutes ?? undefined,
    leaveBy: date(r.leave_by_at),
    pass: r.pass as PassSource,
    needs: str(r.needs),
    delay:
      r.delay_minutes != null && r.delay_original_at != null
        ? {
            originalStart: new Date(r.delay_original_at),
            minutes: r.delay_minutes,
            reason: r.delay_reason ?? '',
          }
        : undefined,
  };
}

/* ------------------------------------------------------------------ viagens */

export type TripInput = Omit<Trip, 'id' | 'items'>;

export const trips = {
  async list(): Promise<Omit<Trip, 'items'>[]> {
    const db = await getDb();
    const rows = await db.getAllAsync<TripRow>('SELECT * FROM trips ORDER BY start_at DESC;');
    return rows.map(toTrip);
  },

  async get(id: string): Promise<Omit<Trip, 'items'> | null> {
    const db = await getDb();
    const row = await db.getFirstAsync<TripRow>('SELECT * FROM trips WHERE id = ?;', id);
    return row ? toTrip(row) : null;
  },

  async create(input: TripInput): Promise<string> {
    const db = await getDb();
    const id = newId('trip');
    const now = Date.now();
    await db.runAsync(
      `INSERT INTO trips (id, name, subtitle, start_at, end_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?);`,
      id,
      input.name,
      input.subtitle || null,
      input.start.getTime(),
      input.end.getTime(),
      now,
      now,
    );
    return id;
  },

  async update(id: string, input: TripInput): Promise<void> {
    const db = await getDb();
    await db.runAsync(
      `UPDATE trips SET name = ?, subtitle = ?, start_at = ?, end_at = ?, updated_at = ?
       WHERE id = ?;`,
      input.name,
      input.subtitle || null,
      input.start.getTime(),
      input.end.getTime(),
      Date.now(),
      id,
    );
  },

  /** Apaga a viagem e, por cascata, todas as reservas dela. */
  async remove(id: string): Promise<void> {
    const db = await getDb();
    await db.runAsync('DELETE FROM trips WHERE id = ?;', id);
  },

  async count(): Promise<number> {
    const db = await getDb();
    const row = await db.getFirstAsync<{ n: number }>('SELECT COUNT(*) AS n FROM trips;');
    return row?.n ?? 0;
  },
};

/* ------------------------------------------------------------------ itens */

export type ItemInput = Omit<Item, 'id'>;

export const items = {
  async listByTrip(tripId: string): Promise<Item[]> {
    const db = await getDb();
    const rows = await db.getAllAsync<ItemRow>(
      'SELECT * FROM items WHERE trip_id = ? ORDER BY start_at ASC;',
      tripId,
    );
    return rows.map(toItem);
  },

  async get(id: string): Promise<Item | null> {
    const db = await getDb();
    const row = await db.getFirstAsync<ItemRow>('SELECT * FROM items WHERE id = ?;', id);
    return row ? toItem(row) : null;
  },

  async create(tripId: string, input: ItemInput): Promise<string> {
    const db = await getDb();
    const id = newId('item');
    await write(db, id, tripId, input, true);
    return id;
  },

  async update(id: string, tripId: string, input: ItemInput): Promise<void> {
    const db = await getDb();
    await write(db, id, tripId, input, false);
  },

  async remove(id: string): Promise<void> {
    const db = await getDb();
    await db.runAsync('DELETE FROM items WHERE id = ?;', id);
  },
};

type Db = Awaited<ReturnType<typeof getDb>>;

/** Insert e update compartilham a mesma lista de colunas — uma fonte só de verdade. */
async function write(db: Db, id: string, tripId: string, i: ItemInput, isNew: boolean) {
  const now = Date.now();
  const values = [
    i.type,
    i.title,
    i.subtitle || null,
    i.start.getTime(),
    ms(i.end),
    i.from || null,
    i.to || null,
    i.fromCity || null,
    i.toCity || null,
    i.flight || null,
    i.pnr || null,
    i.seat || null,
    i.sequence || null,
    i.operator || null,
    ms(i.checkinOpen),
    ms(i.arriveBy),
    ms(i.checkinClose),
    ms(i.boarding),
    ms(i.gateClose),
    i.gate || null,
    i.gateChangedFrom || null,
    i.gateWalkMinutes ?? null,
    ms(i.leaveBy),
    i.pass,
    i.needs || null,
    ms(i.delay?.originalStart),
    i.delay?.minutes ?? null,
    i.delay?.reason || null,
  ];

  if (isNew) {
    await db.runAsync(
      `INSERT INTO items (
        id, trip_id, type, title, subtitle, start_at, end_at,
        from_code, to_code, from_city, to_city,
        flight, pnr, seat, sequence, operator,
        checkin_open_at, arrive_by_at, checkin_close_at, boarding_at, gate_close_at,
        gate, gate_changed_from, gate_walk_minutes, leave_by_at,
        pass, needs, delay_original_at, delay_minutes, delay_reason,
        created_at, updated_at
      ) VALUES (?, ?, ${values.map(() => '?').join(', ')}, ?, ?);`,
      id,
      tripId,
      ...values,
      now,
      now,
    );
  } else {
    await db.runAsync(
      `UPDATE items SET
        type = ?, title = ?, subtitle = ?, start_at = ?, end_at = ?,
        from_code = ?, to_code = ?, from_city = ?, to_city = ?,
        flight = ?, pnr = ?, seat = ?, sequence = ?, operator = ?,
        checkin_open_at = ?, arrive_by_at = ?, checkin_close_at = ?, boarding_at = ?, gate_close_at = ?,
        gate = ?, gate_changed_from = ?, gate_walk_minutes = ?, leave_by_at = ?,
        pass = ?, needs = ?, delay_original_at = ?, delay_minutes = ?, delay_reason = ?,
        updated_at = ?
      WHERE id = ?;`,
      ...values,
      now,
      id,
    );
  }
}
