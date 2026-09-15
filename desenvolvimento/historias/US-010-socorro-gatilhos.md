# US.010 · Atender cancelamento e preterição

---

## 0 · PRD

**Problema.** `SocorroScreen.tsx`, **linha 52**:

```ts
gatilho: 'atraso',
```

O motor aceita três gatilhos. A tela manda um. Cancelamento e preterição estão
implementados, testados, e não têm como chegar à tela.

A consequência é específica e verificável: `avaliar()` libera as quatro saídas do
art. 21 **imediatamente** para cancelamento e preterição, e só depois de 240
minutos para atraso. Hoje, quem teve o voo cancelado vê *"em 4h você poderá
escolher"* — quando o direito já é dele.

**Objetivo.** O Socorro lê o gatilho registrado e apresenta o que corresponde a
ele.

**Métrica de sucesso.** As três combinações de gatilho corretas, conferidas
manualmente contra o texto da Resolução 400.

**Escopo.** Ler o gatilho, tratar o estado da reserva cancelada na cascata, e
apresentar as saídas no momento certo.

**Fora de escopo.** Trecho — [US.011](US-011-socorro-trecho.md). Compensação —
[US.012](US-012-socorro-compensacao.md).

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.010 |
| **Título** | Atender cancelamento e preterição |
| **User Story** | Eu, como **passageiro cujo voo foi cancelado**,<br><br>Quero **ver as quatro saídas disponíveis agora, e não daqui a quatro horas**,<br><br>Para que **eu peça o que já é meu direito enquanto ainda há voo de outra companhia saindo hoje**. |
| **Épico Relacionado** | [EP-03 · Direitos completos](EP-03-direitos.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.010.01** | O gatilho vem do registro, nunca do código | É a correção da linha 52 | **Dado que** a reserva tem gatilho `cancelamento`,<br>**Quando** o Socorro monta a situação,<br>**Então** `Situacao.gatilho` é `'cancelamento'`, lido do registro |
| **RN.010.02** | Cancelamento libera as quatro saídas de imediato | Art. 21 da Res. 400: o direito não depende de tempo decorrido quando o voo não vai sair | **Dado que** o voo foi cancelado há 10 minutos,<br>**Quando** o Socorro é aberto,<br>**Então** as quatro saídas aparecem disponíveis, sem contagem regressiva |
| **RN.010.03** | Preterição também, e com um item a mais | Art. 21 mais art. 24 | **Dado que** a pessoa foi preterida,<br>**Quando** o Socorro é aberto,<br>**Então** aparecem as quatro saídas e a compensação, tratada na [US.012](US-012-socorro-compensacao.md) |
| **RN.010.04** | A assistência material continua valendo pelo relógio | Arts. 20 e 27 não somem no cancelamento: quem espera três horas por reacomodação tem direito a alimentação | **Dado que** o voo foi cancelado há 3 horas,<br>**Quando** o Socorro é aberto,<br>**Então** informação, comunicação e alimentação estão liberadas, e hospedagem aparece como próximo marco |
| **RN.010.05** | O título da tela nomeia o que aconteceu | "Atraso de 4h" numa tela de cancelamento é dado falso | **Dado que** o gatilho é cancelamento,<br>**Quando** o cabeçalho é renderizado,<br>**Então** ele diz "Voo cancelado", e não menciona atraso |
| **RN.010.06** | Cancelamento remove o item da cadeia, não o desloca | `recalcular()` desloca horários. Um voo cancelado não parte mais tarde: ele não parte | **Dado que** um voo cancelado tem transfer e hotel depois dele,<br>**Quando** a cascata é recalculada,<br>**Então** os itens seguintes são marcados como **em risco por conexão perdida**, e não deslocados por N minutos |
| **RN.010.07** | Preterição desloca pelo voo novo, quando houver | Quem foi preterido e reacomodado tem horário novo; quem não foi reacomodado ainda não tem | **Dado que** a pessoa foi preterida e ainda não tem voo novo,<br>**Quando** a cascata é recalculada,<br>**Então** os itens seguintes aparecem como em risco, sem horário inventado |
| **RN.010.08** | Cada direito mostra o artigo | É o que separa informação de opinião, e é o que protege juridicamente | **Dado que** um direito é exibido,<br>**Quando** a pessoa o lê,<br>**Então** vê o `fonte` do registro — "Res. 400, art. 21, I" — junto ao texto |
| **RN.010.09** | A frase de balcão é copiável | O produto existe para ser usado com alguém na frente esperando | **Dado que** um direito está expandido,<br>**Quando** a pessoa aciona a frase,<br>**Então** o texto de `peça` vai para a área de transferência, com retorno visível |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.010.01** — Registrar cancelamento e abrir o Socorro apresenta as quatro saídas **imediatamente**.
- [ ] **AC.010.02** — Registrar preterição apresenta as quatro saídas imediatamente.
- [ ] **AC.010.03** — Registrar atraso de 30 minutos **não** apresenta as saídas, e mostra o próximo marco.
- [ ] **AC.010.04** — Registrar atraso de 4 horas apresenta as saídas.
- [ ] **AC.010.05** — Cancelamento há 3 horas: informação, comunicação e alimentação liberadas; hospedagem como próximo marco.
- [ ] **AC.010.06** — O cabeçalho nomeia o gatilho correto nos três casos e nunca diz "atraso" para os outros dois.
- [ ] **AC.010.07** — Item posterior a voo cancelado aparece como "em risco", **sem** horário deslocado.
- [ ] **AC.010.08** — Cada direito e cada saída exibem o artigo da Resolução.
- [ ] **AC.010.09** — Tocar a frase de balcão copia o texto e mostra retorno.
- [ ] **AC.010.10** — `SocorroScreen.tsx` não contém nenhum literal de gatilho; a guarda de domínio confirma.
- [ ] **AC.010.11** — A tela exibe `AVISO_CONTEUDO` e `AVISO_RESULTADO`, como `SUPERFICIES.telaDireitos` exige.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Montar situação | Registro existe | Frontend → Domínio | `avaliar(situacao)` | `gatilho` lido de `item.delay.gatilho` |
| Atraso < 60 min | — | Domínio | Só informação | `decorrido < 60` |
| Atraso ≥ 60 min | — | Domínio | + comunicação | Art. 27, I |
| Atraso ≥ 120 min | — | Domínio | + alimentação | Art. 27, II |
| Atraso ≥ 240 min | — | Domínio | + hospedagem **e** as 4 saídas | `LIMIAR_ESCOLHAS_MIN = 240` |
| Cancelamento | Qualquer tempo | Domínio | 4 saídas imediatas | `imediato === true` em `avaliar()` |
| Preterição | Qualquer tempo | Domínio | 4 saídas + compensação | `imediato === true`; art. 24 |
| Cascata — atraso | `minutes > 0` | Domínio | Desloca os seguintes | `recalcular(trip, id, minutes)` |
| Cascata — cancelamento | — | Domínio | Marca em risco, **não desloca** | Efeito novo: `'sem-conexao'` |
| Cascata — preterição sem voo novo | — | Domínio | Marca em risco | Mesmo efeito |
| Nenhum registro | — | Frontend | Estado "Nada quebrado" | Já implementado |

---

## 5 · Notas Técnicas e Dependências

**A correção mínima é uma linha.** Trocar `gatilho: 'atraso'` por
`gatilho: item.delay.gatilho` resolve `RN.010.01` a `RN.010.05`. O trabalho real
desta história está em `RN.010.06` e `RN.010.07`: a cascata.

**Cascata e cancelamento — o ponto de atenção do épico.**
`src/domain/cascata.ts` foi escrito para atraso: `recalcular(trip, id, minutes)`
desloca o que vem depois. Um voo cancelado **não parte mais tarde — não parte**.

Deslocar por um número grande produziria horários inventados e plausíveis, que é
a pior categoria de dado falso: parece certo. `Efeito` ganha o caso
`'sem-conexao'`, e os itens seguintes são marcados sem receber horário novo.

**Domínio.** Alterações em `cascata.ts` e leitura em `SocorroScreen`. Toda a
decisão continua em `src/domain/`, sob o gate de 100%.

**Segurança e Privacidade.** Nada sai do aparelho.

**Testes.** `direitos.test.ts` já cobre `avaliar()` nos três gatilhos — conferir
e completar. `cascata.test.ts` ganha: voo cancelado com três itens depois;
cancelado sem nada depois; preterição sem voo novo; atraso continua deslocando
como antes (regressão).

**Conferência manual, obrigatória antes de fechar.** Abrir o Socorro com atraso,
cancelamento e preterição e conferir cada saída **contra o texto da Resolução
400**, artigo por artigo. O teste automatizado prova que o código faz o que o
teste diz; só a leitura da norma prova que o teste diz a coisa certa.

**Feature Flag.** Não se aplica.

**Impacto em outras áreas.** `ItemScreen` mostra situação da reserva e precisa
distinguir cancelado de atrasado. `NowScreen` também.

---

## 6 · Artefatos e Arquivos Relacionados

- **Defeito:** `mobile/src/screens/SocorroScreen.tsx:52`
- **Motor:** `mobile/src/domain/direitos.ts` — `avaliar`, `ESCOLHAS`, `LIMIAR_ESCOLHAS_MIN`
- **Cascata:** `mobile/src/domain/cascata.ts`
- **Testes:** `mobile/src/domain/__tests__/direitos.test.ts`, `cascata.test.ts`
- **ANAC:** [`06-anac-completo.md`](../06-anac-completo.md)
- **Anterior:** [US.009](US-009-registrar-problema.md) · **Próxima:** [US.011](US-011-socorro-trecho.md)
