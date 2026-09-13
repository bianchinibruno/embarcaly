/**
 * Motor de direitos do passageiro — Resolução ANAC nº 400/2016.
 *
 * Regra do módulo: tabela, não adivinhação. Toda saída cita o artigo que a
 * sustenta, e nada aqui promete indenização. O produto informa o direito para a
 * pessoa cobrar; quem advoga é advogado.
 *
 * Este é o único arquivo do app que merece teste exaustivo. Informar um direito
 * errado faz a pessoa passar vergonha no balcão, e é o que destrói o produto.
 */

export type Gatilho = 'atraso' | 'cancelamento' | 'preterição';
export type Trecho = 'domestico' | 'internacional';

export type CodigoDireito =
  | 'comunicacao'
  | 'alimentacao'
  | 'hospedagem'
  | 'escolhas'
  | 'informacao';

export interface Direito {
  codigo: CodigoDireito;
  /** Minutos decorridos a partir do horário original de partida. */
  aPartirDeMin: number;
  titulo: string;
  detalhe: string;
  /** Frase pronta para a pessoa falar no balcão. */
  peça: string;
  /** Artigo da Resolução 400 que sustenta. */
  fonte: string;
}

export interface Escolha {
  codigo: 'reacomodacao' | 'reembolso' | 'modalidade' | 'remarcacao';
  titulo: string;
  detalhe: string;
  peça: string;
  fonte: string;
}

export interface Compensacao {
  des: number;
  trecho: Trecho;
  detalhe: string;
  fonte: string;
}

export interface Situacao {
  gatilho: Gatilho;
  /** Minutos decorridos desde o horário original de partida. */
  decorridoMin: number;
  trecho: Trecho;
  /** A pessoa está na cidade onde mora. Muda o direito de hospedagem. */
  noDomicilio?: boolean;
}

export interface Avaliacao {
  liberados: Direito[];
  /** O próximo marco a destravar, com quanto falta. Ausente quando acabaram. */
  proximo?: { direito: Direito; emMin: number };
  /** As quatro saídas. Vazio enquanto não houver direito a elas. */
  escolhas: Escolha[];
  compensacao?: Compensacao;
  aviso: string;
}

export const AVISO =
  'Orientação informativa com base na Resolução ANAC nº 400/2016. ' +
  'Não é consultoria jurídica.';

/** Minutos a partir dos quais a pessoa pode escolher entre as quatro saídas. */
export const LIMIAR_ESCOLHAS_MIN = 240;

/**
 * A tabela. Ordem crescente de limiar — o resto do módulo depende disso.
 * Art. 27 da Res. 400: assistência material por tempo de espera.
 */
export const TABELA: readonly Direito[] = [
  {
    codigo: 'informacao',
    aPartirDeMin: 0,
    titulo: 'Informação',
    detalhe:
      'A companhia precisa informar o atraso e atualizar a cada 30 minutos. ' +
      'Silêncio é descumprimento e vira prova a seu favor.',
    peça: 'Qual a nova previsão de partida? Preciso de atualização a cada 30 minutos.',
    fonte: 'Res. 400, art. 20',
  },
  {
    codigo: 'comunicacao',
    aPartirDeMin: 60,
    titulo: 'Comunicação',
    detalhe:
      'Internet e telefone por conta da companhia, para você avisar quem está ' +
      'te esperando.',
    peça:
      'Meu voo está com mais de uma hora de atraso. Quero a assistência material ' +
      'de comunicação prevista na Resolução 400.',
    fonte: 'Res. 400, art. 27, I',
  },
  {
    codigo: 'alimentacao',
    aPartirDeMin: 120,
    titulo: 'Alimentação',
    detalhe:
      'Voucher, refeição ou lanche conforme o horário. Se o atraso pegou o ' +
      'almoço, é almoço.',
    peça: 'Já passou de duas horas. Quero o voucher de alimentação, por favor.',
    fonte: 'Res. 400, art. 27, II',
  },
  {
    codigo: 'hospedagem',
    aPartirDeMin: 240,
    titulo: 'Hospedagem e traslado',
    detalhe:
      'Hotel mais transporte de ida e volta até ele.',
    peça:
      'Passou de quatro horas. Preciso de hospedagem e do transporte até o hotel.',
    fonte: 'Res. 400, art. 27, III',
  },
];

/** Texto da hospedagem quando a pessoa está na cidade onde mora. */
const HOSPEDAGEM_DOMICILIO =
  'Você está na sua cidade, então a companhia pode custear apenas o transporte ' +
  'de ida e volta entre a sua casa e o aeroporto.';

const PEÇA_DOMICILIO =
  'Passou de quatro horas e eu moro aqui. Quero o transporte de ida e volta ' +
  'até a minha casa.';

/** Art. 21 e 22: as quatro saídas, à escolha do passageiro. */
export const ESCOLHAS: readonly Escolha[] = [
  {
    codigo: 'reacomodacao',
    titulo: 'Reacomodação',
    detalhe:
      'Outro voo para o mesmo destino na primeira oportunidade, inclusive em ' +
      'outra companhia, sem pagar diferença.',
    peça:
      'Existe voo de outra companhia para esse destino hoje? Quero ser ' +
      'reacomodado nele.',
    fonte: 'Res. 400, art. 21, I',
  },
  {
    codigo: 'reembolso',
    titulo: 'Reembolso integral',
    detalhe: 'Todo o valor pago de volta, incluindo a taxa de embarque.',
    peça:
      'Entendi a reacomodação. Eu quero o reembolso integral, com a taxa de ' +
      'embarque.',
    fonte: 'Res. 400, art. 21, II',
  },
  {
    codigo: 'modalidade',
    titulo: 'Outra modalidade de transporte',
    detalhe: 'Ônibus, van, o que resolver o trecho. Por conta da companhia.',
    peça: 'Quero a execução do serviço por outra modalidade de transporte.',
    fonte: 'Res. 400, art. 21, III',
  },
  {
    codigo: 'remarcacao',
    titulo: 'Remarcação',
    detalhe: 'Nova data e horário que sirvam para você, sem custo e sem multa.',
    peça: 'Quero remarcar para outra data, sem custo.',
    fonte: 'Res. 400, art. 21',
  },
];

/** Art. 24: compensação por preterição, paga de imediato. */
const COMPENSACAO: Record<Trecho, Compensacao> = {
  domestico: {
    des: 250,
    trecho: 'domestico',
    detalhe:
      'Compensação de 250 DES, paga na hora, além das quatro saídas. ' +
      'DES é moeda de referência do FMI e varia todo dia — confira a cotação. ' +
      'É valor mínimo e não impede cobrar prejuízo maior.',
    fonte: 'Res. 400, art. 24, I',
  },
  internacional: {
    des: 500,
    trecho: 'internacional',
    detalhe:
      'Compensação de 500 DES, paga na hora, além das quatro saídas. ' +
      'DES é moeda de referência do FMI e varia todo dia — confira a cotação. ' +
      'É valor mínimo e não impede cobrar prejuízo maior.',
    fonte: 'Res. 400, art. 24, II',
  },
};

/** Adapta o verbete de hospedagem a quem está na própria cidade. */
function ajustar(d: Direito, noDomicilio: boolean): Direito {
  if (d.codigo !== 'hospedagem' || !noDomicilio) return d;
  return {
    ...d,
    titulo: 'Traslado',
    detalhe: HOSPEDAGEM_DOMICILIO,
    peça: PEÇA_DOMICILIO,
  };
}

/**
 * O que a companhia já deve, o que falta destravar, e as saídas disponíveis.
 *
 * Cancelamento e preterição não esperam relógio: dão direito às quatro saídas
 * de imediato. O atraso só dá a partir de quatro horas.
 */
export function avaliar(s: Situacao): Avaliacao {
  const decorrido = Math.max(0, Math.floor(s.decorridoMin));
  const noDomicilio = s.noDomicilio === true;
  const imediato = s.gatilho === 'cancelamento' || s.gatilho === 'preterição';

  const liberados = TABELA.filter((d) => decorrido >= d.aPartirDeMin).map((d) =>
    ajustar(d, noDomicilio),
  );

  const pendente = TABELA.find((d) => decorrido < d.aPartirDeMin);
  const proximo = pendente
    ? {
        direito: ajustar(pendente, noDomicilio),
        emMin: pendente.aPartirDeMin - decorrido,
      }
    : undefined;

  const temEscolhas = imediato || decorrido >= LIMIAR_ESCOLHAS_MIN;

  return {
    liberados,
    proximo,
    escolhas: temEscolhas ? [...ESCOLHAS] : [],
    compensacao:
      s.gatilho === 'preterição' ? COMPENSACAO[s.trecho] : undefined,
    aviso: AVISO,
  };
}

/** Rótulo curto para a coluna de situação: "LIBERADO" ou "EM 1H50". */
export function rotulo(emMin?: number): string {
  if (emMin === undefined) return 'LIBERADO';
  if (emMin <= 0) return 'LIBERADO';
  const h = Math.floor(emMin / 60);
  const m = emMin % 60;
  if (h === 0) return `EM ${m}MIN`;
  return `EM ${h}H${String(m).padStart(2, '0')}`;
}

/** Marco em forma de coluna: "+1h", "+2h", "+4h". "AGORA" quando é imediato. */
export function marco(aPartirDeMin: number): string {
  if (aPartirDeMin === 0) return 'AGORA';
  const h = aPartirDeMin / 60;
  return Number.isInteger(h) ? `+${h}h` : `+${aPartirDeMin}min`;
}

/** Minutos decorridos desde a partida original, nunca negativo. */
export function decorridoDesde(partidaOriginal: Date, agora: Date): number {
  return Math.max(
    0,
    Math.floor((agora.getTime() - partidaOriginal.getTime()) / 60000),
  );
}
