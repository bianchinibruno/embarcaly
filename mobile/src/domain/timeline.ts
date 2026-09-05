import type { Item, TimelineStep } from './types';

/**
 * Voo não é um horário, são sete.
 *
 * Juntar tudo em "08:40" é o que faz gente perder avião com a passagem paga
 * no bolso. Cada marco vira uma linha própria — e `estimated` separa o que
 * está impresso no documento do que foi cálculo nosso.
 *
 * Misturar as duas coisas seria mentir com aparência de precisão.
 */
export function flightTimeline(item: Item): TimelineStep[] {
  const steps: TimelineStep[] = [];

  if (item.checkinOpen) {
    steps.push({
      at: item.checkinOpen,
      title: 'Abre o check-in',
      detail: 'Escolha de assento',
      estimated: false,
      info: 'checkinOpen',
    });
  }
  if (item.arriveBy) {
    steps.push({
      at: item.arriveBy,
      title: 'Chegue ao aeroporto',
      detail: 'Recomendação nossa',
      estimated: true,
      info: 'arriveBy',
    });
  }
  if (item.checkinClose) {
    steps.push({
      at: item.checkinClose,
      title: 'Fecha o check-in',
      detail: 'Depois disso não dá mais para embarcar',
      estimated: true,
      info: 'checkinClose',
    });
  }
  if (item.boarding) {
    steps.push({
      at: item.boarding,
      title: 'Começa o embarque',
      detail: 'Impresso no seu cartão',
      estimated: false,
      info: 'boarding',
    });
  }
  if (item.gateClose) {
    steps.push({
      at: item.gateClose,
      title: 'Fecha o portão',
      detail: '15 min antes · estimativa',
      estimated: true,
      info: 'gateClose',
    });
  }

  steps.push({
    at: item.start,
    title: 'Decolagem',
    detail: item.from && item.to ? `${item.from} → ${item.to}` : undefined,
    estimated: false,
  });

  if (item.end) {
    steps.push({ at: item.end, title: `Pouso em ${item.to ?? 'destino'}`, estimated: false });
  }

  return steps.sort((a, b) => a.at.getTime() - b.at.getTime());
}

/** Índice do próximo marco ainda não cumprido. -1 quando todos já passaram. */
export function nextStepIndex(steps: TimelineStep[], now: Date): number {
  return steps.findIndex((s) => s.at > now);
}
