# US.007 · Confirmar a reserva proposta

---

## 0 · PRD

**Problema.** Um parser que escreve direto no itinerário é pior do que digitar.
A pessoa confia no que está na tela, não confere, e chega no aeroporto com o
horário errado — ou no fuso errado, que é o erro mais comum e o mais invisível.

**Objetivo.** Toda extração vira **proposta**. A pessoa vê o que foi entendido,
compara com o original e confirma. Um toque quando está certo.

**A decisão que define esta história.**

> **O parser produz proposta, não fato.**

Não é cautela genérica. `Item.needs` já existe em `src/domain/types.ts` desde
antes desta história, descrito como *"campo que a extração não encontrou e
precisa do usuário"*. O produto já foi desenhado com esta ideia; falta a tela.

**Métrica de sucesso.** ≥ 70% das reservas confirmadas **sem nenhuma edição** —
que é o critério do G2. Confirmação em um toque quando não há pendência.

**Escopo.** Ver a proposta, comparar com a origem, confirmar, descartar.

**Fora de escopo.** Preencher o que faltou — [US.008](US-008-revisar-completar.md).

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.007 |
| **Título** | Confirmar a reserva proposta |
| **User Story** | Eu, como **organizador que encaminhou a confirmação do voo**,<br><br>Quero **conferir o que o Embarcaly entendeu antes de virar reserva**,<br><br>Para que **eu não descubra no aeroporto que o horário estava errado**. |
| **Épico Relacionado** | [EP-02 · Entrada sem digitação](EP-02-importacao.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.007.01** | Nada entra sem confirmação | Confirmação automática é o defeito que esta história existe para impedir | **Dado que** a extração terminou com sucesso total,<br>**Quando** a proposta é criada,<br>**Então** ela **não** aparece no itinerário até a pessoa confirmar |
| **RN.007.02** | A proposta mostra a origem de cada campo | Sem saber de onde veio, conferir é adivinhar | **Dado que** a proposta está aberta,<br>**Quando** a pessoa olha um campo extraído,<br>**Então** ele aparece com a marcação de extraído, distinta de campo calculado por nós |
| **RN.007.03** | Horário calculado não se confunde com horário do documento | O produto calcula `leaveBy`, `arriveBy` e marcos. Misturar cálculo nosso com dado da companhia é o caminho para o usuário confiar no que não deve | **Dado que** a proposta tem marcos calculados,<br>**Quando** eles aparecem,<br>**Então** estão marcados como estimativa, como já faz `TimelineStep.estimated` |
| **RN.007.04** | O e-mail original fica acessível | Conferir exige ter os dois lados | **Dado que** a proposta está aberta,<br>**Quando** a pessoa aciona "Ver e-mail original",<br>**Então** o texto recebido aparece, sem sair da revisão |
| **RN.007.05** | O fuso é sempre o do local | Horário de voo em fuso errado é o erro mais caro e o menos visível | **Dado que** o voo parte de Lisboa,<br>**Quando** o horário é exibido,<br>**Então** é o horário local de Lisboa, e a tela diz "horário local" |
| **RN.007.06** | Confirmar com pendência é bloqueado | Confirmar uma reserva sem horário de partida cria um item que quebra o resto do aplicativo | **Dado que** a proposta tem campos em `needs`,<br>**Quando** a pessoa tenta confirmar,<br>**Então** o botão está indisponível e as pendências estão destacadas |
| **RN.007.07** | Confirmar é um toque quando está tudo certo | Fluxo de oito reservas com três toques cada é fluxo que não se conclui | **Dado que** a proposta não tem pendência,<br>**Quando** a pessoa aciona "Confirmar",<br>**Então** a reserva entra no itinerário e a revisão fecha, sem diálogo adicional |
| **RN.007.08** | Descartar não apaga o e-mail | A pessoa pode descartar por engano, e o e-mail é a única prova do que chegou | **Dado que** a pessoa descarta a proposta,<br>**Quando** a ação conclui,<br>**Então** o item sai da fila, o e-mail original permanece recuperável por 7 dias, e a tela informa isso |
| **RN.007.09** | A viagem de destino é escolhida, com sugestão | Reserva na viagem errada é pior que reserva não importada | **Dado que** a pessoa tem mais de uma viagem,<br>**Quando** a proposta abre,<br>**Então** a viagem sugerida é a que contém a data da reserva, e é trocável num toque |
| **RN.007.10** | Anexo vira anexo | O PDF do bilhete é o que a pessoa vai querer no balcão | **Dado que** o e-mail tinha anexo,<br>**Quando** a reserva é confirmada,<br>**Então** o anexo é gravado na reserva, com o nome original |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.007.01** — Proposta sem pendência é confirmada em um toque e aparece no itinerário na posição certa.
- [ ] **AC.007.02** — Campo extraído e campo calculado têm marcações visualmente distintas.
- [ ] **AC.007.03** — "Ver e-mail original" mostra o texto recebido sem sair da revisão.
- [ ] **AC.007.04** — Voo internacional exibe o horário local de cada ponta, com o rótulo "horário local".
- [ ] **AC.007.05** — Com pendência, confirmar está indisponível e as pendências estão destacadas.
- [ ] **AC.007.06** — Descartar remove da fila, informa o prazo de 7 dias e não apaga o e-mail.
- [ ] **AC.007.07** — Com mais de uma viagem, a sugestão é a que contém a data, e é trocável.
- [ ] **AC.007.08** — Anexo do e-mail é gravado na reserva e reabre depois de fechar o aplicativo.
- [ ] **AC.007.09** — Confirmação funciona offline: a reserva entra no aparelho e sincroniza depois.
- [ ] **AC.007.10** — A tela exibe `AVISO_CALCULO`, de `legal.ts`.
- [ ] **AC.007.11** — 375px e 1280px sem rolagem lateral; toques ≥ 44px.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Proposta completa | `needs.length === 0` | Frontend | Confirmar habilitado | — |
| Proposta incompleta | `needs.length > 0` | Frontend | Confirmar bloqueado, pendências no topo | [US.008](US-008-revisar-completar.md) |
| Viagem sugerida | `proposta.start` dentro de `[trip.start, trip.end]` | Domínio | Pré-seleciona | `sugerirViagem(proposta, trips)` |
| Nenhuma viagem casa | — | Frontend | Oferece criar viagem nova | Pré-preenche nome e datas pela reserva |
| Confirmar | Online ou offline | Cliente | Grava local, enfileira sincronização | `createItem` de `AppState` |
| Descartar | — | Cliente + Servidor | Sai da fila, e-mail retido 7 dias | `estado = 'descartado'`, `expurgo_em = +7d` |
| Anexo presente | — | Servidor → Cliente | Baixa e grava | `attachments.add`, nome original |
| Fuso | Sempre | Domínio | Horário local de cada ponta | Fuso do aeroporto, nunca o do aparelho |

---

## 5 · Notas Técnicas e Dependências

**Domínio.** `src/domain/importacao.ts` ganha:

| Função | Responsabilidade |
|---|---|
| `sugerirViagem(proposta, trips): string \| undefined` | Qual viagem contém a data |
| `pendencias(proposta): string[]` | Quais campos obrigatórios faltam |
| `podeConfirmar(proposta): boolean` | Portão único, usado pela tela |

O nome `pendencias` já existe em `src/domain/cascata.ts` com outro significado.
**Não reutilizar.** Aqui o nome é `faltando`, para não haver dois conceitos com
o mesmo nome em dois módulos.

**Fuso horário.** É o risco técnico real desta história. A regra: o horário de um
voo é sempre o **local da ponta correspondente**, nunca o do aparelho. Uma pessoa
que consulta o voo de Lisboa estando em São Paulo precisa ver o horário de
Lisboa. Vai para o domínio, com teste, e nunca para a tela.

**Segurança e Privacidade.** O corpo do e-mail é exibido apenas durante a
revisão e é descartado depois da confirmação, ou em 7 dias no caso de descarte.
O prazo precisa constar da política de privacidade.

**Testes.** `importacao.test.ts` cobre: data exatamente no `start` e exatamente
no `end` da viagem (fronteiras inclusivas); data um dia fora; nenhuma viagem
casando; duas viagens casando (escolhe a mais próxima do início); `podeConfirmar`
com 0 e com 1 pendência.

**Feature Flag.** `importacaoAtiva`.

**Impacto em outras áreas.** `ItemFormScreen` não muda — a revisão é tela
própria, porque o formulário de edição tem outra intenção e misturar as duas
transforma as duas em uma pior.

---

## 6 · Artefatos e Arquivos Relacionados

- **Anterior:** [US.006](US-006-importar-fila.md)
- **Próxima:** [US.008 · Completar o que a extração não achou](US-008-revisar-completar.md)
- **Tipos:** `mobile/src/domain/types.ts` — `Item.needs` já existe
- **Telas:** `mobile/src/screens/ItemFormScreen.tsx` (referência de campos), `ItineraryScreen.tsx`
- **Anexos:** `mobile/src/components/Attachments.tsx`
