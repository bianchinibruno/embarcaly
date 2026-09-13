# Orçamento — R$2.000

Teto do curso, e é o que você tem. Este arquivo mostra **mês a mês** para onde
ele vai, quando entra receita, e as duas decisões que fazem a diferença entre o
dinheiro durar até janeiro ou acabar em novembro.

---

## Fluxo de caixa até janeiro

| Mês | Sai | O quê | Entra | Saldo |
|---|---|---|---|---|
| **Set** · S0–S4 | R$190 | Domínio R$40 · teste de mensagem R$150 | R$0 | **R$1.810** |
| **Out** · S5–S8 | R$500 | API meio mês R$100 · revisão jurídica R$400 | R$190 *(10 pré-vendas)* | **R$1.500** |
| **Nov** · S9–S11 | R$390 | **Play Store R$140** · API R$200 · infra R$50 | ~R$400 | **R$1.510** |
| **Dez** · S12–S15 | R$450 | API R$250 · infra R$50 · 2º teste de mídia R$150 | ~R$800 | **R$1.860** |
| **Jan** · S16 | R$900 | **Apple R$550** · API R$300 · infra R$50 | ~R$1.200 | **R$2.160** |

**O saldo nunca cai abaixo de R$1.500.** Mas isso só é verdade por causa de duas
decisões — e sem elas a conta estoura.

## As duas decisões que fazem o dinheiro durar

### 1 · A conta da Apple só em janeiro
US$99 por ano, ≈ R$550. A da Google é **US$25, uma vez** — ≈ R$140.

Pagar as duas em novembro derruba o saldo de R$1.510 para R$960, antes de
qualquer imprevisto. E não há motivo: [D3](00-decisoes.md) manda publicar na Play
Store primeiro, então a conta da Apple pode esperar **até existir receita para
pagá-la**. Em janeiro ela sai do faturamento, não do seu bolso.

### 2 · A API de voo começa no degrau mais barato
É o único custo que **cresce com o uso** e é o que arruína orçamento de produto
de viagem.

| Fornecedor | Entrada |
|---|---|
| **AeroDataBox** | O degrau barato. Comece aqui |
| **AviationStack** | Grátis 500 chamadas/mês (só uso pessoal) · **US$100/mês** por 10 mil no plano comercial |
| **AeroAPI (FlightAware)** | Por consulta. Barato em volume baixo, explode com polling |
| Cirium · OAG | Enterprise, quatro dígitos. Fora de questão |

Entrar direto no degrau de US$100 custa ~R$300/mês a mais. Em quatro meses são
**R$1.200** — e aí sim o orçamento quebra.

**As quatro alavancas que mantêm o custo baixo:**
1. **Janelas críticas, não polling.** Consulte em D-1, na abertura do check-in,
   T-4h, T-2h e T-30min. Seis consultas por voo em vez de 48
2. **Cache por número de voo.** Dois usuários no mesmo voo são uma consulta
3. **Webhook onde existir.** Assinar mudança é mais barato que perguntar
4. **Só viagens ativas.** Viagem que não começou não consulta nada

Resultado: **~24 consultas por viagem ≈ R$1,30.**

## Custo e margem por viagem

| | |
|---|---|
| Consultas de voo (4 trechos × 6 janelas) | R$1,30 |
| Push, e-mail, armazenamento | R$0,50 |
| **Custo variável** | **≈ R$2** |
| Preço | R$39 |
| Menos 15% da loja *(Small Business Program da Apple e do Google, até US$1M/ano)* | −R$5,85 |
| **Líquido** | **R$33,15** |
| **Contribuição por viagem** | **≈ R$31 · margem de 94%** |

## Ponto de equilíbrio

| Custo fixo mensal | |
|---|---|
| API, degrau de entrada | ~R$250 |
| Infra | ~R$50 |
| Lojas, rateio | ~R$48 |
| MEI *(depois do G2)* | ~R$76 |
| **Total** | **≈ R$424/mês** |

**≈ 14 viagens pagas por mês** para se pagar. Com 3% de conversão, isso exige
**≈ 470 ativações por mês**.

---

## Sobre a verba de teste — a conta que você precisa ver

Você disse que tem R$2.000 de verba para testar. **A margem não é o problema
deste negócio; o topo do funil é.** Então a pergunta que importa é: dá para
comprar usuário com esse dinheiro?

**Não dá. E é melhor saber agora.**

| Etapa | Estimativa realista |
|---|---|
| Custo por clique · Meta Ads, viagem, Brasil | R$0,60 a R$2,00 |
| Clique → instalação | 20–30% |
| Instalação → cadastra a 1ª viagem | ~40% |
| Cadastro → pagou os R$39 | 3–8% |
| **Clique → cliente pagante** | **~0,5%** |
| **CAC resultante** | **≈ R$200** |

**Contribuição por viagem: R$31. CAC por mídia paga: ~R$200.**

Mesmo com premissas generosas — 1% de conversão do clique — o CAC fica em R$100.
Continua **três vezes acima** do que a viagem paga.

> **Mídia paga não fecha a R$39 por viagem. Ponto.**
> Ela só passaria a fechar se o LTV subisse muito — o plano anual de R$99 somado
> a recompra consistente — e isso é conversa de 2027, não de agora.
>
> Isso não é má notícia: é o que transforma "conteúdo orgânico" de preferência
> em **única opção viável**, e justifica gastar as 16 semanas construindo canal
> em vez de comprando clique.

### O que fazer com os R$300, então

Mudo aqui a recomendação que eu tinha dado antes — **eu havia bloqueado mídia
até o G2, e estava errado sobre o momento.** Um teste pequeno e cedo compra uma
informação que muda tudo que você escreve por 16 semanas.

**R$300 no total, em duas parcelas, para comprar informação — nunca usuário.**

| Quando | Quanto | Para quê |
|---|---|---|
| **Semana 3 · 28/09** | **R$150** | **Qual mensagem converte.** Três anúncios de R$50, mesma landing, públicos idênticos: *(a)* "seu voo atrasou 4h, você tem direito a hotel" · *(b)* "voo, hotel, carro e passeio num lugar só — finalmente no Android" · *(c)* "a planilha não te ajuda quando o voo atrasa" |
| Semana 12 · dez | R$150 | Confirmar o CAC real com produto no ar, e enterrar de vez a hipótese de mídia paga |

**O que o primeiro teste entrega:** a mensagem vencedora vira o título da landing
de pré-venda, o gancho dos carrosséis e a descrição na Play Store. R$150 por essa
resposta, três semanas antes do G1, é a melhor compra do plano inteiro.

**O que ele não entrega:** usuários. Não olhe o número de instalações — olhe
**custo por clique e taxa de cadastro na lista de espera**, por anúncio. É um
laboratório, não um canal.

**Regra dura:** R$150, cinco dias, e desliga. Sem prorrogar, sem "só mais R$50
porque estava indo bem". A verba de mídia deste plano é R$300 e acabou.

---

## Onde o resto dos R$2.000 fica

| Item | Quando | Valor |
|---|---|---|
| Domínio `.com.br` | Semana 0 | R$40/ano |
| Teste de mensagem | Semana 3 | R$150 |
| Hospedagem e banco | Semana 5 | R$0–50/mês *(camada grátis cobre o MVP)* |
| Envio de e-mail e push | Semana 5 | R$0 *(Resend e Expo Push, camada grátis)* |
| API de status de voo | Semana 7 | R$100–300/mês |
| Revisão jurídica do motor de direitos | Semana 8 | R$400 |
| **Conta Google Play** | Semana 9 | **R$140, uma vez** |
| Segundo teste de mídia | Semana 12 | R$150 |
| Conta Apple | **Janeiro** | R$550/ano |
| **Reserva intocável** | — | **R$300** |

**Gasto até o G1 · 11/10: R$190.** Só domínio e o teste de mensagem. Se o G1
reprovar, você parou tendo gasto menos de 10% da verba — que é exatamente para
isso que o portão serve.

## Teto

| Cenário | Viagens pagas/mês | Receita |
|---|---|---|
| Equilíbrio | 14 | R$460 |
| Dá certo | 200 | R$6.630 |
| Dá muito certo | 1.000 | R$33.150 |

O mercado são milhões de viajantes brasileiros — e o segmento que o Tripsy não
atende, sozinho, é 81% do país.
