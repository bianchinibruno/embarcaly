import { sampleTrip } from '../sampleTrip';
import { flightTimeline } from '../timeline';

/**
 * A viagem de exemplo não é enfeite: é o que a pessoa vê ao tocar «Ver com
 * dados de exemplo», e é o contrato de forma que o extrator de PDF deve
 * produzir. Dado de exemplo inconsistente vira bug de produção no dia em que
 * alguém copiar a forma dele.
 */
describe('viagem de exemplo', () => {
  it('tem itens', () => {
    expect(sampleTrip.items.length).toBeGreaterThan(0);
  });

  it('não repete identificador entre as reservas', () => {
    const ids = sampleTrip.items.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('nunca termina uma reserva antes de ela começar', () => {
    for (const item of sampleTrip.items) {
      if (!item.end) continue;
      expect(item.end.getTime()).toBeGreaterThanOrEqual(item.start.getTime());
    }
  });

  it('mantém todas as reservas dentro do período da viagem', () => {
    for (const item of sampleTrip.items) {
      expect(item.start.getTime()).toBeGreaterThanOrEqual(sampleTrip.start.getTime());
      expect((item.end ?? item.start).getTime()).toBeLessThanOrEqual(sampleTrip.end.getTime());
    }
  });

  it('dá origem e destino a todo voo', () => {
    for (const item of sampleTrip.items.filter((i) => i.type === 'air')) {
      expect(item.from).toBeTruthy();
      expect(item.to).toBeTruthy();
    }
  });

  it('produz uma linha do tempo em ordem para cada voo', () => {
    for (const item of sampleTrip.items.filter((i) => i.type === 'air')) {
      const steps = flightTimeline(item);
      const tempos = steps.map((s) => s.at.getTime());
      expect([...tempos].sort((a, b) => a - b)).toEqual(tempos);
    }
  });

  it('guarda o horário original quando registra atraso', () => {
    for (const item of sampleTrip.items) {
      if (!item.delay) continue;
      expect(item.delay.minutes).toBeGreaterThan(0);
      expect(item.start.getTime()).toBeGreaterThan(item.delay.originalStart.getTime());
    }
  });
});
