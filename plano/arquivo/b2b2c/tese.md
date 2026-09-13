# Tese — ICP, proposta de valor, canal e modelo

Os quatro componentes do framework ágil do curso, preenchidos.

---

## O problema (uma frase)

> Quando um voo atrasa, quem descobre primeiro é o cliente — e a primeira coisa
> que ele faz é ligar para o agente que vendeu a viagem, que não sabe de nada.

O agente de viagens independente vende a viagem e depois vira **plantão 24h não
remunerado**. Ele não tem ferramenta nenhuma para o período entre o embarque e o
retorno. Nenhum dos sistemas que ele paga cobre esse intervalo.

## ICP — Ideal Customer Profile

**Consultor de viagens independente brasileiro, home based.**

| Dimensão | Definição |
|---|---|
| Quem | Pessoa física ou MEI, vende viagem por conta própria, muitas vezes ligada a uma *host agency* |
| Volume | **8 a 30 viagens fechadas por mês** — abaixo disso não sente a dor, acima disso já tem equipe e vai querer ERP |
| Ticket da viagem | R$4 mil a R$40 mil (lazer internacional, lua de mel, viagem em família) |
| Onde trabalha | WhatsApp. Instagram como vitrine. Planilha e Canva como sistema. |
| O que já paga | Host agency, Canva Pro, às vezes um sistema de cotação. **Raramente os R$440 do Monde** — acha caro |
| Dor específica | Cliente no exterior com problema, fuso horário, e ele descobrindo pelo próprio cliente |
| Como o encontro | Instagram (`#agentedeviagens`, `#consultordeviagens`), grupos de WhatsApp do setor, host agencies |

**Fora do ICP, de propósito:** agência com loja física, corporativo/business
travel, operadora, e o viajante final. Cada um exige produto diferente.

## Proposta de valor

> **Seu cliente sabe do atraso antes de te ligar.**
> O Embarcaly acompanha cada viagem que você vendeu e avisa o viajante — com o
> seu nome na tela — quando alguma coisa muda. Você para de ser plantão.

Três reformulações da mesma promessa, para testar em anúncio e DM:

- *"Deixe de descobrir o problema do seu cliente pelo próprio cliente."*
- *"O pós-venda da viagem, no automático, com a sua marca."*
- *"Você vendeu a viagem. Quem acompanha ela sou eu."*

**A promessa que não vamos fazer:** "organize as reservas do seu cliente".
Organizar é commodity — TripIt faz de graça. O que se vende é **antecipação**.

## Canal de distribuição

**Primário:** Instagram + DM 1-a-1, reforçado por grupos de WhatsApp do setor.
**Secundário (a partir do G2):** parceria com *host agency*.
Racional e alternativas em [D3](../README.md). Execução em [07-gtm.md](gtm.md).

O curso é explícito: escolha **um** canal e insista. Meta Ads está bloqueado até
o G2 — ver [06-orcamento.md](orcamento.md).

## Modelo de negócio

| Item | Definição |
|---|---|
| Modelo | SaaS, assinatura mensal, **um plano só** |
| Preço | **R$79/mês** por agente, até 25 viagens ativas simultâneas |
| Oferta de fundador | **R$39/mês vitalício** para os 20 primeiros pagantes |
| Cobrança | Pix manual nos 20 primeiros; Stripe ou Asaas depois. Sem CNPJ até o G2 ([D6](../README.md)) |
| Quem usa de graça | O viajante. Sempre. É o canal, não o produto ([D2](../README.md)) |
| Ancoragem | Monde R$440/mês · chatbot de agência a partir de R$97/mês · Travefy US$39/usuário/mês |

**Meta do G3 (semana 16):** 20 agentes pagantes → entre R$780 e R$1.580 de MRR.
Não é renda. É **prova de que alguém paga** — que é a única coisa que a fase de
validação precisa produzir.

## O que já está pronto e entra na tese

| Ativo existente | Papel na tese |
|---|---|
| App Expo com CRUD + SQLite offline | Vira o app do viajante — o canal ([D2](../README.md)) |
| Motor de próxima ação e recálculo da cadeia | **É o produto.** É o único diferencial que nem TripIt nem Monde têm |
| Protótipo HTML no GitHub Pages | Demo de vendas. Roda no celular do agente durante a DM, sem instalar nada |
| Marca, ícones, manual | Encerrado. Não mexa mais ([09-riscos.md](../../10-riscos.md), R7) |
| Regra "nunca gerar código de barras" | Mantida. É maturidade de produto e vira argumento de confiança na venda |
| Testes e CI | Mantidos, congelados. Nenhuma cobertura nova antes do G1 |
