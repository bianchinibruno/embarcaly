# ANAC — a tabela completa

**O insumo da semana 7.** Quatro histórias dependem deste documento:
[US.009](historias/US-009-registrar-problema.md),
[US.010](historias/US-010-socorro-gatilhos.md),
[US.011](historias/US-011-socorro-trecho.md) e
[US.012](historias/US-012-socorro-compensacao.md).

> **Este documento não é parecer jurídico e quem o escreveu não é advogado.**
> A versão anterior citava de memória e chutava a estrutura de dois artigos —
> errado. Esta versão foi conferida contra o **texto oficial**, extraído do PDF
> publicado no Diário Oficial da União de 14/12/2016 (retificado em 15/12/2016).
> Os pontos que continuam em aberto — porque dependem de jurisprudência, de uma
> revisão em consulta pública, ou de uma decisão de produto — estão marcados
> **⚠** e reunidos no fim. Revisão profissional continua marcada para a
> semana 8, e é obrigatória antes do lançamento.

---

## 1 · O que está em jogo

`mobile/src/domain/direitos.ts` implementa três gatilhos e dois trechos.
`SocorroScreen.tsx` fixa `gatilho: 'atraso'` na linha 52 e `trecho: 'domestico'`
na linha 57.

**Dois terços do motor que o produto vende estão escritos e inalcançáveis.** E o
G2 exige *100% dos direitos informados corretamente* — o risco
[R5](../plano/10-riscos.md) chama isto de o único bug inaceitável.

### A correção que vale registrar antes de tudo

A assistência material dos **arts. 20, 26 e 27 é idêntica** no doméstico e no
internacional. O campo `trecho` altera **somente** a compensação por preterição
do art. 24.

Uma versão anterior deste plano dizia que "o internacional recebe regra
doméstica", sugerindo tabela diferente de assistência. **Está errado.** A
consequência prática do defeito da linha 57 é real e é mais estreita:

> Um passageiro preterido em voo internacional vê **250 DES em vez de 500** —
> metade da compensação a que tem direito.

### O que esta revisão corrigiu

A versão anterior deste documento **inventou uma estrutura de artigo que a
Resolução 400 não tem**: alíneas `a` e `b` dentro do art. 21 para separar
reacomodação de remarcação. Não existem. O art. 21 tem quatro incisos, e são as
**condições que dão direito à escolha** — não as escolhas em si. A citação
correta para reacomodação e remarcação é **art. 28**, não art. 21. Está corrigido
abaixo, seção 5.

Também foi removida a afirmação de que a compensação do art. 24 *"pode ser
substituída por milhas ou crédito de viagem, mediante concordância do
passageiro"*. **O texto oficial não diz isso.** O que existe é uma substituição
parecida, mas em outro artigo e para outro direito — a **hospedagem** do art. 27,
não a compensação financeira do art. 24. A diferença importa porque são valores e
direitos diferentes. Está corrigido abaixo, seção 6.

---

## 2 · A norma, e o que a alterou

**Resolução ANAC nº 400, de 13 de dezembro de 2016.** Publicada no Diário
Oficial da União de 14/12/2016, retificada em 15/12/2016. Dispõe sobre as
condições gerais de transporte aéreo, doméstico e internacional.

**Está em vigor, sem revogação, e sua redação original dos artigos citados neste
documento não mudou.** O que existe:

| Alteração | O quê | Afeta os artigos citados aqui? |
|---|---|---|
| **Resoluções 556, 598 e 640** (2020–2021) | Flexibilizações temporárias e excepcionais por causa da pandemia — prazo de aviso de alteração, remarcação sem multa | Não. Eram temporárias; a última janela expirou em 31/03/2022 |
| **Resolução 692/2022** | Regras para transporte internacional por empresa estrangeira e code-share | Não toca nos artigos 20 a 29 |
| **Revisão em consulta pública** | A ANAC abriu processo para atualizar a Resolução 400 inteira — consulta encerrada em 09/03/2026, audiência pública em 11/02/2026 | **⚠ Ainda não publicada.** A 400 original "continua em vigor integralmente" até a nova norma sair, segundo a própria ANAC |

> **⚠ C1 — verificação de calendário, não de conteúdo.** Antes de a semana 7
> começar, confirmar em **gov.br/anac** se a revisão já foi publicada. Se sim,
> este documento inteiro precisa ser reconferido contra o texto novo — a
> proposta em consulta já sinalizava mudanças na forma de informar mudança de
> voo e nas exceções por força maior.

Para o internacional, a Resolução 400 convive com a **Convenção de Montreal**
— seção 7.

---

## 3 · Os gatilhos — e uma correção de estrutura

`direitos.ts` conhece três: `atraso`, `cancelamento`, `preterição`.

**A norma tem quatro**, e a diferença entre "cancelamento" e "interrupção" não é
sutileza — os dois têm **artigo próprio, seção própria e definição própria**:

> **Art. 25.** *"Os casos de atraso, cancelamento de voo e interrupção do
> serviço previstos nesta Seção não se confundem com a alteração contratual
> programada realizada pelo transportador e representam situações
> contingenciais que ocorrem na data do voo originalmente contratado."*

E o art. 26, que abre a seção de assistência material, lista os quatro
separadamente:

> **Art. 26.** *A assistência material ao passageiro deve ser oferecida nos
> seguintes casos:* **I** atraso do voo · **II** cancelamento do voo ·
> **III** interrupção de serviço · **IV** preterição de passageiro.

**Interrupção** é o voo que começa e não termina como contratado: pousa em
aeroporto diferente do destino, ou para no meio do trajeto e não segue. Quem
está em Confins a caminho de Recife tem os mesmos direitos do art. 21 e **hoje
não tem tela** — nem para registrar o problema, nem para receber a resposta do
motor.

> **⚠ C11 — decisão de produto, não jurídica, e para a semana 7.**
> Interrupção é gatilho oficial da norma, com artigo próprio. Não cobri-lo é
> aceitável para uma v1; não cobri-lo **em silêncio** não é — a pessoa conclui
> que não tem direito. A saída mais barata: o formulário de
> [US.009](historias/US-009-registrar-problema.md) ganha uma quarta opção que
> aponta para o mesmo motor de cancelamento (mesmos artigos, mesma resposta
> imediata), com o rótulo "O voo não chegou onde eu ia — pousou em outro lugar,
> ou parou no meio". Custa uma opção a mais no formulário, não um motor novo.

Há ainda um **quinto caso**, no inciso IV do art. 21, que nenhuma versão deste
plano mencionou: **perda de voo subsequente por conexão, quando a causa for do
transportador.** Fica registrado como candidato a gatilho futuro, fora da v1 —
ver seção 11.

---

## 4 · Assistência material — arts. 20, 26 e 27

### Art. 20 · Informação

> *"O transportador deverá informar imediatamente ao passageiro pelos meios de
> comunicação disponíveis: **I** que o voo irá atrasar (...), indicando a nova
> previsão do horário de partida; e **II** sobre o cancelamento do voo ou
> interrupção do serviço."*
>
> **§1º** — atualização **a cada 30 minutos**, nos casos de atraso.
> **§2º** — o motivo deve ser informado **por escrito**, sempre que o
> passageiro solicitar.

| | |
|---|---|
| **A partir de** | Zero. É imediato |
| **No código** | `TABELA[0]`, `codigo: 'informacao'`, `aPartirDeMin: 0` |
| **Correção a registrar** | O direito de pedir **por escrito** (§2º) não está na frase de balcão de `direitos.ts`. Vale acrescentar: *"Quero isso por escrito, por favor"* |

### Art. 26 e 27 · A escada do tempo

> **Art. 27.** *"A assistência material consiste em satisfazer as necessidades
> do passageiro e deverá ser oferecida gratuitamente pelo transportador,
> conforme o tempo de espera, **ainda que os passageiros estejam a bordo da
> aeronave com portas abertas**, nos seguintes termos:"*

| Espera superior a | Direito | Inciso | No código |
|---|---|---|---|
| **1 hora** | Facilidades de comunicação | art. 27, I | `aPartirDeMin: 60` |
| **2 horas** | Alimentação, conforme o horário — refeição ou voucher individual | art. 27, II | `aPartirDeMin: 120` |
| **4 horas** | Hospedagem, em caso de pernoite, e traslado de ida e volta | art. 27, III | `aPartirDeMin: 240` |

**Confirmado, e sem ambiguidade:** vale **mesmo com o passageiro a bordo, portas
abertas.** É texto literal, não interpretação — resolve o ⚠ que a versão
anterior deixou em aberto.

### O passageiro que mora na cidade

> **Art. 27, §1º.** *"O transportador poderá deixar de oferecer serviço de
> hospedagem para o passageiro que residir na localidade do aeroporto de
> origem, garantido o traslado de ida e volta."*

Confirmado. `HOSPEDAGEM_DOMICILIO` e `ajustar()` em `direitos.ts` já implementam
isso certo. **Precisão a registrar:** o texto fala em residir **na localidade do
aeroporto de origem**, não "onde a pessoa mora" em sentido amplo — é o município
do aeroporto, não a região metropolitana inteira. A pergunta da
[US.009](historias/US-009-registrar-problema.md) deveria refletir isso: *"Você
mora na cidade deste aeroporto?"*, não *"Você está na sua cidade?"*.

### Passageiro com necessidade de assistência especial

> **Art. 27, §2º.** *"No caso de Passageiro com Necessidade de Assistência
> Especial - PNAE e de seus acompanhantes, nos termos da Resolução nº 280, de
> 2013, a assistência prevista no inciso III do caput deste artigo deverá ser
> fornecida **independentemente da exigência de pernoite**, salvo se puder ser
> substituída por acomodação em local que atenda suas necessidades e com
> concordância do passageiro ou acompanhante."*

Confirmado — e este é o texto que efetivamente **tem** uma cláusula de
substituição por concordância, que a versão anterior deste documento atribuiu
por engano ao art. 24. É a **hospedagem** do PNAE que pode ser substituída
mediante concordância; a compensação financeira do art. 24 não tem essa
cláusula.

> **⚠ B — decisão de produto.** É o **perfil 4 do ICP** — quem leva os pais
> idosos. O termo oficial é **PNAE**, definido pela Resolução 280/2013. Decidir
> na semana 7: o formulário pergunta se algum passageiro é PNAE, e se sim, a
> hospedagem do art. 27 vale **mesmo sem pernoite**? É um direito adicional real
> e específico para esse perfil, e hoje o produto não pergunta nada sobre isso.

### A exceção que a versão anterior não tinha

> **Art. 27, §3º.** *"O transportador poderá deixar de oferecer assistência
> material quando o passageiro optar pela reacomodação em voo próprio do
> transportador a ser realizado em data e horário de conveniência do passageiro
> ou pelo reembolso integral da passagem aérea."*

**Isto não estava em nenhuma versão anterior deste documento, e muda o modelo.**
Se a pessoa escolhe remarcar para quando lhe convier, ou pedir reembolso
integral, a companhia **deixa de dever** comunicação, alimentação e hospedagem.

> **⚠ B — decisão de produto para a semana 7.** Hoje `avaliar()` em
> `direitos.ts` mostra `liberados` (assistência material) e `escolhas`
> (as alternativas) como duas listas independentes, sempre as duas presentes. O
> texto oficial diz que escolher duas das alternativas **cancela** a primeira
> lista. Vale a pena o motor refletir isso, ou é aceitável a v1 mostrar sempre
> as duas, com uma nota explicando a exceção? Recomendação: mostrar sempre —
> simplificação segura, porque nunca informa menos direito do que existe — e
> registrar a exceção na frase de balcão, não no cálculo.

---

## 5 · Reacomodação, reembolso e outra modalidade — arts. 21, 28 e 29

### O texto oficial

> **Art. 21.** *"O transportador deverá oferecer as alternativas de
> **reacomodação**, **reembolso** e **execução do serviço por outra modalidade
> de transporte**, devendo a escolha ser do passageiro, nos seguintes casos:"*
>
> **I** — atraso de voo por mais de quatro horas em relação ao horário
> originalmente contratado;
> **II** — cancelamento de voo ou interrupção do serviço;
> **III** — preterição de passageiro; e
> **IV** — perda de voo subsequente pelo passageiro, nos voos com conexão,
> inclusive nos casos de troca de aeroportos, quando a causa da perda for do
> transportador.
>
> **Parágrafo único.** As alternativas deverão ser **imediatamente** oferecidas
> quando o transportador dispuser antecipadamente da informação de que o voo
> atrasará mais de 4 horas.

**A estrutura real, e por que a versão anterior errou:** os incisos I a IV do
art. 21 são as **quatro situações que abrem o direito**, não as três
alternativas. As alternativas (reacomodação, reembolso, outra modalidade) estão
no **caput**, sem numeração própria.

### Onde as duas formas de reacomodação realmente estão citadas

> **Art. 28.** *"A reacomodação será gratuita (...) devendo ser feita, à
> escolha do passageiro, nos seguintes termos:"*
>
> **I** — em voo próprio ou de terceiro para o mesmo destino, **na primeira
> oportunidade**; ou
> **II** — em voo próprio do transportador a ser realizado em **data e horário
> de conveniência do passageiro**.
>
> **Parágrafo único.** Os PNAEs terão **prioridade** na reacomodação.

**É aqui que mora o que o produto chama de "remarcação".** A citação certa:

| Escolha, no código | Citação correta | Citação que a versão anterior propunha |
|---|---|---|
| `reacomodacao` — primeira oportunidade | **art. 28, I** | ~~art. 21, I, a~~ (não existe) |
| `remarcacao` — conveniência do passageiro | **art. 28, II** | ~~art. 21, I, b~~ (não existe) |
| `reembolso` | **art. 21**, prazo em **art. 29** | art. 21, II — impreciso, mas não incorreto |
| `modalidade` | **art. 21** | art. 21, III — impreciso, mas não incorreto |

`reembolso` e `modalidade` citar só "art. 21" continua correto — são as
alternativas do caput. O que estava **errado de fato**, não só impreciso, eram
as alíneas inventadas para reacomodação e remarcação.

### Reembolso — prazo e integralidade

> **Art. 29.** *"O prazo para o reembolso será de 7 (sete) dias, a contar da
> data da solicitação (...). Parágrafo único. (...) os valores previstos no
> art. 4º, §1º, incisos II e III, desta Resolução, deverão ser integralmente
> restituídos."*

O art. 4º, §1º define o que compõe o valor total da passagem: **I** serviços de
transporte aéreo, **II** **tarifas aeroportuárias** (a taxa de embarque), **III**
valores devidos a entes governamentais. **Confirmado:** o reembolso integral
inclui a taxa de embarque, por citação direta — não por inferência.

---

## 6 · Compensação por preterição — art. 24

> **Art. 24.** *"No caso de preterição, o transportador deverá, sem prejuízo do
> previsto no art. 21 desta Resolução, efetuar, **imediatamente**, o pagamento
> de compensação financeira ao passageiro, podendo ser por **transferência
> bancária, voucher ou em espécie**, no valor de:"*
>
> **I** — 250 (duzentos e cinquenta) DES, no caso de voo doméstico; e
> **II** — 500 (quinhentos) DES, no caso de voo internacional.

Confirmado, com a citação por inciso que já estava certa em `direitos.ts`.

### O que a versão anterior errou aqui

Dizia que a compensação *"pode ser substituída por crédito de viagem ou milhas,
mediante concordância do passageiro"*, e sugeria isso como item a mais na tela.
**Não existe essa cláusula no art. 24.** As três formas de pagamento são
transferência bancária, voucher ou espécie — **sempre em dinheiro ou
equivalente**, nunca em milhas, e **sempre imediato**, não "na hora ou depois".

O que existe de parecido está em **outro artigo, para outro direito**: a
hospedagem do PNAE (art. 27, §2º, seção 4 acima) pode ser substituída por
acomodação adequada, mediante concordância. É hospedagem, não dinheiro.

### DES

**Direito Especial de Saque**, unidade de conta do Fundo Monetário Internacional.
A cotação **varia todos os dias**. O produto **nunca converte para reais** —
decisão que continua certa: o número seria promessa, ficaria desatualizado, e
exigiria consulta de rede.

### É mínimo, não teto

O caput diz *"sem prejuízo do previsto no art. 21"* — a compensação **soma** às
alternativas, não as substitui, e não impede cobrar prejuízo maior por outras
vias.

### Preterição voluntária não é a mesma coisa

> **Art. 23.** *"(...) o transportador deverá procurar por voluntários (...)
> mediante compensação negociada entre o passageiro voluntário e o
> transportador. §1º A reacomodação dos passageiros voluntários (...) não
> configurará preterição."*

**Achado que não estava em nenhuma versão anterior.** Se a pessoa **aceitou**
ficar para trás em troca de uma compensação negociada no balcão, isso **não é
preterição** para efeito do art. 24 — é outra coisa, com valor livremente
negociado, sem piso de 250/500 DES.

> **⚠ B — decisão de produto.** A pergunta *"Não embarquei"* da
> [US.009](historias/US-009-registrar-problema.md) precisa distinguir os dois
> casos: *"Você foi impedido de embarcar sem ter escolhido isso"* (preterição,
> art. 24 garante o piso) versus *"Você aceitou uma oferta da companhia para
> ficar"* (art. 23, negociação livre, **sem** piso de 250/500 DES). Misturar os
> dois informa direito que pode não existir.

---

## 7 · Trecho internacional

### O que **não** muda

Assistência material — arts. 20, 26 e 27 — e as alternativas do art. 21 são as
**mesmas**. A Resolução 400 vale para voos com origem ou destino no Brasil,
doméstico ou internacional.

### O que muda dentro da própria Resolução 400

| | |
|---|---|
| **Compensação por preterição** | 500 DES em vez de 250 (art. 24, II) |
| **Alteração programada** | limiar de 1 hora, não 30 minutos (art. 12 — ver seção 9) |
| **Regime de responsabilidade por dano** | Convenção de Montreal, por cima da Resolução |

### Convenção de Montreal — o que a v1 faz

**Decreto nº 5.910, de 27 de setembro de 2006.** Internaliza a Convenção de
Montreal de 1999. Em vigor para o Brasil desde 18/07/2006.

| Artigo | Assunto | Valor atual |
|---|---|---|
| **art. 19** | Dano por atraso — passageiro, bagagem e carga | — |
| **art. 22, §1º** | Limite por atraso do **passageiro** | **⚠ 5.346 DES** (revisão de 28/12/2019, +13,9% sobre o valor de 2009) |
| **art. 22, §2º** | Limite por atraso, avaria ou extravio de **bagagem** | **⚠ 1.288 DES** (mesma revisão) |
| **art. 35** | Prazo para ação | 2 anos — seção 8 |

**⚠ C9 — confirmar antes de usar qualquer número.** Os limites da Convenção são
revisados periodicamente pela OACI. Os valores acima são de 2019; pode ter
havido revisão nova desde então, e é exatamente o tipo de número que envelhece
sem avisar — o motivo pelo qual a v1 não os exibe.

> **A v1 continua certa em não calcular limite, não converter moeda, não
> estimar indenização.** A tela diz que o regime existe e manda guardar
> comprovante de gasto extraordinário. É o que é acionável no momento da crise,
> e é o que não exige manter um número atualizado dentro do aplicativo.

---

## 8 · Prazos — a seção que mais precisa do advogado

| Trecho | Prazo | Base | Confiança |
|---|---|---|---|
| **Doméstico** | **5 anos** | CDC, art. 27 — reparação por fato do serviço | Alta. Jurisprudência consolidada |
| **Internacional, dano material** | **2 anos** | Convenção de Montreal, art. 35, confirmado pelo STF no **Tema 210** (RE 636.331, j. 25/05/2017) | Alta. Repercussão geral |
| **Internacional, dano moral** | **⚠ Divergente** | STF **Tema 1240** aponta para a **inaplicabilidade** dos tratados internacionais a dano moral — o que devolveria o prazo ao CDC (5 anos) mesmo no internacional | **Baixa. É o item mais incerto de todo este documento** |

**O que mudou desde a versão anterior:** ela tratava "internacional = 2 anos"
como regra única. **Não é.** Há dois temas de repercussão geral do STF tratando
de coisas diferentes:

- **Tema 210** — dano **material**: convenções internacionais prevalecem sobre o
  CDC. Prazo de 2 anos.
- **Tema 1240** — dano **moral**: parece apontar para o caminho oposto —
  tratados internacionais **não** afastam a proteção do CDC. Se confirmado, o
  prazo de dano moral em voo internacional seria de 5 anos, igual ao doméstico.

> **⚠ C10 — é decisão do advogado, não deste documento.** A distinção entre dano
> material e moral, e o alcance exato de cada tese, é jurisprudência ainda em
> movimento. **Nenhum prazo entra na tela do produto sem essa formulação passar
> pelo advogado.** Se a formulação for aprovada, o ganho de produto é real: é
> contraintuitivo que a viagem internacional, mais cara e mais complexa, tenha
> **menos** tempo para reclamar de dano material — e é exatamente o tipo de fato
> que dá motivo para alguém voltar ao aplicativo.

---

## 9 · Achado novo — a alteração programada não é a mesma coisa que atraso

**Nenhuma versão anterior deste documento mencionou isto, e é uma seção inteira
da norma que o produto não modela:**

> **Art. 12.** *"As alterações realizadas de forma programada pelo
> transportador, em especial quanto ao horário e itinerário originalmente
> contratados, deverão ser informadas aos passageiros com antecedência mínima
> de 72 (setenta e duas) horas."*
>
> **§1º.** Reacomodação e reembolso integral, à escolha do passageiro, nos casos
> de: **I** aviso dado com menos de 72h de antecedência; **II** alteração de
> horário superior a **30 minutos no doméstico** ou **1 hora no internacional**,
> se o passageiro não concordar com o novo horário.
>
> **§2º.** Se o passageiro comparecer ao aeroporto por falha na informação, o
> transportador deve oferecer assistência material **e** as três alternativas
> (reacomodação, reembolso integral, outra modalidade).

**Por que isto muda a conversa sobre o F3.** O produto trata toda mudança de
horário como a mesma coisa: cascata, aviso, e — quando o atraso chega a certos
limiares — direitos. Mas a norma separa dois regimes:

| | **Contingência do dia** (arts. 20–29) | **Alteração programada** (art. 12) |
|---|---|---|
| Quando | No dia do voo, algo deu errado | Dias ou semanas antes, a companhia reorganizou a malha |
| Aviso mínimo | Nenhum — é reativo | **72 horas** |
| Limiar que abre direito | 4 horas de atraso | **30 min (doméstico) / 1h (internacional)**, se a pessoa não concordar |
| Direito | Assistência material + 4 alternativas | Só reacomodação e reembolso — **sem** "outra modalidade" |

> **⚠ Decisão de produto — não é da semana 7, é maior.** Uma mudança de voo
> avisada com 20 dias de antecedência, alterando o horário em 40 minutos, **já
> dá direito a reacomodação ou reembolso integral hoje**, e o produto não sabe
> disso — trataria como um evento neutro de calendário. É um direito real,
> provavelmente mais comum que atraso de 4 horas, e nenhuma tela informa sobre
> ele. Registrado como candidato a funcionalidade nova, fora do escopo das 24
> histórias atuais — ver [08-pendencias.md](08-pendencias.md).

---

## 10 · O que o produto nunca diz

| Nunca | Por quê |
|---|---|
| Valor em reais da compensação | DES varia todo dia. Converter é transformar informação em promessa |
| "Você vai receber", "garantimos" | `PROIBIDAS` em `legal.ts`. O teste reprova o CI |
| Estimativa de indenização | É parecer, e `AVISO_ATIVIDADE` diz que não somos escritório |
| Direito sem citar o artigo | O artigo é o que a pessoa aponta no balcão |
| Que conhecer o direito garante o atendimento | `AVISO_RESULTADO`, palavra por palavra |
| Que a compensação pode virar milhas | Não existe essa cláusula no art. 24 — corrigido nesta revisão |

---

## 11 · O roteiro de conferência

> **O teste que vale mais que a suíte inteira.**

Abrir o Socorro em cada combinação e conferir a saída **contra o texto oficial**,
citado nas seções 4 a 6 acima.

### Seis combinações obrigatórias

| # | Gatilho | Tempo | Trecho | Esperado |
|---|---|---|---|---|
| 1 | Atraso | 30 min | Doméstico | Só informação. Próximo marco: comunicação em 30 min |
| 2 | Atraso | 5 h | Doméstico | Informação + comunicação + alimentação + hospedagem + reacomodação (art. 28, I), remarcação (art. 28, II), reembolso e outra modalidade (art. 21) |
| 3 | Cancelamento | 10 min | Doméstico | As alternativas **imediatamente** (art. 21, II) + informação. Sem compensação |
| 4 | Cancelamento | 3 h | Internacional | As alternativas + informação + comunicação + alimentação. Hospedagem como próximo marco. Sem compensação |
| 5 | Preterição | 0 min | Doméstico | As alternativas + informação + **250 DES, art. 24, I** |
| 6 | Preterição | 0 min | Internacional | As alternativas + informação + **500 DES, art. 24, II** |

### Quatro de fronteira

| # | Situação | Esperado |
|---|---|---|
| 7 | Atraso de **exatamente 60 min** | Comunicação **liberada** (art. 27, I — "superior a 1 hora" é o limiar) |
| 8 | Atraso de **exatamente 240 min** | Hospedagem e as alternativas |
| 9 | Atraso de 5 h, pessoa reside **no município do aeroporto de origem** | Hospedagem vira **traslado** (art. 27, §1º) |
| 10 | Trecho **desconhecido** + preterição | Assistência material aparece; **compensação espera a pergunta** |

### ⚠ Candidatas a entrar, pendentes de decisão de produto (seção 9 e 6)

| # | Situação | O que a norma diz | Onde decidir |
|---|---|---|---|
| 11 | Interrupção do serviço | Mesmo tratamento do cancelamento — art. 21, II | US.009, semana 7 |
| 12 | Preterição negociada (voluntária) | **Sem** piso de 250/500 DES — art. 23 | US.009, semana 7 |
| 13 | Alteração programada, aviso < 72h ou mudança > 30min/1h | Reacomodação ou reembolso, mesmo sem atraso no dia | Fora da v1 — seção 9 |

---

## 12 · Para a revisão do advogado — semana 8

O que ainda depende de leitura profissional, depois desta revisão factual:

| # | Ponto | Onde | Por que ainda é do advogado |
|---|---|---|---|
| **C1** | Confirmar se a revisão da Resolução 400 em consulta pública já foi publicada | §2 | É verificação de calendário que pode mudar tudo abaixo |
| **C9** | Valor vigente dos limites da Convenção de Montreal (art. 22) | §7 | Revisão periódica pela OACI |
| **C10** | Prazo de dano moral em voo internacional: 2 ou 5 anos? | §8 | Tema 1240 do STF ainda em formação |
| **B1** | Assistência ao PNAE sem pernoite — entra na v1? | §4 | Decisão de produto, não só jurídica |
| **B2** | Exceção do art. 27 §3º — o motor deixa de mostrar assistência quando a pessoa escolhe remarcar/reembolsar? | §4 | Decisão de produto |
| **B3** | Distinguir preterição negociada de involuntária no formulário | §6 | Decisão de produto |
| **C11** | Interrupção do serviço vira quarto gatilho ou fica fora, declarado? | §3 | Decisão de produto, mas com base jurídica clara |
| **Novo** | Alteração programada (art. 12) — funcionalidade nova, fora das 24 histórias atuais | §9 | Escopo, não revisão |

**Removidos desta lista porque a leitura do texto oficial já resolveu:**
citação de art. 21/28, cláusula de substituição do art. 24 (não existe),
assistência com portas abertas (confirmado, sem exceção), traslado para quem
reside no município de origem (confirmado), reembolso integral com taxa de
embarque (confirmado por citação direta ao art. 4º).
