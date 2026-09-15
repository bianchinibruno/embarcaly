# US.020 · Ver o meu nome no cartão de embarque

---

## 0 · PRD

**Problema.** `PassesScreen.tsx`, **linha 70**:

```tsx
M1BIANCHINI/B {item.pnr}
```

O nome do desenvolvedor, em formato BCBP, aparece no cartão de embarque de todo
mundo. Junto com isso, três botões sem `onPress` — "Adicionar à Carteira" (96),
"Avisar quando abrir" (102) e "Abrir app da operadora" (112) — que parecem fazer
alguma coisa e não fazem nada.

Numa demonstração isso é protótipo. Com usuário real, é um aplicativo que mostra
o nome de um estranho no bilhete de outra pessoa.

**Objetivo.** O nome do passageiro vem da viagem. Os botões fazem o que dizem ou
deixam de existir.

**Métrica de sucesso.** Zero literais de dado de usuário na tela. Zero botões sem
ação.

**Escopo.** O passageiro, a formatação BCBP, e o destino dos três botões.

**Fora de escopo.** Apple Wallet. Ver abaixo.

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.020 |
| **Título** | Ver o meu nome no cartão de embarque |
| **User Story** | Eu, como **passageiro conferindo meu cartão antes do embarque**,<br><br>Quero **ver o meu nome no bilhete**,<br><br>Para que **eu confie que este aplicativo está mostrando a minha reserva**. |
| **Épico Relacionado** | [EP-06 · Os cotos de dado falso](EP-06-cotos.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.020.01** | O passageiro vem da viagem | Correção da linha 70 | **Dado que** a viagem tem passageiro cadastrado,<br>**Quando** o cartão é exibido,<br>**Então** o nome mostrado é o da viagem, formatado em BCBP |
| **RN.020.02** | Sem passageiro, a linha some | Placeholder num cartão de embarque é pior que ausência | **Dado que** a viagem não tem passageiro,<br>**Quando** o cartão é exibido,<br>**Então** a linha do nome **não aparece**, e o localizador continua visível |
| **RN.020.03** | O formato BCBP é regra, e mora no domínio | "M1SOBRENOME/I" tem estrutura definida e é o tipo de coisa que se escreve errado na tela | **Dado que** o passageiro é "Ana Paula Ribeiro",<br>**Quando** o formato é aplicado,<br>**Então** resulta `M1RIBEIRO/A`, calculado por `bcbp.ts` |
| **RN.020.04** | Nome composto e acento são tratados | Nome brasileiro tem acento, "de", "dos" e sobrenome duplo | **Dado que** o passageiro é "João da Silva Souza",<br>**Quando** o formato é aplicado,<br>**Então** resulta `M1SOUZA/J`, sem acento e sem a partícula |
| **RN.020.05** | Cadastrar o passageiro é um toque | Campo escondido em formulário longo não é preenchido | **Dado que** a viagem não tem passageiro,<br>**Quando** o cartão é aberto,<br>**Então** há ação direta para informar o nome |
| **RN.020.06** | "Adicionar à Carteira" é removido | Wallet é fase 3, é iOS, e não decide compra. Botão que não funciona custa mais que a ausência dele | **Dado que** o cartão está emitido,<br>**Quando** a tela é exibida,<br>**Então** não existe botão de carteira |
| **RN.020.07** | "Avisar quando abrir" passa a funcionar | O check-in abrindo é exatamente o tipo de aviso que o produto promete | **Dado que** o check-in ainda não abriu,<br>**Quando** a pessoa aciona "Avisar quando abrir",<br>**Então** um lembrete é agendado para `checkinOpen` e o botão passa a indicar que está ativo |
| **RN.020.08** | "Abrir app da operadora" abre mesmo | É o caso de bilhete externo, e é o único caminho da pessoa até o bilhete | **Dado que** o bilhete é externo e a operadora é conhecida,<br>**Quando** a pessoa aciona o botão,<br>**Então** o aplicativo da companhia abre; se não estiver instalado, abre o site dela |
| **RN.020.09** | Operadora desconhecida esconde o botão | Botão que abre "o app da operadora" sem saber qual é não tem para onde ir | **Dado que** `item.operator` está vazio,<br>**Quando** a tela é exibida,<br>**Então** o botão não aparece |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.020.01** — O nome exibido é o passageiro da viagem, em todas as reservas.
- [ ] **AC.020.02** — Sem passageiro, a linha do nome não é renderizada.
- [ ] **AC.020.03** — `bcbp.ts` formata corretamente: nome simples, composto, com acento, com partícula, com sobrenome duplo.
- [ ] **AC.020.04** — Há ação direta para informar o passageiro quando ele falta.
- [ ] **AC.020.05** — O botão "Adicionar à Carteira" não existe mais no código.
- [ ] **AC.020.06** — "Avisar quando abrir" agenda o lembrete e reflete o estado.
- [ ] **AC.020.07** — "Abrir app da operadora" abre o aplicativo, ou o site como alternativa.
- [ ] **AC.020.08** — Com `operator` vazio, o botão não aparece.
- [ ] **AC.020.09** — `PassesScreen.tsx` não contém nenhum literal de dado de usuário; a guarda de domínio confirma.
- [ ] **AC.020.10** — Nenhum botão sem `onPress` permanece na tela.
- [ ] **AC.020.11** — Cobertura de `bcbp.ts` em 100%.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Passageiro presente | `trip.passenger` preenchido | Domínio | Linha BCBP | `formatarBcbp(trip.passenger)` |
| Passageiro ausente | Vazio | Frontend | Linha omitida + ação | Nunca placeholder |
| Formatação | Sempre | Domínio | `M1SOBRENOME/I` | Último sobrenome, sem partícula, sem acento |
| Wallet | Sempre | — | **Removido** | Fase 3 |
| Lembrete de check-in | `checkinOpen` existe e é futuro | Cliente | Agenda notificação local | `expo-notifications`, local, sem servidor |
| Lembrete já agendado | — | Frontend | Botão indica ativo, permite cancelar | Estado por reserva |
| App da operadora | `operator` conhecido | SO | Abre app ou site | *Deep link*, com URL de fallback |
| App da operadora | `operator` vazio | Frontend | Botão oculto | — |

---

## 5 · Notas Técnicas e Dependências

**Tipo.** `Trip.passenger?: string`. Migração `SCHEMA_VERSION` 2 → 3, com espelho
em `repo.web.ts`.

**Por que em `Trip` e não em `Item`.** No MVP a viagem é de uma pessoa, e repetir
o nome em cada reserva multiplica o lugar onde ele pode estar errado. Passageiro
por reserva vem com acompanhantes, que estão fora do MVP.

**Módulo novo.** `src/domain/bcbp.ts`:

| Função | Responsabilidade |
|---|---|
| `formatarBcbp(nome: string): string` | `M1SOBRENOME/I` |
| `sobrenome(nome: string): string` | Último token não-partícula |
| `inicial(nome: string): string` | Primeira letra do primeiro nome |

**Por que no domínio.** Não porque seja difícil, mas porque é exatamente o tipo
de regra que se escreve na tela, funciona para o caso do desenvolvedor, e quebra
com "Maria de Fátima dos Santos". O gate de 100% obriga a enumerar os casos.

**Lembrete de check-in.** Notificação **local**, agendada no aparelho. Não
depende do F3, não depende de servidor, e funciona offline. É o caso mais barato
de aviso que o produto tem.

**Segurança e Privacidade.** O nome do passageiro é dado pessoal e fica no
aparelho, como o resto. **Não entra no snapshot público** — está fora de
`CAMPOS_PUBLICOS` na [US.018](US-018-compartilhar.md), e o teste de ausência
cobre isso.

**Testes.** `bcbp.test.ts` cobre: nome simples; composto; com acento; com "de",
"da", "dos"; sobrenome único; string vazia; só espaços; nome em minúsculas.

**Feature Flag.** Não se aplica. É correção de dado falso.

**Impacto em outras áreas.** `TripFormScreen` ganha o campo de passageiro.
`types.ts`, `schema.ts` e `repo.web.ts` ganham a coluna.

---

## 6 · Artefatos e Arquivos Relacionados

- **Defeito:** `mobile/src/screens/PassesScreen.tsx:70`, `:96`, `:102`, `:112`
- **Domínio existente:** `mobile/src/domain/passes.ts`
- **Formulário:** `mobile/src/screens/TripFormScreen.tsx`
- **Schema:** `mobile/src/db/schema.ts`, `repo.web.ts`
- **Guarda de CI:** [US.023](US-023-guarda-de-dominio.md)
