# US.000 · Publicar o app como site

---

## 0 · PRD

**Problema.** Dez telas prontas, quatro arquivos de variação web escritos, e
nenhuma forma de abrir. O produto existe e é inacessível.

**Objetivo.** `embarcaly.com/app/` abre o aplicativo Expo no navegador, em
celular e em computador, sem instalar nada.

**Por que agora.** Todas as outras histórias entregam em cima disto. E porque o
caminho alternativo — publicar na loja primeiro — depende de conta Google Play,
verificação de identidade e dias de fila.

**Métrica de sucesso.** O app abre nos dois sistemas; recarregar numa rota
interna não dá 404; o export web passa no CI.

**Escopo.** Configuração de saída, publicação, `.nojekyll`, fallback de rota e a
atualização do `app.json` para o v3.

**Fora de escopo.** Service worker, offline pela web, instalação como PWA,
otimização de bundle. Tudo isso é depois do G2.

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.000 |
| **Título** | Publicar o app como site |
| **User Story** | Eu, como **organizador que ainda não instalou nada**,<br><br>Quero **abrir o Embarcaly por um link no navegador do meu celular**,<br><br>Para que **eu possa experimentar o aplicativo antes de decidir instalar**. |
| **Épico Relacionado** | [EP-00 · O app na web](EP-00-app-na-web.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.000.01** | Saída em arquivo único | O export web usa `web.output: "single"`. O modo `"static"` só pré-renderiza com expo-router, e este repositório usa React Navigation | **Dado que** o `app.json` declara `web.bundler: "metro"` e `web.output: "single"`,<br>**Quando** `expo export --platform web` roda,<br>**Então** é emitido um `index.html` que carrega o bundle e resolve as rotas no cliente |
| **RN.000.02** | Pasta com underscore precisa sobreviver | O export emite `_expo/static/js/…`. O Jekyll do GitHub Pages remove pasta iniciada por underscore | **Dado que** existe `.nojekyll` na raiz publicada,<br>**Quando** a página é servida,<br>**Então** os arquivos sob `_expo/` respondem 200 |
| **RN.000.03** | Rota interna recarregada não pode dar 404 | O servidor não conhece as rotas do cliente. O fallback é o próprio `index.html` | **Dado que** o usuário está em `/app/Passes`,<br>**Quando** ele recarrega a página,<br>**Então** a aplicação carrega e apresenta a tela de cartões de embarque |
| **RN.000.04** | A casca acompanha a marca | Ícone, splash e cor primária do `app.json` seguem o v3 — azul `#33366A`, nunca o creme e o terracota do v2 | **Dado que** o aplicativo é aberto pela primeira vez,<br>**Quando** a tela de abertura aparece,<br>**Então** ela usa a paleta v3 e não há salto de cor até a primeira tela |
| **RN.000.05** | Split web quebrado reprova o CI | Um `.web.tsx` que não compila só aparece no navegador, nunca no teste unitário | **Dado que** um arquivo `.web.tsx` tem erro,<br>**Quando** o pipeline roda,<br>**Então** o passo `expo export --platform web` falha e o merge é bloqueado |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.000.01** — `embarcaly.com/app/` carrega o aplicativo em Android e em iPhone, e a lista de viagens aparece.
- [ ] **AC.000.02** — Recarregar em `/app/Passes`, `/app/Item/<id>` e `/app/Socorro` funciona nas três rotas.
- [ ] **AC.000.03** — Nenhum 404 no console para arquivos sob `_expo/`.
- [ ] **AC.000.04** — Em 375px e em 1280px, nenhuma tela rola lateralmente.
- [ ] **AC.000.05** — Campo de texto em iPhone **não provoca zoom** ao receber foco (fonte ≥ 16px).
- [ ] **AC.000.06** — Área segura respeitada: nada fica sob a barra de gestos do iPhone.
- [ ] **AC.000.07** — O CI tem o passo `expo export --platform web` e ele está verde.
- [ ] **AC.000.08** — `app.json` não contém mais nenhum valor do v2 (`#B0432B`, `#FBFAF7`, `#1A2025`, `#171C20`).
- [ ] **AC.000.09** — Os dados gravados pela web persistem entre recarregamentos (localStorage via `repo.web.ts`).
- [ ] **AC.000.10** — Anexar arquivo pela web funciona e o arquivo reabre depois de recarregar (IndexedDB via `attachments.web.ts`).

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Build web | Sempre | CI | Gera `dist/` | `expo export --platform web --output-dir dist` |
| Publicação | Push em `main` | GitHub Actions | Copia `dist/` para `/app/` | `on: push: branches: [main]` |
| Fallback de rota | Rota desconhecida | GitHub Pages | Serve `index.html` | `cp dist/index.html dist/404.html` no build |
| Jekyll | Sempre | GitHub Pages | Desligado | Arquivo `.nojekyll` na raiz publicada |
| Escolha de implementação | Plataforma web | Metro | Resolve `.web.ts(x)` | `Platform.OS === 'web'` na resolução do bundler |
| Persistência | Web | `repo.web.ts` | localStorage | `import` resolvido por extensão, sem `if` no código |
| Persistência | Nativo | `repo.ts` | SQLite | `expo-sqlite` |

---

## 5 · Notas Técnicas e Dependências

**Integrações.** Nenhuma. É configuração de build e publicação.

**Alterações de arquivo.**

| Arquivo | Mudança |
|---|---|
| `mobile/app.json` | `web.bundler: "metro"`, `web.output: "single"`, paleta v3, `extra.eas.projectId` |
| `.github/workflows/` | Passo de export web, cópia do `dist/`, geração do `404.html` |
| Raiz publicada | `.nojekyll` |
| `app/index.html` | Vira redirecionamento para o app exportado, depois da [US.002](US-002-entrar-validar-codigo.md) |

**Segurança e Privacidade.** localStorage e IndexedDB são por origem e por
navegador. Aparelho compartilhado significa dados compartilhados — e a
[US.003](US-003-conta-sair.md) precisa apagar os dois no `Sair`.

**Testes.** Não há teste unitário desta história: o que ela entrega é
configuração. A proteção é o **passo de CI**, que é o que impede regressão nos
quatro splits web que já existem.

**Feature Flag.** Não se aplica. A publicação é o interruptor.

**Impacto em outras áreas.** `app/index.html`, hoje a tela de entrada publicada,
deixa de ser destino e passa a ser redirecionamento. Precisa acontecer **depois**
da US.002, nunca antes.

---

## 6 · Artefatos e Arquivos Relacionados

- **Decisão:** [DT1 em `desenvolvimento/00-decisoes-tecnicas.md`](../00-decisoes-tecnicas.md)
- **Arquitetura:** [`desenvolvimento/01-arquitetura.md`](../01-arquitetura.md)
- **Código existente:** `mobile/src/db/repo.web.ts`, `mobile/src/db/attachments.web.ts`, `mobile/src/components/DateTimeField.web.tsx`
- **Marca:** [`brand/IDENTIDADE.md`](../../brand/IDENTIDADE.md) — paleta v3
- **Manifesto PWA:** `app/manifest.webmanifest`
