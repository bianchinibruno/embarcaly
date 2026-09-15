# US.008 · Completar o que a extração não achou

---

## 0 · PRD

**Problema.** Nenhum parser acerta tudo. A companhia muda o formato do e-mail, o
passeio vem de um fornecedor pequeno, o carro tem a retirada num campo e a
devolução em outro. Quando falta um campo, existem três caminhos: inventar,
desistir, ou perguntar.

**Objetivo.** Perguntar — e perguntar **só o que falta**, um campo por vez, com o
e-mail original ao lado.

**Por que isso é o que salva o F1.** Um parser que cobre 70% e pergunta os 30%
restantes entrega 100% das reservas. Um parser que cobre 70% e falha nos 30%
entrega 70% e ensina a pessoa a não confiar. A diferença entre os dois é esta
tela.

**Métrica de sucesso.** Proposta com pendência é concluída em ≥ 80% dos casos.
Nenhuma reserva é criada com campo inventado.

**Escopo.** Os campos pendentes, o preenchimento assistido, e a regra do que é
obrigatório.

**Fora de escopo.** Edição livre da proposta inteira — para isso existe o
formulário de reserva, depois de confirmada.

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.008 |
| **Título** | Completar o que a extração não achou |
| **User Story** | Eu, como **organizador cuja confirmação de passeio veio num formato esquisito**,<br><br>Quero **preencher só o que faltou, com o e-mail original à vista**,<br><br>Para que **a reserva entre certa sem eu digitar tudo de novo**. |
| **Épico Relacionado** | [EP-02 · Entrada sem digitação](EP-02-importacao.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.008.01** | Obrigatório é o que o aplicativo precisa para funcionar | Pedir campo que o produto não usa é atrito gratuito | **Dado que** uma proposta chega,<br>**Quando** as pendências são calculadas,<br>**Então** são obrigatórios apenas: tipo, título e início — o resto é opcional |
| **RN.008.02** | Um campo por vez, na ordem | Formulário com seis campos vazios parece trabalho; um campo por vez parece resposta | **Dado que** há três pendências,<br>**Quando** a revisão abre,<br>**Então** a primeira é apresentada sozinha, com "1 de 3" visível |
| **RN.008.03** | O trecho do e-mail fica à vista | Pedir um horário sem mostrar onde ele está no e-mail é pedir para a pessoa procurar | **Dado que** a pendência é o horário de partida,<br>**Quando** o campo é apresentado,<br>**Então** o trecho do e-mail original aparece junto, com o candidato mais provável destacado |
| **RN.008.04** | Candidato é sugestão, e a escolha é explícita | Preencher com o candidato e deixar a pessoa "confirmar" é a mesma coisa que inventar | **Dado que** há um candidato provável,<br>**Quando** ele é exibido,<br>**Então** o campo está **vazio** e o candidato aparece como sugestão a ser tocada |
| **RN.008.05** | Campo opcional pode ser pulado | Bloquear por falta de assento é bloquear por nada | **Dado que** a pendência é um campo opcional,<br>**Quando** a pessoa aciona "Pular",<br>**Então** o campo fica vazio, a reserva é válida e a tela segue |
| **RN.008.06** | Nada é inventado, nunca | O defeito que a [US.011](US-011-socorro-trecho.md) corrige no motor de direitos é o mesmo aqui | **Dado que** um campo obrigatório não foi encontrado,<br>**Quando** a proposta é montada,<br>**Então** ele fica **vazio e marcado**, e nenhum valor padrão é atribuído |
| **RN.008.07** | Progresso não se perde | Perder três campos preenchidos porque o app foi para segundo plano faz a pessoa não voltar | **Dado que** a pessoa preencheu 2 de 3 e saiu do aplicativo,<br>**Quando** ela volta,<br>**Então** continua na terceira, com as duas anteriores salvas |
| **RN.008.08** | Formato recusado explica o formato | "Valor inválido" não ensina nada | **Dado que** a pessoa digita `25/13/2026`,<br>**Quando** o campo é validado,<br>**Então** a mensagem diz qual formato é esperado e mostra um exemplo |
| **RN.008.09** | Desistir vira cadastro manual, com o que já existe | Quem desiste no meio não pode voltar à estaca zero | **Dado que** a pessoa aciona "Prefiro cadastrar à mão",<br>**Quando** o formulário de reserva abre,<br>**Então** ele vem preenchido com tudo que a extração conseguiu |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.008.01** — Proposta sem tipo, título ou início apresenta esses campos como pendências e bloqueia a confirmação.
- [ ] **AC.008.02** — Falta de assento, portão, localizador ou bagagem **não** bloqueia a confirmação.
- [ ] **AC.008.03** — As pendências são apresentadas uma por vez, com contador "N de M".
- [ ] **AC.008.04** — O trecho do e-mail aparece junto ao campo, com o candidato destacado.
- [ ] **AC.008.05** — O campo começa **vazio**; tocar a sugestão é o que o preenche.
- [ ] **AC.008.06** — "Pular" está disponível apenas em campos opcionais.
- [ ] **AC.008.07** — Sair do aplicativo e voltar preserva o que já foi preenchido.
- [ ] **AC.008.08** — Data inválida mostra o formato esperado com exemplo.
- [ ] **AC.008.09** — "Prefiro cadastrar à mão" abre o formulário já preenchido com o que foi extraído.
- [ ] **AC.008.10** — Nenhum campo da proposta tem valor padrão atribuído pelo sistema; a guarda de domínio confirma.
- [ ] **AC.008.11** — Teclado não cobre o campo em foco em 375px.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Campo obrigatório ausente | `type`, `title` ou `start` | Domínio | Entra em `needs`, bloqueia | `faltando(proposta)` |
| Campo opcional ausente | Demais campos | Domínio | Não entra em `needs` | — |
| Candidato encontrado | Padrão casou no texto | Servidor | Sugestão, campo vazio | `candidatos[campo]`, nunca atribuído |
| Nenhum candidato | — | Frontend | Campo vazio, sem sugestão | — |
| Preenchimento | A cada campo | Cliente | Grava rascunho local | `importacao.rascunho`, imediato |
| Pular | Campo opcional | Cliente | Marca resolvido, valor vazio | Nunca em obrigatório |
| Todos resolvidos | `faltando().length === 0` | Frontend | Habilita confirmar | Volta para [US.007](US-007-revisar-confirmar.md) |
| Desistir | Toque | Frontend | Abre `ItemForm` preenchido | `navigate('ItemForm', { rascunho })` |
| Formato inválido | Validação do campo | Domínio | Mensagem com exemplo | Mensagem por tipo de campo |

---

## 5 · Notas Técnicas e Dependências

**Domínio.** `src/domain/importacao.ts` ganha:

| Função | Responsabilidade |
|---|---|
| `OBRIGATORIOS: readonly (keyof ItemInput)[]` | `['type', 'title', 'start']` |
| `faltando(p: Partial<ItemInput>): string[]` | Quais obrigatórios estão vazios |
| `rotuloCampo(campo: string): string` | Nome em português, para tela e mensagem |

**Por que só três campos obrigatórios.** É o que `derive.ts` e `timeline.ts`
precisam para funcionar. Todo campo a mais na lista é uma pergunta a mais entre a
pessoa e a reserva importada, e o custo de cada pergunta é abandono.

**Segurança e Privacidade.** O trecho do e-mail exibido ao lado do campo é o
mesmo corpo já coberto pela [US.007](US-007-revisar-confirmar.md), com o mesmo
prazo de descarte. Nenhum trecho vai para log.

**Testes.** `importacao.test.ts` cobre `faltando` com: proposta vazia (3
pendências); só `title` preenchido (2); os três preenchidos (0); `title` com
string vazia e com espaços (conta como faltando); `start` com data inválida
(conta como faltando).

**Feature Flag.** `importacaoAtiva`.

**Impacto em outras áreas.** `ItemFormScreen` ganha a capacidade de abrir
pré-preenchido por um rascunho. É a única mudança fora da importação.

---

## 6 · Artefatos e Arquivos Relacionados

- **Anterior:** [US.007](US-007-revisar-confirmar.md)
- **Tipos:** `mobile/src/domain/types.ts` — `Item.needs`
- **Formulário:** `mobile/src/screens/ItemFormScreen.tsx`
- **Campos:** `mobile/src/components/form.tsx`, `DateTimeField.tsx`, `DateTimeField.web.tsx`
- **Qualidade:** [`04-qualidade.md`](../04-qualidade.md)
