import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

import { Button, DataRow, Divider, Gap, InfoButton, Label, Stamp } from '../primitives';

describe('Label e Divider', () => {
  it('mostra o texto do rótulo', async () => {
    await render(<Label>Reservas</Label>);
    expect(screen.getByText('Reservas')).toBeOnTheScreen();
  });

  it('usa o rótulo como título do separador', async () => {
    await render(<Divider>Anexos · 2</Divider>);
    expect(screen.getByText('Anexos · 2')).toBeOnTheScreen();
  });
});

describe('DataRow', () => {
  it('mostra rótulo e valor lado a lado', async () => {
    await render(<DataRow k="Assento" v="14A" />);
    expect(screen.getByText('Assento')).toBeOnTheScreen();
    expect(screen.getByText('14A')).toBeOnTheScreen();
  });

  it('não oferece explicação quando não há verbete', async () => {
    await render(<DataRow k="Bagagem" v="1 despachada" />);
    expect(screen.queryByLabelText('Explicação')).not.toBeOnTheScreen();
  });

  it('abre a explicação quando há verbete', async () => {
    const user = userEvent.setup();
    const aoTocar = jest.fn();
    await render(<DataRow k="Localizador" v="QKZ4TP" onInfo={aoTocar} />);

    await user.press(screen.getByLabelText('Explicação'));
    expect(aoTocar).toHaveBeenCalledTimes(1);
  });
});

describe('InfoButton', () => {
  it('se anuncia como explicação para quem usa leitor de tela', async () => {
    await render(<InfoButton onPress={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Explicação' })).toBeOnTheScreen();
  });

  it('continua tocável no destaque de estimativa', async () => {
    const user = userEvent.setup();
    const aoTocar = jest.fn();
    await render(<InfoButton onPress={aoTocar} hot />);

    await user.press(screen.getByLabelText('Explicação'));
    expect(aoTocar).toHaveBeenCalledTimes(1);
  });
});

describe('Stamp e Gap', () => {
  it('carimba o texto recebido', async () => {
    await render(<Stamp>Em viagem</Stamp>);
    expect(screen.getByText('Em viagem')).toBeOnTheScreen();
  });

  it('mostra o intervalo, sem explicação quando não há verbete', async () => {
    await render(<Gap text="2h livres" />);
    expect(screen.getByText('2h livres')).toBeOnTheScreen();
    expect(screen.queryByLabelText('Explicação')).not.toBeOnTheScreen();
  });

  it('explica o intervalo quando há verbete', async () => {
    const user = userEvent.setup();
    const aoTocar = jest.fn();
    await render(<Gap text="1h 35 de conexão" onInfo={aoTocar} />);

    await user.press(screen.getByLabelText('Explicação'));
    expect(aoTocar).toHaveBeenCalledTimes(1);
  });
});

describe('Button', () => {
  it('chama a ação ao ser tocado', async () => {
    const user = userEvent.setup();
    const aoTocar = jest.fn();
    await render(<Button title="Criar minha viagem" onPress={aoTocar} />);

    await user.press(screen.getByRole('button'));
    expect(aoTocar).toHaveBeenCalledTimes(1);
  });

  it('não dispara nada quando está desabilitado', async () => {
    const user = userEvent.setup();
    const aoTocar = jest.fn();
    await render(<Button title="Salvar" onPress={aoTocar} disabled />);

    await user.press(screen.getByRole('button'));
    expect(aoTocar).not.toHaveBeenCalled();
  });

  it('se anuncia como desabilitado, e não só parece', async () => {
    await render(<Button title="Salvar" onPress={jest.fn()} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('aceita ser apenas rótulo, sem ação', async () => {
    await render(<Button title="Somente texto" />);
    expect(screen.getByText('Somente texto')).toBeOnTheScreen();
  });

  it.each(['solid', 'ghost', 'stamp'] as const)('desenha a variante %s', async (variant) => {
    await render(<Button title={`botão ${variant}`} variant={variant} />);
    expect(screen.getByText(`botão ${variant}`)).toBeOnTheScreen();
  });

  it('aceita estilo extra sem perder o texto', async () => {
    await render(<Button title="Com estilo" style={{ marginTop: 8 }} />);
    expect(screen.getByText('Com estilo')).toBeOnTheScreen();
  });
});
