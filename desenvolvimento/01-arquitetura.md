# Arquitetura — onde cada coisa mora

Um mapa do sistema e, mais importante, das **fronteiras**: o que cada camada
pode fazer e o que ela nunca faz.

> A regra que organiza tudo o que vem abaixo:
> **o que decide vai em `domain/`. Tela arruma pixel e chama função.**
>
> Não por elegância. É o único lugar onde o CI impede que quebre em silêncio.

---

## 1 · As quatro superfícies

O produto é um repositório e quatro coisas publicadas no mesmo domínio.

| Superfície | O que é | Quem abre | Tecnologia |
|---|---|---|---|
| `embarcaly.com` | Site institucional | Quem ainda não é usuário | HTML estático |
| `embarcaly.com/app/` | **O aplicativo** | Quem tem conta | Expo exportado para web |
| `embarcaly.com/acompanhar/#token` | A viagem de alguém, só leitura | Quem recebeu um link | HTML estático, ≤ 30 kB |
| `embarcaly.com/admin/` | Console de aprovação de avisos | Uma pessoa | HTML estático |

Mais o mesmo aplicativo empacotado para **Android** e **iPhone**, a partir do
mesmo `src/`.

**Por que três páginas HTML e não três rotas do app.** Cada uma tem um motivo
diferente, e nenhum deles é preferência:

- `acompanhar/` — quem recebe o link não pode baixar React Native para ler um
  itinerário ([DT2](00-decisoes-tecnicas.md#dt2--o-link-público-do-f5-é-página-estática-fora-do-expo)).
- `admin/` — dentro do app, iria para a loja junto
  ([DT10](00-decisoes-tecnicas.md#dt10--o-console-de-aprovação-fica-fora-do-aplicativo)).
- O institucional — é marketing, tem outro ciclo de mudança e outro público.

**`app/index.html` é transitório.** Hoje é a tela de entrada publicada. Depois da
[US.002](historias/US-002-entrar-validar-codigo.md), vira redirecionamento para o
app exportado. A ordem importa: primeiro a tela existe dentro do app, depois o
HTML deixa de ser destino.

---

## 2 · As camadas de `mobile/src/`

Da mais interna para a mais externa. **Dependência aponta sempre para dentro.**

```
theme/        tokens de cor, tipografia, espaçamento — não depende de nada
  ↑
domain/       TypeScript puro. Toda a regra. Gate de 100%
  ↑
db/           persistência. Duas implementações: nativo e web
  ↑
state/        AppState — o que está carregado agora
  ↑
components/   peças de interface reutilizáveis. Gate de 100%
  ↑
screens/      composição. Sem gate. Sem regra
  ↑
navigation/   rotas e parâmetros
```

### O que cada camada pode e não pode

| Camada | Pode | Nunca |
|---|---|---|
| `theme/` | Definir cor, fonte, espaço, alvo de toque | Conhecer o domínio |
| `domain/` | Decidir, calcular, formatar texto de regra | Importar React, SDK de backend, ou `db/` |
| `db/` | Ler, gravar, migrar | Decidir. É transporte |
| `state/` | Manter o que está carregado, orquestrar | Calcular regra |
| `components/` | Renderizar, receber tudo por propriedade | Buscar dado, conhecer viagem |
| `screens/` | Compor, navegar, chamar o domínio | **Conter regra, literal de domínio, ou valor padrão silencioso** |

**A última linha é a que tem guarda automática.** `src/screens/**` é varrido pelo
teste da [US.023](historias/US-023-guarda-de-dominio.md) atrás de literais que
deveriam estar no domínio.

### Por que `domain/` não importa nada

`src/domain/` é TypeScript puro: sem React, sem Expo, sem SDK de backend, sem
acesso a arquivo. Três consequências, e as três são o motivo:

1. **Testável sem ambiente.** Nenhum mock, nenhum renderizador. É o que torna
   100% de cobertura possível em vez de heroico.
2. **Portável.** A mesma função roda no app, no servidor e num script. É o que
   permite ao guia em PDF e ao aplicativo citarem o mesmo artigo da ANAC.
3. **Trocar de backend é trocar `db/`.** É a mitigação inteira do risco
   [R9](../plano/10-riscos.md).

---

## 3 · Os módulos de domínio

### O que já existe

| Módulo | Responsabilidade |
|---|---|
| `types.ts` | Os tipos. Sem código — está fora do gate de cobertura de propósito |
| `direitos.ts` | **O motor da ANAC.** Três gatilhos, dois trechos, as quatro saídas, a compensação |
| `cascata.ts` | O que mais quebra quando um voo muda |
| `derive.ts` | Marcos de voo calculados: `leaveBy`, `arriveBy`, fim padrão |
| `timeline.ts` | A linha do tempo de um voo, com `estimated` marcando o que é cálculo nosso |
| `time.ts` | Formatação de horário, contagem, duração, rótulo de intervalo |
| `passes.ts` | Estado do cartão de embarque |
| `verso.ts` | Os verbetes explicativos |
| `legal.ts` | **Fonte única dos avisos de proteção**, com teste que reprova esquecimento |
| `attachmentName.ts` | Nome de arquivo anexado |
| `sampleTrip.ts` | A viagem de exemplo |

### O que vai existir

| Módulo | História | Se errar |
|---|---|---|
| `aeroportos.ts` | [US.011](historias/US-011-socorro-trecho.md) | **Direito errado.** R5, e critério direto do G2 |
| `mudanca.ts` | [US.013](historias/US-013-aviso-tela.md) | **Aviso errado.** R4, dano classificado como fatal |
| `publico.ts` | [US.018](historias/US-018-compartilhar.md) | **Incidente de privacidade** |
| `acesso.ts` | [US.001](historias/US-001-entrar-pedir-codigo.md), [US.017](historias/US-017-acompanhar.md) | Cobrar de quem já pagou |
| `problema.ts` | [US.009](historias/US-009-registrar-problema.md) | Gatilho errado |
| `importacao.ts` | [EP-02](historias/EP-02-importacao.md) | Reserva errada, corrigível |
| `bcbp.ts` | [US.020](historias/US-020-passes-passageiro.md) | Nome errado no bilhete |

**Todo arquivo novo em `src/domain/` entra no gate sozinho.**
`collectCoverageFrom` já é `src/domain/**/*.ts` — não há configuração a tocar, e
não há como criar um módulo de regra sem cobertura por esquecimento.

---

## 4 · Persistência

### O aparelho é a fonte da verdade

Decidido em [DT5](00-decisoes-tecnicas.md#dt5--o-aparelho-é-a-fonte-da-verdade), e
já escrito no topo de `src/db/schema.ts` antes deste plano existir:

> *"o app promete funcionar quando o roaming acaba na imigração"*

A tela lê do aparelho, **sempre**. O servidor é cópia.

### Duas implementações, uma interface

| | Nativo | Web |
|---|---|---|
| Viagens e reservas | SQLite (`repo.ts`) | localStorage (`repo.web.ts`) |
| Anexos | Sistema de arquivos (`attachments.ts`) | IndexedDB (`attachments.web.ts`) |
| Seleção | — | Metro resolve `.web.ts` por extensão |

A escolha acontece na **resolução do bundler**, não em `if (Platform.OS)`. O
código que chama não sabe onde está rodando.

> ### O modo de falha deste repositório
>
> `repo.web.ts` é implementação **independente**. Uma coluna adicionada só em
> `schema.ts` compila, passa no teste, e **some no navegador**.
>
> Não é hipótese: são quatro arquivos `.web` hoje, e a divergência é silenciosa
> por construção. Por isso o CI ganha dois passos — `expo export --platform web`
> e a verificação de paridade — e por isso toda história que mexe em schema
> repete a frase *"com espelho em `repo.web.ts`"*.

### Instantes

Epoch em milissegundos, inteiro, sem fuso. A conversão para horário local
acontece **só na borda de apresentação**.

E uma regra que a importação trouxe e vale para o sistema todo: **o horário de um
voo é sempre o local da ponta correspondente**, nunca o do aparelho. Quem consulta
o voo de Lisboa estando em São Paulo precisa ver o horário de Lisboa.

### Migração

`SCHEMA_VERSION` 2 → 3 na semana 6. Os campos novos, reunidos:

| Campo | História |
|---|---|
| `Trip.passenger` | [US.020](historias/US-020-passes-passageiro.md) |
| `Trip.acompanhada`, `Trip.ofertaDispensada` | [US.017](historias/US-017-acompanhar.md) |
| `Trip.shareToken` | [US.018](historias/US-018-compartilhar.md) |
| `Item.bags` | [US.022](historias/US-022-reserva-bagagem.md) |
| `Item.status`, `Delay.gatilho`, `Delay.noDomicilio` | [US.009](historias/US-009-registrar-problema.md) |
| `Item.trechoConfirmado` | [US.011](historias/US-011-socorro-trecho.md) |
| Tabelas `mudancas` e `importacoes` | [EP-02](historias/EP-02-importacao.md), [EP-04](historias/EP-04-aviso.md) |

**Campo novo nasce nulo.** A tentação de preencher `Item.bags = 1` nas reservas
existentes, para a tela não mudar de aparência, transformaria o dado falso de hoje
em dado falso **persistido** — deixaria de ser um literal buscável no código e
viraria uma linha no banco de alguém.

---

## 5 · Sincronização

O Supabase entra **acima de `src/db/`**, como camada. Nenhuma tela muda.

```
screens/ ──► state/ ──► db/ ──► SQLite        (sempre, e é o que a tela lê)
                         │
                         └────► sync ────► Supabase   (quando dá)
```

**Gatilho.** `AppState` mudando para `active`, e depois de toda escrita. Não há
sincronização periódica em segundo plano: gasta bateria e dado móvel de alguém
que está viajando, que é o pior momento para isso.

**Conflito.** Último a escrever vence, por `updated_at`. Serve porque o dado é de
uma pessoa só, num aparelho por vez, no MVP — e `created_at`/`updated_at` **já
existem nas duas tabelas**, então não há mudança de schema local para sincronizar.

**Offline.** Escrita local sempre funciona, e entra numa fila. As únicas operações
que exigem rede são as que não podem ser desfeitas: entrar
([US.001](historias/US-001-entrar-pedir-codigo.md)), excluir a conta
([US.004](historias/US-004-conta-excluir.md)) e gerar ou revogar link
([US.018](historias/US-018-compartilhar.md)).

---

## 6 · O que fica no servidor, e só lá

| No servidor | Por quê |
|---|---|
| Hash do código de entrada | Nunca o código |
| Token de aparelho para push | Removido no `Sair` e na exclusão |
| Tokens de compartilhamento | Revogação precisa ser central para valer |
| Fila de importação | O e-mail chega lá |
| Fila de avisos pendentes | O console lê dela |
| Estado de cobrança | O app só lê um booleano |

| Nunca sai do aparelho | Por quê |
|---|---|
| Anexos | São os documentos da pessoa |
| Localizador, assento, sequência | Junto com o sobrenome, são credencial de reserva |
| Rascunho de importação não confirmado | Ainda não é dado, é proposta |

---

## 7 · Navegação

`RootStackParamList` hoje tem `Tabs`, `Item`, `Passes`, `TripForm`, `ItemForm` e
`DelayForm`. As rotas novas:

| Rota | Parâmetro | História |
|---|---|---|
| `Entrar` | — | [US.001](historias/US-001-entrar-pedir-codigo.md) |
| `Conta` | — | [US.003](historias/US-003-conta-sair.md) |
| `Import` | — | [US.005](historias/US-005-importar-endereco.md) |
| `ImportReview` | `{ id }` | [US.007](historias/US-007-revisar-confirmar.md) |
| `ProblemaForm` | `{ id }` | [US.009](historias/US-009-registrar-problema.md) — renomeia `DelayForm` |
| `Aviso` | `{ id }` | [US.013](historias/US-013-aviso-tela.md) |
| `Acompanhar` | `{ tripId }` | [US.017](historias/US-017-acompanhar.md) |
| `Compartilhar` | `{ tripId }` | [US.018](historias/US-018-compartilhar.md) |

**`Aviso` recebe `{ id }` e nada mais.** Se a rota aceitasse conteúdo, alguém
acabaria passando o payload do push por ela — e o payload é dado de rede, que
chega truncado, duplicado e potencialmente adulterado.

**As abas continuam cinco.** `Conta` entra pelo topo da aba `Docs`. Seis abas não
cabem em 375px sem apertar o alvo de toque abaixo de 44px.

---

## 8 · Configuração de build

`app.json` está no v2 e precisa de quatro mudanças na semana 5:

| O quê | Hoje | Vai ser |
|---|---|---|
| `web.bundler` | ausente | `"metro"` |
| `web.output` | ausente | `"single"` — nunca `"static"` |
| `primaryColor` | `#B0432B` | `#33366A` |
| Splash | `#FBFAF7` / `#1A2025` | paleta v3 |
| `adaptiveIcon.backgroundColor` | `#171C20` | paleta v3 |
| `extra.eas.projectId` | `""` | preenchido — **vazio trava o build de loja** |

E na raiz publicada: **`.nojekyll`** — o export emite `_expo/static/js/…` e o
Jekyll do GitHub Pages remove pasta com underscore. Sem isso: tela branca, sem
erro no console.

E `404.html`, cópia do `index.html`, senão qualquer recarregamento em
`/app/Passes` dá 404.

**Dependência a acrescentar:** `expo-notifications`, na semana 8
([US.014](historias/US-014-aviso-push.md)). Não está instalada hoje.

---

## 9 · O diagrama inteiro

```
   Android / iPhone            Navegador
        │                          │
        └──────────┬───────────────┘
                   │
            mobile/src/screens
                   │
            mobile/src/state
                   │
            mobile/src/db ──────► SQLite  ou  localStorage + IndexedDB
                   │                     (fonte da verdade)
                   │
                  sync
                   │
                   ▼
   ┌──────────── Supabase ────────────┐
   │  Auth · Postgres · RLS           │
   │  filas de importação e de aviso  │
   └───┬──────────────┬───────────────┘
       │              │
       ▼              ▼
  admin/         acompanhar/#token
  (aprova)       (só leitura, whitelist, ≤ 30 kB)

  mobile/src/domain  ──  puro, sem dependência, gate de 100%
                         usado por todas as camadas acima
```
