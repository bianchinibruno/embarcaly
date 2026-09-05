import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { font, space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

/**
 * Confirmação de segurança, própria.
 *
 * O `Alert` do React Native não existe na web — é um no-op silencioso. Isso
 * fazia o botão de excluir simplesmente não responder no navegador: sem
 * diálogo, sem exclusão, sem erro. Uma tela pedindo confirmação que nunca
 * chega é pior que nenhuma confirmação.
 *
 * Então o diálogo é nosso, renderizado acima do navegador, e funciona igual em
 * iOS, Android e web.
 *
 * Regra de escrita: o corpo diz **o que vai acontecer**, com nome e número, e
 * se dá para desfazer. Nunca "tem certeza?".
 */
export interface ConfirmOptions {
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel?: string;
  /** Vermelho de carimbo e ênfase na perda. Use para o que não volta. */
  destructive?: boolean;
}

type Resolver = (ok: boolean) => void;

const Ctx = createContext<((o: ConfirmOptions) => Promise<boolean>) | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolver = useRef<Resolver | null>(null);

  const confirm = useCallback((o: ConfirmOptions) => {
    setOptions(o);
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  const close = (ok: boolean) => {
    setOptions(null);
    resolver.current?.(ok);
    resolver.current = null;
  };

  return (
    <Ctx.Provider value={confirm}>
      <View style={styles.root}>
        {children}

        {options ? (
          <View style={styles.overlay}>
            {/* Tocar fora cancela — a saída segura é sempre a mais fácil. */}
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => close(false)}
              accessibilityRole="button"
              accessibilityLabel="Cancelar"
            />

            <View style={[styles.card, { backgroundColor: t.paper, borderColor: t.rule }]}>
              <View
                style={{ height: 4, backgroundColor: options.destructive ? t.stamp : t.ink }}
              />
              <View style={styles.body}>
                <Text style={[styles.title, { color: t.ink }]}>{options.title}</Text>
                <Text style={[styles.text, { color: t.ink2 }]}>{options.body}</Text>

                <View style={styles.actions}>
                  <Pressable
                    onPress={() => close(false)}
                    accessibilityRole="button"
                    style={({ pressed }) => [
                      styles.btn,
                      { borderColor: t.rule, opacity: pressed ? 0.6 : 1 },
                    ]}
                  >
                    <Text style={[styles.btnText, { color: t.ink2 }]}>
                      {options.cancelLabel ?? 'Cancelar'}
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => close(true)}
                    accessibilityRole="button"
                    style={({ pressed }) => [
                      styles.btn,
                      {
                        backgroundColor: options.destructive ? t.stamp : t.ink,
                        borderColor: options.destructive ? t.stamp : t.ink,
                        opacity: pressed ? 0.8 : 1,
                      },
                    ]}
                  >
                    <Text style={[styles.btnText, { color: t.paper }]}>
                      {options.confirmLabel}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </Ctx.Provider>
  );
}

export function useConfirm() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useConfirm precisa estar dentro de ConfirmProvider');
  return c;
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10,14,16,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: space.xl,
    zIndex: 1000,
  },
  card: { width: '100%', maxWidth: 420, borderWidth: 1, overflow: 'hidden' },
  body: { padding: space.lg },
  title: { fontFamily: font.uiBold, fontSize: 17, letterSpacing: -0.3 },
  text: { fontFamily: font.ui, fontSize: 13.5, lineHeight: 20, marginTop: 6 },
  actions: { flexDirection: 'row', gap: space.sm, marginTop: space.lg },
  btn: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnText: {
    fontFamily: font.monoBold,
    fontSize: 10.5,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
});
