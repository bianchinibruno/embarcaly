# Decisões travadas e caminhos descartados

Você escolheu o caminho B2C. Todas as decisões abaixo estão fechadas — reverter
qualquer uma custa editar este arquivo e o [04-tese.md](04-tese.md).

---

## D1 — B2C. Quem paga é o viajante

**Decidido por você**, em 05/09/2026, porque é a dor que você mesmo sentiu.

Registro honesto: eu havia recomendado o caminho B2B2C, por provar mais rápido
dentro de 16 semanas. **Você decidiu e a decisão está tomada** — o plano inteiro
foi reescrito para o A, sem hedge. O caminho B está em
[arquivo/](arquivo/README.md), com as três condições exatas para reabri-lo.

**O que a sua escolha traz de vantagem e que eu subestimei:** ser o ICP. Você
organiza viagem exatamente como o cliente organiza. Isso não substitui as 20
entrevistas, mas resolve o problema que mata a maioria dos micro-SaaS — saber
onde dói de verdade.

## D2 — R$39 por viagem, não assinatura

**Decidido.** Plano anual de R$99 só aparece depois da segunda compra avulsa.

**Por quê.** O brasileiro faz 1 a 2 viagens grandes por ano. Assinatura mensal
contra uso anual não é problema de retenção a administrar — é vazamento: assina
em dezembro, viaja, cancela em janeiro. Cobrar por viagem elimina o churn em vez
de combatê-lo e põe o pagamento no momento exato do valor.

E vira a âncora a seu favor: Tripsy Pro US$59/ano ≈ R$325, TripIt US$49/ano ≈
R$270. Quem viaja uma vez por ano paga R$270 por uma viagem. Você cobra R$39.

**Alternativa descartada:** assinatura mensal barata, R$14,90. Continua sendo
assinatura, continua sendo cancelada em janeiro, e ancora o produto num patamar
de valor baixo.

## D3 — Android primeiro. Play Store antes da App Store

**Decidido, e é a decisão estratégica do plano.**

**Por quê.** O melhor organizador de viagem brasileiro — o Tripsy, que faz
exatamente o que você faz na planilha — **não existe no Android**, num país que é
81% Android. E mantém uma lista de espera pública admitindo a demanda represada.

Seu app é Expo/React Native e publica nas duas lojas com a mesma base de código.
A vantagem já existe e não foi planejada: veio de uma escolha técnica que você já
tinha feito.

Somado a isso, a Play Store custa **US$25 uma vez** contra **US$99/ano** da
Apple, e a revisão é rápida e previsível.

**Alternativa descartada:** iOS primeiro, porque o público de app pago de viagem
tem mais iPhone. É verdade e é irrelevante: seguir por ali significa entrar de
frente contra o Tripsy no território onde ele tem oito anos e 700 integrações.

## D4 — Centralizar é de graça. Cobra-se o dia do problema

**Decidido.** As camadas 1 e 2 da [tese](04-tese.md) são gratuitas para sempre.

**Por quê.** Você está certo de que a centralização é o principal *do produto* —
é a fundação, é o que a pessoa abre todo dia da viagem, e é o que produz o dado
de que tudo mais depende. Mas ela não sustenta o preço sozinha: Wanderlog
centraliza de graça nas duas lojas em português, TripIt centraliza de graça, e o
Google Travel centraliza sozinho.

A conciliação não custa nada da sua tese: centralizar deixa de ser a commodity
que o TripIt dá de graça e vira a **barreira de entrada** do que você cobra —
ninguém recalcula uma cadeia que não tem.

## D5 — O motor de direitos entra no MVP

**Decidido.** Resolução ANAC nº 400/2016 — 1h comunicação, 2h alimentação, 4h
hospedagem, e as quatro escolhas acima de 4h.

**Por quê.** Você disse que as features extras vêm depois, e concordo com a ordem
de construção: centralizar primeiro. Mas **alguma coisa precisa ser paga já no
G1**, senão não há o que pré-vender em 11/10. O motor de direitos é a mais barata
de construir entre as camadas pagas — é uma tabela, não é IA — e é a única que
nenhum concorrente do mundo tem.

**Alternativa descartada:** MVP só com centralização, monetização depois. Adia a
única pergunta que importa — alguém paga? — para a semana 16, quando os R$2.000
já foram gastos.

## D6 — Nada de scraping

**Decidido.** Sem scraping de companhia aérea, sem API não oficial, sem login na
conta do usuário, sem gerar código de barras.

**Por quê.** A promessa é "eu te aviso". Fonte que quebra em silêncio não gera
erro no seu log — gera uma pessoa sozinha num aeroporto.

## D7 — MEI só depois do G2

**Decidido.** Pré-venda por Pix em CPF. Abrir CNPJ antes de ter cliente é gastar
dinheiro e semanas validando nada.

---

## Caminhos descartados

- **B2B2C** — vender para o agente de viagens independente. Arquivado, não
  descartado: [arquivo/README.md](arquivo/README.md) lista as condições para
  reabrir.
- **B2C premium tipo Flighty** — assinatura para o viajante frequente. A Flighty
  já ocupou a posição com três pessoas e ~US$500k/mês num mercado iOS-first
  americano. Guerra de margem sem fim.
- **Modelo LiberFly / AirHelp** — monetizar a indenização depois do desastre.
  Melhor receita por evento e mercado provado. Exige parceria jurídica e
  procuração: não é software. **Continua sendo a melhor segunda linha de
  receita**, por indicação a um parceiro, depois do G3.
- **Planejamento de roteiro** (tipo Wanderlog) — pré-compra, mercado saturado,
  gratuito, e não usa nada do que já está construído aqui.
- **Competir por qualidade de organização** — o design já é melhor que o do
  TripIt, e isso não vende. Ninguém troca um app grátis por um pago por causa de
  tipografia.
