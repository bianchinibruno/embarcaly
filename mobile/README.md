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
npm test            # 24 testes do domínio
npm run typecheck   # tsc --noEmit
npm run doctor      # valida a configuração do projeto
```

## Como o código está organizado

```
App.tsx                  carrega as fontes da marca e monta os provedores
src/
  db/                    SQLite local
    schema.ts            tabelas e migrações versionadas
    client.ts            abre o banco, aplica migração pendente
    repo.ts              CRUD de viagens e reservas
  domain/                regra de negócio pura, sem React — testável isolada
    types.ts             Item, Trip, PassState, TimelineStep
    time.ts              contagem regressiva, intervalos, formatação
    derive.ts            um horário de partida vira sete marcos
    passes.ts            estado do cartão de embarque
    timeline.ts          a linha do tempo do voo
    verso.ts             textos do verso do bilhete
    sampleTrip.ts        viagem de exemplo, carregada sob demanda
  theme/                 tokens da marca, claro e escuro
  components/            Ticket, Mark, Wordmark, VersoSheet, formulários
  screens/               uma tela por arquivo
  navigation/            abas + pilha
  state/                 contexto do app e o relógio injetável
```

A camada `domain/` não importa React nem banco. É onde vive a lógica que precisa
de teste, e é o contrato que o extrator de PDF deve produzir quando existir.

## Banco de dados

**SQLite no aparelho**, via `expo-sqlite`. Gratuito para sempre, sem conta e sem
servidor.

Local-first é decisão de produto, não economia. O app promete funcionar quando o
roaming acaba na imigração; nada sai do celular, o que também deixa a ficha de
privacidade das lojas em "não coleta dados". Sincronizar na nuvem depois é uma
camada acima de `db/repo.ts`, sem tocar em tela nenhuma.

Migrações são versionadas em `db/schema.ts` e aplicadas na abertura usando o
`user_version` do próprio SQLite — idempotente, sem tabela de controle.

## CRUD

| | Criar | Ler | Editar | Excluir |
|---|---|---|---|---|
| Viagem | ✅ | ✅ lista e detalhe | ✅ | ✅ apaga as reservas junto |
| Reserva | ✅ 5 tipos | ✅ | ✅ | ✅ |

Excluir sempre pede confirmação e diz o que será perdido.

### O que acontece ao cadastrar um voo

Você digita **só o horário de partida**. O app deriva abertura e fechamento do
check-in, horário de chegada ao aeroporto, início do embarque e fechamento do
portão — os sete momentos da linha do tempo.

Tudo que sai daí é **estimativa**, marcada com ponto tracejado. O que vier
impresso no documento sobrescreve e vira fato. É o que faz o cadastro manual já
valer alguma coisa, antes de existir extração de PDF.

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

- [x] **App funcional** — o usuário cria, edita e apaga viagens e reservas, e tudo persiste
- [ ] **Conta de desenvolvedor** — Apple US$ 99/ano, Google US$ 25 uma vez. Não há caminho gratuito para publicar.
- [ ] **Política de privacidade** com URL pública. As duas lojas exigem, mesmo sem coletar nada.
- [ ] **Ficha de privacidade** — declarar o que o app coleta. Hoje: nada sai do aparelho.
- [ ] **Capturas de tela** nos tamanhos de cada loja.

Identificadores já definidos: `app.embarcaly.mobile` nas duas plataformas.

## Estado

🟢 **Funcional e publicável.**

O que existe: CRUD completo em banco local, navegação, todas as telas, derivação
dos marcos do voo, domínio testado, marca aplicada e tema claro/escuro seguindo
o sistema.

O que não existe ainda: extração de PDF, back-end e sincronização, autenticação,
notificações push e anexo de arquivos. Nada disso bloqueia a publicação — são a
v2.
