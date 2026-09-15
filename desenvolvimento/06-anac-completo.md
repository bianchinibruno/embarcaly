# ANAC — a tabela completa

**O insumo da semana 7.** Quatro histórias dependem deste documento:
[US.009](historias/US-009-registrar-problema.md),
[US.010](historias/US-010-socorro-gatilhos.md),
[US.011](historias/US-011-socorro-trecho.md) e
[US.012](historias/US-012-socorro-compensacao.md).

> **Este documento não é parecer jurídico e quem o escreveu não é advogado.**
> É a transcrição organizada da norma para virar código, e vai para revisão
> profissional na semana 8. Os pontos marcados **⚠ confirmar** são onde a
> transcrição pode estar imprecisa e a revisão precisa parar.

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

---

## 2 · A norma

**Resolução ANAC nº 400, de 13 de dezembro de 2016.** Dispõe sobre as condições
gerais de transporte aéreo.

**⚠ confirmar:** a Resolução 400 **foi alterada** desde a publicação — a
Resolução 556/2020 é a alteração que se conhece, e pode não ser a única. Antes de
a semana 7 começar, a versão vigente precisa ser baixada de **anac.gov.br** e
conferida artigo por artigo contra este documento. `legal.ts` já manda o usuário
fazer isso; o produto precisa fazer também.

Aplica-se ao transporte aéreo **doméstico e internacional** com origem ou destino
no Brasil. Para o internacional, convive com a **Convenção de Montreal** —
seção 7.

---

## 3 · Os gatilhos

`direitos.ts` conhece três:

| Gatilho no código | O que é |
|---|---|
| `atraso` | O voo vai sair, mais tarde |
| `cancelamento` | O voo não vai sair |
| `preterição` | O voo saiu sem o passageiro — *overbooking*, recusa de embarque, remarcação sem aviso |

### O quarto, que a norma tem e o produto não

> **Interrupção do serviço.**

O art. 21 lista, no caput, quatro hipóteses: *atraso, cancelamento ou
**interrupção** do voo, bem como preterição*. O produto modela três.

**Interrupção** é o voo que começa e não termina como contratado: pousa em
aeroporto diferente do destino, ou para no meio do trajeto e não segue. Quem
está em Confins a caminho de Recife tem os mesmos direitos do art. 21 e **não
tem tela**.

| | |
|---|---|
| **Fora do MVP** | Sim. É o gatilho mais raro dos quatro |
| **Consequência** | Passageiro interrompido não encontra a situação dele no Socorro |
| **Mitigação até existir** | Nenhuma escrita. **Decidir na semana 7**: ou entra como quarto gatilho, ou o Socorro diz explicitamente que não cobre |

Deixar de cobrir é aceitável. Deixar de cobrir **em silêncio** não é — a pessoa
conclui que não tem direito.

---

## 4 · Assistência material

### Art. 20 · Informação

O transportador informa o atraso, o cancelamento e a preterição, e **atualiza a
cada 30 minutos**.

Silêncio é descumprimento, e vira prova a favor do passageiro.

| | |
|---|---|
| **A partir de** | Zero. É imediato |
| **No código** | `TABELA[0]`, `codigo: 'informacao'`, `aPartirDeMin: 0` |
| **Frase de balcão** | *"Qual a nova previsão de partida? Preciso de atualização a cada 30 minutos."* |

### Arts. 26 e 27 · A escada do tempo

O **art. 26** obriga a assistência material. O **art. 27** define os degraus,
contados **a partir do horário de partida originalmente previsto**.

| Espera superior a | Direito | Inciso | No código |
|---|---|---|---|
| **1 hora** | Facilidades de comunicação — internet e telefone | art. 27, I | `aPartirDeMin: 60` |
| **2 horas** | Alimentação, conforme o horário: refeição ou voucher | art. 27, II | `aPartirDeMin: 120` |
| **4 horas** | Hospedagem em caso de pernoite, e traslado de ida e volta | art. 27, III | `aPartirDeMin: 240` |

**Três coisas que a implementação já acerta e vale confirmar na revisão:**

1. Os degraus **acumulam**. Quatro horas de espera dão os três, não só o terceiro.
2. A contagem parte do **horário original**, não do último horário anunciado. É o
   que `Delay.originalStart` guarda, e é o que faz a
   [US.009](historias/US-009-registrar-problema.md) gravar o `start` da reserva em
   vez do valor digitado.
3. Vale **ainda que o passageiro esteja a bordo** com as portas abertas. ⚠
   confirmar o dispositivo exato — o produto não trata este caso hoje, e ele é
   comum.

### O passageiro que mora na cidade

Quem está na cidade onde reside não recebe hospedagem; recebe **transporte de ida
e volta entre a residência e o aeroporto**.

| | |
|---|---|
| **⚠ confirmar** | O dispositivo. A implementação trata como parágrafo do art. 27 |
| **No código** | `HOSPEDAGEM_DOMICILIO` e `PEÇA_DOMICILIO`, aplicados por `ajustar()` |
| **Na tela** | É **pergunta**, com a inferência marcada como suposição corrigível — [US.009](historias/US-009-registrar-problema.md), `RN.009.06` |

Assumir errado informa direito errado nos dois sentidos: nega hotel a quem tem, ou
manda pedir hotel a quem mora a vinte minutos dali.

### O que a v1 não cobre

**⚠ confirmar e decidir:** a norma prevê prioridade na assistência a passageiros
com necessidade de assistência especial — idoso, pessoa com deficiência, criança
desacompanhada. O produto não modela isso.

É relevante para o **perfil 4 do ICP** — quem leva os pais idosos — e portanto
não é detalhe. Decidir na semana 7 se entra como observação na tela ou fica para
depois do G2.

---

## 5 · Art. 21 · As alternativas

Aplica-se a **atraso superior a 4 horas**, **cancelamento**, **interrupção** e
**preterição**.

> Nos três últimos, o direito é **imediato**. Não espera relógio.
>
> É o que `avaliar()` já faz com a variável `imediato`. E é o defeito visível
> hoje: quem teve o voo cancelado vê *"em 4h você poderá escolher"* quando o
> direito já é dele.

### A estrutura real do artigo

| Inciso | Alternativa |
|---|---|
| **I, a** | Reacomodação em voo próprio **ou de terceiro** que ofereça serviço equivalente para o mesmo destino, **na primeira oportunidade** |
| **I, b** | Reacomodação em voo próprio, **em data e horário de conveniência do passageiro** |
| **II** | Reembolso |
| **III** | Execução do serviço por **outra modalidade de transporte** |

### A imprecisão a corrigir no código

`direitos.ts` chama isto de **quatro saídas**, o que é correto como contagem de
opções — mas os `fonte` de duas delas estão imprecisos:

| Escolha | `fonte` hoje | Deveria ser |
|---|---|---|
| `reacomodacao` | `art. 21, I` | **`art. 21, I, a`** |
| `remarcacao` | `art. 21` | **`art. 21, I, b`** |
| `reembolso` | `art. 21, II` | ✅ correto |
| `modalidade` | `art. 21, III` | ✅ correto |

**Não é preciosismo.** O artigo é o que a pessoa vai apontar no balcão, e
"art. 21" sem inciso é o tipo de citação que um funcionário treinado devolve.

`remarcacao` não é uma quarta alternativa autônoma: é a **alínea b** da
reacomodação. O enquadramento do produto — quatro caixas na tela — continua
válido e útil; a citação é que precisa ser exata.

### Reembolso integral, com a taxa de embarque

`direitos.ts` afirma *"todo o valor pago de volta, incluindo a taxa de embarque"*.

**⚠ confirmar** o dispositivo que garante a integralidade e a inclusão da taxa. É
a informação de maior consequência financeira depois da compensação do art. 24, e
a frase de balcão depende dela.

---

## 6 · Art. 24 · Compensação por preterição

Ocorrendo a preterição, o transportador compensa o passageiro **sem prejuízo** do
art. 21 e da assistência material.

| Trecho | Compensação | Inciso |
|---|---|---|
| **Doméstico** | **250 DES** | art. 24, I |
| **Internacional** | **500 DES** | art. 24, II |

> **É a única coisa no motor inteiro que depende do trecho.**

### DES

**Direito Especial de Saque**, unidade de conta do Fundo Monetário Internacional.
A cotação **varia todos os dias**.

**O produto nunca converte para reais.** Três razões, em ordem:

1. O número apareceria como promessa, e `AVISO_RESULTADO` existe porque o produto
   não promete dinheiro.
2. Estaria desatualizado exatamente na hora do uso.
3. Exigiria consulta de cotação — dependência de rede num aplicativo que promete
   funcionar sem ela.

A tela mostra o número em DES, explica o que é em uma frase, e manda conferir a
cotação do dia.

### É mínimo, não teto

A compensação do art. 24 **não impede** cobrar prejuízo maior por outras vias. O
`detalhe` do registro já diz isso, e a tela renderiza esse texto — não escreve
outro.

Dizer só o valor faz a pessoa aceitar o valor como fim da conversa.

### Pagamento e substituição

**⚠ confirmar dois pontos:**

- **Quando é paga.** A implementação diz *"paga na hora"*. Confirmar se a norma
  exige pagamento no momento do desembarque ou apenas imediato.
- **Substituição.** Há previsão de a compensação ser feita por crédito para
  viagem, milhas ou reacomodação em classe superior, **mediante concordância do
  passageiro**. O produto não menciona isso, e deveria: é o que a companhia vai
  oferecer no balcão, e o passageiro precisa saber que **pode recusar**.

O segundo ponto é candidato a entrar na
[US.012](historias/US-012-socorro-compensacao.md) como uma linha a mais.

---

## 7 · Trecho internacional

### O que **não** muda

Assistência material — arts. 20, 26 e 27 — e as alternativas do art. 21 são **as
mesmas**. A Resolução 400 vale para voos com origem ou destino no Brasil,
independentemente de serem domésticos ou internacionais.

### O que muda

| | |
|---|---|
| **Compensação por preterição** | 500 DES em vez de 250 |
| **Regime de responsabilidade por dano** | Convenção de Montreal, além da Resolução |
| **Prazo para reclamar** | Seção 8 |

### Convenção de Montreal — o que a v1 faz

**Decreto nº 5.910/2006**, que internalizou a Convenção de Montreal de 1999.
Trata de responsabilidade do transportador no transporte aéreo internacional.

| Artigo | Assunto |
|---|---|
| **art. 19** | Dano por atraso no transporte de passageiros, bagagem e carga |
| **art. 22** | Limites de responsabilidade, expressos em DES |
| **art. 35** | Prazo para ação |

> **A v1 informa que o regime existe e manda guardar comprovante. Não calcula
> limite, não converte moeda, não estima indenização.**

É a decisão do [`plano/05-mvp.md`](../plano/05-mvp.md), e está certa por três
motivos:

1. Os limites do art. 22 são **revisados periodicamente** pela OACI — houve
   revisão em 2009 e outra com efeito a partir de 2019. Um número escrito no
   código envelhece sem avisar.
2. Calcular indenização é o que um advogado faz, e `AVISO_ATIVIDADE` diz que o
   Embarcaly não é escritório de advocacia.
3. O que é acionável para o passageiro no momento da crise é **guardar
   comprovante de gasto**. Isso o produto pode dizer, e é útil.

**O que a tela diz, então:** que o trecho é internacional, que existe regime
próprio de responsabilidade por atraso e bagagem além da Resolução 400, e que
todo comprovante de gasto extraordinário deve ser guardado.

**⚠ confirmar com o advogado:** se essa formulação é suficiente, ou se omitir os
valores gera expectativa errada.

---

## 8 · Prazos

**⚠ confirmar inteiro. É a seção de menor confiança deste documento.**

| Trecho | Prazo | Base |
|---|---|---|
| **Doméstico** | **5 anos** | Código de Defesa do Consumidor, art. 27 — reparação por fato do serviço |
| **Internacional** | **2 anos** | Convenção de Montreal, art. 35 |

O prazo menor no internacional decorre do entendimento de que a Convenção de
Montreal prevalece sobre o CDC quanto à **responsabilidade por dano material** no
transporte aéreo internacional — tese firmada pelo Supremo Tribunal Federal em
2017.

**Por que isto importa para o produto:** é contraintuitivo. A viagem mais cara,
mais longa e mais complexa é a que tem **menos tempo** para reclamar. Um usuário
que descobre isso pelo Embarcaly tem um motivo concreto para voltar ao
aplicativo.

**Por que não entra na v1 sem revisão:** a distinção entre dano material e dano
moral, e o alcance exato da tese, são precisamente o tipo de nuance que um
aplicativo não deve resolver sozinho. Ou o advogado aprova a formulação, ou a
informação não aparece.

---

## 9 · O roteiro de conferência

> **O teste que vale mais que a suíte inteira.**

Abrir o Socorro em cada combinação e conferir a saída **contra o texto da
Resolução 400**, artigo por artigo. O teste automatizado prova que o código faz o
que o teste diz; só a leitura da norma prova que o teste diz a coisa certa.

### Seis combinações obrigatórias

| # | Gatilho | Tempo | Trecho | Esperado |
|---|---|---|---|---|
| 1 | Atraso | 30 min | Doméstico | Só informação. Próximo marco: comunicação em 30 min |
| 2 | Atraso | 5 h | Doméstico | Informação + comunicação + alimentação + hospedagem + **as 4 alternativas**. Sem compensação |
| 3 | Cancelamento | 10 min | Doméstico | **As 4 alternativas imediatamente** + informação. Sem compensação |
| 4 | Cancelamento | 3 h | Internacional | As 4 + informação + comunicação + alimentação. Hospedagem como próximo marco. Sem compensação |
| 5 | Preterição | 0 min | Doméstico | As 4 + informação + **250 DES, art. 24, I** |
| 6 | Preterição | 0 min | Internacional | As 4 + informação + **500 DES, art. 24, II** |

### Quatro de fronteira, que pegam o erro de comparação

| # | Situação | Esperado |
|---|---|---|
| 7 | Atraso de **exatamente 60 min** | Comunicação **liberada** |
| 8 | Atraso de **exatamente 240 min** | Hospedagem **e** as 4 alternativas |
| 9 | Atraso de 5 h, pessoa **na cidade onde mora** | Hospedagem vira **traslado**, com a frase de balcão trocada |
| 10 | Trecho **desconhecido** + preterição | Assistência material aparece; **compensação espera a pergunta** |

O caso 10 é o que prova que a [US.011](historias/US-011-socorro-trecho.md) foi
implementada certa: desconhecido vira pergunta, e não bloqueia o que não depende
dele.

---

## 10 · O que o produto nunca diz

| Nunca | Por quê |
|---|---|
| Valor em reais da compensação | DES varia todo dia. Converter é transformar informação em promessa |
| "Você vai receber", "garantimos" | `PROIBIDAS` em `legal.ts`. O teste reprova o CI |
| Estimativa de indenização | É parecer, e `AVISO_ATIVIDADE` diz que não somos escritório |
| Direito sem citar o artigo | O artigo é o que a pessoa aponta no balcão |
| Que conhecer o direito garante o atendimento | `AVISO_RESULTADO`, palavra por palavra |

---

## 11 · Para a revisão do advogado — semana 8

Os pontos marcados **⚠ confirmar**, reunidos:

| # | Ponto | Onde |
|---|---|---|
| 1 | Versão vigente da Res. 400 e todas as alterações | §2 |
| 2 | Dispositivo da assistência com passageiro a bordo e portas abertas | §4 |
| 3 | Dispositivo do traslado para quem reside na localidade | §4 |
| 4 | Prioridade de assistência a passageiro com necessidade especial | §4 |
| 5 | Citação correta: `art. 21, I, a` e `art. 21, I, b` | §5 |
| 6 | Dispositivo da integralidade do reembolso com taxa de embarque | §5 |
| 7 | Momento do pagamento da compensação do art. 24 | §6 |
| 8 | Substituição da compensação por crédito ou milhas, e o direito de recusar | §6 |
| 9 | Formulação sobre Montreal é suficiente sem citar valores? | §7 |
| 10 | Prazos: 5 anos CDC e 2 anos Montreal, e o alcance da tese do STF | §8 |
| 11 | **Interrupção do serviço** — quarto gatilho. Entra, ou o produto declara que não cobre? | §3 |

**O item 11 é decisão de produto e precisa sair da semana 7**, não da 8. Os
outros dez podem esperar o advogado.
