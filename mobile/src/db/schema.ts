/**
 * Esquema local. SQLite no aparelho, sem servidor.
 *
 * Local-first é decisão de produto, não economia: o app promete funcionar
 * quando o roaming acaba na imigração. Sincronizar na nuvem depois é uma
 * camada acima do repositório, sem tocar em tela nenhuma.
 *
 * Instantes são guardados como epoch em milissegundos — inteiro, sem fuso,
 * sem ambiguidade. A conversão para o horário local acontece só na borda de
 * apresentação.
 */

export const SCHEMA_VERSION = 2;

export const MIGRATIONS: string[] = [
  // v1
  `
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS trips (
    id          TEXT PRIMARY KEY NOT NULL,
    name        TEXT NOT NULL,
    subtitle    TEXT,
    start_at    INTEGER NOT NULL,
    end_at      INTEGER NOT NULL,
    created_at  INTEGER NOT NULL,
    updated_at  INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS items (
    id                 TEXT PRIMARY KEY NOT NULL,
    trip_id            TEXT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    type               TEXT NOT NULL,
    title              TEXT NOT NULL,
    subtitle           TEXT,
    start_at           INTEGER NOT NULL,
    end_at             INTEGER,

    from_code          TEXT,
    to_code            TEXT,
    from_city          TEXT,
    to_city            TEXT,

    flight             TEXT,
    pnr                TEXT,
    seat               TEXT,
    sequence           TEXT,
    operator           TEXT,

    checkin_open_at    INTEGER,
    arrive_by_at       INTEGER,
    checkin_close_at   INTEGER,
    boarding_at        INTEGER,
    gate_close_at      INTEGER,

    gate               TEXT,
    gate_changed_from  TEXT,
    gate_walk_minutes  INTEGER,
    leave_by_at        INTEGER,

    pass               TEXT NOT NULL DEFAULT 'none',
    needs              TEXT,

    delay_original_at  INTEGER,
    delay_minutes      INTEGER,
    delay_reason       TEXT,

    created_at         INTEGER NOT NULL,
    updated_at         INTEGER NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_items_trip_start ON items(trip_id, start_at);
  `,

  // v2 — anexos
  //
  // A linha guarda só o ponteiro; o arquivo em si vive em
  // documentDirectory/attachments. Apagar a reserva remove a linha por
  // cascata, mas o arquivo precisa ser apagado à mão — senão sobra lixo
  // ocupando espaço no aparelho para sempre.
  `
  CREATE TABLE IF NOT EXISTS attachments (
    id          TEXT PRIMARY KEY NOT NULL,
    item_id     TEXT NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    name        TEXT NOT NULL,
    mime_type   TEXT,
    size        INTEGER,
    uri         TEXT NOT NULL,
    created_at  INTEGER NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_attachments_item ON attachments(item_id);
  `,
];
