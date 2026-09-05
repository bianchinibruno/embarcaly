import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LATE_ITEM_IDS, sampleTrip } from '../domain/sampleTrip';
import type { Item, Trip } from '../domain/types';

/**
 * Estado do app.
 *
 * O relógio é injetável de propósito: o produto inteiro depende do momento da
 * viagem, e sem poder mover o tempo não há como testar nem demonstrar. Em
 * produção `offsetMs` fica em zero e `now()` é o relógio do aparelho.
 */
interface AppStateValue {
  trip: Trip;
  /** Itens já extraídos e visíveis no itinerário, em ordem cronológica. */
  items: Item[];
  now: () => Date;
  /** Deslocamento aplicado ao relógio real. Só usado no painel de demonstração. */
  offsetMs: number;
  setSimulatedNow: (d: Date | null) => void;
  /** Simula a leitura dos PDFs restantes. */
  ingestPending: () => void;
  pendingFiles: string[];
  ingesting: boolean;
  ingestProgress: number;
  /** Força re-render a cada segundo para as contagens andarem. */
  tick: number;
}

const Ctx = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [addedIds, setAddedIds] = useState<Set<string>>(
    () => new Set(sampleTrip.items.filter((i) => !LATE_ITEM_IDS.includes(i.id)).map((i) => i.id)),
  );
  const [offsetMs, setOffsetMs] = useState(0);
  const [tick, setTick] = useState(0);
  const [ingesting, setIngesting] = useState(false);
  const [ingestProgress, setIngestProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const now = useCallback(() => new Date(Date.now() + offsetMs), [offsetMs]);

  const setSimulatedNow = useCallback((d: Date | null) => {
    setOffsetMs(d ? d.getTime() - Date.now() : 0);
  }, []);

  const ingestPending = useCallback(() => {
    const missing = LATE_ITEM_IDS.filter((id) => !addedIds.has(id));
    if (!missing.length || ingesting) return;

    setIngesting(true);
    setIngestProgress(0);

    let step = 0;
    const advance = () => {
      const id = missing[step];
      setAddedIds((prev) => new Set(prev).add(id));
      step += 1;
      setIngestProgress(step);
      if (step >= missing.length) {
        setIngesting(false);
        return;
      }
      setTimeout(advance, 560);
    };
    setTimeout(advance, 680);
  }, [addedIds, ingesting]);

  const items = useMemo(
    () =>
      sampleTrip.items
        .filter((i) => addedIds.has(i.id))
        .sort((a, b) => a.start.getTime() - b.start.getTime()),
    [addedIds],
  );

  const pendingFiles = useMemo(
    () => LATE_ITEM_IDS.filter((id) => !addedIds.has(id)),
    [addedIds],
  );

  const value: AppStateValue = {
    trip: sampleTrip,
    items,
    now,
    offsetMs,
    setSimulatedNow,
    ingestPending,
    pendingFiles,
    ingesting,
    ingestProgress,
    tick,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppStateValue {
  const v = useContext(Ctx);
  if (!v) throw new Error('useApp precisa estar dentro de AppStateProvider');
  return v;
}

/** Itens que ainda não terminaram, do mais próximo ao mais distante. */
export function useUpcoming(): Item[] {
  const { items, now, tick } = useApp();
  return useMemo(() => {
    const n = now();
    return items.filter((i) => (i.end ?? i.start) > n);
    // tick entra na dependência para a lista reavaliar a cada segundo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, tick, now]);
}
