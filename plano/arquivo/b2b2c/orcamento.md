# Orçamento — R$2.000

O curso recomenda R$2.000 de investimento inicial. Este é o rateio, e ele foi
montado para uma regra: **nada de custo variável antes de existir receita.**

---

## Alocação

| Item | Quando | Valor | Nota |
|---|---|---|---|
| Domínio `.com.br` | Semana 1 | **R$40/ano** | Registro.br |
| Hospedagem (backend + banco) | Semana 4 | **R$0–150/mês** | Camada grátis do Railway, Fly.io, Render ou Supabase cobre o MVP inteiro |
| Envio de mensagem (e-mail + push) | Semana 6 | **R$0** | Resend e Expo Push têm camada grátis suficiente para 20 agentes |
| **API de status de voo** | **Só após o G2** | **R$300–550/mês** | Ver a seção seguinte. **É o maior risco financeiro do projeto** |
| Teste de mídia paga | Semana 14 | **R$300** | Verba única de aprendizado, não de aquisição |
| Reserva para imprevisto | — | **R$400** | Não gaste antes da Semana 12 |
| MEI (DAS mensal) | Após G2 | ~R$76/mês | |

**Gasto até o G2 (semana 10): menos de R$500.** É a coisa mais importante desta
página. As 10 primeiras semanas custam quase nada porque a validação não precisa
de infraestrutura — precisa de conversas.

## O custo que pode matar o projeto

Status de voo é cobrado **por consulta**, e a conta cresce com uma velocidade que
não é óbvia:

| Fornecedor | Modelo | Preço |
|---|---|---|
| **AviationStack** | Chamadas/mês | Grátis: 500 (só uso pessoal) · **US$100/mês** por 10 mil (B2C comercial) · US$1.000/mês por 100 mil |
| **AeroAPI (FlightAware)** | Por consulta, por página de 15 registros | Barato em volume baixo. **Explode com polling em cima da hora** |
| **AeroDataBox** | Assinatura | A opção barata de entrada |
| **Cirium / OAG** | Enterprise, sob cotação | Quatro dígitos por mês. Fora de questão |

**A conta ingênua que quebra o negócio.** Consultar cada voo a cada 15 minutos
durante 12 horas dá 48 consultas por voo/dia. Com 50 voos ativos são 2.400
consultas/dia, **72 mil por mês** — o degrau de US$1.000/mês. Com 20 agentes
pagando R$79, a receita é R$1.580. **A margem fica negativa.**

### As quatro mitigações, e por que elas fecham a conta

1. **Janelas críticas, não polling.** Consulte em D-1, na abertura do check-in,
   T-4h, T-2h e T-30min. São ~6 consultas por voo em vez de 48. **Corte de 87%.**
2. **Cache por número de voo.** Dez viajantes no LA8084 são **uma** consulta.
   É aqui que o B2B ganha do B2C: um agente concentra clientes em rotas
   parecidas, e a concentração é o que faz a margem existir ([D1](../README.md)).
3. **Webhook onde houver.** Assinar mudança é mais barato que perguntar.
4. **Só voos ativos.** Viagem que ainda não começou não consulta nada.

Com as quatro: ~6 consultas/voo × 200 voos/mês, com 40% de cache
≈ **720 chamadas/mês** — dentro do degrau de US$100. **Custo por agente: ~R$28.**
Margem de ~65% sobre R$79. **Fecha.**

> Esta seção é o motivo de a API estar bloqueada até o G2 ([D4](../README.md)).
> Ligar o dado de voo antes de existir receita é o jeito mais rápido de torrar
> os R$2.000 em duas semanas sem ter aprendido nada.

## Unit economics no G3

| Métrica | Valor |
|---|---|
| Preço médio (20 clientes: 20 fundadores a R$39) | **R$39** |
| MRR | **R$780** |
| Custo variável por cliente (API + infra) | ~R$28 |
| Margem bruta | ~36% *(baixa de propósito — preço de fundador)* |
| Margem no preço cheio de R$79 | **~65%** |
| CAC no canal orgânico | ~R$0 em dinheiro · ~40 min de DM e conversa por cliente |

**Leitura:** com preço de fundador o negócio quase não tem margem, e isso é
aceitável porque esses 20 clientes não são receita — são **prova e depoimento**.
A conta real do negócio é a linha dos R$79.

## Ponto de equilíbrio

Cobrindo API, infra e MEI (~R$700/mês de custo fixo + variável):
**≈ 14 clientes no preço cheio de R$79.**

Não é objetivo de 2026. É o número que diz quando o projeto passa a se pagar.
