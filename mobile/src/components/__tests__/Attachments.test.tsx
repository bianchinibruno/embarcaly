import React from 'react';
import { render, screen, userEvent, waitFor } from '@testing-library/react-native';

import { Attachments } from '../Attachments';
import { ConfirmProvider } from '../Confirm';
import * as attachments from '../../db/attachments';
import type { Attachment } from '../../domain/types';

jest.mock('../../db/attachments', () => ({
  listByItem: jest.fn(),
  pickAndAdd: jest.fn(),
  remove: jest.fn(),
  removeAllForItem: jest.fn(),
  rename: jest.fn(),
  open: jest.fn(),
}));

const mock = attachments as jest.Mocked<typeof attachments>;

const anexo = (over: Partial<Attachment> = {}): Attachment => ({
  id: 'att_1',
  itemId: 'item_1',
  name: 'voucher-hotel.pdf',
  mimeType: 'application/pdf',
  size: 2048,
  uri: 'file:///anexos/att_1.pdf',
  createdAt: new Date('2026-09-01T10:00:00'),
  ...over,
});

const montar = () =>
  render(
    <ConfirmProvider>
      <Attachments itemId="item_1" />
    </ConfirmProvider>,
  );

beforeEach(() => {
  jest.clearAllMocks();
  mock.listByItem.mockResolvedValue([]);
  mock.pickAndAdd.mockResolvedValue({ added: [], failed: [] });
  mock.remove.mockResolvedValue(undefined);
  mock.rename.mockResolvedValue(undefined);
  mock.open.mockResolvedValue(undefined);
});

describe('lista vazia', () => {
  it('explica para que serve, em vez de mostrar espaço em branco', async () => {
    await montar();
    expect(await screen.findByText(/Nenhum documento anexado/)).toBeOnTheScreen();
  });

  it('avisa que dá para escolher vários de uma vez', async () => {
    await montar();
    expect(await screen.findByText(/vários de uma vez/)).toBeOnTheScreen();
  });

  it('convida a anexar o primeiro documento', async () => {
    await montar();
    expect(await screen.findByText('Anexar documento')).toBeOnTheScreen();
  });
});

describe('lista com anexos', () => {
  it('mostra nome, tipo e tamanho', async () => {
    mock.listByItem.mockResolvedValue([anexo()]);
    await montar();

    expect(await screen.findByText('voucher-hotel.pdf')).toBeOnTheScreen();
    expect(screen.getByText('PDF')).toBeOnTheScreen();
    expect(screen.getByText('2 KB')).toBeOnTheScreen();
  });

  it('conta quantos anexos existem no título', async () => {
    mock.listByItem.mockResolvedValue([anexo(), anexo({ id: 'att_2', name: 'b.pdf' })]);
    await montar();
    expect(await screen.findByText('Anexos · 2')).toBeOnTheScreen();
  });

  it('convida a anexar mais quando já existe algum', async () => {
    mock.listByItem.mockResolvedValue([anexo()]);
    await montar();
    expect(await screen.findByText('Anexar outro documento')).toBeOnTheScreen();
  });

  it.each([
    [undefined, '—'],
    [0, '—'],
    [512, '512 B'],
    [2048, '2 KB'],
    [3 * 1024 * 1024, '3.0 MB'],
  ])('escreve o tamanho %s de forma legível', async (size, esperado) => {
    mock.listByItem.mockResolvedValue([anexo({ size })]);
    await montar();
    expect(await screen.findByText(esperado)).toBeOnTheScreen();
  });

  it('chama de «Arquivo» o que não é PDF', async () => {
    mock.listByItem.mockResolvedValue([anexo({ name: 'foto.jpg', mimeType: 'image/jpeg' })]);
    await montar();
    expect(await screen.findByText('Arquivo')).toBeOnTheScreen();
  });

  it('chama de «Arquivo» o que veio sem tipo', async () => {
    mock.listByItem.mockResolvedValue([anexo({ mimeType: undefined })]);
    await montar();
    expect(await screen.findByText('Arquivo')).toBeOnTheScreen();
  });
});

describe('anexar', () => {
  it('recarrega a lista depois de anexar', async () => {
    const user = userEvent.setup();
    mock.pickAndAdd.mockResolvedValue({ added: [anexo()], failed: [] });
    mock.listByItem.mockResolvedValueOnce([]).mockResolvedValue([anexo()]);
    await montar();

    await user.press(await screen.findByText('Anexar documento'));
    expect(await screen.findByText('voucher-hotel.pdf')).toBeOnTheScreen();
  });

  it('não recarrega quando a pessoa desiste do seletor', async () => {
    const user = userEvent.setup();
    await montar();

    await user.press(await screen.findByText('Anexar documento'));
    expect(mock.listByItem).toHaveBeenCalledTimes(1);
  });

  it('nomeia o único arquivo que falhou', async () => {
    const user = userEvent.setup();
    mock.pickAndAdd.mockResolvedValue({ added: [], failed: ['quebrado.pdf'] });
    await montar();

    await user.press(await screen.findByText('Anexar documento'));
    expect(await screen.findByText(/«quebrado.pdf»/)).toBeOnTheScreen();
  });

  it('conta e nomeia quando falha mais de um', async () => {
    const user = userEvent.setup();
    mock.pickAndAdd.mockResolvedValue({ added: [], failed: ['a.pdf', 'b.pdf'] });
    await montar();

    await user.press(await screen.findByText('Anexar documento'));
    expect(await screen.findByText(/2 arquivos: a.pdf, b.pdf/)).toBeOnTheScreen();
  });

  it('avisa sem quebrar quando o seletor falha inteiro', async () => {
    const user = userEvent.setup();
    mock.pickAndAdd.mockRejectedValue(new Error('sem permissão'));
    await montar();

    await user.press(await screen.findByText('Anexar documento'));
    expect(await screen.findByText('Não foi possível anexar. Tente outra vez.')).toBeOnTheScreen();
  });
});

describe('abrir', () => {
  it('entrega o anexo ao visualizador do sistema', async () => {
    const user = userEvent.setup();
    mock.listByItem.mockResolvedValue([anexo()]);
    await montar();

    await user.press(await screen.findByLabelText('Abrir voucher-hotel.pdf'));
    expect(mock.open).toHaveBeenCalledWith(expect.objectContaining({ id: 'att_1' }));
  });

  it('avisa quando o arquivo não abre', async () => {
    const user = userEvent.setup();
    mock.listByItem.mockResolvedValue([anexo()]);
    mock.open.mockRejectedValue(new Error('sumiu'));
    await montar();

    await user.press(await screen.findByLabelText('Abrir voucher-hotel.pdf'));
    expect(await screen.findByText('Não foi possível abrir este arquivo.')).toBeOnTheScreen();
  });
});

describe('renomear', () => {
  beforeEach(() => {
    mock.listByItem.mockResolvedValue([anexo()]);
  });

  it('abre o campo já preenchido com o nome atual', async () => {
    const user = userEvent.setup();
    await montar();

    await user.press(await screen.findByLabelText('Renomear voucher-hotel.pdf'));
    expect(await screen.findByDisplayValue('voucher-hotel.pdf')).toBeOnTheScreen();
    expect(screen.getByText('Nome do anexo')).toBeOnTheScreen();
  });

  it('avisa que a extensão é mantida', async () => {
    const user = userEvent.setup();
    await montar();

    await user.press(await screen.findByLabelText('Renomear voucher-hotel.pdf'));
    expect(await screen.findByText('A extensão .pdf é mantida.')).toBeOnTheScreen();
  });

  it('não promete extensão quando o arquivo não tem', async () => {
    const user = userEvent.setup();
    mock.listByItem.mockResolvedValue([anexo({ name: 'comprovante' })]);
    await montar();

    await user.press(await screen.findByLabelText('Renomear comprovante'));
    await screen.findByText('Nome do anexo');
    expect(screen.queryByText(/A extensão/)).not.toBeOnTheScreen();
  });

  it('salva o nome novo preservando a extensão', async () => {
    const user = userEvent.setup();
    await montar();

    await user.press(await screen.findByLabelText('Renomear voucher-hotel.pdf'));
    await user.clear(await screen.findByDisplayValue('voucher-hotel.pdf'));
    await user.type(screen.getByDisplayValue(''), 'Hotel Shinjuku');
    await user.press(screen.getByText('Salvar nome'));

    expect(mock.rename).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'att_1' }),
      'Hotel Shinjuku.pdf',
    );
  });

  it('salva também quando a pessoa confirma pelo teclado', async () => {
    const user = userEvent.setup();
    await montar();

    await user.press(await screen.findByLabelText('Renomear voucher-hotel.pdf'));
    await user.clear(await screen.findByDisplayValue('voucher-hotel.pdf'));
    await user.type(screen.getByDisplayValue(''), 'Comprovante', { submitEditing: true });

    expect(mock.rename).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'att_1' }),
      'Comprovante.pdf',
    );
  });

  it('recusa nome vazio e mantém o campo aberto', async () => {
    const user = userEvent.setup();
    await montar();

    await user.press(await screen.findByLabelText('Renomear voucher-hotel.pdf'));
    await user.clear(await screen.findByDisplayValue('voucher-hotel.pdf'));
    await user.press(screen.getByText('Salvar nome'));

    expect(await screen.findByText('Dê um nome ao anexo.')).toBeOnTheScreen();
    expect(mock.rename).not.toHaveBeenCalled();
  });

  it('não grava quando o nome não mudou', async () => {
    const user = userEvent.setup();
    await montar();

    await user.press(await screen.findByLabelText('Renomear voucher-hotel.pdf'));
    await user.press(await screen.findByText('Salvar nome'));

    expect(mock.rename).not.toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByText('Nome do anexo')).not.toBeOnTheScreen());
  });

  it('desiste sem gravar quando a pessoa cancela', async () => {
    const user = userEvent.setup();
    await montar();

    await user.press(await screen.findByLabelText('Renomear voucher-hotel.pdf'));
    await user.clear(await screen.findByDisplayValue('voucher-hotel.pdf'));
    await user.type(screen.getByDisplayValue(''), 'Outro nome');
    await user.press(await screen.findByText('Cancelar'));

    expect(mock.rename).not.toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByText('Nome do anexo')).not.toBeOnTheScreen());
  });

  it('avisa quando a gravação falha, sem fechar o campo', async () => {
    const user = userEvent.setup();
    mock.rename.mockRejectedValue(new Error('disco cheio'));
    await montar();

    await user.press(await screen.findByLabelText('Renomear voucher-hotel.pdf'));
    await user.clear(await screen.findByDisplayValue('voucher-hotel.pdf'));
    await user.type(screen.getByDisplayValue(''), 'Novo nome');
    await user.press(screen.getByText('Salvar nome'));

    expect(await screen.findByText('Não foi possível renomear. Tente outra vez.')).toBeOnTheScreen();
    expect(screen.getByText('Nome do anexo')).toBeOnTheScreen();
  });
});

describe('remover', () => {
  beforeEach(() => {
    mock.listByItem.mockResolvedValue([anexo()]);
  });

  it('pergunta antes, citando o nome e o que se perde', async () => {
    const user = userEvent.setup();
    await montar();

    await user.press(await screen.findByLabelText('Remover voucher-hotel.pdf'));
    expect(await screen.findByText('Remover este anexo?')).toBeOnTheScreen();
    expect(screen.getByText(/«voucher-hotel.pdf» será apagado deste aparelho/)).toBeOnTheScreen();
  });

  it('não remove nada quando a pessoa cancela', async () => {
    const user = userEvent.setup();
    await montar();

    await user.press(await screen.findByLabelText('Remover voucher-hotel.pdf'));
    await user.press(await screen.findByText('Cancelar'));

    expect(mock.remove).not.toHaveBeenCalled();
  });

  it('remove e recarrega quando a pessoa confirma', async () => {
    const user = userEvent.setup();
    await montar();

    await user.press(await screen.findByLabelText('Remover voucher-hotel.pdf'));
    await user.press(await screen.findByRole('button', { name: 'Remover' }));

    expect(mock.remove).toHaveBeenCalledWith(expect.objectContaining({ id: 'att_1' }));
    expect(mock.listByItem).toHaveBeenCalledTimes(2);
  });

  it('limpa o aviso antigo ao mexer na lista de novo', async () => {
    const user = userEvent.setup();
    mock.open.mockRejectedValue(new Error('sumiu'));
    await montar();

    await user.press(await screen.findByLabelText('Abrir voucher-hotel.pdf'));
    expect(await screen.findByText('Não foi possível abrir este arquivo.')).toBeOnTheScreen();

    // Um erro que sobrevive à ação seguinte vira acusação solta.
    await user.press(screen.getByLabelText('Remover voucher-hotel.pdf'));
    await waitFor(() =>
      expect(screen.queryByText('Não foi possível abrir este arquivo.')).not.toBeOnTheScreen(),
    );
  });
});
