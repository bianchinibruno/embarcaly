/** Formatação de tempo e contagem regressiva. Sem dependência externa. */

const p2 = (n: number) => String(n).padStart(2, '0');

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const DAYS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

export const hhmm = (d: Date) => `${p2(d.getHours())}:${p2(d.getMinutes())}`;
export const dayMonth = (d: Date) => `${p2(d.getDate())} ${MONTHS[d.getMonth()].toUpperCase()}`;
export const weekday = (d: Date) => DAYS[d.getDay()];
export const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

/**
 * Contagem até um instante, na forma que a pessoa lê de relance.
 * Abaixo de uma hora vira minutos; a partir de um dia, dias e horas.
 */
export function countdown(target: Date, now: Date): string {
  const ms = target.getTime() - now.getTime();
  if (ms <= 0) return 'agora';
  const min = Math.floor(ms / 60000);
  if (min < 60) return `em ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `em ${h}h ${p2(min % 60)}`;
  return `em ${Math.floor(h / 24)}d ${p2(h % 24)}h`;
}

/** Duração compacta: 105 vira "1h45". */
export function duration(minutes: number): string {
  return minutes >= 60 ? `${Math.floor(minutes / 60)}h${p2(minutes % 60)}` : `${minutes} min`;
}

/** Dias inteiros até a data, nunca negativo. */
export function daysUntil(target: Date, now: Date): number {
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86400000));
}

/** Verdadeiro quando falta menos de três horas — a faixa em que a contagem vira tinta de carimbo. */
export function isImminent(target: Date, now: Date): boolean {
  const ms = target.getTime() - now.getTime();
  return ms > 0 && ms < 3 * 3600000;
}

/**
 * Intervalo entre o fim de um item e o começo do próximo.
 * Devolve null quando é curto demais para merecer uma linha na tela.
 */
export function gapLabel(prevEnd: Date, nextStart: Date, bothFlights: boolean): string | null {
  const min = Math.round((nextStart.getTime() - prevEnd.getTime()) / 60000);
  if (min < 25) return null;
  const h = Math.floor(min / 60);
  if (h >= 24) return null;
  const text = h > 0 ? `${h}h ${p2(min % 60)}` : `${min} min`;
  return bothFlights ? `${text} de conexão` : `${text} livres`;
}
