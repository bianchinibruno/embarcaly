# Validação — portões, métricas e critérios de parada

Quatro portões. Cada um tem um número que autoriza seguir e um número que manda
parar. Preencha na data, com o número real. **Não negocie com o portão depois de
ver o resultado** — é para isso que ele foi escrito antes.

---

## G0 — A dor existe? · Semana 2 (20/set)

| Critério | Passa | Resultado |
|---|---|---|
| Entrevistas realizadas | ≥ 15 | ___ |
| Que contaram um caso **real e específico** de cliente com problema em viagem | ≥ 10 | ___ |
| Que descobriram o problema **pelo próprio cliente** | ≥ 8 | ___ |
| Que já pagam por alguma ferramenta | ≥ 7 | ___ |
| Que perguntaram, sem provocação, "quando fica pronto?" | ≥ 3 | ___ |

**Reprovou:** vá para o alvo alternativo de [D7](../README.md) — operador de
receptivo e organizador de viagem em grupo. Repita a Semana 2. **Não construa.**

## G1 — Alguém paga? · Semana 3 (27/set)

| Critério | Passa | Resultado |
|---|---|---|
| Intenções de pagamento por escrito, com nome e WhatsApp | ≥ 5 | ___ |
| Que aceitaram R$39/mês **sem pedir desconto** | ≥ 4 | ___ |
| Que toparam entrar como primeiro cliente e dar depoimento | ≥ 2 | ___ |

**É o portão mais importante do plano.** Reprovou: não escreva backend. O
problema está na proposta de valor ou no ICP — volte ao [03-tese.md](tese.md).

> ⚠️ **A tentação aqui é aceitar "eu testaria" como sim.** Não é. Só conta
> quem responde à pergunta *"posso te cobrar R$39 no dia que entregar?"* com
> a palavra sim.

## G2 — O produto entrega? · Semana 10 (15/nov)

| Critério | Passa | Resultado |
|---|---|---|
| Agentes **pagando de verdade** (Pix compensado) | ≥ 5 | ___ |
| Viagens acompanhadas de ponta a ponta | ≥ 15 | ___ |
| Avisos enviados | ≥ 10 | ___ |
| **Avisos corretos** | **100%** | ___ |
| Agente que descobriu a mudança pelo Embarcaly antes do cliente ligar | ≥ 3 | ___ |
| Tempo de cadastro de uma viagem | < 3 min | ___ |

**Libera:** API de status de voo, MEI, verba de mídia.
**Reprovou com aviso errado:** pare tudo e conserte. Um aviso errado sobre um
voo destrói a única coisa que este produto vende.

## G3 — Vira negócio? · Semana 16 (28/dez)

| Critério | Passa | Resultado |
|---|---|---|
| Agentes pagantes | ≥ 20 | ___ |
| Retenção no 2º mês | ≥ 80% | ___ |
| Clientes vindos sem DM (indicação ou conteúdo) | ≥ 3 | ___ |
| MRR | ≥ R$780 | ___ |
| Horas suas por semana em operação manual | < 5h | ___ |

**Três saídas, todas legítimas:**
- **Continuar** — passou. Novo ciclo de 16 semanas, meta 100 clientes.
- **Congelar** — 10 a 19 pagantes com boa retenção. Mantenha rodando com esforço
  mínimo e reavalie em 3 meses. Produto que sustenta 15 clientes felizes não se
  joga fora, só não merece dedicação integral.
- **Encerrar** — menos de 10, ou retenção abaixo de 50%. Escreva o post-mortem
  público, publique o app nas lojas como portfólio e siga. **Isso não é fracasso**
  — é R$2.000 e 16 semanas gastos comprando uma resposta que você não tinha.

---

## Métricas semanais

Cinco números, toda sexta, no [diário](../../templates/diario.md). Nada além disso.

| Métrica | O que revela |
|---|---|
| Conversas novas com agentes | Se o topo do funil está vivo |
| Agentes pagantes | A única métrica que importa de fato |
| Viagens ativas | Uso real, não cadastro |
| Avisos enviados / avisos certos | A qualidade da promessa central |
| Horas gastas na semana | Se a rotina está sustentável |

## Métricas de vaidade — proibidas

Seguidores no Instagram. Downloads. Cadastros sem pagamento. Cobertura de teste.
Commits. Nenhuma delas responde "alguém paga por isso". As duas últimas são
especialmente traiçoeiras no seu caso, porque **parecem progresso de engenharia**.
