import React from 'react';
import { Platform } from 'react-native';
import { render, screen, userEvent, waitFor } from '@testing-library/react-native';

import { DateTimeField } from '../DateTimeField';

/**
 * O seletor nativo é substituído por dois botões: um que devolve a data
 * guardada em `escolhido`, outro que desiste. Assim dá para exercitar o
 * encadeamento data → hora do Android sem abrir diálogo de sistema nenhum.
 */
let escolhido: Date = new Date('2026-10-09T13:20:00');

jest.mock('@react-native-community/datetimepicker', () => {
  const React2 = require('react');
  const { Pressable, Text } = require('react-native');
  return {
    __esModule: true,
    default: ({ onChange, mode }: { onChange: Function; mode: string }) =>
      React2.createElement(
        React2.Fragment,
        null,
        React2.createElement(
          Pressable,
          {
            accessibilityRole: 'button',
            accessibilityLabel: `confirmar ${mode}`,
                    onPress: () => onChange({ type: 'set' }, (globalThis as any).__escolhido),
          },
          React2.createElement(Text, null, `confirmar ${mode}`),
        ),
        React2.createElement(
          Pressable,
          {
            accessibilityRole: 'button',
            accessibilityLabel: 'desistir',
            onPress: () => onChange({ type: 'dismissed' }, undefined),
          },
          React2.createElement(Text, null, 'desistir'),
        ),
      ),
  };
});

const valor = new Date('2026-10-05T15:00:00');

beforeEach(() => {
  escolhido = new Date('2026-10-09T13:20:00');
  (globalThis as any).__escolhido = escolhido;
});

describe('campo de data e hora', () => {
  it('mostra rótulo, data e hora atuais', async () => {
    await render(<DateTimeField label="Início" value={valor} onChange={jest.fn()} />);
    expect(screen.getByText('Início')).toBeOnTheScreen();
    expect(screen.getByText('05 OUT · 15:00')).toBeOnTheScreen();
  });

  it('mostra o erro quando há erro', async () => {
    await render(
      <DateTimeField label="Início" value={valor} onChange={jest.fn()} error="Data inválida." />,
    );
    expect(screen.getByText('Data inválida.')).toBeOnTheScreen();
  });

  it('não abre seletor nenhum antes de ser tocado', async () => {
    await render(<DateTimeField label="Início" value={valor} onChange={jest.fn()} />);
    expect(screen.queryByLabelText(/confirmar/)).not.toBeOnTheScreen();
  });

  it('abre o seletor ao tocar no valor', async () => {
    const user = userEvent.setup();
    await render(<DateTimeField label="Início" value={valor} onChange={jest.fn()} />);

    await user.press(screen.getByText('05 OUT · 15:00'));
    expect(await screen.findByLabelText(/confirmar/)).toBeOnTheScreen();
  });

  it('fecha sem mudar nada quando a pessoa desiste', async () => {
    const user = userEvent.setup();
    const aoMudar = jest.fn();
    await render(<DateTimeField label="Início" value={valor} onChange={aoMudar} />);

    await user.press(screen.getByText('05 OUT · 15:00'));
    await user.press(await screen.findByLabelText('desistir'));

    expect(aoMudar).not.toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByLabelText(/confirmar/)).not.toBeOnTheScreen());
  });
});

describe('no iOS, data e hora de uma vez só', () => {
  it('resolve tudo num diálogo e fecha', async () => {
    const user = userEvent.setup();
    const aoMudar = jest.fn();
    await render(<DateTimeField label="Início" value={valor} onChange={aoMudar} />);

    await user.press(screen.getByText('05 OUT · 15:00'));
    expect(await screen.findByLabelText('confirmar datetime')).toBeOnTheScreen();

    await user.press(screen.getByLabelText('confirmar datetime'));
    expect(aoMudar).toHaveBeenCalledWith(escolhido);
    await waitFor(() => expect(screen.queryByLabelText(/confirmar/)).not.toBeOnTheScreen());
  });
});

describe('no Android, um diálogo para data e outro para hora', () => {
  const original = Platform.OS;

  beforeEach(() => {
    Object.defineProperty(Platform, 'OS', { get: () => 'android', configurable: true });
  });

  afterEach(() => {
    Object.defineProperty(Platform, 'OS', { get: () => original, configurable: true });
  });

  it('encadeia data e depois hora, preservando o outro lado de cada uma', async () => {
    const user = userEvent.setup();
    const aoMudar = jest.fn();
    await render(<DateTimeField label="Início" value={valor} onChange={aoMudar} />);

    await user.press(screen.getByText('05 OUT · 15:00'));
    await user.press(await screen.findByLabelText('confirmar date'));

    // Trocou o dia, manteve a hora original.
    const apósData = aoMudar.mock.calls[0][0] as Date;
    expect(apósData.getDate()).toBe(9);
    expect(apósData.getHours()).toBe(15);

    // E o seletor seguiu para a hora, sem fechar.
    expect(await screen.findByLabelText('confirmar time')).toBeOnTheScreen();

    await user.press(screen.getByLabelText('confirmar time'));
    const apósHora = aoMudar.mock.calls[1][0] as Date;
    expect(apósHora.getHours()).toBe(13);
    expect(apósHora.getMinutes()).toBe(20);
    // Fecha só depois da segunda etapa.
    await waitFor(() => expect(screen.queryByLabelText(/confirmar/)).not.toBeOnTheScreen());
  });

  it('desistir da primeira etapa não abre a segunda', async () => {
    const user = userEvent.setup();
    const aoMudar = jest.fn();
    await render(<DateTimeField label="Início" value={valor} onChange={aoMudar} />);

    await user.press(screen.getByText('05 OUT · 15:00'));
    await user.press(await screen.findByLabelText('desistir'));

    expect(aoMudar).not.toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByLabelText(/confirmar/)).not.toBeOnTheScreen());
  });
});
