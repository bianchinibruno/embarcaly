/**
 * Teste exaustivo do motor de direitos.
 *
 * Este arquivo existe porque informar um direito errado faz a pessoa passar
 * vergonha no balcão. Cobertura aqui não é higiene, é o produto.
 */

import {
  AVISO,
  ESCOLHAS,
  LIMIAR_ESCOLHAS_MIN,
  TABELA,
  avaliar,
  decorridoDesde,
  marco,
  rotulo,
  type Situacao,
} from '../direitos';

const base: Situacao = {
  gatilho: 'atraso',
  decorridoMin: 0,
  trecho: 'domestico',
};

const codigos = (s: Situacao) => avaliar(s).liberados.map((d) => d.codigo);

describe('tabela', () => {
  it('está em ordem crescente de limiar', () => {
    const limiares = TABELA.map((d) => d.aPartirDeMin);
    expect(limiares).toEqual([...limiares].sort((a, b) => a - b));
  });

  it('usa os limiares da Resolução 400: 1h, 2h e 4h', () => {
    expect(TABELA.map((d) => d.aPartirDeMin)).toEqual([0, 60, 120, 240]);
  });

  it('cita a fonte em todo verbete', () => {
    for (const d of TABELA) expect(d.fonte).toMatch(/^Res\. 400, art\. \d+/);
    for (const e of ESCOLHAS) expect(e.fonte).toMatch(/^Res\. 400, art\. \d+/);
  });

  it('dá uma frase pronta para o balcão em todo verbete', () => {
    for (const d of TABELA) expect(d.peça.length).toBeGreaterThan(20);
    for (const e of ESCOLHAS) expect(e.peça.length).toBeGreaterThan(20);
  });
});

describe('limiares de assistência material', () => {
  it('aos 0 min libera só o direito à informação', () => {
    expect(codigos({ ...base, decorridoMin: 0 })).toEqual(['informacao']);
  });

  it('aos 59 min ainda não liberou comunicação', () => {
    expect(codigos({ ...base, decorridoMin: 59 })).toEqual(['informacao']);
  });

  it('aos 60 min libera comunicação', () => {
    expect(codigos({ ...base, decorridoMin: 60 })).toEqual([
      'informacao',
      'comunicacao',
    ]);
  });

  it('aos 119 min ainda não libera alimentação', () => {
    expect(codigos({ ...base, decorridoMin: 119 })).not.toContain('alimentacao');
  });

  it('aos 120 min libera alimentação', () => {
    expect(codigos({ ...base, decorridoMin: 120 })).toContain('alimentacao');
  });

  it('aos 239 min ainda não libera hospedagem', () => {
    expect(codigos({ ...base, decorridoMin: 239 })).not.toContain('hospedagem');
  });

  it('aos 240 min libera hospedagem', () => {
    expect(codigos({ ...base, decorridoMin: 240 })).toEqual([
      'informacao',
      'comunicacao',
      'alimentacao',
      'hospedagem',
    ]);
  });

  it('trata minuto fracionado e negativo sem quebrar', () => {
    expect(codigos({ ...base, decorridoMin: 60.9 })).toContain('comunicacao');
    expect(codigos({ ...base, decorridoMin: -30 })).toEqual(['informacao']);
  });
});

describe('próximo marco', () => {
  it('aponta comunicação faltando 60 min quando o atraso começou', () => {
    const a = avaliar({ ...base, decorridoMin: 0 });
    expect(a.proximo?.direito.codigo).toBe('comunicacao');
    expect(a.proximo?.emMin).toBe(60);
  });

  it('aponta hospedagem faltando 110 min aos 130 min', () => {
    const a = avaliar({ ...base, decorridoMin: 130 });
    expect(a.proximo?.direito.codigo).toBe('hospedagem');
    expect(a.proximo?.emMin).toBe(110);
  });

  it('não aponta nada depois de liberar tudo', () => {
    expect(avaliar({ ...base, decorridoMin: 300 }).proximo).toBeUndefined();
  });
});

describe('as quatro saídas', () => {
  it('não existem antes de 4h de atraso', () => {
    expect(avaliar({ ...base, decorridoMin: 239 }).escolhas).toHaveLength(0);
  });

  it('aparecem exatamente em 4h de atraso', () => {
    expect(avaliar({ ...base, decorridoMin: LIMIAR_ESCOLHAS_MIN }).escolhas).toHaveLength(4);
  });

  it('valem de imediato em cancelamento, sem esperar relógio', () => {
    const a = avaliar({ ...base, gatilho: 'cancelamento', decorridoMin: 0 });
    expect(a.escolhas.map((e) => e.codigo)).toEqual([
      'reacomodacao',
      'reembolso',
      'modalidade',
      'remarcacao',
    ]);
  });

  it('valem de imediato em preterição', () => {
    expect(
      avaliar({ ...base, gatilho: 'preterição', decorridoMin: 0 }).escolhas,
    ).toHaveLength(4);
  });

  it('dizem que a reacomodação pode ser em outra companhia', () => {
    const r = ESCOLHAS.find((e) => e.codigo === 'reacomodacao');
    expect(r?.detalhe).toMatch(/outra companhia/i);
  });

  it('dizem que o reembolso inclui a taxa de embarque', () => {
    const r = ESCOLHAS.find((e) => e.codigo === 'reembolso');
    expect(r?.detalhe).toMatch(/taxa de embarque/i);
  });
});

describe('compensação por preterição', () => {
  it('é 250 DES no trecho doméstico', () => {
    const a = avaliar({ ...base, gatilho: 'preterição', trecho: 'domestico' });
    expect(a.compensacao?.des).toBe(250);
  });

  it('é 500 DES no trecho internacional', () => {
    const a = avaliar({
      ...base,
      gatilho: 'preterição',
      trecho: 'internacional',
    });
    expect(a.compensacao?.des).toBe(500);
  });

  it('não existe em atraso nem em cancelamento', () => {
    expect(avaliar({ ...base, decorridoMin: 600 }).compensacao).toBeUndefined();
    expect(
      avaliar({ ...base, gatilho: 'cancelamento' }).compensacao,
    ).toBeUndefined();
  });

  it('avisa que o valor é mínimo e que DES varia', () => {
    const a = avaliar({ ...base, gatilho: 'preterição' });
    expect(a.compensacao?.detalhe).toMatch(/varia/i);
    expect(a.compensacao?.detalhe).toMatch(/mínimo/i);
  });
});

describe('hospedagem no domicílio', () => {
  it('vira traslado quando a pessoa está na própria cidade', () => {
    const a = avaliar({ ...base, decorridoMin: 240, noDomicilio: true });
    const h = a.liberados.find((d) => d.codigo === 'hospedagem');
    expect(h?.titulo).toBe('Traslado');
    expect(h?.detalhe).toMatch(/sua cidade/i);
  });

  it('continua hospedagem fora do domicílio', () => {
    const a = avaliar({ ...base, decorridoMin: 240, noDomicilio: false });
    const h = a.liberados.find((d) => d.codigo === 'hospedagem');
    expect(h?.titulo).toBe('Hospedagem e traslado');
  });

  it('não altera os outros verbetes', () => {
    const a = avaliar({ ...base, decorridoMin: 240, noDomicilio: true });
    expect(a.liberados.find((d) => d.codigo === 'alimentacao')?.titulo).toBe(
      'Alimentação',
    );
  });

  it('ajusta também o próximo marco ainda não liberado', () => {
    const a = avaliar({ ...base, decorridoMin: 130, noDomicilio: true });
    expect(a.proximo?.direito.titulo).toBe('Traslado');
  });
});

describe('aviso legal', () => {
  it('acompanha toda avaliação', () => {
    expect(avaliar(base).aviso).toBe(AVISO);
  });

  it('diz que não é consultoria jurídica', () => {
    expect(AVISO).toMatch(/não é consultoria jurídica/i);
  });

  it('nunca promete indenização em lugar nenhum da tabela', () => {
    const tudo = [...TABELA, ...ESCOLHAS]
      .map((d) => `${d.titulo} ${d.detalhe} ${d.peça}`)
      .join(' ');
    expect(tudo).not.toMatch(/indeniza/i);
  });
});

describe('rótulo e marco', () => {
  it('mostra LIBERADO quando não falta nada', () => {
    expect(rotulo()).toBe('LIBERADO');
    expect(rotulo(0)).toBe('LIBERADO');
    expect(rotulo(-5)).toBe('LIBERADO');
  });

  it('mostra minutos abaixo de uma hora', () => {
    expect(rotulo(45)).toBe('EM 45MIN');
  });

  it('mostra horas e minutos acima de uma hora', () => {
    expect(rotulo(110)).toBe('EM 1H50');
    expect(rotulo(60)).toBe('EM 1H00');
  });

  it('escreve o marco como a coluna do painel', () => {
    expect(marco(0)).toBe('AGORA');
    expect(marco(60)).toBe('+1h');
    expect(marco(240)).toBe('+4h');
    expect(marco(90)).toBe('+90min');
  });
});

describe('decorridoDesde', () => {
  it('conta os minutos desde a partida original', () => {
    const partida = new Date('2026-09-13T14:20:00');
    const agora = new Date('2026-09-13T18:05:00');
    expect(decorridoDesde(partida, agora)).toBe(225);
  });

  it('nunca devolve negativo antes da partida', () => {
    const partida = new Date('2026-09-13T14:20:00');
    const agora = new Date('2026-09-13T12:00:00');
    expect(decorridoDesde(partida, agora)).toBe(0);
  });
});
