import { countdown, duration, gapLabel, daysUntil, isImminent } from '../time';
import { deriveFlightMarks, deriveLeaveBy, defaultEnd } from '../derive';
import { passState } from '../passes';
import { flightTimeline, nextStepIndex } from '../timeline';
import type { Item } from '../types';

const d = (iso: string) => new Date(`${iso}:00`);

const voo: Item = {
  id: 'f1',
  type: 'air',
  title: 'POA → GRU',
  start: d('2026-10-03T08:40'),
  end: d('2026-10-03T10:15'),
  from: 'POA',
  to: 'GRU',
  checkinOpen: d('2026-10-01T08:40'),
  arriveBy: d('2026-10-03T06:40'),
  checkinClose: d('2026-10-03T07:40'),
  boarding: d('2026-10-03T08:05'),
  gateClose: d('2026-10-03T08:25'),
  pass: 'carrier',
};

describe('contagem regressiva', () => {
  const agora = d('2026-10-03T06:00');

  it('mostra minutos abaixo de uma hora', () => {
    expect(countdown(d('2026-10-03T06:45'), agora)).toBe('em 45 min');
  });

  it('mostra horas e minutos dentro do dia', () => {
    expect(countdown(d('2026-10-03T08:40'), agora)).toBe('em 2h 40');
  });

  it('mostra dias e horas acima de 24h', () => {
    expect(countdown(d('2026-10-05T09:00'), agora)).toBe('em 2d 03h');
  });

  it('diz "agora" quando o instante já passou', () => {
    expect(countdown(d('2026-10-03T05:00'), agora)).toBe('agora');
  });

  it('marca como iminente só dentro de três horas', () => {
    expect(isImminent(d('2026-10-03T08:00'), agora)).toBe(true);
    expect(isImminent(d('2026-10-03T10:00'), agora)).toBe(false);
    expect(isImminent(d('2026-10-03T05:00'), agora)).toBe(false);
  });

  it('nunca devolve dias negativos', () => {
    expect(daysUntil(d('2026-10-01T00:00'), agora)).toBe(0);
  });
});

describe('duração e intervalos', () => {
  it('formata duração de forma compacta', () => {
    expect(duration(45)).toBe('45 min');
    expect(duration(105)).toBe('1h45');
    expect(duration(720)).toBe('12h00');
  });

  it('nomeia conexão entre dois voos', () => {
    const g = gapLabel(d('2026-10-03T10:15'), d('2026-10-03T22:15'), true);
    expect(g).toBe('12h 00 de conexão');
  });

  it('nomeia tempo livre quando não são dois voos', () => {
    const g = gapLabel(d('2026-10-05T09:23'), d('2026-10-05T15:00'), false);
    expect(g).toBe('5h 37 livres');
  });

  it('esconde intervalo curto demais para virar linha na tela', () => {
    expect(gapLabel(d('2026-10-03T10:00'), d('2026-10-03T10:15'), false)).toBeNull();
  });

  it('esconde intervalo maior que um dia', () => {
    expect(gapLabel(d('2026-10-03T10:00'), d('2026-10-05T10:00'), false)).toBeNull();
  });
});

describe('derivação dos marcos do voo', () => {
  it('transforma um horário de partida em cinco marcos', () => {
    const m = deriveFlightMarks(d('2026-10-03T08:40'));
    expect(m.arriveBy).toEqual(d('2026-10-03T06:40'));
    expect(m.checkinClose).toEqual(d('2026-10-03T07:40'));
    expect(m.boarding).toEqual(d('2026-10-03T08:05'));
    expect(m.gateClose).toEqual(d('2026-10-03T08:25'));
    expect(m.checkinOpen).toEqual(d('2026-10-02T08:40'));
  });

  it('dá mais folga em voo internacional', () => {
    const m = deriveFlightMarks(d('2026-10-03T22:15'), { international: true });
    expect(m.arriveBy).toEqual(d('2026-10-03T19:15'));
    expect(m.checkinClose).toEqual(d('2026-10-03T20:45'));
    expect(m.checkinOpen).toEqual(d('2026-10-01T22:15'));
  });

  it('sugere horário de saída para atividade marcada', () => {
    expect(deriveLeaveBy(d('2026-10-05T19:30'))).toEqual(d('2026-10-05T18:45'));
  });

  it('usa duração padrão por tipo quando o fim não é informado', () => {
    expect(defaultEnd('bed', d('2026-10-05T15:00'))).toEqual(d('2026-10-06T15:00'));
    expect(defaultEnd('air', d('2026-10-05T15:00'))).toEqual(d('2026-10-05T17:00'));
  });
});

describe('estado do cartão de embarque', () => {
  it('fica pendente antes de abrir o check-in', () => {
    expect(passState(voo, d('2026-09-30T10:00'))).toBe('pending');
  });

  it('fica emitido a partir da abertura do check-in', () => {
    expect(passState(voo, d('2026-10-01T08:40'))).toBe('issued');
    expect(passState(voo, d('2026-10-03T07:50'))).toBe('issued');
  });

  it('respeita bilhete que só abre fora do app', () => {
    expect(passState({ ...voo, pass: 'external' }, d('2026-10-03T07:50'))).toBe('external');
  });

  it('não inventa estado para item sem bilhete', () => {
    expect(passState({ ...voo, pass: 'none' }, d('2026-10-03T07:50'))).toBe('none');
  });
});

describe('linha do tempo do voo', () => {
  const steps = flightTimeline(voo);

  it('produz os sete momentos', () => {
    expect(steps).toHaveLength(7);
  });

  it('devolve em ordem cronológica', () => {
    const times = steps.map((s) => s.at.getTime());
    expect([...times].sort((a, b) => a - b)).toEqual(times);
  });

  it('separa fato de estimativa', () => {
    const byTitle = Object.fromEntries(steps.map((s) => [s.title, s.estimated]));
    expect(byTitle['Começa o embarque']).toBe(false);
    expect(byTitle['Decolagem']).toBe(false);
    expect(byTitle['Chegue ao aeroporto']).toBe(true);
    expect(byTitle['Fecha o portão']).toBe(true);
  });

  it('aponta o próximo marco a cumprir', () => {
    const idx = nextStepIndex(steps, d('2026-10-03T07:00'));
    expect(steps[idx].title).toBe('Fecha o check-in');
  });

  it('devolve -1 quando tudo já passou', () => {
    expect(nextStepIndex(steps, d('2026-10-04T00:00'))).toBe(-1);
  });
});
