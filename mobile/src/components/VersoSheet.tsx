import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { font, space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { VERSO } from '../domain/verso';
import { Label } from './primitives';

/**
 * O verso do bilhete: onde todo (i) abre.
 *
 * Bilhete de verdade tem as letras miúdas impressas atrás — a explicação não
 * é um balão flutuante, é virar o papel.
 */
export function VersoSheet({
  versoKey,
  onClose,
}: {
  versoKey: string | null;
  onClose: () => void;
}) {
  const t = useTheme();
  const v = versoKey ? VERSO[versoKey] : null;

  return (
    <Modal
      visible={!!v}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: t.paper2 }} edges={['top', 'bottom']}>
        <View style={[styles.bar, { backgroundColor: t.paper, borderBottomColor: t.hair }]}>
          <View>
            <Text style={[styles.title, { color: t.ink }]}>Verso do bilhete</Text>
            <Label>{v?.title ?? ''}</Label>
          </View>
          <Pressable onPress={onClose} hitSlop={12} accessibilityRole="button">
            <Text style={[styles.close, { color: t.stamp }]}>Fechar</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.body}>
          {v ? (
            <View style={[styles.card, { backgroundColor: t.paper, borderColor: t.rule }]}>
              <Text style={[styles.headline, { color: t.ink }]}>{v.headline}</Text>
              <Text style={[styles.text, { color: t.ink2 }]}>{v.body}</Text>
              {v.extraTitle ? (
                <>
                  <View style={[styles.sep, { borderTopColor: t.rule }]} />
                  <Text style={[styles.headline, { color: t.ink }]}>{v.extraTitle}</Text>
                  <Text style={[styles.text, { color: t.ink2 }]}>{v.extraBody}</Text>
                </>
              ) : null}
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bar: {
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: { fontFamily: font.uiBold, fontSize: 18, letterSpacing: -0.4 },
  close: { fontFamily: font.monoBold, fontSize: 10, letterSpacing: 1.8, textTransform: 'uppercase' },
  body: { padding: space.lg, gap: space.md },
  card: { borderWidth: 1, padding: space.lg },
  headline: { fontFamily: font.uiBold, fontSize: 15, marginBottom: 4 },
  text: { fontFamily: font.ui, fontSize: 13.5, lineHeight: 20 },
  sep: { borderTopWidth: 1, borderStyle: 'dashed', marginVertical: space.md },
});
