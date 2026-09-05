import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

import { DevClock } from '../DevClock';
import { useApp } from '../../state/AppState';

jest.mock('../../state/AppState', () => ({ useApp: jest.fn() }));

const setSimulatedNow = jest.fn();
const now = jest.fn(() => new Date('2026-09-21T10:00:00'));

beforeEach(() => {
  jest.clearAllMocks();
  (useApp as jest.Mock).mockReturnValue({ setSimulatedNow, now });
});

describe('painel de demonstração', () => {
  it('se anuncia como coisa de desenvolvimento, não de produto', async () => {
    await render(<DevClock />);
    expect(screen.getByText('Demonstração · só em dev')).toBeOnTheScreen();
  });

  it('oferece os momentos que valem testar numa viagem', async () => {
    await render(<DevClock />);
    for (const rotulo of [
      'Relógio real',
      'Faltam 12 dias',
      'Noite anterior',
      'Manhã do voo',
      'No aeroporto',
      'Chegando em Tóquio',
      'Meio da viagem',
    ]) {
      expect(screen.getByText(rotulo)).toBeOnTheScreen();
    }
  });

  it('move o relógio para o momento escolhido', async () => {
    const user = userEvent.setup();
    await render(<DevClock />);

    await user.press(screen.getByText('No aeroporto'));
    expect(setSimulatedNow).toHaveBeenCalledTimes(1);
    const escolhido = setSimulatedNow.mock.calls[0][0] as Date;
    expect(escolhido.getHours()).toBe(7);
    expect(escolhido.getMinutes()).toBe(50);
  });

  it('devolve o relógio real quando pedido', async () => {
    const user = userEvent.setup();
    await render(<DevClock />);

    await user.press(screen.getByText('Relógio real'));
    expect(setSimulatedNow).toHaveBeenCalledWith(null);
  });

  it('mostra o relógio em uso', async () => {
    await render(<DevClock />);
    expect(now).toHaveBeenCalled();
  });

  it('some inteiro fora de desenvolvimento: nada disso vai para a loja', async () => {
    const antes = (globalThis as any).__DEV__;
    // __DEV__ é global do bundler; só o teste escreve nele.
    (globalThis as any).__DEV__ = false;
    try {
      await render(<DevClock />);
      expect(screen.queryByText('Demonstração · só em dev')).not.toBeOnTheScreen();
    } finally {
      (globalThis as any).__DEV__ = antes;
    }
  });
});
