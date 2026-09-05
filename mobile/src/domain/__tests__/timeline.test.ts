import { flightTimeline, nextStepIndex } from '../timeline';
import type { Item } from '../types';

const d = (iso: string) => new Date(`${iso}:00`);

/** Voo cru: só o que a pessoa digitou, sem nenhum marco derivado. */
const cru: Item = {
  id: 'f1',
  type: 'air',
  title: 'Voo',
  start: d('2026-10-03T08:40'),
  pass: 'carrier',
};

describe('linha do tempo com informação incompleta', () => {
  it('sobra só a decolagem quando não há nenhum marco', () => {
    const steps = flightTimeline(cru);
    expect(steps).toHaveLength(1);
    expect(steps[0].title).toBe('Decolagem');
    expect(steps[0].estimated).toBe(false);
  });

  it('não inventa detalhe de rota sem origem e destino', () => {
    expect(flightTimeline(cru)[0].detail).toBeUndefined();
  });

  it('não inventa detalhe com apenas um dos lados da rota', () => {
    expect(flightTimeline({ ...cru, from: 'POA' })[0].detail).toBeUndefined();
    expect(flightTimeline({ ...cru, to: 'GRU' })[0].detail).toBeUndefined();
  });

  it('escreve a rota quando tem os dois lados', () => {
    expect(flightTimeline({ ...cru, from: 'POA', to: 'GRU' })[0].detail).toBe('POA → GRU');
  });

  it('não cria pouso quando o fim não é informado', () => {
    expect(flightTimeline(cru).some((s) => s.title.startsWith('Pouso'))).toBe(false);
  });

  it('escreve «destino» no pouso quando não sabe a sigla', () => {
    const steps = flightTimeline({ ...cru, end: d('2026-10-03T10:15') });
    expect(steps[steps.length - 1].title).toBe('Pouso em destino');
  });

  it('nomeia o destino no pouso quando sabe a sigla', () => {
    const steps = flightTimeline({ ...cru, to: 'GRU', end: d('2026-10-03T10:15') });
    expect(steps[steps.length - 1].title).toBe('Pouso em GRU');
  });
});

describe('cada marco entra sozinho', () => {
  const casos: [keyof Item, string, boolean][] = [
    ['checkinOpen', 'Abre o check-in', false],
    ['arriveBy', 'Chegue ao aeroporto', true],
    ['checkinClose', 'Fecha o check-in', true],
    ['boarding', 'Começa o embarque', false],
    ['gateClose', 'Fecha o portão', true],
  ];

  it.each(casos)('inclui %s como «%s»', (campo, titulo, estimado) => {
    const steps = flightTimeline({ ...cru, [campo]: d('2026-10-03T07:00') });
    const passo = steps.find((s) => s.title === titulo);
    expect(passo).toBeDefined();
    // O que é cálculo nosso não pode aparecer com cara de documento.
    expect(passo!.estimated).toBe(estimado);
  });

  it('dá a cada marco uma chave de verbete para o verso', () => {
    const steps = flightTimeline({
      ...cru,
      checkinOpen: d('2026-10-02T08:40'),
      arriveBy: d('2026-10-03T06:40'),
      checkinClose: d('2026-10-03T07:40'),
      boarding: d('2026-10-03T08:05'),
      gateClose: d('2026-10-03T08:25'),
    });
    const comInfo = steps.filter((s) => s.info);
    expect(comInfo).toHaveLength(5);
  });
});

describe('próximo marco', () => {
  const steps = flightTimeline({
    ...cru,
    checkinOpen: d('2026-10-02T08:40'),
    end: d('2026-10-03T10:15'),
  });

  it('aponta o primeiro quando nada aconteceu ainda', () => {
    expect(nextStepIndex(steps, d('2026-10-01T00:00'))).toBe(0);
  });

  it('pula o que já passou', () => {
    expect(nextStepIndex(steps, d('2026-10-03T09:00'))).toBe(steps.length - 1);
  });

  it('devolve -1 quando tudo já passou', () => {
    expect(nextStepIndex(steps, d('2026-10-04T00:00'))).toBe(-1);
  });

  it('devolve -1 para uma linha do tempo vazia', () => {
    expect(nextStepIndex([], d('2026-10-03T09:00'))).toBe(-1);
  });
});
