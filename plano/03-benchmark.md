# Benchmark — quem centraliza a viagem inteira

Pesquisa de setembro de 2026, focada no que você pediu: **quem hoje junta voo,
carro, hotel e passeios num lugar só**, no Brasil e no mundo.

---

## Resposta curta

**Não é campo vazio.** Três produtos fazem isso hoje e fazem bem. Mas há um
buraco específico, e ele é grande o bastante para caber um produto inteiro.

---

## 1. Tripsy — o concorrente direto, e é brasileiro

Precisa começar por ele, porque é **exatamente** o produto que você descreveu.

| | |
|---|---|
| Origem | **Brasileiro**, no ar desde 2018 |
| O que centraliza | Voo, hotel, **carro**, **passeios**, restaurante — tudo |
| Importação | **700+ provedores** (Booking, Hotels.com, Airbnb, maioria das cias) + encaminhar e-mail |
| Também tem | Compartilhar itinerário, alerta de voo, documentos, gastos, calendário, offline |
| Preço | Grátis · **Pro US$59/ano** ou **US$299 vitalício** |
| Grátis inclui | Viagens ilimitadas, sync na nuvem, convidados, gastos, encaminhar reservas |
| Grátis **não** inclui | Armazenar documentos, previsão do tempo, **alerta de voo** |
| Plataformas | **iPhone, iPad e Mac. Não tem Android.** |

> ### O buraco
>
> **O Brasil é 81% Android.** O melhor organizador de viagem brasileiro não roda
> em 4 de cada 5 celulares do país.
>
> E não é descuido: a Tripsy mantém uma **página de lista de espera para
> Android** (`tripsy.app/android`). Existe demanda represada, documentada pela
> própria concorrente, e ela optou por não atender.
>
> O seu app é **Expo / React Native** — publica nas duas lojas com a mesma base
> de código. É a vantagem estrutural mais concreta que este projeto tem, e ela
> não veio de estratégia: veio de uma escolha técnica que você já fez.

**O risco correspondente:** lista de espera significa que eles podem lançar.
Está mapeado em [10-riscos.md](10-riscos.md).

## 2. Os globais que rodam nas duas lojas

| Produto | O que centraliza | Preço | Onde é forte | Onde é fraco |
|---|---|---|---|---|
| **Wanderlog** | Roteiro no mapa, voo, hotel, atividades, gastos, colaboração | **Grátis** · Pro US$39,99/ano | Grátis de verdade, Android + iOS, **já em português do Brasil**, offline, ótimo em grupo | **Planejamento, não execução.** Ajuda a decidir o que fazer; não te conduz no dia. Importação por Gmail é recurso pago |
| **TripIt** | Voo, hotel, carro, restaurante | Grátis · **Pro US$49/ano** | O padrão da categoria há ~20 anos. Android + iOS, com suporte a português | Organiza, **não decide**. Não sabe o que fazer quando a cadeia quebra. Cobertura de fornecedor brasileiro não é o forte |
| **Google Travel** | O que passa pelo Gmail | Grátis | Esforço zero. Aparece sozinho | Espalhado entre Gmail, Maps e busca. **Não é um produto de viagem, é um subproduto do e-mail.** Só vê o que chega no Gmail |
| **TripZen** | Roteiro com IA, importa reservas do e-mail | freemium | Geração automática de roteiro | Aposta em gerar plano, não em executá-lo |
| **Sygic Travel** | Roteiro e mapa offline | freemium | Mapas offline | Mapa, não cadeia de reservas |

## 3. Quem parece concorrente e não é

| Produto | Por que não é |
|---|---|
| **Voopter · Melhores Destinos · Passageiro de Primeira** | Vivem **antes** da compra. Acham a passagem e desaparecem no instante em que você paga |
| **Apps de Latam, Gol e Azul** | Cada um só sabe do próprio voo. Nenhum liga o voo ao carro, ao hotel e ao passeio — **são a razão de o problema existir** |
| **Decolar, 123milhas, CVC** | Mostram o que você comprou **com eles**. Sua viagem tem quatro fornecedores |
| **Booking · Airbnb** | Idem, para hospedagem |
| **LiberFly · Resolvvi** | Entram depois do desastre, com advogado |

---

## O que ninguém faz — a lista honesta

Cruzando tudo, sobra o seguinte:

| Lacuna | Quem chega perto | O que falta |
|---|---|---|
| **Organizador brasileiro completo no Android** | Tripsy | Só não existe no Android — 81% do país |
| **A tela do "agora"** — a próxima ação, não a lista de reservas | Ninguém | Todos mostram *o que você reservou*. Nenhum mostra *o que fazer neste minuto* |
| **Recalcular a cadeia inteira** quando um elo quebra | Flighty recalcula conexão aérea | Ninguém diz "o voo atrasou 2h, o carro alugado fecha às 22h, o hotel precisa saber" |
| **Direitos do passageiro brasileiro** | Ninguém | TripIt e Flighty são americanos. Não sabem o que é a Resolução ANAC 400 |
| **Cobertura de fornecedor brasileiro** | Tripsy, parcialmente | Ninguém trata bem 123milhas, CVC, Hurb, Zarpo, operadoras locais de passeio |

---

## A leitura estratégica — e onde eu discordo um pouco de você

Você disse que a centralização é o principal, e **sobre o produto você está
certo**: é a fundação, é o que a pessoa abre todo dia da viagem, e é o que
produz o dado de que tudo mais depende. Sem centralizar, não existe nem tela do
agora, nem recálculo, nem direitos.

**Sobre o preço, ela não sustenta sozinha.** Wanderlog centraliza de graça nas
duas lojas e em português. TripIt centraliza de graça. Google Travel centraliza
sozinho. Cobrar R$39 por centralizar é competir com três zeros.

A conciliação é simples e não custa nada da sua tese:

> **Centralizar é o produto e é de graça. O que se cobra é o dia em que a viagem
> deixa de sair como planejado.**

Isso te dá as duas coisas ao mesmo tempo: um produto que serve 100% das viagens
(e por isso é instalado e aberto), e um momento de cobrança que só existe porque
tudo está centralizado — **ninguém consegue recalcular a cadeia sem ter a cadeia
inteira**. A centralização deixa de ser a commodity que o TripIt dá de graça e
vira a **barreira de entrada** do que você cobra.

E o alvo fica bem definido:

> **Ser o organizador de viagem que o Tripsy não é — no Android, com fornecedor
> brasileiro, e que não te abandona no dia em que o voo atrasa.**

Detalhe da tese em [04-tese.md](04-tese.md); o escopo dos 45 dias em
[05-mvp.md](05-mvp.md).

---

## Tabela de posicionamento

| | Tripsy | Wanderlog | TripIt | Google | **Embarcaly** |
|---|---|---|---|---|---|
| Android | ❌ | ✅ | ✅ | ✅ | **✅** |
| Português do Brasil | ✅ | ✅ | ✅ | ✅ | **✅** |
| Centraliza voo, carro, hotel, passeio | ✅ | ✅ | ✅ | parcial | **✅** |
| Importa por e-mail | ✅ | pago | ✅ | automático | **✅** |
| Offline | ✅ | ✅ | ✅ | ❌ | **✅** |
| Tela do "o que fazer agora" | ❌ | ❌ | ❌ | ❌ | **✅** |
| Recalcula a cadeia quando quebra | ❌ | ❌ | ❌ | ❌ | **✅** |
| Direitos do passageiro (ANAC 400) | ❌ | ❌ | ❌ | ❌ | **✅** |
| Preço | US$59/ano | Grátis | US$49/ano | Grátis | **R$39 por viagem** |

As quatro linhas com ❌ em toda a fileira são o produto. As de cima são a
condição para entrar no jogo.
