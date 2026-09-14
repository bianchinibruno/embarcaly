# Dossiê Embarcaly

**Documento completo do projeto.** Tudo que existe, por que existe, e o que
falta. Escrito em 13/09/2026.

Para retomar uma sessão rápido, use o [CONTINUAR.md](CONTINUAR.md), que é o
resumo operacional. Este aqui é o contexto inteiro.

**Índice navegável com link direto para cada arquivo:**
https://claude.ai/code/artifact/520b947e-9703-40df-aea7-c2c228b2ff5b

---

## Sumário

1. [O que é o Embarcaly](#1--o-que-é-o-embarcaly)
2. [De onde o projeto partiu](#2--de-onde-o-projeto-partiu)
3. [A pesquisa de mercado, e o que ela achou](#3--a-pesquisa-de-mercado-e-o-que-ela-achou)
4. [As decisões, e por que cada uma](#4--as-decisões-e-por-que-cada-uma)
5. [O produto: as três camadas](#5--o-produto-as-três-camadas)
6. [A identidade visual, e os dois erros no caminho](#6--a-identidade-visual-e-os-dois-erros-no-caminho)
7. [O que foi construído](#7--o-que-foi-construído)
8. [O ciclo de validação e os quatro portões](#8--o-ciclo-de-validação-e-os-quatro-portões)
9. [Marketing](#9--marketing)
10. [Vendas](#10--vendas)
11. [Proteção jurídica](#11--proteção-jurídica)
12. [Economia do negócio](#12--economia-do-negócio)
13. [Riscos](#13--riscos)
14. [O que falta](#14--o-que-falta)
15. [Limites: o que eu não posso fazer](#15--limites-o-que-eu-não-posso-fazer)
16. [Números de referência](#16--números-de-referência)

---

## 1 · O que é o Embarcaly

**Um organizador de viagem que não te abandona quando a viagem sai do plano.**

Junta voo, hotel, carro e passeio num lugar só, funciona sem internet, em
português, **no Android**. E quando um elo da viagem quebra, ele refaz a cadeia
inteira e diz o que a companhia aérea é obrigada a fazer por você.

### O problema, concreto

Você compra a viagem em quatro lugares diferentes, com meses de antecedência.
Voo na Latam, hotel no Booking, carro na Localiza, passeio numa operadora local
que respondeu por WhatsApp. Cada um manda um e-mail. Cada um tem um aplicativo.
Nenhum sabe da existência do outro.

Aí você monta uma planilha.

E no dia em que o voo atrasa três horas, a planilha não ajuda. Ela te diz o que
*era para* ter acontecido. O transfer que você não vai mais pegar, o hotel que
precisa ser avisado, o passeio de amanhã cedo que ficou impossível — **essa
conta fica com você**, no celular, na fila, cansado.

### Quem paga, e quanto

| | |
|---|---|
| Modelo | **B2C · R$39 por viagem**, não assinatura |
| Camadas 1 e 2 | Grátis para sempre |
| Camada 3 | É o que se cobra |
| Momento de cobrança | **D-7 do embarque** |

### Onde está

| | |
|---|---|
| Repositório | https://github.com/bianchinibruno/embarcaly |
| Landing | https://bianchinibruno.github.io/embarcaly/ |
| Captura | https://bianchinibruno.github.io/embarcaly/captura/ |
| Guia em PDF | https://bianchinibruno.github.io/embarcaly/guia-direitos-do-passageiro.pdf |
| Protótipo | https://bianchinibruno.github.io/embarcaly/prototipo/ |
| Painel de controle | https://claude.ai/code/artifact/545256a7-8a0d-435e-a17d-854d2a967e49 |

---

## 2 · De onde o projeto partiu

### O ponto de partida real

Quando esta sessão começou, o Embarcaly já existia: conceito escrito, marca com
manual completo, protótipo HTML no ar, e um aplicativo Expo com CRUD, SQLite,
testes e CI. **Dezesseis commits de engenharia e zero usuários.**

O próprio README do projeto já dizia a coisa certa: *"o próximo passo não é
programar. É descobrir se a dor é forte e frequente o bastante para alguém
pagar."*

### O erro de premissa que corrigi na entrada

Você escreveu "Embarcafly". Fui procurar e não achei nada indexado. Antes de
inventar uma tese, li o disco — e encontrei a pasta `embarcaly/` com o projeto
inteiro. **Isso mudou tudo**: não era um projeto novo para desenhar, era um
projeto pronto esperando validação.

### O framework

Todo o plano segue o curso **Zero ao Micro-SaaS** (Bruno Okamoto), cujo PDF você
mandou. Três fases — Preparação, Mão na Massa, Refinamento — com as restrições
do curso: **2 a 6 meses, R$2.000 de investimento, MVP de 3 a 5 funcionalidades
em até 45 dias**.

---

## 3 · A pesquisa de mercado, e o que ela achou

Todo número abaixo foi levantado em setembro de 2026 e é a base de cada decisão
do plano.

### 3.1 · Quem centraliza viagem hoje

Você pediu para eu procurar quem junta voo, carro, hotel e passeio num lugar só.
**Não é campo vazio.**

| Produto | O que faz | Preço | O buraco |
|---|---|---|---|
| **Tripsy** | **Brasileiro**, desde 2018. Voo, hotel, carro, passeio, restaurante. 700+ integrações, importa por e-mail, offline, alerta de voo | Grátis · **US$59/ano** | **Só iPhone, iPad e Mac. Não tem Android** |
| Wanderlog | Roteiro no mapa, colaboração, gastos | Grátis · US$39,99/ano | Planejamento, não execução. Importação por Gmail é paga |
| TripIt | Encaminhe o e-mail, ele monta a linha do tempo | Grátis · US$49/ano | Organiza, não decide. Americano |
| Google Travel | O que passa pelo Gmail | Grátis | Espalhado, e só vê o Gmail |
| Flighty | Disrupção de voo antes da companhia | US$49,99/ano | iOS-first americano. Recalcula conexão aérea e para aí |

### 3.2 · O achado que define a estratégia

> **O Brasil é 81% Android. O melhor organizador de viagem brasileiro não roda em
> 4 de cada 5 celulares do país.**
>
> E não é descuido: a Tripsy mantém uma **página de lista de espera pública para
> Android**. A própria concorrente documentando a demanda que escolheu não
> atender.
>
> O app do Embarcaly é **Expo / React Native** e publica nas duas lojas com a
> mesma base de código. A vantagem já existia, e não veio de estratégia — veio de
> uma escolha técnica que você já tinha feito.

### 3.3 · O que ninguém faz, em lugar nenhum

1. **Recalcular a cadeia inteira** quando um elo quebra. Flighty recalcula
   conexão aérea; ninguém diz "o voo atrasou 2h, logo o carro fecha às 22h e o
   hotel precisa saber"
2. **Direitos do passageiro brasileiro.** TripIt e Flighty são americanos e não
   vão aprender a Resolução ANAC 400 por causa do Brasil
3. **A tela do "o que fazer agora"** em vez da lista do que você reservou

### 3.4 · A demanda, medida

Feita em 13/09 para reduzir o número de entrevistas. Post de rede social prova
que alguém reclamou; **reclamação registrada em regulador prova quantos**.

| Sinal | Número |
|---|---|
| Reclamações de passageiro aéreo por ano, só no consumidor.gov.br | **~100.000**, com +80% resolvidas |
| **A ANAC lançou plataforma dedicada** em abril de 2026 | 10 dias de prazo, painel público por empresa |
| Voos cancelados por ano no Brasil | 112 mil · 11,6% do total |
| Passageiros com voo interrompido em 2018 | 17 milhões · **2% pediram alguma coisa** |
| Alternativas ao Tripsy | 50+, e as com Android são todas gringas |
| Template de Notion para organizar viagem | Vendido. **Gente paga por planilha bonita** |

> **O sinal mais forte é a ANAC.** Um regulador não constrói plataforma dedicada,
> com SLA e painel público, para um problema de cauda. Ele constrói quando o
> volume não cabe mais no canal genérico.

**E essa pesquisa desatualizou o guia.** Ele listava consumidor.gov.br como
primeiro canal oficial. Corrigido no mesmo dia — e **reconferir a regulação toda
virada de trimestre virou tarefa fixa de marketing.**

### 3.5 · Conversão de aplicativo

| Métrica | Referência 2026 |
|---|---|
| Instalação → compra, categoria viagem | 2,42% |
| **Teste → pago, categoria viagem** | **48,7% mediana · 54,3% no quartil superior** |
| Teste → pago, freemium puro | 2,6% |
| Cobrança antecipada vs. freemium | 10,7% contra 2,1% |
| Ficha de loja com 6–8 prints vs. 2 | **+35% de engajamento** |

> **Viagem lidera todas as categorias** em conversão de teste para pago, e a
> explicação é literal: *utilidade sensível ao tempo*. A pessoa paga no instante
> em que a viagem está chegando.
>
> Isso valida o momento de cobrança do plano — **D-7 do embarque** — com dado de
> mercado, não com intuição. E derruba a ideia de cobrar na instalação.

### 3.6 · Canal

| Métrica | Referência |
|---|---|
| Carrossel: alcance vs. post único | 1,4× |
| Carrossel: engajamento | 3,1× |
| **Carrossel: salvamentos vs. Reels** | **2 a 3×** |
| Salvamento de carrossel educativo bom | 4% a 8%, chegando a 12% |
| Folhas com melhor conclusão | 7 a 10 |
| Janelas no Brasil | 11h–13h e 19h–21h, terça a quinta |
| CPM Stories/Reels Brasil | R$8–18 |
| CPC serviço local | R$0,80–3,00 |
| Meta Ads em 2026 | **12,15% mais caro**, repasse de PIS/Cofins e ISS |
| Publi micro (10k–100k) | Feed a partir de R$1.500 · Reels R$2.000–8.000 |
| Reajuste do mercado de publi | **+20% em julho de 2026** |

---

## 4 · As decisões, e por que cada uma

Registro completo em [`plano/00-decisoes.md`](plano/00-decisoes.md).

### D1 · B2C — o viajante paga

**Decidido por você**, contra a minha recomendação inicial, porque é a dor que
você mesmo sentiu.

Eu havia recomendado **B2B2C** — vender para o agente de viagens a R$79/mês —
por três razões: o brasileiro faz 1 a 2 viagens grandes por ano e isso não
sustenta assinatura; o agente já paga R$440/mês no Monde; e o cache de consulta
de voo por rota só rende com concentração de clientes.

Você decidiu B2C. **O plano inteiro foi reescrito sem hedge**, e o caminho B
ficou preservado em [`plano/arquivo/`](plano/arquivo/README.md) com as três
condições que o fariam voltar.

**O que a sua escolha traz e eu subestimei:** você é o ICP. Organiza viagem
exatamente como o cliente organiza. Isso não substitui entrevista, mas resolve o
problema que mata a maioria dos micro-SaaS — saber onde dói de verdade.

### D2 · R$39 por viagem, nunca assinatura

O brasileiro faz 1 a 2 viagens grandes por ano. Assinatura mensal contra uso
anual não é problema de retenção a administrar: **é vazamento estrutural**.
Assina em dezembro, viaja, cancela em janeiro.

Cobrar por viagem **elimina o churn em vez de combatê-lo**, põe o pagamento no
momento exato do valor, e vira a âncora a favor:

| | Custo de quem viaja 1×/ano |
|---|---|
| Tripsy Pro | ≈ R$325 |
| TripIt Pro | ≈ R$270 |
| **Embarcaly** | **R$39** |

### D3 · Android primeiro — Play Store antes da App Store

A decisão estratégica do plano. Motivo na seção 3.2. Some a isso: a Play custa
**US$25 uma vez**, a Apple **US$99 por ano**, e a revisão da Play é rápida e
previsível.

**Descartado:** iOS primeiro porque o público de app pago tem mais iPhone. É
verdade e é irrelevante — significa entrar de frente contra o Tripsy onde ele
tem oito anos e 700 integrações.

### D4 · Centralizar é de graça. Cobra-se o dia do problema

Você disse que a centralização é o principal, e **sobre o produto você está
certo**: é a fundação, é o que a pessoa abre todo dia, e é o que produz o dado.

**Sobre o preço, ela não sustenta sozinha.** Wanderlog centraliza de graça nas
duas lojas em português. TripIt centraliza de graça. Google centraliza sozinho.

A conciliação não custa nada da sua tese: centralizar deixa de ser a commodity
que o TripIt dá de graça e vira a **barreira de entrada** do que você cobra.
**Ninguém recalcula uma cadeia que não tem.**

### D5 · O motor de direitos entra no MVP

Você disse que features extras vêm depois, e concordo com a ordem de construção.
Mas **alguma coisa precisa ser paga já no G1**, senão não há o que pré-vender. O
motor de direitos é a camada paga mais barata de construir — é uma tabela, não é
IA — e a única que nenhum concorrente do mundo tem.

### D6 · Nada de scraping

Sem scraping de companhia, sem API não oficial, sem login na conta do usuário,
sem gerar código de barras.

**A promessa é "eu te aviso". Fonte que quebra em silêncio não gera erro no seu
log — gera uma pessoa sozinha num aeroporto.**

### D7 · MEI só depois do G2

Pré-venda por Pix em CPF. Abrir CNPJ antes de ter cliente é gastar dinheiro e
semanas validando nada.

---

## 5 · O produto: as três camadas

Distinguir as três é o que organiza produto, preço e comunicação.

### Camada 1 · Centralizar — **grátis**
Voo, hotel, carro, passeio, restaurante num lugar só. Offline, em português, nas
duas lojas. É o que faz instalar e abrir todo dia da viagem.

**Não é o que se cobra.** Competir com três produtos gratuitos é perder.

### Camada 2 · Conduzir — **grátis**
A tela **agora / depois / mais tarde**. Não a lista do que você reservou — a
próxima ação, e o documento daquele momento.

**Nenhum concorrente tem isso.** Todos mostram o itinerário; nenhum mostra o
minuto. Já estava desenhada e construída no protótipo, e é o ativo mais
subestimado do projeto.

### Camada 3 · Socorrer — **R$39 por viagem**
O voo atrasou. O carro fecha às 22h, o hotel precisa saber do check-in tardio, o
passeio de amanhã cedo virou impossível. **Recalcular a cadeia inteira**, e dizer
o que a companhia é obrigada a fazer.

É impossível de fazer sem ter a cadeia inteira — que é o que a camada 1 produz.

---

## 6 · A identidade visual, e os dois erros no caminho

Esta seção existe porque o processo importa mais que o resultado: você rejeitou
duas versões, e as duas rejeições estavam certas.

### Tentativa 1 · Bilhete impresso — creme e terracota
Veio do manual de marca original, que é bem raciocinado. Mas a execução caiu
**exatamente no visual mais comum de página gerada por IA**: fundo creme, um
acento terracota, título em grotesk, etiqueta em mono maiúsculo, régua fina entre
seções.

### Tentativa 2 · Painel escuro — preto com verde, âmbar e vermelho
Troquei a paleta e caí **no outro cluster da mesma lista**: fundo escuro liso com
acento neon. Trocar um padrão por outro não resolve.

### O que resolveu: **material**

Você apontou o certo — *"fundo forte"*. O tell mais forte não é a cor, é a
ausência de matéria. Fundo chapado, grade perfeita, zero imperfeição.

**Sistema v2 "Painel", superfície impressa** — hoje arquivado em
[`brand/IDENTIDADE-v2-arquivado.md`](brand/IDENTIDADE-v2-arquivado.md):

| | |
|---|---|
| Papel | `#EFEEE6`, com banda greenbar `#DCE3D8` |
| Tinta 1 | Chumbo `#14170F` |
| **Tinta 2, única cor** | **Carimbo violeta `#46356E`** — cor de carimbo de repartição brasileira, não vermelho, que levaria de volta ao terracota |
| Display | Archivo Narrow 700 — condensada, registro de sinalização |
| Texto | Archivo |
| Dado | **Courier Prime** — máquina de escrever, não mono de terminal |

**Os quatro materiais, obrigatórios:**

1. **Fibra de papel** — ruído irregular no papel inteiro
2. **Desalinho de registro** — a segunda tinta bate 0,8pt fora da primeira
3. **Carimbo torto** — 4 a 7 graus, moldura dupla
4. **Ferragem de escritório** — furo de arquivo, marca de gráfica, picote

### Tentativa 4 · o v3, herdado da Trilha Certa

Em 14/09/2026 o sistema mudou de novo, e desta vez por decisão de negócio, não
por diagnóstico visual: o v3 herda a paleta e a tipografia da **Trilha Certa
Viagens**, e adapta o que um produto precisa adaptar.

| | |
|---|---|
| Azul marinho | `#33366A` — estrutura |
| Laranja | `#ED8426` — **o tempo está contando**, e nada além disso |
| Fundo do app | `#1C1E3C` |
| Texto | **Poppins** |
| Dado | **IBM Plex Mono** — onde a agência assina com a mão, o produto assina com o dado |

Duas trocas de sentido em relação ao manual da agência: a manuscrita **sai**, e
verde e vermelho deixam de ser recurso de comparação para virar **estado de voo**.

O v2 fica registrado aqui porque a lição dele continua valendo — o que separa uma
peça feita de uma peça gerada é intenção, não paleta. Detalhes em
[`brand/IDENTIDADE.md`](brand/IDENTIDADE.md).

**Regras duras:** zero canto arredondado, zero sombra, zero gradiente, nada
centralizado, e **no impresso existe uma tinta de cor só** — situação se comunica
por peso e moldura, não por três cores.

A marca **E de Três Tempos** do manual v1 continua válida e não foi redesenhada.

---

## 7 · O que foi construído

**35 commits · 305 testes verdes · 100% de cobertura no domínio · CI verde ·
v0.2.0**

### 7.1 · Aplicativo — `mobile/`

Expo · React Native · TypeScript. **Não publicado em loja**, por decisão sua.

| Módulo | O que faz | Testes |
|---|---|---|
| [`domain/direitos.ts`](mobile/src/domain/direitos.ts) | Motor da Resolução ANAC 400: limiares de 1h/2h/4h, as quatro saídas acima de 4h, compensação por preterição (250/500 DES). **Artigo citado em cada verbete**, e frase pronta para o balcão | **38** |
| [`domain/cascata.ts`](mobile/src/domain/cascata.ts) | Recálculo da cadeia: dado um atraso, o que aconteceu com cada reserva seguinte — `perdido`, `avisar`, `inviavel`, `apertado`, `ok` | **19** |
| [`domain/legal.ts`](mobile/src/domain/legal.ts) | Fonte única dos avisos de proteção, com teste que **falha se alguém escrever uma promessa que o produto não cumpre** | **17** |
| [`screens/SocorroScreen.tsx`](mobile/src/screens/SocorroScreen.tsx) | A camada 3 na tela | — |
| [`screens/DelayFormScreen.tsx`](mobile/src/screens/DelayFormScreen.tsx) | Registrar atraso. Aceita `225`, `3h45` ou `3:45` | **17** |

**Uma decisão registrada no código:** o atraso entra pela mão do viajante. Não é
limitação, é escolha — fonte oficial de status de voo custa por consulta, e antes
de existir receita o produto não pode depender dela.

**Um bug que o teste pegou:** com atraso grande a chegada vira o dia seguinte, e
a guarda de calendário desligava a regra de descanso justo no pior caso.

### 7.2 · Web

| Arquivo | O quê |
|---|---|
| [`index.html`](index.html) | Landing institucional |
| [`captura/index.html`](captura/index.html) | **Landing de captura/venda** — foco em baixar o guia e entrar na lista |
| [`prototipo/index.html`](prototipo/index.html) | Protótipo original, com controle de tempo |
| `og-image.png` | Imagem de compartilhamento, 2400×1260 |

### 7.3 · Conteúdo

| | |
|---|---|
| [Guia de direitos](guia-direitos-do-passageiro.pdf) | **8 folhas**, formulário impresso, gerador versionado em [`plano/gerar-guia.py`](plano/gerar-guia.py) |
| [`marketing/artes/`](marketing/artes/) | **37 peças**: 4 carrosséis (30 folhas), 6 prints de loja, 1 capa |
| [`marketing/gerar-artes.py`](marketing/gerar-artes.py) | Gerador reproduzível de todas as artes |

### 7.4 · Documentos

| Área | Quantidade | Onde |
|---|---|---|
| Estratégia | 13 + 5 templates | [`plano/`](plano/README.md) |
| Marketing | 6 | [`marketing/`](marketing/00-plano-de-marketing.md) |
| Vendas | 3 | [`vendas/`](vendas/00-playbook.md) |
| Jurídico | 3 | [`juridico/`](juridico/00-protecao.md) |
| Marca | 2 | [`brand/`](brand/IDENTIDADE.md) |

---

## 8 · O ciclo de validação e os quatro portões

**10/09/2026 → 03/01/2027.** ~11h30 por semana.

| Portão | Data | Passa com |
|---|---|---|
| **G0** | dom 27/09 | **12 entrevistas** · 8 com caso real · **10 que não sabiam do direito a hotel** · 8 em Android · 6 de fora do círculo |
| **G1** | dom 11/10 | **10 pré-vendas pagas de R$19**, sendo **4 de estranhos** |
| **G2** | dom 29/11 | 30 viagens acompanhadas · 20 pagas · **100% dos direitos corretos** |
| **G3** | dom 03/01 | 100 viagens pagas · 25% de recompra · **alcance crescendo 3 meses seguidos** |

### A regra que atravessa tudo

> **Commit de código de produto proibido até o G1, em 11/10.**
>
> O motivo é o risco R1, e ele é sobre você, não sobre o produto: testar dá
> feedback imediato de uma máquina; ouvir "não preciso disso" não dá. As duas
> coisas parecem trabalho, e só uma responde a pergunta que decide o projeto.

### Por que o G0 caiu de 20 para 12 entrevistas

A [validação de demanda](plano/12-validacao-de-demanda.md) provou **existência e
tamanho** do problema melhor do que 20 conversas provariam. O que ela **não**
responde continua obrigatório:

| Pergunta | Validado? |
|---|---|
| O problema existe e é grande? | ✅ 100 mil reclamações/ano, regulador construindo plataforma |
| Falta produto no Android? | ✅ Tripsy iOS-only confirmado |
| Existe improviso pago? | ✅ Template de Notion vendido |
| **As pessoas conhecem os próprios direitos?** | ❌ **Só entrevista responde** |
| **Alguém paga R$39?** | ❌ **Só pré-venda responde** |

**Economia: 8 entrevistas, ≈10 horas.** O tempo liberado vai para a pré-venda,
que é o portão que a pesquisa não ajuda.

### O ICP — quem entrevistar

> **O Organizador.** Quem assume sozinho montar a viagem e conduzir o grupo — e
> que hoje faz isso com planilha, print e pasta de e-mail.

**Quatro critérios de triagem:** viagem com 4+ reservas em 18 meses · foi ela
quem montou · viajou com outras pessoas · **usou algum improviso**.

O quarto é o mais subestimado. **Peça para ver a planilha** — é o dado mais
honesto da entrevista.

**Quatro perfis:** chefe de família em viagem internacional · casal na viagem
grande · organizador do grupo de amigos · **quem leva os pais idosos** (o mais
forte, e ninguém atende).

> ⚠️ **O anti-ICP é o especialista em milhas.** Fácil de achar, adora falar de
> viagem, dá duas horas de opinião detalhada — e nada disso serve. Ele quer
> **controle**; o produto vende **sossego**. Se mencionar programa de fidelidade
> sem você perguntar, encerre e não conte na meta.

Detalhamento em [`plano/02-icp.md`](plano/02-icp.md).

---

## 9 · Marketing

### O trabalho da área, em uma frase
Colocar **830 pessoas por mês** dentro do aplicativo gastando quase zero em
mídia, porque mídia paga não fecha a R$39 por viagem.

### Os dois pilares

| Pilar | Peso | Papel |
|---|---|---|
| **Direitos do passageiro** | 70% | Volume, autoridade, circulação |
| **O buraco do Android** | 30% | Público pequeno que **já quer o produto** |

### Canais

**Instagram é o canal** (80% do tempo, carrossel é o formato). TikTok e YouTube
Shorts são espelho do reels, mesmo arquivo. Reddit e grupos de Facebook são
táticos. Blog e SEO entram no mês 4. **Meta Ads nunca como aquisição.**

### Tráfego pago — a conta que fecha o assunto

| | |
|---|---|
| Contribuição por viagem paga | R$31,35 |
| CAC estimado via Meta Ads | **~R$188** |
| R$1.000 investidos devolvem | **R$166** |

**Não fecha, e não vai fechar** enquanto o LTV não subir. Os R$300 de verba
existem para **comprar informação** — qual mensagem converte — não usuário.
Estrutura completa em [`marketing/03-trafego-pago.md`](marketing/03-trafego-pago.md).

### Criadores — por que permuta, não contrato

| | |
|---|---|
| Pacote micro mais barato | ~R$3.500 |
| Viagens pagas para empatar | **112** |
| Meta do ciclo inteiro | 100 |

Um único publi custa quase o dobro do orçamento total. **A estratégia é permuta
com o guia**: criador de viagem vive sem pauta, e um guia pronto e correto
resolve o problema dele levando seu nome junto. Em
[`marketing/04-influenciadores.md`](marketing/04-influenciadores.md).

### Vídeo
Seis roteiros prontos, produção de **R$0** com celular e CapCut. Um vídeo rende
cinco peças. Em [`marketing/05-video.md`](marketing/05-video.md).

### ASO
Ficha da Play Store escrita e pronta para colar, com a aposta na cauda de
direitos — **nenhum concorrente de organizador de viagem indexa por "voo
atrasado"**. Em [`marketing/02-aso-play-store.md`](marketing/02-aso-play-store.md).

### Calendário
**26 semanas de pauta** e banco de 40 assuntos em
[`marketing/01-calendario-editorial.md`](marketing/01-calendario-editorial.md).

---

## 10 · Vendas

### Os três momentos

| Momento | Quando | Copy |
|---|---|---|
| **1 · D-7 do embarque** | O principal | *"Sua viagem começa em 7 dias. Quer que eu acompanhe? R$39, uma vez, até você voltar."* |
| **2 · O primeiro problema** | O mais forte, e o mais delicado | *"Seu voo atrasou 2h10. A companhia já deve alimentação."* |
| **3 · Retorno +2 dias** | Recompra e indicação | É aqui que o plano anual aparece pela primeira vez |

> ⚠️ **A linha ética do momento 2, que não se cruza.** O aviso **de que atrasou**
> é gratuito e sempre será. O que se cobra é o recálculo da cadeia e o passo a
> passo dos direitos. **Cobrar pela informação de que a pessoa está em apuros é
> extorsão, não venda.**

### O funil

| Etapa | Meta mensal no G3 |
|---|---|
| Alcance | 50.000 |
| Perfil visitado | 2.500 |
| Instalação | 1.000 |
| **Ativação** | **400** — onde mais vaza |
| Compra em D-7 | 32 |

### Nove objeções com resposta
Em [`vendas/00-playbook.md`](vendas/00-playbook.md). A mais usada:

> *"R$39 é caro"* → "TripIt Pro custa R$270 por ano. Você viaja uma vez. Prefere
> pagar R$270 ou R$39?"

---

## 11 · Proteção jurídica

> 🔴 **Eu não sou advogado e não dei parecer.** O que existe em
> [`juridico/`](juridico/00-protecao.md) é mapa de exposição e **minuta**, para o
> seu advogado revisar. Revisão está no cronograma (semana 8) e no orçamento
> (R$400).

### As três exposições

| # | Frente | Gravidade | Probabilidade |
|---|---|---|---|
| 1 | **Conteúdo** — informar direito errado | Média | Baixa, se o processo for seguido |
| 2 | **Atividade** — parecer advocacia ou agência de viagens | Alta | Baixa |
| 3 | **Produto** — alguém agir sobre um `PERDIDO` calculado errado | **Alta** | **Alta** ⚠️ |

**A terceira é a pior e a menos antecipada.** O cálculo roda sobre dado digitado
pelo usuário, sem fonte oficial. Errar é comportamento esperado, não exceção.

### O que já protege

- [`legal.ts`](mobile/src/domain/legal.ts) é **fonte única** dos avisos, com
  teste que barra "garantimos", "você receberá" e afins
- O aviso do cálculo diz, na própria tela: *não garante, confirme com o
  fornecedor, **a decisão é sua***
- A ação sugerida é sempre "confirme", "avise", "remarque" — nunca "cancele"
- **O aplicativo não executa nada em seu nome.** Não cancela, não remarca, não
  contata ninguém

### Decisões de produto que reduzem exposição

Nunca gerar código de barras · sem scraping · sem login na conta do usuário ·
não vender passagem · não receber comissão · cobrar por viagem em vez de
assinatura · devolução sem pergunta em 7 dias · dado no aparelho.

### Bloqueantes antes de qualquer loja

1. **Política de privacidade em URL pública** — a Play recusa o envio sem ela
2. Termos aceitos no primeiro uso
3. **Revisão por advogado**
4. Aceite explícito na tela de Socorro
5. Conferir o CNAE do MEI

**Dez perguntas prontas para levar à consulta** em
[`juridico/00-protecao.md`](juridico/00-protecao.md).

---

## 12 · Economia do negócio

### Por viagem paga

| | |
|---|---|
| Preço | R$39,00 |
| Menos 15% da loja *(Small Business Program)* | −R$5,85 |
| Receita líquida | R$33,15 |
| Consultas de voo (4 trechos × 6 janelas) | −R$1,30 |
| Push, e-mail, armazenamento | −R$0,50 |
| **Contribuição** | **R$31,35 · margem 94%** |

### Custo fixo mensal

API de voo R$250 · infra R$50 · lojas R$48 · MEI R$76 = **R$424**
**Equilíbrio: 14 viagens pagas por mês.**

### Os R$2.000, em fluxo de caixa

| Mês | Sai | Entra | Saldo |
|---|---|---|---|
| Set | R$190 | R$0 | R$1.810 |
| Out | R$500 | R$190 | R$1.500 |
| Nov | R$390 | ~R$400 | R$1.510 |
| Dez | R$450 | ~R$800 | R$1.860 |
| Jan | R$900 | ~R$1.200 | R$2.160 |

**Duas decisões fazem o dinheiro durar:** a conta da Apple só em janeiro (US$99
contra US$25 da Google), e a API de voo começando no degrau mais barato — entrar
no degrau caro custa R$1.200 a mais em quatro meses e quebra o orçamento.

**Gasto até o G1, em 11/10: R$190.** Só domínio e o teste de mensagem.

### Projeção até fevereiro

| Mês | Viagens pagas | Receita líquida |
|---|---|---|
| Out/26 | 10 *(pré-venda)* | R$190 |
| Nov/26 | 20 | R$663 |
| Dez/26 | 45 | R$1.492 |
| Jan/27 | 70 | R$2.321 |
| Fev/27 | 95 | R$3.149 |

**Leitura honesta:** em fevereiro o projeto fatura ~R$3.100/mês contra R$424 de
custo fixo. Paga-se com folga e **não paga um salário**. É o esperado — o G3 não
mede renda, mede se a máquina de aquisição compõe.

---

## 13 · Riscos

| # | Risco | Prob. | Mitigação |
|---|---|---|---|
| **R1** | **Construir em vez de vender** | Alta | Commit de produto proibido até o G1. Chega sempre como razão técnica sensata |
| **R2** | **Aquisição sem verba** | Alta | 830 ativações/mês só com orgânico. Conteúdo desde a semana 0 |
| **R3** | **Tripsy lança Android** | Média | Existe lista de espera pública deles. Velocidade, e competir pelas camadas 2 e 3 |
| **R4** | Aviso errado ou que não chega | Média | Os 50 primeiros passam por você. 100% correto no G2 |
| **R5** | Errar um direito | Média | Tabela testada exaustivamente, artigo citado, revisão jurídica |
| **R6** | Importação por e-mail falha | Média | 5 remetentes cobrem 80%. O resto você digita pelo usuário |
| **R7** | As lojas | Média | 15% na conta. Play primeiro, Apple não segura o cronograma |
| **R8** | Não há retenção, há reconquista | — | Escolha consciente. G3 mede recompra |
| **R12** | Refinar a marca em vez de vender | Média | Congelada até o G3 |
| **R13** | Conflito com o emprego | Baixa | Nada em horário ou equipamento da Omnichat |

---

## 14 · O que falta

### Feito em 13/09 — falta só você validar
1. ~~Trocar `SEU_ID` pelo endpoint do Formspree~~ — **ligado**, um endpoint por
   landing. **Envie um teste real de cada página e confirme que o e-mail chega**:
   o primeiro envio de um formulário novo costuma exigir confirmação

### Bloqueia o G0 — só conversa
2. Montar a lista do círculo em
   [`plano/controle-recrutamento.md`](plano/controle-recrutamento.md) — ICP e
   critérios de triagem em [`plano/02-icp.md`](plano/02-icp.md)
3. Publicar os carrosséis 01 e 02 — artes prontas
4. **12 entrevistas** até 27/09

### Bloqueia o G1
5. Gravar a demo de 90s com o protótipo
6. Abrir a pré-venda de R$19 e fechar 10 até 11/10

### Bloqueia o lançamento
7. **Backend. Não existe nada. É a maior lacuna do projeto**
8. **Importar reserva por e-mail encaminhado** — parser de Latam, Gol, Azul,
   Booking, Decolar
9. Ligar a tela do agora ao servidor
10. Envio de aviso (push e e-mail)
11. **API de status de voo** — hoje o atraso é 100% manual, por decisão
12. **Política de privacidade em URL pública**
13. **Revisão jurídica** — R$400
14. Aceite de termos no primeiro uso
15. Conta Google Play (US$25) e build assinado

### Depois do G2
16. Conta Apple (US$99/ano, paga com receita)
17. Blog e SEO
18. Programa de indicação

---

## 15 · Limites: o que eu não posso fazer

Dito sem rodeio, para não haver expectativa errada:

| Limite | Consequência |
|---|---|
| **Não trabalho em background nem fora da sessão** | Não me auto-disparo quando o limite libera. Use o [CONTINUAR.md](CONTINUAR.md) |
| **Não sou advogado** | As minutas de `juridico/` precisam de revisão profissional |
| **Não varro Instagram, Threads e X por dentro** | A validação de demanda usou fontes públicas indexadas — e achou sinal mais duro que post |
| **Não publiquei em loja, não liguei campanha, não disparei mensagem** | Por ordem sua |
| **Não gastei nada** | Por ordem sua |

---

## 16 · Números de referência

| | |
|---|---|
| Contribuição por viagem paga | R$31,35 · margem 94% |
| Custo fixo mensal | R$424 |
| Equilíbrio | 14 viagens pagas/mês |
| CAC via mídia paga | ~R$188 — **não fecha** |
| Instalação → compra, viagem | 2,42% |
| **Teste → pago, viagem** | **48,7%** — a melhor de todas as categorias |
| Reclamações de passageiro aéreo/ano | ~100 mil |
| Voos cancelados/ano no Brasil | 112 mil · 11,6% |
| Passageiros afetados em 2018 | 17 milhões · 2% reclamaram |
| **Android no Brasil** | **81%** |
| CPM Stories/Reels | R$8–18 |
| CPC serviço local | R$0,80–3,00 |
| Publi micro, Reels | R$2.000–8.000 |
| Salvamento de carrossel bom | 4% a 8% |
| Limiares da Res. 400 | 1h comunicação · 2h alimentação · 4h hospedagem |
| Compensação por preterição | 250 DES doméstico · 500 DES internacional |
| Prazo de bagagem | 7 dias doméstico · 21 internacional |

---

**Comando para retomar numa sessão nova:**

```
Leia DOSSIE.md e CONTINUAR.md, depois continue de onde parou.
```
