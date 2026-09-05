# Embarcaly · app

App nativo para iOS e Android, uma base de código só.
**Expo SDK 57 · React Native 0.86 · React 19 · TypeScript 6.**

## Rodar

```bash
cd mobile
npm install
npx expo start
```

Abra o **Expo Go** no celular e escaneie o QR. Roda em iPhone e Android sem
Mac, sem Xcode e sem Android Studio.

```bash
npm run typecheck   # tsc --noEmit
npm run doctor      # valida a configuração do projeto
```

## Como o código está organizado

```
App.tsx                  carrega as fontes da marca e monta os provedores
src/
  domain/                regra de negócio pura, sem React — testável isolada
    types.ts             Item, Trip, PassState, TimelineStep
    time.ts              contagem regressiva, intervalos, formatação
    passes.ts            estado do cartão de embarque
    timeline.ts          os sete marcos de um voo
    verso.ts             textos do verso do bilhete
    sampleTrip.ts        dados de exemplo — trocar por API
  theme/                 tokens da marca, claro e escuro
  components/            Ticket, Mark, Wordmark, VersoSheet, primitivos
  screens/               uma tela por arquivo
  navigation/            abas + pilha
  state/                 contexto do app e o relógio injetável
```

A camada `domain/` não importa React. É onde vive a lógica que precisa de teste
e é o contrato que o extrator de PDF deve produzir quando existir back-end.

## Três decisões que valem entender antes de mexer

**O relógio é injetável.** O produto inteiro depende do momento da viagem, então
`useApp().now()` devolve um horário deslocável em vez de `new Date()` espalhado
pelo código. Em produção o deslocamento é zero. O painel de demonstração
(`components/DevClock.tsx`) só existe sob `__DEV__` e some do bundle de release.

**Nunca geramos código de barras.** O código de um cartão de embarque carrega o
número de sequência do check-in, atribuído pelo sistema da companhia — só ela
emite. Por isso `passes.ts` tem três estados: emitido, ainda não emitido e fora
daqui. Um código inventado não leria no portão.

**Fato e estimativa não se misturam.** Na linha do tempo do voo, `estimated`
separa o que está impresso no documento do que foi cálculo nosso. A interface
mostra isso com ponto cheio contra ponto tracejado. Juntar os dois seria mentir
com aparência de precisão.

## Publicar nas lojas

Builds e envio pelo **EAS**, que tem cota gratuita mensal.

```bash
npm install -g eas-cli
eas login
eas init                 # preenche extra.eas.projectId no app.json
```

### Testar antes de submeter

```bash
eas build --profile preview --platform android   # APK para instalar direto
eas build --profile preview --platform ios       # build de simulador
```

### Produção

```bash
eas build --profile production --platform all
eas submit --platform android    # Play Console
eas submit --platform ios        # App Store Connect
```

Antes do primeiro `submit`, preencha em `eas.json`: `appleId`, `ascAppId` e
`appleTeamId` para iOS, e o caminho da chave de conta de serviço do Google Play.

### O que ainda falta para passar na revisão

- [ ] **Conta de desenvolvedor** — Apple US$ 99/ano, Google US$ 25 uma vez. Não há caminho gratuito para publicar.
- [ ] **Política de privacidade** com URL pública. As duas lojas exigem.
- [ ] **Ficha de privacidade** — declarar o que o app coleta. Hoje: nada.
- [ ] **Capturas de tela** nos tamanhos de cada loja.
- [ ] **Substituir os dados de exemplo** por dados reais. A Apple reprova app que é só demonstração.

Identificadores já definidos: `app.embarcaly.mobile` nas duas plataformas.

## Estado

🟡 **Base funcional, dados de exemplo.**

O que existe: navegação completa, todas as telas, a lógica de domínio tipada, a
marca aplicada e tema claro/escuro seguindo o sistema.

O que não existe: back-end, extração real de PDF, autenticação, notificações e
persistência. `sampleTrip.ts` é o ponto onde a API entra.
