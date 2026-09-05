import { passLabel, passState } from '../passes';
import type { Item, PassState } from '../types';

const d = (iso: string) => new Date(`${iso}:00`);

const voo: Item = {
  id: 'f1',
  type: 'air',
  title: 'POA → GRU',
  start: d('2026-10-03T08:40'),
  checkinOpen: d('2026-10-02T08:40'),
  pass: 'carrier',
};

describe('estado do cartão de embarque nos limites', () => {
  it('vira emitido no instante exato em que o check-in abre', () => {
    expect(passState(voo, d('2026-10-02T08:39'))).toBe('pending');
    expect(passState(voo, d('2026-10-02T08:40'))).toBe('issued');
  });

  it('reconhece reserva sem bilhete nenhum', () => {
    expect(passState({ ...voo, pass: 'none' }, d('2026-10-03T08:00'))).toBe('none');
  });

  it('não inventa estado para item sem a informação de check-in', () => {
    expect(passState({ ...voo, checkinOpen: undefined }, d('2026-10-03T08:00'))).toBe('pending');
  });
});

describe('rótulo do cartão de embarque', () => {
  it('nomeia cada estado em linguagem de quem nunca viajou', () => {
    expect(passLabel('issued')).toBe('Emitido pela companhia');
    expect(passLabel('pending')).toBe('Ainda não emitido');
    expect(passLabel('external')).toBe('Fora daqui');
  });

  it('fica em branco quando não há bilhete, em vez de escrever algo falso', () => {
    expect(passLabel('none')).toBe('');
  });

  it('nunca devolve undefined, mesmo para estado inesperado', () => {
    // Blindagem: um estado novo no tipo não pode virar «undefined» na tela.
    expect(passLabel('futuro' as PassState)).toBe('');
  });
});
