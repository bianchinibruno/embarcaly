# US.003 · Sair, avisos e links legais

---

## 0 · PRD

**Problema.** Quem entrou não tem como sair. Num aplicativo que abre no
navegador, isso significa que a viagem de uma pessoa fica visível para a próxima
que usar aquele aparelho.

**Objetivo.** Uma tela `Conta` com cinco linhas: o e-mail que está conectado,
avisos, termos, privacidade e sair.

**Por que agora.** É a casca onde a [US.004](US-004-conta-excluir.md) mora, e a
US.004 é bloqueador de publicação na Play Store. Construir a casca separada da
exclusão mantém as duas histórias pequenas e testáveis.

**Métrica de sucesso.** Sair limpa tudo — sessão, dados locais e anexos — e volta
para `Entrar` sem deixar rastro no aparelho.

**Escopo.** A tela, o e-mail conectado, a preferência de aviso, os links legais,
a versão do aplicativo e o `Sair`.

**Fora de escopo.** **Perfil inteiro.** Nome, foto, fuso, idioma, preferências de
exibição, aparelhos conectados. A tela não tem nenhum campo editável além do
interruptor de aviso.

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.003 |
| **Título** | Sair, avisos e links legais |
| **User Story** | Eu, como **organizador que usa o app no celular e às vezes num computador emprestado**,<br><br>Quero **ver com qual e-mail estou conectado e conseguir sair**,<br><br>Para que **minha viagem não fique aberta para quem usar o aparelho depois de mim**. |
| **Épico Relacionado** | [EP-01 · Conta e identidade](EP-01-conta.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.003.01** | O e-mail conectado fica visível | Em aparelho compartilhado, saber de quem é a sessão é a informação mais útil da tela | **Dado que** a pessoa abre `Conta`,<br>**Quando** a tela carrega,<br>**Então** o e-mail da sessão aparece na primeira linha, em texto selecionável |
| **RN.003.02** | Sair pede confirmação | Sair apaga dados locais. É destrutivo e não pode acontecer por toque errado | **Dado que** a pessoa aciona "Sair",<br>**Quando** a confirmação aparece,<br>**Então** ela diz que os dados desta viagem serão removidos **deste aparelho** e exige um segundo toque |
| **RN.003.03** | Sair limpa os três depósitos | Sessão, banco local e anexos moram em lugares diferentes. Limpar só a sessão deixa a viagem no aparelho | **Dado que** a pessoa confirmou a saída,<br>**Quando** a limpeza termina,<br>**Então** sessão, dados de viagem e anexos foram apagados, e a tela `Entrar` aparece |
| **RN.003.04** | Sair funciona offline | A pessoa pode precisar sair justamente onde não há rede | **Dado que** o aparelho está sem conexão,<br>**Quando** a pessoa confirma a saída,<br>**Então** a limpeza local acontece e a sessão é descartada, mesmo sem resposta do servidor |
| **RN.003.05** | O interruptor de aviso é local e imediato | Preferência de notificação que exige salvar é preferência que ninguém muda | **Dado que** a pessoa desliga "Avisos de mudança",<br>**Quando** o interruptor muda,<br>**Então** a preferência é gravada na hora, sem botão de salvar |
| **RN.003.06** | Desligar aviso não desliga o produto | Quem desliga o push continua tendo direito a ver o aviso quando abrir | **Dado que** os avisos estão desligados,<br>**Quando** uma mudança acontece,<br>**Então** o registro é criado e aparece em `Socorro`, mas nenhum push é enviado |
| **RN.003.07** | Links legais abrem fora do app | Termos e privacidade são páginas publicadas, com versão e data. Copiar o texto para dentro cria uma segunda versão | **Dado que** a pessoa aciona "Termos de uso",<br>**Quando** o link abre,<br>**Então** é `embarcaly.com/termos` no navegador, e o aplicativo continua onde estava |
| **RN.003.08** | A versão aparece | Sem número de versão, suporte vira adivinhação | **Dado que** a tela está visível,<br>**Quando** a pessoa rola até o fim,<br>**Então** vê a versão do aplicativo em Plex Mono, discreta |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.003.01** — `Conta` mostra o e-mail conectado, e o texto pode ser selecionado e copiado.
- [ ] **AC.003.02** — "Sair" abre confirmação com texto explícito sobre remoção local; cancelar não altera nada.
- [ ] **AC.003.03** — Após sair, abrir o aplicativo de novo apresenta a tela `Entrar` e **nenhuma viagem** está listada.
- [ ] **AC.003.04** — Após sair na web, `localStorage` e IndexedDB da origem estão vazios.
- [ ] **AC.003.05** — Sair funciona com o aparelho em modo avião.
- [ ] **AC.003.06** — O interruptor de aviso persiste entre sessões.
- [ ] **AC.003.07** — Termos e privacidade abrem as páginas publicadas, no navegador.
- [ ] **AC.003.08** — A tela exibe `AVISO_ATIVIDADE`, vindo de `legal.ts`, sem uma palavra reescrita.
- [ ] **AC.003.09** — `legal.ts` ganha a superfície `telaConta` e `legal.test.ts` passa.
- [ ] **AC.003.10** — Nenhum campo editável além do interruptor; a tela não tem botão "Salvar".
- [ ] **AC.003.11** — Toques com ≥ 44px; 375px e 1280px sem rolagem lateral.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Abrir a tela | Sessão válida | Cliente | Mostra e-mail e versão | `sessao.email`, `Constants.expoConfig.version` |
| Sair — pedido | — | Frontend | Abre `Confirm` | Componente `Confirm` já existe |
| Sair — confirmado | — | Cliente | Limpa 3 depósitos, navega | `signOut()` → `repo.limparTudo()` → `attachments.limparTudo()` → `reset('Entrar')` |
| Sair — offline | Sem rede | Cliente | Limpa local mesmo assim | `signOut().catch(() => {})`, limpeza sempre roda |
| Aviso ligado → desligado | — | Cliente → Servidor | Grava local, sincroniza depois | `prefs.avisos = false`; fila se offline |
| Aviso desligado, mudança ocorre | — | Servidor | Grava registro, **não** envia push | `IF prefs.avisos === false THEN gravar E NOT enviar` |
| Termos / Privacidade | — | Navegador | Abre URL externa | `Linking.openURL` |

---

## 5 · Notas Técnicas e Dependências

**Integrações.** Supabase Auth `signOut`. Nenhuma outra.

**Navegação.** `RootStackParamList` ganha `Conta: undefined`. A entrada fica na
aba `Docs`, no topo — não vira sexta aba. Cinco abas já é o limite do que cabe em
375px sem apertar o alvo de toque abaixo de 44px.

**Limpeza local — os três depósitos.** É onde esta história erra se errar:

| Depósito | Nativo | Web |
|---|---|---|
| Sessão | Armazenamento seguro | `localStorage` |
| Viagens e reservas | SQLite, `repo.ts` | `localStorage`, `repo.web.ts` |
| Anexos | Sistema de arquivos, `attachments.ts` | IndexedDB, `attachments.web.ts` |

`repo.web.ts` e `attachments.web.ts` são implementações independentes. Uma função
`limparTudo()` escrita só em `repo.ts` compila, passa no teste e **deixa os dados
no navegador**. As duas assinaturas precisam existir, e o passo de paridade web
no CI é o que garante isso.

**Segurança e Privacidade.** Sair é remoção local, não exclusão de conta —
[US.004](US-004-conta-excluir.md) trata disso. A confirmação precisa deixar a
diferença explícita, senão a pessoa acha que excluiu e não excluiu.

**Testes.** A limpeza é testada nas duas implementações de repositório. O teste
que importa: gravar viagem, sair, reabrir, afirmar lista vazia — em `repo.ts` e
em `repo.web.ts`.

**Feature Flag.** Não se aplica.

**Impacto em outras áreas.** `DocsScreen` ganha a entrada da tela. A seção
"Pessoais" dela é removida pela [US.021](US-021-docs-contagem.md); as duas
histórias tocam o mesmo arquivo e conviria fazê-las na mesma semana se a ordem
permitir.

---

## 6 · Artefatos e Arquivos Relacionados

- **Componentes existentes:** `mobile/src/components/Confirm.tsx`, `primitives.tsx`
- **Repositórios:** `mobile/src/db/repo.ts`, `mobile/src/db/repo.web.ts`, `mobile/src/db/attachments.ts`, `mobile/src/db/attachments.web.ts`
- **Avisos:** `mobile/src/domain/legal.ts`
- **Páginas publicadas:** [`termos/index.html`](../../termos/index.html), [`privacidade/index.html`](../../privacidade/index.html)
- **Próxima história:** [US.004 · Excluir a conta](US-004-conta-excluir.md)
