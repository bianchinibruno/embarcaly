import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

import { VersoSheet } from '../VersoSheet';
import { VERSO } from '../../domain/verso';

describe('verso do bilhete', () => {
  it('fica fechado quando nenhum (i) foi tocado', async () => {
    await render(<VersoSheet versoKey={null} onClose={jest.fn()} />);
    expect(screen.queryByText('Verso do bilhete')).not.toBeOnTheScreen();
  });

  it('não abre com uma chave que não existe, em vez de mostrar folha em branco', async () => {
    await render(<VersoSheet versoKey="inexistente" onClose={jest.fn()} />);
    expect(screen.queryByText('Verso do bilhete')).not.toBeOnTheScreen();
  });

  it('mostra título, chamada e corpo do verbete', async () => {
    await render(<VersoSheet versoKey="checkinOpen" onClose={jest.fn()} />);
    expect(screen.getByText('Verso do bilhete')).toBeOnTheScreen();
    expect(screen.getByText(VERSO.checkinOpen.title)).toBeOnTheScreen();
    expect(screen.getByText(VERSO.checkinOpen.headline)).toBeOnTheScreen();
    expect(screen.getByText(VERSO.checkinOpen.body)).toBeOnTheScreen();
  });

  it('mostra a seção extra quando o verbete tem uma', async () => {
    await render(<VersoSheet versoKey="checkinOpen" onClose={jest.fn()} />);
    expect(screen.getByText(VERSO.checkinOpen.extraTitle!)).toBeOnTheScreen();
    expect(screen.getByText(VERSO.checkinOpen.extraBody!)).toBeOnTheScreen();
  });

  it('não inventa seção extra em verbete que não tem', async () => {
    const semExtra = Object.entries(VERSO).find(([, v]) => !v.extraTitle);
    // Se algum dia todo verbete ganhar seção extra, este teste avisa.
    expect(semExtra).toBeDefined();

    await render(<VersoSheet versoKey={semExtra![0]} onClose={jest.fn()} />);
    expect(screen.getByText(semExtra![1].body)).toBeOnTheScreen();
  });

  it('fecha quando a pessoa toca em Fechar', async () => {
    const user = userEvent.setup();
    const aoFechar = jest.fn();
    await render(<VersoSheet versoKey="pnr" onClose={aoFechar} />);

    await user.press(screen.getByText('Fechar'));
    expect(aoFechar).toHaveBeenCalledTimes(1);
  });
});
