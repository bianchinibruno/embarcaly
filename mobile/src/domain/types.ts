/** Tipos do domínio. Um item é qualquer coisa reservada que ocupa um horário. */

export type ItemType = 'air' | 'bed' | 'rail' | 'act' | 'car';

/** Como o bilhete de embarque chega ao viajante. */
export type PassSource =
  /** A companhia emite. Guardamos e exibimos o código original. */
  | 'carrier'
  /** Só abre no aplicativo de quem emite. Guardamos localizador e horário. */
  | 'external'
  /** Não existe bilhete para este item. */
  | 'none';

export type PassState = 'issued' | 'pending' | 'external' | 'none';

export interface Delay {
  /** Horário original de partida, antes do atraso. */
  originalStart: Date;
  minutes: number;
  reason: string;
}

export interface Item {
  id: string;
  type: ItemType;
  title: string;
  subtitle?: string;
  start: Date;
  end?: Date;

  /** Aeroportos, para o par de códigos no bilhete. */
  from?: string;
  to?: string;
  fromCity?: string;
  toCity?: string;

  flight?: string;
  /** Localizador da reserva. Seis caracteres que valem a compra. */
  pnr?: string;
  seat?: string;
  sequence?: string;
  operator?: string;

  /** Marcos do voo. Ver domain/timeline.ts. */
  checkinOpen?: Date;
  arriveBy?: Date;
  checkinClose?: Date;
  boarding?: Date;
  gateClose?: Date;

  gate?: string;
  /** Preenchido quando o portão mudou depois da emissão. */
  gateChangedFrom?: string;
  /** Minutos de caminhada até o novo portão. */
  gateWalkMinutes?: number;

  /** Horário sugerido de saída para chegar a tempo. Cálculo nosso, não do documento. */
  leaveBy?: Date;

  pass: PassSource;
  delay?: Delay;

  /** Campo que a extração não encontrou e precisa do usuário. */
  needs?: string;

  documents?: DocumentRef[];
}

export interface DocumentRef {
  id: string;
  kind: 'pdf' | 'email' | 'image';
  name: string;
  meta?: string;
}

/** Arquivo real anexado a uma reserva: PDF, foto do bilhete, voucher. */
export interface Attachment {
  id: string;
  itemId: string;
  name: string;
  mimeType?: string;
  /** Bytes. Undefined quando a origem não informa. */
  size?: number;
  /** Nativo: caminho no sistema de arquivos. Web: chave no IndexedDB. */
  uri: string;
  createdAt: Date;
}

export interface Trip {
  id: string;
  name: string;
  subtitle: string;
  start: Date;
  end: Date;
  items: Item[];
}

/** Marco dentro de um voo, para a linha do tempo. */
export interface TimelineStep {
  at: Date;
  title: string;
  detail?: string;
  /** Verdadeiro quando o horário é cálculo nosso, não veio do documento. */
  estimated: boolean;
  /** Chave do verbete no verso do bilhete. */
  info?: string;
}
