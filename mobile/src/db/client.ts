import * as SQLite from 'expo-sqlite';
import { MIGRATIONS } from './schema';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

/**
 * Abre o banco e aplica as migrações pendentes.
 *
 * `user_version` do próprio SQLite guarda em que ponto o esquema está — não
 * precisamos de tabela de controle, e a migração é idempotente.
 */
export function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const db = await SQLite.openDatabaseAsync('embarcaly.db');
      await db.execAsync('PRAGMA foreign_keys = ON;');

      const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version;');
      const current = row?.user_version ?? 0;

      for (let v = current; v < MIGRATIONS.length; v++) {
        await db.execAsync(MIGRATIONS[v]);
        await db.execAsync(`PRAGMA user_version = ${v + 1};`);
      }

      return db;
    })();
  }
  return dbPromise;
}

/** Identificador local. Não precisa ser globalmente único enquanto não houver sync. */
export function newId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}
