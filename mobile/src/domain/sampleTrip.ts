import type { Trip } from './types';

const d = (iso: string) => new Date(`${iso}:00`);

/**
 * Viagem de demonstração.
 *
 * Substituir por dados reais quando existir back-end. A forma dos objetos
 * é a mesma que o extrator de PDF deve produzir — este arquivo serve como
 * contrato de exemplo.
 */
export const sampleTrip: Trip = {
  id: 'jp-2026-10',
  name: 'Japão',
  subtitle: 'Tóquio · Hakone · Kyoto',
  start: d('2026-10-03T08:40'),
  end: d('2026-10-22T18:00'),
  items: [
    {
      id: 'f1',
      type: 'air',
      title: 'POA → GRU',
      from: 'POA',
      to: 'GRU',
      fromCity: 'Porto Alegre',
      toCity: 'Guarulhos',
      start: d('2026-10-03T08:40'),
      end: d('2026-10-03T10:15'),
      flight: 'LA 8172',
      pnr: 'QKZ4TP',
      seat: '14A',
      sequence: '041',
      checkinOpen: d('2026-10-01T08:40'),
      arriveBy: d('2026-10-03T06:40'),
      checkinClose: d('2026-10-03T07:40'),
      boarding: d('2026-10-03T08:05'),
      gateClose: d('2026-10-03T08:25'),
      pass: 'carrier',
      documents: [
        { id: 'd1', kind: 'pdf', name: 'Bilhete eletrônico', meta: '184 KB' },
        { id: 'd2', kind: 'email', name: 'Confirmação original', meta: '03 set' },
      ],
    },
    {
      id: 'f2',
      type: 'air',
      title: 'GRU → HND',
      from: 'GRU',
      to: 'HND',
      fromCity: 'São Paulo',
      toCity: 'Tóquio',
      start: d('2026-10-03T22:15'),
      end: d('2026-10-05T06:20'),
      flight: 'JL 8085',
      pnr: 'QKZ4TP',
      seat: '32K',
      sequence: '038',
      checkinOpen: d('2026-10-01T22:15'),
      arriveBy: d('2026-10-03T19:15'),
      checkinClose: d('2026-10-03T21:15'),
      boarding: d('2026-10-03T21:35'),
      gateClose: d('2026-10-03T22:00'),
      pass: 'carrier',
    },
    {
      id: 'r1',
      type: 'rail',
      title: 'Narita Express → Shinjuku',
      start: d('2026-10-05T08:05'),
      end: d('2026-10-05T09:23'),
      seat: '7-12A',
      pnr: 'NEX-4471',
      operator: 'JR East',
      pass: 'external',
    },
    {
      id: 'h1',
      type: 'bed',
      title: 'Shinjuku Granbell',
      subtitle: '5 noites · Tóquio',
      start: d('2026-10-05T15:00'),
      end: d('2026-10-10T11:00'),
      pnr: 'SG-88214',
      pass: 'none',
    },
    {
      id: 'a1',
      type: 'act',
      title: 'teamLab Borderless',
      subtitle: 'Entrada com horário marcado',
      start: d('2026-10-05T19:30'),
      end: d('2026-10-05T21:30'),
      pnr: 'TL-2291',
      leaveBy: d('2026-10-05T18:45'),
      pass: 'none',
    },
    {
      id: 'r2',
      type: 'rail',
      title: 'Shinkansen Tóquio → Kyoto',
      start: d('2026-10-10T13:20'),
      end: d('2026-10-10T15:38'),
      seat: '9-4C',
      pnr: 'SK-1180',
      operator: 'JR Central',
      pass: 'external',
    },
    {
      id: 'h2',
      type: 'bed',
      title: 'Ryokan Hakone',
      subtitle: '3 noites',
      start: d('2026-10-10T16:00'),
      end: d('2026-10-13T10:00'),
      pnr: 'RH-4402',
      pass: 'none',
    },
    {
      id: 'c1',
      type: 'car',
      title: 'Toyota Corolla · Hakone',
      subtitle: 'Retirada na estação',
      start: d('2026-10-11T09:00'),
      end: d('2026-10-13T09:00'),
      pnr: 'TY-9083',
      pass: 'none',
      needs: 'Horário de retirada não encontrado no voucher',
    },
  ],
};

/** Itens que chegam pelo fluxo de envio de PDF, para demonstrar a extração. */
export const LATE_ITEM_IDS = ['r2', 'h2', 'c1'];

export const QUEUE_FILES = [
  'shinkansen-kyoto.pdf',
  'ryokan-hakone-voucher.pdf',
  'toyota-hakone-locacao.pdf',
];
