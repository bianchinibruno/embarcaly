/**
 * Socorro — a camada 3 do produto.
 *
 * Quando um voo atrasa, esta tela responde as duas perguntas que nenhum outro
 * aplicativo responde: o que mais quebrou na viagem, e o que a companhia é
 * obrigada a fazer por você agora.
 *
 * Sem servidor e sem API. O atraso entra pela mão do viajante; o resto é
 * cálculo local sobre a viagem que já está no aparelho.
 */
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button, Divider, Label, Stamp } from '../components/primitives';
import { useApp } from '../state/AppState';
import { useTheme } from '../theme/useTheme';
import { font, space } from '../theme/tokens';
import { codigo, pendencias, recalcular, type Efeito } from '../domain/cascata';
import { avaliar, decorridoDesde, marco, rotulo } from '../domain/direitos';
import { AVISO_CALCULO, AVISO_CONTEUDO, AVISO_RESULTADO } from '../domain/legal';
import { hhmm } from '../domain/time';
import type { Item, Trip } from '../domain/types';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

/** O voo atrasado mais recente da viagem. É dele que a cadeia é recalculada. */
export function vooAtrasado(items: Item[]): Item | undefined {
  return items
    .filter((i) => i.type === 'air' && i.delay && i.delay.minutes > 0)
    .sort((a, b) => b.start.getTime() - a.start.getTime())[0];
}

export function SocorroScreen() {
  const t = useTheme();
  const nav = useNavigation<Nav>();
  const { activeTrip, items, now, tick } = useApp();

  const origem = useMemo(() => vooAtrasado(items), [items]);

  const cascata = useMemo(() => {
    if (!activeTrip || !origem?.delay) return undefined;
    const trip: Trip = { ...activeTrip, items };
    return recalcular(trip, origem.id, origem.delay.minutes);
  }, [activeTrip, items, origem]);

  const direitos = useMemo(() => {
    if (!origem?.delay) return undefined;
    return avaliar({
      gatilho: 'atraso',
      decorridoMin: decorridoDesde(origem.delay.originalStart, now()),
      // Doméstico por enquanto. Distinguir trecho internacional exige saber em
      // que país fica o aeroporto de destino, e o produto ainda não guarda isso.
      // A diferença só muda a compensação por preterição, que não entra em atraso.
      trecho: 'domestico',
    });
    // `tick` entra para a contagem do próximo direito andar sozinha.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origem, tick]);

  if (!activeTrip) {
    return (
      <Vazio
        titulo="Nenhuma viagem aberta"
        texto="Escolha uma viagem na aba Viagens para o Socorro saber o que acompanhar."
      />
    );
  }

  if (!origem || !origem.delay || !cascata || !direitos) {
    return (
      <Vazio
        titulo="Nada quebrado"
        texto="Quando um voo atrasar, registre o atraso na reserva e esta tela mostra o que mais caiu junto e o que a companhia te deve."
        acao={
          <Button
            title="Abrir itinerário"
            variant="ghost"
            onPress={() => nav.navigate('Tabs', { screen: 'Itinerary' })}
          />
        }
      />
    );
  }

  const quebrados = pendencias(cascata);

  return (
    <ScrollView
      style={{ backgroundColor: t.paper2 }}
      contentContainerStyle={styles.page}
      testID="socorro-scroll"
    >
      <View style={[styles.folha, { backgroundColor: t.paper, borderColor: t.rule }]}>
        <View style={styles.cabeca}>
          <Label>Situação</Label>
          <Stamp>Atrasado</Stamp>
        </View>

        <Text style={[styles.voo, { color: t.ink }]}>
          {origem.from && origem.to ? `${origem.from} → ${origem.to}` : origem.title}
        </Text>
        <Text style={[styles.linha2, { color: t.ink2 }]}>
          {`Saída original ${hhmm(origem.delay.originalStart)}. Atraso de ${fmtMin(
            origem.delay.minutes,
          )}.`}
        </Text>
        {origem.delay.reason ? (
          <Text style={[styles.linha2, { color: t.ink3 }]}>{origem.delay.reason}</Text>
        ) : null}

        <Divider>O que a companhia deve</Divider>
        {direitos.liberados.map((d) => (
          <View key={d.codigo} style={styles.dir} testID={`direito-${d.codigo}`}>
            <Text style={[styles.marco, { color: t.ink }]}>{marco(d.aPartirDeMin)}</Text>
            <View style={styles.dirCorpo}>
              <Text style={[styles.dirTitulo, { color: t.ink }]}>{d.titulo}</Text>
              <Text style={[styles.dirPeca, { color: t.ink2 }]}>{`“${d.peça}”`}</Text>
              <Text style={[styles.fonte, { color: t.ink3 }]}>{d.fonte}</Text>
            </View>
            <Text style={[styles.cod, { color: t.stamp }]}>{rotulo()}</Text>
          </View>
        ))}

        {direitos.proximo ? (
          <View style={styles.dir} testID="direito-proximo">
            <Text style={[styles.marco, { color: t.ink3 }]}>
              {marco(direitos.proximo.direito.aPartirDeMin)}
            </Text>
            <View style={styles.dirCorpo}>
              <Text style={[styles.dirTitulo, { color: t.ink3 }]}>
                {direitos.proximo.direito.titulo}
              </Text>
            </View>
            <Text style={[styles.cod, { color: t.ink3 }]}>
              {rotulo(direitos.proximo.emMin)}
            </Text>
          </View>
        ) : null}

        {direitos.escolhas.length > 0 ? (
          <>
            <Divider>Você escolhe uma destas</Divider>
            {direitos.escolhas.map((e, i) => (
              <View key={e.codigo} style={styles.dir} testID={`escolha-${e.codigo}`}>
                <Text style={[styles.marco, { color: t.stamp }]}>{`0${i + 1}`}</Text>
                <View style={styles.dirCorpo}>
                  <Text style={[styles.dirTitulo, { color: t.ink }]}>{e.titulo}</Text>
                  <Text style={[styles.dirPeca, { color: t.ink2 }]}>{`“${e.peça}”`}</Text>
                </View>
              </View>
            ))}
          </>
        ) : null}

        <Divider>{`O resto da viagem · ${quebrados.length} de ${cascata.efeitos.length}`}</Divider>
        {cascata.efeitos.length === 0 ? (
          <Text style={[styles.linha2, { color: t.ink3 }]}>
            Não há nada depois deste voo na viagem.
          </Text>
        ) : (
          cascata.efeitos.map((e) => <LinhaEfeito key={e.item.id} e={e} />)
        )}

        <Divider>Leia antes de agir</Divider>
        <Text style={[styles.aviso, { color: t.ink3 }]} testID="aviso-calculo">
          {AVISO_CALCULO}
        </Text>
        <Text style={[styles.aviso, { color: t.ink3 }]} testID="aviso-conteudo">
          {AVISO_CONTEUDO}
        </Text>
        <Text style={[styles.aviso, { color: t.ink3 }]} testID="aviso-resultado">
          {AVISO_RESULTADO}
        </Text>
      </View>
    </ScrollView>
  );
}

function LinhaEfeito({ e }: { e: Efeito }) {
  const t = useTheme();
  const quebrou = e.situacao !== 'ok';
  return (
    <View style={styles.efeito} testID={`efeito-${e.item.id}`}>
      <Text style={[styles.hora, { color: t.ink3 }]}>{hhmm(e.item.start)}</Text>
      <View style={styles.dirCorpo}>
        <Text style={[styles.dirTitulo, { color: t.ink }]}>{e.item.title}</Text>
        <Text style={[styles.dirPeca, { color: t.ink2 }]}>{e.motivo}</Text>
        {quebrou ? (
          <Text style={[styles.acao, { color: t.stamp }]}>{e.acao}</Text>
        ) : null}
      </View>
      <Text style={[styles.cod, { color: quebrou ? t.stamp : t.ink3 }]}>
        {codigo(e.situacao)}
      </Text>
    </View>
  );
}

function Vazio({
  titulo,
  texto,
  acao,
}: {
  titulo: string;
  texto: string;
  acao?: React.ReactNode;
}) {
  const t = useTheme();
  return (
    <View style={[styles.vazio, { backgroundColor: t.paper2 }]} testID="socorro-vazio">
      <Text style={[styles.vazioTitulo, { color: t.ink }]}>{titulo}</Text>
      <Text style={[styles.vazioTexto, { color: t.ink2 }]}>{texto}</Text>
      {acao}
    </View>
  );
}

/** 225 vira "3h45". Abaixo de uma hora, minutos. */
export function fmtMin(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} min`;
  return `${h}h${String(m).padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  page: { padding: space.md, paddingBottom: space.xl },
  folha: { borderWidth: 1, padding: space.md, gap: 2 },
  cabeca: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  voo: { fontFamily: font.uiBold, fontSize: 26, letterSpacing: -0.5, marginTop: space.sm },
  linha2: { fontFamily: font.ui, fontSize: 13, marginTop: 2 },
  dir: { flexDirection: 'row', alignItems: 'flex-start', gap: space.sm, paddingVertical: 10 },
  efeito: { flexDirection: 'row', alignItems: 'flex-start', gap: space.sm, paddingVertical: 10 },
  marco: { fontFamily: font.monoBold, fontSize: 15, width: 52 },
  hora: { fontFamily: font.monoBold, fontSize: 12, width: 52 },
  dirCorpo: { flex: 1, gap: 2 },
  dirTitulo: { fontFamily: font.uiBold, fontSize: 14 },
  dirPeca: { fontFamily: font.ui, fontSize: 12.5, lineHeight: 17 },
  acao: { fontFamily: font.uiBold, fontSize: 12.5, lineHeight: 17, marginTop: 2 },
  fonte: { fontFamily: font.mono, fontSize: 9.5, letterSpacing: 0.4 },
  cod: { fontFamily: font.monoBold, fontSize: 9, letterSpacing: 1.2, textTransform: 'uppercase' },
  aviso: { fontFamily: font.mono, fontSize: 9.5, lineHeight: 14, marginTop: space.md },
  vazio: { flex: 1, padding: space.lg, gap: space.sm, justifyContent: 'center' },
  vazioTitulo: { fontFamily: font.uiBold, fontSize: 22 },
  vazioTexto: { fontFamily: font.ui, fontSize: 14, lineHeight: 20, marginBottom: space.sm },
});
