import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

import { HeaderBack } from '../HeaderBack';
import { Wordmark } from '../Wordmark';
import { Mark } from '../Mark';

/**
 * A v14 do RNTL só enxerga elementos nativos, então a marca — que é SVG puro,
 * sem texto nem rótulo — é contada na árvore renderizada. Pôr um testID no
 * componente só para o teste seria sujar a produção por conveniência daqui.
 */
function conta(no: unknown, tipo: string): number {
  if (!no || typeof no !== 'object') return 0;
  const n = no as { type?: string; children?: unknown[] };
  const proprio = n.type === tipo ? 1 : 0;
  const filhos = Array.isArray(n.children) ? n.children : [];
  return proprio + filhos.reduce<number>((soma, f) => soma + conta(f, tipo), 0);
}

describe('HeaderBack', () => {
  it('mostra «Voltar» como saída padrão', async () => {
    await render(<HeaderBack onPress={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Voltar' })).toBeOnTheScreen();
  });

  it('aceita outro rótulo de saída', async () => {
    await render(<HeaderBack onPress={jest.fn()} label="Fechar" />);
    expect(screen.getByRole('button', { name: 'Fechar' })).toBeOnTheScreen();
    expect(screen.queryByText('Voltar')).not.toBeOnTheScreen();
  });

  it('sai quando tocado', async () => {
    const user = userEvent.setup();
    const aoSair = jest.fn();
    await render(<HeaderBack onPress={aoSair} />);

    await user.press(screen.getByRole('button'));
    expect(aoSair).toHaveBeenCalledTimes(1);
  });
});

describe('Wordmark', () => {
  /**
   * A assinatura é sempre «embarca» em tinta e «ly» em carimbo. A divisão é a
   * marca — se ela mudar, mudou a identidade, não o layout.
   */
  it('mantém a divisão entre embarca e ly', async () => {
    await render(<Wordmark />);
    // «ly» é nó próprio porque leva a tinta de carimbo: a divisão é a marca.
    expect(screen.getByText(/^embarcaly$/)).toBeOnTheScreen();
    expect(screen.getByText('ly')).toBeOnTheScreen();
  });

  it('desenha a marca ao lado por padrão', async () => {
    await render(<Wordmark />);
    expect(conta(screen.toJSON(), 'RNSVGSvgView')).toBe(1);
  });

  it('sabe aparecer sem a marca, só com a palavra', async () => {
    await render(<Wordmark showMark={false} />);
    expect(screen.getByText(/^embarcaly$/)).toBeOnTheScreen();
    expect(conta(screen.toJSON(), 'RNSVGSvgView')).toBe(0);
  });

  it('aceita outro tamanho sem perder a palavra', async () => {
    await render(<Wordmark size={32} />);
    expect(screen.getByText(/^embarcaly$/)).toBeOnTheScreen();
  });
});

describe('Mark', () => {
  it('desenha as quatro barras do E', async () => {
    // Braço de baixo encurtado faz a marca ser lida como F: quatro barras,
    // sempre. Ver brand/MARCA.md.
    await render(<Mark />);
    expect(conta(screen.toJSON(), 'RNSVGRect')).toBe(4);
  });

  it('aceita a versão invertida, para fundo escuro, sem perder barra', async () => {
    await render(<Mark size={48} inverted />);
    expect(conta(screen.toJSON(), 'RNSVGRect')).toBe(4);
  });
});
