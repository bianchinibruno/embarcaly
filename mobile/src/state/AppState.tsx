import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { items as itemsRepo, trips as tripsRepo, type ItemInput, type TripInput } from '../db/repo';
import { sampleTrip } from '../domain/sampleTrip';
import type { Item, Trip } from '../domain/types';

type TripSummary = Omit<Trip, 'items'>;

interface AppStateValue {
  ready: boolean;
  trips: TripSummary[];
  activeTrip: TripSummary | null;
  items: Item[];

  selectTrip: (id: string | null) => void;
  createTrip: (input: TripInput) => Promise<string>;
  updateTrip: (id: string, input: TripInput) => Promise<void>;
  deleteTrip: (id: string) => Promise<void>;

  createItem: (input: ItemInput) => Promise<void>;
  updateItem: (id: string, input: ItemInput) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;

  /** Semeia a viagem de exemplo para quem quer ver o app cheio antes de cadastrar a própria. */
  seedSample: () => Promise<void>;

  now: () => Date;
  setSimulatedNow: (d: Date | null) => void;
  tick: number;
}

const Ctx = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [trips, setTrips] = useState<TripSummary[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [offsetMs, setOffsetMs] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const refreshTrips = useCallback(async () => {
    const list = await tripsRepo.list();
    setTrips(list);
    return list;
  }, []);

  const refreshItems = useCallback(async (tripId: string | null) => {
    setItems(tripId ? await itemsRepo.listByTrip(tripId) : []);
  }, []);

  useEffect(() => {
    (async () => {
      const list = await refreshTrips();
      const first = list[0]?.id ?? null;
      setActiveId(first);
      await refreshItems(first);
      setReady(true);
    })();
  }, [refreshTrips, refreshItems]);

  const selectTrip = useCallback(
    (id: string | null) => {
      setActiveId(id);
      void refreshItems(id);
    },
    [refreshItems],
  );

  const createTrip = useCallback(
    async (input: TripInput) => {
      const id = await tripsRepo.create(input);
      await refreshTrips();
      selectTrip(id);
      return id;
    },
    [refreshTrips, selectTrip],
  );

  const updateTrip = useCallback(
    async (id: string, input: TripInput) => {
      await tripsRepo.update(id, input);
      await refreshTrips();
    },
    [refreshTrips],
  );

  const deleteTrip = useCallback(
    async (id: string) => {
      await tripsRepo.remove(id);
      const list = await refreshTrips();
      if (activeId === id) {
        const next = list[0]?.id ?? null;
        setActiveId(next);
        await refreshItems(next);
      }
    },
    [activeId, refreshTrips, refreshItems],
  );

  const createItem = useCallback(
    async (input: ItemInput) => {
      if (!activeId) return;
      await itemsRepo.create(activeId, input);
      await refreshItems(activeId);
    },
    [activeId, refreshItems],
  );

  const updateItem = useCallback(
    async (id: string, input: ItemInput) => {
      if (!activeId) return;
      await itemsRepo.update(id, activeId, input);
      await refreshItems(activeId);
    },
    [activeId, refreshItems],
  );

  const deleteItem = useCallback(
    async (id: string) => {
      await itemsRepo.remove(id);
      await refreshItems(activeId);
    },
    [activeId, refreshItems],
  );

  const seedSample = useCallback(async () => {
    const id = await tripsRepo.create({
      name: sampleTrip.name,
      subtitle: sampleTrip.subtitle,
      start: sampleTrip.start,
      end: sampleTrip.end,
    });
    for (const it of sampleTrip.items) {
      const { id: _drop, ...input } = it;
      await itemsRepo.create(id, input);
    }
    await refreshTrips();
    selectTrip(id);
  }, [refreshTrips, selectTrip]);

  const now = useCallback(() => new Date(Date.now() + offsetMs), [offsetMs]);
  const setSimulatedNow = useCallback((d: Date | null) => {
    setOffsetMs(d ? d.getTime() - Date.now() : 0);
  }, []);

  const activeTrip = useMemo(
    () => trips.find((t) => t.id === activeId) ?? null,
    [trips, activeId],
  );

  const value: AppStateValue = {
    ready,
    trips,
    activeTrip,
    items,
    selectTrip,
    createTrip,
    updateTrip,
    deleteTrip,
    createItem,
    updateItem,
    deleteItem,
    seedSample,
    now,
    setSimulatedNow,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, tick, now]);
}
