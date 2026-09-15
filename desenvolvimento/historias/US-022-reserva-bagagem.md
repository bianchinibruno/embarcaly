# US.022 · Ver a bagagem que eu realmente despachei

---

## 0 · PRD

**Problema.** `ItemScreen.tsx`, **linha 126**:

```tsx
<DataRow k="Bagagem" v="1 despachada" />
```

Toda reserva de voo do aplicativo diz que há uma bagagem despachada. Não há
campo, não há origem, não há como ser verdade em mais de um caso por acaso.

**É o pior dos cinco cotos.** Os outros mostram dado errado; este faz alguém
tomar uma decisão errada. A pessoa compra passagem só com bagagem de mão, abre o
aplicativo, lê "1 despachada", e chega no balcão com uma mala e uma tarifa que
não a cobre. Ou o contrário: despacha achando que já estava incluso.

**Objetivo.** A linha mostra bagagem quando existe informação de bagagem, e
desaparece quando não existe.

**Métrica de sucesso.** Zero reservas exibindo bagagem sem dado de origem.

**Escopo.** O campo, a origem, a exibição, e a ausência.

**Fora de escopo.** Calcular franquia por companhia, por tarifa ou por programa
de fidelidade.

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.022 |
| **Título** | Ver a bagagem que eu realmente despachei |
| **User Story** | Eu, como **passageiro que comprou uma tarifa só com bagagem de mão**,<br><br>Quero **que o aplicativo não invente que eu tenho bagagem despachada**,<br><br>Para que **eu não chegue no balcão confiando numa informação que nunca existiu**. |
| **Épico Relacionado** | [EP-06 · Os cotos de dado falso](EP-06-cotos.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.022.01** | Sem dado, sem linha | Correção da linha 126. Ausência é informação honesta; "0" e "—" não são | **Dado que** a reserva não tem informação de bagagem,<br>**Quando** a tela é exibida,<br>**Então** a linha "Bagagem" **não aparece** |
| **RN.022.02** | Com dado, a linha diz o número | — | **Dado que** a reserva tem 2 bagagens despachadas,<br>**Quando** a tela é exibida,<br>**Então** a linha diz "2 despachadas" |
| **RN.022.03** | Zero explícito é diferente de desconhecido | Quem conferiu e viu que não tem franquia quer ver isso registrado | **Dado que** a pessoa registrou zero bagagem despachada,<br>**Quando** a tela é exibida,<br>**Então** a linha diz "sem bagagem despachada" |
| **RN.022.04** | Singular e plural | — | **Dado que** há 1 bagagem,<br>**Quando** o texto é montado,<br>**Então** diz "1 despachada", e com 2 diz "2 despachadas" |
| **RN.022.05** | A origem do dado é indicada | Bagagem extraída de e-mail e bagagem digitada têm confiabilidade diferente | **Dado que** o dado veio da importação,<br>**Quando** a linha é exibida,<br>**Então** ela é marcada como extraída, do mesmo jeito que os demais campos importados |
| **RN.022.06** | É informação, não franquia | O produto não sabe a regra de tarifa de cada companhia, e não pode parecer que sabe | **Dado que** a linha é exibida,<br>**Quando** a pessoa aciona a informação,<br>**Então** o verso diz que é o que foi registrado, e que a franquia deve ser confirmada com a companhia |
| **RN.022.07** | O campo é editável pela reserva | Quem despacha uma mala a mais no balcão quer atualizar | **Dado que** a pessoa edita a reserva,<br>**Quando** o formulário é aberto,<br>**Então** há campo de bagagem despachada, opcional e numérico |
| **RN.022.08** | Só em voo | Bagagem em reserva de hotel ou passeio não significa nada | **Dado que** a reserva é de hospedagem,<br>**Quando** a tela é exibida,<br>**Então** nenhum campo de bagagem aparece, nem na tela nem no formulário |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.022.01** — Reserva sem informação de bagagem **não** exibe a linha.
- [ ] **AC.022.02** — Com 2 bagagens, a linha diz "2 despachadas".
- [ ] **AC.022.03** — Com zero explícito, a linha diz "sem bagagem despachada".
- [ ] **AC.022.04** — Singular e plural corretos.
- [ ] **AC.022.05** — Dado vindo da importação é marcado como extraído.
- [ ] **AC.022.06** — O verso informativo diz que a franquia deve ser confirmada com a companhia.
- [ ] **AC.022.07** — O formulário de reserva tem o campo, opcional e numérico.
- [ ] **AC.022.08** — Reservas que não são de voo não mostram nem pedem bagagem.
- [ ] **AC.022.09** — `ItemScreen.tsx` não contém o literal `"1 despachada"`; a guarda de domínio confirma.
- [ ] **AC.022.10** — Reservas já cadastradas antes da migração ficam sem a linha, não com zero.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Campo ausente | `item.bags === undefined` | Frontend | Linha omitida | **Nunca** exibir "0" ou "—" |
| Zero explícito | `item.bags === 0` | Domínio | "sem bagagem despachada" | Diferente de `undefined` |
| Uma | `=== 1` | Domínio | "1 despachada" | `textoBagagem(n)` |
| Mais de uma | `> 1` | Domínio | "N despachadas" | Idem |
| Origem importada | `needs` não inclui `bags` e veio de importação | Frontend | Marca de extraído | Mesma marcação da [US.007](US-007-revisar-confirmar.md) |
| Tipo de reserva | `type !== 'air'` | Frontend | Sem campo, sem linha | Formulário e tela |
| Migração | Reservas existentes | Banco | `bags` fica nulo | **Nunca** preencher com 1 |

---

## 5 · Notas Técnicas e Dependências

**Tipo.** `Item.bags?: number`. Migração `SCHEMA_VERSION` 2 → 3, com espelho em
`repo.web.ts`.

**A migração é onde esta história pode errar.** A tentação é preencher as
reservas existentes com `1`, para que a tela não mude de aparência. Isso
transformaria o dado falso de hoje em dado falso **persistido**, que é bem pior:
deixaria de ser um literal buscável no código e passaria a ser uma linha no banco
de alguém. `bags` nasce nulo para todo mundo.

**Domínio.** `textoBagagem(n?: number): string | undefined` — devolve
`undefined` quando não há dado, e a tela omite a linha. O tipo de retorno
opcional é deliberado: força quem chama a tratar a ausência, em vez de receber
string vazia e renderizar uma linha em branco.

**Segurança e Privacidade.** Nada. É dado de conforto e fica no aparelho.

**Testes.** `textoBagagem` com `undefined`, `0`, `1`, `2`, e com número negativo
(entrada inválida — recusa, não formata).

**Feature Flag.** Não se aplica.

**Impacto em outras áreas.** `ItemFormScreen` ganha o campo. `importacao.ts` pode
extrair bagagem quando o e-mail traz — é ganho de graça, e nunca obrigatório.

---

## 6 · Artefatos e Arquivos Relacionados

- **Defeito:** `mobile/src/screens/ItemScreen.tsx:126`
- **Formulário:** `mobile/src/screens/ItemFormScreen.tsx`
- **Verso informativo:** `mobile/src/components/VersoSheet.tsx`, `mobile/src/domain/verso.ts`
- **Schema:** `mobile/src/db/schema.ts`, `repo.web.ts`
- **Guarda de CI:** [US.023](US-023-guarda-de-dominio.md)
