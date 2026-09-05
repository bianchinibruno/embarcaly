import React from 'react';
import { Text } from 'react-native';
import { render, screen, userEvent } from '@testing-library/react-native';

import { Ticket } from '../Ticket';
import type { Item, ItemType } from '../../domain/types';

const d = (iso: string) => new Date(`${iso}:00`);

const voo: Item = {
  id: 'f1',
  type: 'air',
  title: 'POA → GRU',
  start: d('2026-10-03T08:40'),
  end: d('2026-10-03T10:15'),
  from: 'POA',
  fromCity: 'Porto Alegre',
  to: 'GRU',
  toCity: 'Guarulhos',
  flight: 'LA 8172',
  pnr: 'QKZ4TP',
  seat: '14A',
  pass: 'carrier',
};

const hotel: Item = {
  id: 'h1',
  type: 'bed',
  title: 'Shinjuku Granbell',
  subtitle: '5 noites · Tóquio',
  start: d('2026-10-05T15:00'),
  pnr: 'SG-88214',
  pass: 'none',
};

describe('bilhete tocável não contém botões', () => {
  /**
   * Guarda de regressão. Um bilhete que já é botão não pode conter botões:
   * HTML inválido, erro de hidratação, e na tela de Viagens esse mesmo
   * aninhamento chegou a matar o toque.
   */
  it('esconde o (i) quando o cartão inteiro abre o detalhe', async () => {
    await render(<Ticket item={voo} onPress={jest.fn()} onInfo={jest.fn()} />);
    expect(screen.queryByLabelText('Explicação')).not.toBeOnTheScreen();
  });

  it('mostra o (i) quando o cartão não é botão', async () => {
    await render(<Ticket item={voo} onInfo={jest.fn()} />);
    expect(screen.getByLabelText('Explicação')).toBeOnTheScreen();
  });

  it('vale também para reserva que não é voo', async () => {
    await render(<Ticket item={hotel} onPress={jest.fn()} onInfo={jest.fn()} />);
    expect(screen.queryByLabelText('Explicação')).not.toBeOnTheScreen();
  });

  it('abre o verbete do localizador quando o (i) está disponível', async () => {
    const user = userEvent.setup();
    const aoInformar = jest.fn();
    await render(<Ticket item={voo} onInfo={aoInformar} />);

    await user.press(screen.getByLabelText('Explicação'));
    expect(aoInformar).toHaveBeenCalledWith('pnr');
  });

  it('abre o verbete da reserva quando o bilhete não é voo', async () => {
    const user = userEvent.setup();
    const aoInformar = jest.fn();
    await render(<Ticket item={hotel} onInfo={aoInformar} />);

    await user.press(screen.getByLabelText('Explicação'));
    expect(aoInformar).toHaveBeenCalledWith('pnr');
  });

  it('leva o toque do cartão para quem o abriu', async () => {
    const user = userEvent.setup();
    const aoTocar = jest.fn();
    await render(<Ticket item={voo} onPress={aoTocar} />);

    await user.press(screen.getByRole('button'));
    expect(aoTocar).toHaveBeenCalledTimes(1);
  });
});

describe('conteúdo do bilhete de voo', () => {
  it('mostra rota, cidades, voo e assento', async () => {
    await render(<Ticket item={voo} />);
    expect(screen.getByText('POA')).toBeOnTheScreen();
    expect(screen.getByText('Porto Alegre')).toBeOnTheScreen();
    expect(screen.getByText('GRU')).toBeOnTheScreen();
    expect(screen.getByText('LA 8172')).toBeOnTheScreen();
    expect(screen.getByText('14A')).toBeOnTheScreen();
  });

  it('mostra o horário de partida', async () => {
    await render(<Ticket item={voo} />);
    expect(screen.getByText('08:40')).toBeOnTheScreen();
  });

  it('omite voo, localizador e assento quando não existem', async () => {
    await render(<Ticket item={{ ...voo, flight: undefined, pnr: undefined, seat: undefined }} />);
    expect(screen.queryByText('LA 8172')).not.toBeOnTheScreen();
    expect(screen.queryByText('Localizador')).not.toBeOnTheScreen();
    expect(screen.queryByText('QKZ4TP')).not.toBeOnTheScreen();
    expect(screen.queryByText('Assento')).not.toBeOnTheScreen();
    expect(screen.queryByText('14A')).not.toBeOnTheScreen();
  });
});

describe('conteúdo das demais reservas', () => {
  it('mostra título, subtítulo e reserva do hotel', async () => {
    await render(<Ticket item={hotel} />);
    expect(screen.getByText('Shinjuku Granbell')).toBeOnTheScreen();
    expect(screen.getByText('5 noites · Tóquio')).toBeOnTheScreen();
    expect(screen.getByText('SG-88214')).toBeOnTheScreen();
  });

  it('omite subtítulo, assento e reserva quando não existem', async () => {
    await render(<Ticket item={{ ...hotel, subtitle: undefined, pnr: undefined }} />);
    expect(screen.getByText('Shinjuku Granbell')).toBeOnTheScreen();
    expect(screen.queryByText('Reserva')).not.toBeOnTheScreen();
  });

  it('mostra o assento quando a reserva tem lugar marcado', async () => {
    await render(<Ticket item={{ ...hotel, type: 'rail', seat: '9-4C' }} />);
    expect(screen.getByText('9-4C')).toBeOnTheScreen();
  });

  it.each(['bed', 'rail', 'act', 'car'] as ItemType[])(
    'desenha o papel tintado do tipo %s',
    async (type) => {
      await render(<Ticket item={{ ...hotel, type }} />);
      expect(screen.getByText('Shinjuku Granbell')).toBeOnTheScreen();
    },
  );
});

describe('atraso e pendência', () => {
  it('mostra o horário antigo riscado ao lado do novo', async () => {
    const atrasado: Item = {
      ...voo,
      start: d('2026-10-03T10:20'),
      delay: { minutes: 100, reason: 'Aeronave chegou atrasada', originalStart: d('2026-10-03T08:40') },
    };
    await render(<Ticket item={atrasado} />);
    // O horário antigo fica riscado dentro do mesmo nó do novo.
    expect(screen.getByText(/08:40\s*10:20/)).toBeOnTheScreen();
  });

  it('destaca a pendência da reserva', async () => {
    await render(<Ticket item={{ ...voo, needs: 'Falta o horário de retirada' }} />);
    expect(screen.getByText('Falta o horário de retirada')).toBeOnTheScreen();
  });
});

describe('cabeçalho personalizado', () => {
  it('troca o rótulo do tipo pelo texto recebido', async () => {
    await render(<Ticket item={hotel} headLeft="Próximo" />);
    expect(screen.getByText('Próximo')).toBeOnTheScreen();
    expect(screen.queryByText('Hotel')).not.toBeOnTheScreen();
  });

  it('troca o lado direito por um nó próprio', async () => {
    await render(<Ticket item={voo} headRight={<Text>em 2h 40</Text>} />);
    expect(screen.getByText('em 2h 40')).toBeOnTheScreen();
    expect(screen.queryByText('08:40')).not.toBeOnTheScreen();
  });

  it('aceita conteúdo extra no corpo', async () => {
    await render(
      <Ticket item={voo}>
        <Text>linha extra</Text>
      </Ticket>,
    );
    expect(screen.getByText('linha extra')).toBeOnTheScreen();
  });
});
