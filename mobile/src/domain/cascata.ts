/**
 * Recálculo da cadeia.
 *
 * Um atraso não quebra um voo, quebra a viagem toda. Este módulo pega o item
 * que atrasou e diz o que aconteceu com cada reserva depois dele: o transfer
 * que não vai mais pegar, o hotel que precisa ser avisado, o passeio de amanhã
 * cedo que virou impossível.
 *
 * Nenhum concorrente do mercado faz isto. É o que se cobra.
 */

import type { Item, ItemType, Trip } from './types';

export type Situacao =
  /** Segue de pé, sem aperto. */
  | 'ok'
  /** Dá, mas com folga menor que a mínima. */
  | 'apertado'
  /** A reserva começa antes de você chegar. */
  | 'perdido'
  /** Continua de pé, mas alguém precisa ser avisado. */
  | 'avisar'
  /** De pé no papel, inviável na prática. */
  | 'inviavel';

export interface Efeito {
  item: Item;
  situacao: Situacao;
  /** Por que ficou assim, em uma frase. */
  motivo: string;
  /** O que fazer. Imperativo, curto. */
  acao: string;
  /** Minutos de folga entre a chegada nova e o início da reserva. */
  folgaMin: number;
}

export interface Cascata {
  /** O item que atrasou. */
  origem: Item;
  atrasoMin: number;
  /** Chegada recalculada do item de origem. */
  chegadaNova: Date;
  efeitos: Efeito[];
  /** Quantos elos exigem ação. */
  quebrados: number;
}

/** Folga mínima aceitável entre chegar e a próxima reserva começar, por tipo. */
const FOLGA_MIN: Record<ItemType, number> = {
  air: 90,
  rail: 45,
  car: 30,
  bed: 0,
  act: 60,
};

/** Depois desta hora, a recepção do hotel precisa ser avisada. */
const HORA_RECEPCAO = 21;

/**
 * Descanso mínimo entre pousar e um passeio da manhã seguinte.
 * Conta do aeroporto, então precisa cobrir traslado, check-in, sono e preparo.
 */
const DESCANSO_MIN = 600;

/** Antes desta hora, o passeio é da manhã e depende de ter dormido. */
const HORA_MANHA = 12;

const MIN = 60000;

const rotuloTipo: Record<ItemType, string> = {
  air: 'voo',
  bed: 'hospedagem',
  rail: 'trem',
  act: 'passeio',
  car: 'carro',
};

/** Fim previsto do item. Sem `end`, assume que termina quando começa. */
function fimDe(item: Item): Date {
  return item.end ?? item.start;
}

function minutosEntre(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / MIN);
}

function avaliarItem(item: Item, chegada: Date): Efeito {
  const folgaMin = minutosEntre(chegada, item.start);
  const minimo = FOLGA_MIN[item.type];
  const tipo = rotuloTipo[item.type];

  // Hospedagem não se perde por horário. Ela precisa ser avisada.
  if (item.type === 'bed') {
    if (chegada.getHours() >= HORA_RECEPCAO || folgaMin < 0) {
      return {
        item,
        situacao: 'avisar',
        motivo: `Chegada prevista para depois das ${HORA_RECEPCAO}h.`,
        acao: 'Avise a recepção da chegada tardia para não perder a reserva.',
        folgaMin,
      };
    }
    return {
      item,
      situacao: 'ok',
      motivo: 'Chegada dentro do horário normal de recepção.',
      acao: 'Nada a fazer.',
      folgaMin,
    };
  }

  if (folgaMin < 0) {
    return {
      item,
      situacao: 'perdido',
      motivo: `Começa ${Math.abs(folgaMin)} min antes de você chegar.`,
      acao: `Remarque ou cancele o ${tipo} agora, antes de virar no-show.`,
      folgaMin,
    };
  }

  // Passeio da manhã depois de uma chegada tardia. A conta é do pouso até a
  // saída: traslado, check-in, sono e preparo cabem em dez horas, não em seis.
  // Atraso grande empurra o pouso para depois da meia-noite, então a regra não
  // pode depender de virada de calendário.
  if (
    item.type === 'act' &&
    item.start.getHours() < HORA_MANHA &&
    folgaMin < DESCANSO_MIN
  ) {
    return {
      item,
      situacao: 'inviavel',
      motivo: `Sai ${Math.floor(folgaMin / 60)}h depois de você chegar.`,
      acao: 'Remarque para o dia seguinte enquanto ainda dá para cancelar.',
      folgaMin,
    };
  }

  if (folgaMin < minimo) {
    return {
      item,
      situacao: 'apertado',
      motivo: `Sobram ${folgaMin} min, abaixo dos ${minimo} min de folga.`,
      acao: `Confirme o ${tipo} e avise que você pode atrasar.`,
      folgaMin,
    };
  }

  return {
    item,
    situacao: 'ok',
    motivo: `Folga de ${folgaMin} min.`,
    acao: 'Nada a fazer.',
    folgaMin,
  };
}

/**
 * Recalcula a viagem inteira a partir de um atraso.
 *
 * @param trip    A viagem.
 * @param itemId  O item que atrasou.
 * @param atrasoMin Minutos de atraso.
 */
export function recalcular(
  trip: Trip,
  itemId: string,
  atrasoMin: number,
): Cascata | undefined {
  const origem = trip.items.find((i) => i.id === itemId);
  if (!origem) return undefined;

  const atraso = Math.max(0, Math.floor(atrasoMin));
  const chegadaNova = new Date(fimDe(origem).getTime() + atraso * MIN);

  const efeitos = trip.items
    .filter((i) => i.id !== origem.id && i.start.getTime() >= origem.start.getTime())
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .map((i) => avaliarItem(i, chegadaNova));

  return {
    origem,
    atrasoMin: atraso,
    chegadaNova,
    efeitos,
    quebrados: efeitos.filter((e) => e.situacao !== 'ok').length,
  };
}

/** Código curto para a coluna de situação da listagem. */
export function codigo(s: Situacao): string {
  return {
    ok: 'OK',
    apertado: 'APERTADO',
    perdido: 'PERDIDO',
    avisar: 'AVISAR',
    inviavel: 'INVIÁVEL',
  }[s];
}

/** Só o que exige ação, na ordem em que precisa ser resolvido. */
export function pendencias(c: Cascata): Efeito[] {
  return c.efeitos.filter((e) => e.situacao !== 'ok');
}
