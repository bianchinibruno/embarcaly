import type { Item, PassState } from './types';

/**
 * Estado do cartão de embarque.
 *
 * REGRA DO PRODUTO: o Embarcaly nunca gera código de barras.
 * O código carrega o número de sequência do check-in, atribuído pelo sistema
 * da companhia — só ela emite. Guardamos, exibimos e levamos até a Carteira.
 *
 * Um código inventado não leria no portão, e mataria o produto na primeira
 * viagem real. Por isso "ainda não emitido" é um estado legítimo da interface,
 * com contagem até o check-in abrir, em vez de um espaço em branco.
 */
export function passState(item: Item, now: Date): PassState {
  if (item.pass === 'external') return 'external';
  if (item.pass === 'none') return 'none';
  if (!item.checkinOpen) return 'pending';
  return now >= item.checkinOpen ? 'issued' : 'pending';
}

export function passLabel(state: PassState): string {
  switch (state) {
    case 'issued':
      return 'Emitido pela companhia';
    case 'pending':
      return 'Ainda não emitido';
    case 'external':
      return 'Fora daqui';
    default:
      return '';
  }
}
