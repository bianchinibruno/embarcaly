/**
 * Auxiliares das telas de atraso e socorro.
 *
 * São funções puras exportadas das telas. O `parseAtraso` é o que decide se o
 * viajante consegue registrar o atraso no aeroporto, com pressa, digitando do
 * jeito que ele leu no painel — então aceita mais de um formato de propósito.
 */
import { fmtMin, vooAtrasado } from '../SocorroScreen';
import { parseAtraso } from '../DelayFormScreen';
import type { Item } from '../../domain/types';

const d = (iso: string) => new Date(iso);

function item(p: Partial<Item> & Pick<Item, 'id' | 'type' | 'title' | 'start'>): Item {
  return { pass: 'none', ...p } as Item;
}

describe('parseAtraso', () => {
  it('entende minutos puros', () => {
    expect(parseAtraso('225')).toBe(225);
    expect(parseAtraso('30')).toBe(30);
  });

  it('entende minutos com sufixo', () => {
    expect(parseAtraso('45min')).toBe(45);
    expect(parseAtraso('45 min')).toBe(45);
    expect(parseAtraso('45m')).toBe(45);
  });

  it('entende o formato do painel do aeroporto', () => {
    expect(parseAtraso('3h45')).toBe(225);
    expect(parseAtraso('3:45')).toBe(225);
    expect(parseAtraso('3 h 45')).toBe(225);
  });

  it('entende hora cheia', () => {
    expect(parseAtraso('3h')).toBe(180);
    expect(parseAtraso('1h')).toBe(60);
  });

  it('entende hora fracionada', () => {
    expect(parseAtraso('1.5h')).toBe(90);
  });

  it('aceita vírgula como separador decimal', () => {
    expect(parseAtraso('1,5h')).toBe(90);
  });

  it('ignora espaço e caixa', () => {
    expect(parseAtraso('  3H45  ')).toBe(225);
  });

  it('recusa minuto inválido', () => {
    expect(parseAtraso('3h75')).toBeUndefined();
  });

  it('recusa texto vazio ou sem sentido', () => {
    expect(parseAtraso('')).toBeUndefined();
    expect(parseAtraso('   ')).toBeUndefined();
    expect(parseAtraso('muito')).toBeUndefined();
    expect(parseAtraso('3h45m20')).toBeUndefined();
  });
});

describe('fmtMin', () => {
  it('mostra minutos abaixo de uma hora', () => {
    expect(fmtMin(45)).toBe('45 min');
    expect(fmtMin(0)).toBe('0 min');
  });

  it('mostra horas e minutos acima de uma hora', () => {
    expect(fmtMin(225)).toBe('3h45');
    expect(fmtMin(60)).toBe('1h00');
    expect(fmtMin(65)).toBe('1h05');
  });
});

describe('vooAtrasado', () => {
  const voo = (id: string, hora: string, minutos?: number) =>
    item({
      id,
      type: 'air',
      title: id,
      start: d(hora),
      ...(minutos
        ? { delay: { originalStart: d(hora), minutes: minutos, reason: '' } }
        : {}),
    });

  it('devolve undefined quando nada atrasou', () => {
    expect(vooAtrasado([voo('a', '2026-09-13T10:00:00')])).toBeUndefined();
  });

  it('devolve undefined numa lista vazia', () => {
    expect(vooAtrasado([])).toBeUndefined();
  });

  it('ignora atraso de zero minuto', () => {
    expect(vooAtrasado([voo('a', '2026-09-13T10:00:00', 0)])).toBeUndefined();
  });

  it('ignora reserva que não é voo', () => {
    const carro = item({
      id: 'c',
      type: 'car',
      title: 'Transfer',
      start: d('2026-09-13T10:00:00'),
      delay: { originalStart: d('2026-09-13T10:00:00'), minutes: 60, reason: '' },
    });
    expect(vooAtrasado([carro])).toBeUndefined();
  });

  it('escolhe o voo atrasado mais recente', () => {
    const lista = [
      voo('cedo', '2026-09-13T08:00:00', 30),
      voo('tarde', '2026-09-13T18:00:00', 90),
      voo('meio', '2026-09-13T12:00:00', 45),
    ];
    expect(vooAtrasado(lista)?.id).toBe('tarde');
  });

  it('não altera a lista original', () => {
    const lista = [
      voo('cedo', '2026-09-13T08:00:00', 30),
      voo('tarde', '2026-09-13T18:00:00', 90),
    ];
    const antes = lista.map((i) => i.id);
    vooAtrasado(lista);
    expect(lista.map((i) => i.id)).toEqual(antes);
  });
});
