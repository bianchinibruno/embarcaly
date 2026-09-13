/**
 * Guarda dos textos de proteção.
 *
 * Este arquivo existe para uma coisa só: impedir que alguém, um dia, escreva no
 * produto uma promessa que o produto não pode cumprir. O teste falha antes de
 * o texto chegar no ar.
 */
import {
  AVISO_ATIVIDADE,
  AVISO_CALCULO,
  AVISO_COMPLETO,
  AVISO_CONTEUDO,
  AVISO_CURTO,
  AVISO_DADOS,
  AVISO_RESULTADO,
  PROIBIDAS,
  SUPERFICIES,
} from '../legal';
import { ESCOLHAS, TABELA } from '../direitos';

const TODOS = [
  AVISO_CURTO,
  AVISO_CONTEUDO,
  AVISO_ATIVIDADE,
  AVISO_CALCULO,
  AVISO_RESULTADO,
  AVISO_DADOS,
  AVISO_COMPLETO,
];

describe('cada aviso diz o que precisa dizer', () => {
  it('o curto nega consultoria jurídica', () => {
    expect(AVISO_CURTO).toMatch(/não é consultoria jurídica/i);
  });

  it('o de conteúdo cita a norma e manda conferir a fonte', () => {
    expect(AVISO_CONTEUDO).toMatch(/Resolução ANAC nº 400\/2016/);
    expect(AVISO_CONTEUDO).toMatch(/Código de Defesa do Consumidor/);
    expect(AVISO_CONTEUDO).toMatch(/anac\.gov\.br/);
    expect(AVISO_CONTEUDO).toMatch(/advogado/i);
  });

  it('o de atividade nega ser advocacia e nega ser agência de viagens', () => {
    expect(AVISO_ATIVIDADE).toMatch(/não é escritório de advocacia/i);
    expect(AVISO_ATIVIDADE).toMatch(/não é agência de viagens/i);
    expect(AVISO_ATIVIDADE).toMatch(/não vende passagem/i);
    expect(AVISO_ATIVIDADE).toMatch(/não representa você/i);
  });

  it('o de cálculo avisa que é apoio e manda confirmar na fonte', () => {
    expect(AVISO_CALCULO).toMatch(/não garante/i);
    expect(AVISO_CALCULO).toMatch(/confirme sempre/i);
    expect(AVISO_CALCULO).toMatch(/a decisão é sua/i);
  });

  it('o de resultado nega promessa de dinheiro', () => {
    expect(AVISO_RESULTADO).toMatch(/não promete/i);
    expect(AVISO_RESULTADO).toMatch(/indeniza/i);
  });

  it('o de dados trata de acompanhante e de exclusão', () => {
    expect(AVISO_DADOS).toMatch(/autorização/i);
    expect(AVISO_DADOS).toMatch(/excluídos/i);
  });

  it('o completo reúne os quatro principais', () => {
    for (const parte of [AVISO_ATIVIDADE, AVISO_CONTEUDO, AVISO_CALCULO, AVISO_RESULTADO]) {
      expect(AVISO_COMPLETO).toContain(parte);
    }
  });
});

describe('nenhum aviso promete o que não pode cumprir', () => {
  it.each(PROIBIDAS)('não contém "%s"', (termo) => {
    for (const texto of TODOS) {
      expect(texto.toLowerCase()).not.toContain(termo);
    }
  });
});

describe('o produto inteiro não promete indenização', () => {
  it('nem na tabela de direitos, nem nas escolhas, nem nos avisos', () => {
    const conteudo = [
      ...TABELA.map((d) => `${d.titulo} ${d.detalhe} ${d.peça}`),
      ...ESCOLHAS.map((e) => `${e.titulo} ${e.detalhe} ${e.peça}`),
    ].join(' ');

    for (const termo of PROIBIDAS) {
      expect(conteudo.toLowerCase()).not.toContain(termo);
    }
    // "indenização" só pode aparecer para NEGAR que o produto a promete.
    expect(conteudo).not.toMatch(/indeniza/i);
  });
});

describe('toda superfície tem aviso', () => {
  it('nenhuma superfície ficou sem cobertura', () => {
    for (const [nome, avisos] of Object.entries(SUPERFICIES)) {
      expect(avisos.length).toBeGreaterThan(0);
      for (const a of avisos) {
        expect(typeof a).toBe('string');
        expect(a.length).toBeGreaterThan(30);
      }
      expect(nome.length).toBeGreaterThan(0);
    }
  });

  it('a tela de cálculo avisa que o cálculo não é garantia', () => {
    expect(SUPERFICIES.telaCascata).toContain(AVISO_CALCULO);
  });

  it('a ficha da loja carrega as três negativas', () => {
    expect(SUPERFICIES.fichaLoja).toContain(AVISO_ATIVIDADE);
    expect(SUPERFICIES.fichaLoja).toContain(AVISO_CONTEUDO);
    expect(SUPERFICIES.fichaLoja).toContain(AVISO_CALCULO);
  });
});
