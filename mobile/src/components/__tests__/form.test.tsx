import React from 'react';
import { fireEvent, render, screen, userEvent } from '@testing-library/react-native';

import { ChipsField, TextField } from '../form';

describe('TextField', () => {
  it('mostra rótulo e valor atual', async () => {
    await render(<TextField label="Nome da viagem" value="Japão" onChangeText={jest.fn()} />);
    expect(screen.getByText('Nome da viagem')).toBeOnTheScreen();
    expect(screen.getByDisplayValue('Japão')).toBeOnTheScreen();
  });

  it('entrega o texto novo a quem controla o campo', async () => {
    const aoDigitar = jest.fn();
    await render(<TextField label="Nome" value="" onChangeText={aoDigitar} />);

    await fireEvent.changeText(screen.getByDisplayValue(''), 'Japão');
    expect(aoDigitar).toHaveBeenCalledWith('Japão');
  });

  it('avisa a cada tecla digitada', async () => {
    const user = userEvent.setup();
    const aoDigitar = jest.fn();
    // O campo é controlado e o valor não muda no teste, então cada tecla
    // chega sozinha — é o comportamento do React, não um defeito.
    await render(<TextField label="Nome" value="" onChangeText={aoDigitar} />);

    await user.type(screen.getByDisplayValue(''), 'Japão');
    expect(aoDigitar).toHaveBeenCalledTimes(5);
  });

  it('mostra o texto de erro quando há erro', async () => {
    await render(
      <TextField label="Nome" value="" onChangeText={jest.fn()} error="Dê um nome à viagem." />,
    );
    expect(screen.getByText('Dê um nome à viagem.')).toBeOnTheScreen();
  });

  it('não mostra área de erro quando está tudo certo', async () => {
    await render(<TextField label="Nome" value="Japão" onChangeText={jest.fn()} />);
    expect(screen.queryByText(/Dê um nome/)).not.toBeOnTheScreen();
  });

  it('mostra o texto de apoio quando o campo está vazio', async () => {
    await render(
      <TextField label="Localizador" value="" onChangeText={jest.fn()} placeholder="QKZ4TP" />,
    );
    expect(screen.getByPlaceholderText('QKZ4TP')).toBeOnTheScreen();
  });

  it('aceita a variante monoespaçada, para código de reserva', async () => {
    await render(
      <TextField label="Localizador" value="QKZ4TP" onChangeText={jest.fn()} mono autoCapitalize="characters" />,
    );
    expect(screen.getByDisplayValue('QKZ4TP')).toBeOnTheScreen();
  });

  it('confirma pelo teclado quando há ação de envio', async () => {
    const aoEnviar = jest.fn();
    await render(
      <TextField label="Nome do anexo" value="Voucher" onChangeText={jest.fn()} autoFocus onSubmitEditing={aoEnviar} />,
    );

    const campo = screen.getByDisplayValue('Voucher');
    expect(campo).toHaveProp('returnKeyType', 'done');
    expect(campo).toHaveProp('autoFocus', true);
  });

  it('não promete tecla de envio quando não há ação', async () => {
    await render(<TextField label="Nome" value="Japão" onChangeText={jest.fn()} />);
    expect(screen.getByDisplayValue('Japão')).not.toHaveProp('returnKeyType');
  });
});

describe('ChipsField', () => {
  const opcoes = [
    { value: 'air' as const, label: 'Voo' },
    { value: 'bed' as const, label: 'Hotel' },
    { value: 'rail' as const, label: 'Trem' },
  ];

  it('mostra todas as opções de uma vez, sem menu escondido', async () => {
    await render(<ChipsField label="Tipo" value="air" options={opcoes} onChange={jest.fn()} />);
    expect(screen.getByText('Voo')).toBeOnTheScreen();
    expect(screen.getByText('Hotel')).toBeOnTheScreen();
    expect(screen.getByText('Trem')).toBeOnTheScreen();
  });

  it('anuncia qual está selecionada para quem usa leitor de tela', async () => {
    await render(<ChipsField label="Tipo" value="bed" options={opcoes} onChange={jest.fn()} />);
    const escolhidas = screen.getAllByRole('radio').filter((c) => c.props.accessibilityState?.selected);
    expect(escolhidas).toHaveLength(1);
    expect(escolhidas[0]).toHaveTextContent('Hotel');
  });

  it('avisa a escolha nova a quem controla o campo', async () => {
    const user = userEvent.setup();
    const aoEscolher = jest.fn();
    await render(<ChipsField label="Tipo" value="air" options={opcoes} onChange={aoEscolher} />);

    await user.press(screen.getByText('Trem'));
    expect(aoEscolher).toHaveBeenCalledWith('rail');
  });
});
