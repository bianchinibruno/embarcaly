import React from 'react';
import { Text } from 'react-native';
import { render, renderHook, screen, userEvent, waitFor } from '@testing-library/react-native';

import { ConfirmProvider, useConfirm, type ConfirmOptions } from '../Confirm';
import { Button } from '../primitives';

const PERGUNTA: ConfirmOptions = {
  title: 'Excluir esta reserva?',
  body: '«Ryokan Hakone» sai do itinerário. Não dá para desfazer.',
  confirmLabel: 'Excluir',
  destructive: true,
};

/** Tela mínima que faz a pergunta e mostra a resposta recebida. */
function Tela({ options = PERGUNTA }: { options?: ConfirmOptions }) {
  const confirm = useConfirm();
  const [resposta, setResposta] = React.useState<string>('sem resposta');
  return (
    <>
      <Button title="Perguntar" onPress={async () => setResposta(String(await confirm(options)))} />
      <Text>resposta: {resposta}</Text>
    </>
  );
}

const comProvider = (ui: React.ReactElement) => render(<ConfirmProvider>{ui}</ConfirmProvider>);

describe('confirmação de segurança', () => {
  it('não mostra nada antes de alguém perguntar', async () => {
    await comProvider(<Tela />);
    expect(screen.queryByText('Excluir esta reserva?')).not.toBeOnTheScreen();
  });

  it('mostra título e corpo com nome e consequência', async () => {
    const user = userEvent.setup();
    await comProvider(<Tela />);

    await user.press(screen.getByText('Perguntar'));
    expect(await screen.findByText('Excluir esta reserva?')).toBeOnTheScreen();
    expect(
      screen.getByText('«Ryokan Hakone» sai do itinerário. Não dá para desfazer.'),
    ).toBeOnTheScreen();
  });

  it('responde verdadeiro quando a pessoa confirma', async () => {
    const user = userEvent.setup();
    await comProvider(<Tela />);

    await user.press(screen.getByText('Perguntar'));
    await user.press(await screen.findByText('Excluir'));
    expect(await screen.findByText(/resposta: true/)).toBeOnTheScreen();
  });

  it('responde falso quando a pessoa cancela', async () => {
    const user = userEvent.setup();
    await comProvider(<Tela />);

    await user.press(screen.getByText('Perguntar'));
    await user.press(await screen.findByText('Cancelar'));
    expect(await screen.findByText(/resposta: false/)).toBeOnTheScreen();
  });

  it('fecha o diálogo depois de responder', async () => {
    const user = userEvent.setup();
    await comProvider(<Tela />);

    await user.press(screen.getByText('Perguntar'));
    await user.press(await screen.findByText('Cancelar'));
    await waitFor(() =>
      expect(screen.queryByText('Excluir esta reserva?')).not.toBeOnTheScreen(),
    );
  });

  it('deixa tocar fora para cancelar: a saída segura é a mais fácil', async () => {
    const user = userEvent.setup();
    await comProvider(<Tela />);

    await user.press(screen.getByText('Perguntar'));
    await user.press(await screen.findByLabelText('Cancelar'));
    expect(await screen.findByText(/resposta: false/)).toBeOnTheScreen();
  });

  it('aceita rótulo de cancelamento próprio', async () => {
    const user = userEvent.setup();
    await comProvider(
      <Tela options={{ ...PERGUNTA, cancelLabel: 'Continuar editando' }} />,
    );

    await user.press(screen.getByText('Perguntar'));
    expect(await screen.findByText('Continuar editando')).toBeOnTheScreen();
  });

  it('funciona também para pergunta não destrutiva', async () => {
    const user = userEvent.setup();
    await comProvider(
      <Tela
        options={{
          title: 'Salvar as alterações?',
          body: 'A reserva será atualizada no itinerário.',
          confirmLabel: 'Salvar',
        }}
      />,
    );

    await user.press(screen.getByText('Perguntar'));
    await user.press(await screen.findByText('Salvar'));
    expect(await screen.findByText(/resposta: true/)).toBeOnTheScreen();
  });

  it('recusa ser usado fora do provider, em vez de falhar em silêncio', async () => {
    await expect(renderHook(() => useConfirm())).rejects.toThrow(
      'useConfirm precisa estar dentro de ConfirmProvider',
    );
  });
});
