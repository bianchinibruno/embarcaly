import type { Item } from './types';

const MIN = 60000;

/**
 * Deriva os marcos de um voo a partir de uma única informação: o horário de
 * partida.
 *
 * É aqui que o produto ganha valor mesmo com cadastro manual. A pessoa digita
 * "08:40" e recebe os sete momentos — abre o check-in, chegue ao aeroporto,
 * fecha o check-in, embarque, fecha o portão, decolagem, pouso.
 *
 * Tudo o que sai daqui é ESTIMATIVA, e a interface marca isso com ponto
 * tracejado. O que vier impresso no documento sobrescreve e vira fato.
 */
export function deriveFlightMarks(
  start: Date,
  opts: { international?: boolean } = {},
): Pick<Item, 'checkinOpen' | 'arriveBy' | 'checkinClose' | 'boarding' | 'gateClose'> {
  const t = start.getTime();
  const antecedencia = opts.international ? 180 : 120;

  return {
    checkinOpen: new Date(t - (opts.international ? 48 : 24) * 60 * MIN),
    arriveBy: new Date(t - antecedencia * MIN),
    checkinClose: new Date(t - (opts.international ? 90 : 60) * MIN),
    boarding: new Date(t - 35 * MIN),
    gateClose: new Date(t - 15 * MIN),
  };
}

/**
 * Sugestão de horário de saída para uma atividade com hora marcada.
 * Padrão de 45 minutos, ajustável quando houver deslocamento conhecido.
 */
export function deriveLeaveBy(start: Date, travelMinutes = 45): Date {
  return new Date(start.getTime() - travelMinutes * MIN);
}

/** Duração padrão por tipo, usada quando o usuário não informa o fim. */
export function defaultEnd(type: Item['type'], start: Date): Date {
  const hours: Record<Item['type'], number> = { air: 2, rail: 2, act: 2, car: 24, bed: 24 };
  return new Date(start.getTime() + hours[type] * 60 * MIN);
}
