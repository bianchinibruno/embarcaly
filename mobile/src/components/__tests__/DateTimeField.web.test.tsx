import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

// Importado pelo caminho explícito: o Metro só escolheria este arquivo na web,
// e sem isso a versão do navegador nunca seria exercitada por teste nenhum.
import { DateTimeField } from '../DateTimeField.web';

const valor = new Date('2026-10-05T15:00:00');

describe('campo de data e hora no navegador', () => {
  it('mostra o rótulo', async () => {
    await render(<DateTimeField label="Início" value={valor} onChange={jest.fn()} />);
    expect(screen.getByText('Início')).toBeOnTheScreen();
  });

  it('entrega a data no formato que o input do navegador espera', async () => {
    await render(<DateTimeField label="Início" value={valor} onChange={jest.fn()} />);
    expect(screen.getByLabelText('Início')).toHaveProp('value', '2026-10-05T15:00');
  });

  it('preenche mês, dia e hora com dois dígitos', async () => {
    await render(
      <DateTimeField label="Início" value={new Date('2026-01-09T07:05:00')} onChange={jest.fn()} />,
    );
    expect(screen.getByLabelText('Início')).toHaveProp('value', '2026-01-09T07:05');
  });

  it('avisa a data nova a quem controla o campo', async () => {
    const aoMudar = jest.fn();
    await render(<DateTimeField label="Início" value={valor} onChange={aoMudar} />);

    await fireEvent(screen.getByLabelText('Início'), 'change', {
      target: { value: '2026-10-09T13:20' },
    });

    expect(aoMudar).toHaveBeenCalledTimes(1);
    const escolhida = aoMudar.mock.calls[0][0] as Date;
    expect(escolhida.getDate()).toBe(9);
    expect(escolhida.getHours()).toBe(13);
    expect(escolhida.getMinutes()).toBe(20);
  });

  it('ignora data impossível em vez de propagar um Invalid Date', async () => {
    const aoMudar = jest.fn();
    await render(<DateTimeField label="Início" value={valor} onChange={aoMudar} />);

    // O input fica vazio enquanto a pessoa ainda está digitando.
    await fireEvent(screen.getByLabelText('Início'), 'change', { target: { value: '' } });
    await fireEvent(screen.getByLabelText('Início'), 'change', { target: { value: '99-99' } });

    expect(aoMudar).not.toHaveBeenCalled();
  });

  it('mostra o erro quando há erro', async () => {
    await render(
      <DateTimeField label="Início" value={valor} onChange={jest.fn()} error="Data inválida." />,
    );
    expect(screen.getByText('Data inválida.')).toBeOnTheScreen();
  });

  it('não mostra área de erro quando está tudo certo', async () => {
    await render(<DateTimeField label="Início" value={valor} onChange={jest.fn()} />);
    expect(screen.queryByText('Data inválida.')).not.toBeOnTheScreen();
  });
});
