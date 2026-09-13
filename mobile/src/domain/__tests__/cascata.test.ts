import { codigo, pendencias, recalcular } from '../cascata';
import type { Item, Trip } from '../types';

const d = (iso: string) => new Date(iso);

function item(p: Partial<Item> & Pick<Item, 'id' | 'type' | 'title' | 'start'>): Item {
  return { pass: 'none', ...p } as Item;
}

/** A viagem do protótipo: voo, transfer, hotel e passeio no dia seguinte. */
function viagem(): Trip {
  return {
    id: 't1',
    name: 'Lisboa',
    subtitle: 'setembro',
    start: d('2026-09-13T14:20:00'),
    end: d('2026-09-20T10:00:00'),
    items: [
      item({
        id: 'voo',
        type: 'air',
        title: 'GRU → LIS',
        start: d('2026-09-13T14:20:00'),
        end: d('2026-09-13T18:40:00'),
      }),
      item({
        id: 'transfer',
        type: 'car',
        title: 'Transfer aeroporto → hotel',
        start: d('2026-09-13T19:10:00'),
      }),
      item({
        id: 'hotel',
        type: 'bed',
        title: 'Hotel Baixa',
        start: d('2026-09-13T21:00:00'),
      }),
      item({
        id: 'passeio',
        type: 'act',
        title: 'Sintra',
        start: d('2026-09-14T08:00:00'),
      }),
    ],
  };
}

describe('recalcular', () => {
  it('devolve undefined quando o item não existe', () => {
    expect(recalcular(viagem(), 'nao-existe', 60)).toBeUndefined();
  });

  it('sem atraso, nada quebra', () => {
    const c = recalcular(viagem(), 'voo', 0)!;
    expect(c.quebrados).toBe(0);
    expect(c.efeitos.every((e) => e.situacao === 'ok')).toBe(true);
  });

  it('empurra a chegada pelo tamanho do atraso', () => {
    const c = recalcular(viagem(), 'voo', 225)!;
    expect(c.chegadaNova).toEqual(d('2026-09-13T22:25:00'));
    expect(c.atrasoMin).toBe(225);
  });

  it('ignora atraso negativo', () => {
    const c = recalcular(viagem(), 'voo', -90)!;
    expect(c.atrasoMin).toBe(0);
  });

  it('usa o início como fim quando a origem não tem horário de término', () => {
    const t = viagem();
    // O transfer não tem `end`. Atrasado, a chegada é o próprio início + atraso.
    const c = recalcular(t, 'transfer', 120)!;
    expect(c.chegadaNova).toEqual(d('2026-09-13T21:10:00'));
  });

  it('não inclui o próprio item de origem nos efeitos', () => {
    const c = recalcular(viagem(), 'voo', 200)!;
    expect(c.efeitos.map((e) => e.item.id)).not.toContain('voo');
  });

  it('devolve os efeitos em ordem cronológica', () => {
    const c = recalcular(viagem(), 'voo', 200)!;
    expect(c.efeitos.map((e) => e.item.id)).toEqual([
      'transfer',
      'hotel',
      'passeio',
    ]);
  });
});

describe('a cadeia do protótipo, com 3h45 de atraso', () => {
  const c = recalcular(viagem(), 'voo', 225)!;
  const por = (id: string) => c.efeitos.find((e) => e.item.id === id)!;

  it('perde o transfer, que saía antes da chegada nova', () => {
    expect(por('transfer').situacao).toBe('perdido');
    expect(por('transfer').acao).toMatch(/remarque|cancele/i);
  });

  it('manda avisar o hotel, que não se perde por horário', () => {
    expect(por('hotel').situacao).toBe('avisar');
    expect(por('hotel').acao).toMatch(/recepção/i);
  });

  it('marca o passeio de amanhã cedo como inviável', () => {
    expect(por('passeio').situacao).toBe('inviavel');
    expect(por('passeio').motivo).toMatch(/depois de você chegar/i);
  });

  it('conta três elos quebrados', () => {
    expect(c.quebrados).toBe(3);
    expect(pendencias(c)).toHaveLength(3);
  });

  it('dá motivo e ação para todo efeito', () => {
    for (const e of c.efeitos) {
      expect(e.motivo.length).toBeGreaterThan(5);
      expect(e.acao.length).toBeGreaterThan(5);
    }
  });
});

describe('folga mínima por tipo', () => {
  it('marca voo de conexão como apertado abaixo de 90 min', () => {
    const t = viagem();
    t.items.push(
      item({
        id: 'conexao',
        type: 'air',
        title: 'LIS → OPO',
        start: d('2026-09-13T20:00:00'),
      }),
    );
    // chegada nova 19:40, conexão 20:00 → 20 min de folga
    const c = recalcular(t, 'voo', 60)!;
    const e = c.efeitos.find((x) => x.item.id === 'conexao')!;
    expect(e.situacao).toBe('apertado');
    expect(e.folgaMin).toBe(20);
  });

  it('aceita carro com 30 min de folga', () => {
    const t = viagem();
    t.items = [
      t.items[0],
      item({
        id: 'carro',
        type: 'car',
        title: 'Locadora',
        start: d('2026-09-13T19:10:00'),
      }),
    ];
    // sem atraso: chegada 18:40, carro 19:10 → 30 min, exatamente o mínimo
    const c = recalcular(t, 'voo', 0)!;
    expect(c.efeitos[0].situacao).toBe('ok');
  });
});

describe('hotel', () => {
  it('fica ok quando a chegada é antes das 21h', () => {
    const t = viagem();
    t.items = [t.items[0], t.items[2]];
    const c = recalcular(t, 'voo', 0)!;
    expect(c.efeitos[0].situacao).toBe('ok');
  });

  it('pede aviso quando a chegada passa das 21h', () => {
    const t = viagem();
    t.items = [t.items[0], t.items[2]];
    const c = recalcular(t, 'voo', 180)!;
    expect(c.efeitos[0].situacao).toBe('avisar');
  });
});

describe('passeio no dia seguinte', () => {
  it('segue de pé com descanso suficiente', () => {
    const t = viagem();
    t.items = [t.items[0], t.items[3]];
    // chegada 18:40, passeio 08:00 do dia seguinte → 13h20 de descanso
    const c = recalcular(t, 'voo', 0)!;
    expect(c.efeitos[0].situacao).toBe('ok');
  });

  it('vira inviável com menos de 8h entre chegar e sair', () => {
    const t = viagem();
    t.items = [t.items[0], t.items[3]];
    const c = recalcular(t, 'voo', 360)!;
    expect(c.efeitos[0].situacao).toBe('inviavel');
  });
});

describe('codigo', () => {
  it('traduz cada situação para a coluna do painel', () => {
    expect(codigo('ok')).toBe('OK');
    expect(codigo('apertado')).toBe('APERTADO');
    expect(codigo('perdido')).toBe('PERDIDO');
    expect(codigo('avisar')).toBe('AVISAR');
    expect(codigo('inviavel')).toBe('INVIÁVEL');
  });
});
