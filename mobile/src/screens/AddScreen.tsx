import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button, Divider, Label } from '../components/primitives';
import { font, space } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { useApp } from '../state/AppState';
import { QUEUE_FILES } from '../domain/sampleTrip';
import type { RootStackParamList } from '../navigation/types';

/**
 * Entrada dos documentos.
 *
 * A fila mostra cada arquivo sendo lido, um a um — ver o próprio arquivo sendo
 * processado é o que constrói confiança na extração. E o bloco "precisa de
 * você" existe porque extração automática erra, e um produto que finge não
 * errar perde o usuário na primeira viagem real.
 */
export function AddScreen() {
  const t = useTheme();
  const { trip, ingestPending, ingesting, ingestProgress, pendingFiles } = useApp();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const done = pendingFiles.length === 0 && !ingesting;

  return (
    <View style={{ flex: 1, backgroundColor: t.paper2 }}>
      <ScrollView contentContainerStyle={styles.body}>
        <View style={[styles.drop, { borderColor: t.rule, backgroundColor: t.paper }]}>
          <Text style={[styles.dropBig, { color: t.ink }]}>Solte seus PDFs aqui</Text>
          <Text style={[styles.dropSmall, { color: t.ink3 }]}>
            Passagem, voucher, ingresso, locação
          </Text>
          <View style={[styles.perf, { borderTopColor: t.rule }]} />
          <Text style={[styles.dropSmall, { color: t.ink3 }]}>
            ou tire foto do bilhete impresso
          </Text>
        </View>

        <Divider>Ou encaminhe por e-mail</Divider>
        <View style={[styles.mailbox, { backgroundColor: t.paper, borderColor: t.rule }]}>
          <Text style={[styles.mail, { color: t.ink }]}>
            {trip.name.toLowerCase()}@embarcaly.app
          </Text>
          <Text style={[styles.copy, { color: t.stamp }]}>Copiar</Text>
        </View>

        {ingesting || !done ? (
          <>
            <Divider>{ingesting ? 'Lendo agora' : 'Na fila'}</Divider>
            {QUEUE_FILES.map((f, i) => {
              const state = ingestProgress > i ? 'ok' : ingestProgress === i && ingesting ? 'run' : '';
              return (
                <View
                  key={f}
                  style={[styles.qitem, { backgroundColor: t.paper, borderColor: t.hair }]}
                >
                  <Text style={[styles.qname, { color: t.ink }]} numberOfLines={1}>
                    {f}
                  </Text>
                  <Text
                    style={[
                      styles.qstate,
                      { color: state === 'ok' ? t.edge.rail : state === 'run' ? t.stamp : t.ink3 },
                    ]}
                  >
                    {state === 'ok' ? 'Lido' : state === 'run' ? 'Lendo' : 'Na fila'}
                  </Text>
                </View>
              );
            })}
            {!ingesting ? (
              <Button
                title={`Enviar ${pendingFiles.length} PDFs`}
                variant="stamp"
                onPress={ingestPending}
              />
            ) : null}
          </>
        ) : (
          <>
            <View style={{ alignItems: 'center', paddingVertical: space.xl }}>
              <Label>Tudo lido</Label>
            </View>
            <Button title="Ver itinerário" onPress={() => nav.goBack()} />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: { padding: space.md, gap: space.md, paddingBottom: space.xxl },
  drop: { borderWidth: 1.5, borderStyle: 'dashed', padding: space.xl, alignItems: 'center' },
  dropBig: { fontFamily: font.uiBold, fontSize: 15 },
  dropSmall: { fontFamily: font.ui, fontSize: 11.5, marginTop: 4 },
  perf: { borderTopWidth: 1, borderStyle: 'dashed', alignSelf: 'stretch', marginVertical: space.md },
  mailbox: {
    borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mail: { fontFamily: font.mono, fontSize: 12 },
  copy: { fontFamily: font.monoBold, fontSize: 9.5, letterSpacing: 1.6, textTransform: 'uppercase' },
  qitem: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  qname: { fontFamily: font.mono, fontSize: 11, flex: 1 },
  qstate: { fontFamily: font.monoBold, fontSize: 9, letterSpacing: 1.4, textTransform: 'uppercase' },
});
