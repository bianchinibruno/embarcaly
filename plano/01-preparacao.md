# Fase 1 — Preparação

Semana 0 e semanas 1 a 4, de 10/09 a 11/10.
**Nenhuma linha de código de produto nesta fase.**

---

## 1.1 Expectativas

O curso abre com quatro travas. Aplicadas ao seu caso concreto:

| Trava do curso | Seu caso |
|---|---|
| *Não precisa saber tudo para começar* | Você já sabe demais para o estágio. O app tem CRUD, SQLite, testes e CI e **zero usuários**. O risco aqui não é técnico. |
| *Não se preocupe com a linguagem ideal* | Expo + React Native + TypeScript está decidido e é adequado. **Encerrado — não reabra.** |
| *Não precisa de sócio no início* | Mantenha assim até o G2. |
| *Passos pequenos e constantes* | 1h30 por dia útil + 4h no sábado. Ver 1.2. |
| *Apaixone-se pelo problema* | Você já está. É a sua planilha de viagem. Só falta confirmar que ela é de mais 20 pessoas |

**A armadilha específica do seu perfil.** Você é Engenheiro de Qualidade. Seu
instinto treinado é aumentar cobertura, endurecer o pipeline e eliminar
flakiness — e o último commit deste repositório é literalmente
`test: cover every component and stop a flaky suite`.

Isso é excelente engenharia e é, neste momento, **fuga**. Testar é confortável
porque o feedback é imediato e vem de uma máquina. Ligar para um agente de
viagens que talvez diga que sua ideia não serve é desconfortável porque o
feedback vem de uma pessoa. As duas atividades parecem trabalho. Só uma
responde a pergunta que decide o projeto.

**Regra desta fase:** enquanto o G1 não passar — **11/10** —, *commit de código
de produto é proibido*. Testes e refactor entram na conta como zero progresso.

## 1.2 Rotina

| Quando | Quanto | O quê |
|---|---|---|
| Seg–Sex, antes do trabalho | 1h30 | Bloco principal. Uma tarefa só, escolhida na véspera. |
| Sábado de manhã | 4h | Bloco profundo: o que exige contexto longo. |
| Sexta, 20 min | — | Diário ([templates/diario.md](templates/diario.md)) e revisão do portão. |
| Domingo | 0h | Sem exceção. Cansaço não é medalha, é o que mata projeto de 6 meses no mês 3. |

Total: ~11h30/semana → ~185h até 03/01. Suficiente para o escopo de
[05-mvp.md](05-mvp.md) **desde que o escopo não cresça**.

**Duas janelas já estão descontadas:** você não trabalha nisso de 06 a 09/09
(feriado e outras frentes), e as semanas de 21/12 a 03/01 valem meia força pelas
festas. O [cronograma](06-cronograma.md) já foi montado assim.

## 1.3 Limites

Escreva estes números e não os mude no meio do caminho — é para isso que eles
servem.

| Limite | Valor | O que acontece ao estourar |
|---|---|---|
| **Dinheiro** | **R$2.000** | Para. Não aporta mais. Ver [07-orcamento.md](07-orcamento.md). |
| **Tempo** | **10/09/2026 a 03/01/2027** | No dia 03/01 o G3 decide entre continuar, congelar ou encerrar. |
| **Perda aceitável** | R$2.000 + ~185h | Assumida de antemão. Se perder tudo isso, nada quebra na sua vida. É risco calculado, não aposta. |
| **Emprego** | Intocado | Nenhuma decisão de carreira antes de 6 meses de receita recorrente. |

**Perda que não é perda.** Mesmo no pior cenário sobram: um app publicado nas
duas lojas, uma marca, um estudo de mercado e uma história pública de construção.
Para um QE sênior montando portfólio, isso já tem valor próprio.

## 1.4 Risco de plataforma

O curso pede explicitamente para avaliar zonas cinzentas. Aqui estão as suas.
Detalhe e mitigação em [10-riscos.md](10-riscos.md).

| Zona cinzenta | Veredito |
|---|---|
| Scraping de site de companhia aérea | **Proibido.** Ver [D6](00-decisoes.md). |
| Login na conta da cia em nome do cliente | **Proibido.** Credencial de terceiro, sem exceção. |
| Ler caixa de e-mail do cliente (OAuth Gmail) | **Depois do G2.** Exige verificação do Google e política de privacidade. |
| API oficial paga de status de voo | **Permitido a partir da semana 7**, depois do dinheiro de pré-venda entrar. Aqui ela é o produto, não um acessório. |
| WhatsApp para suporte | **Permitido.** Conta pessoal ou Business até o G2. |
| Publicar antes na App Store | **Proibido.** Play Store primeiro — [D3](00-decisoes.md). |
| Gerar código de barras de cartão de embarque | **Proibido.** Já é regra do produto no README e está certa. |

## 1.5 Mercado

**O que você sabe:** software, qualidade, integrações — e o problema, em
primeira mão. Você é o [ICP](02-icp.md): organiza voo, carro, hotel e passeio na
mão, e sentiu a dor que o produto resolve.

**O que você não sabe e precisa descobrir nas semanas 1 e 2:** se essa dor é sua
ou de um mercado. Quanta gente organiza assim, com que frequência, quanto isso
custa em tempo e dinheiro — e, principalmente, **quanto vale para elas** ter
alguém do lado no dia em que a viagem sai do plano.

**Você é o cliente — e é exatamente por isso que precisa tomar cuidado.**
Ser o ICP é vantagem enorme para achar o problema e armadilha enorme para
dimensioná-lo. O protótipo foi desenhado para o viajante organizado e
tecnicamente confortável que você é; boa parte do mercado é **ansiosa e leiga**,
e não vai encaminhar e-mail para lugar nenhum se a instrução não for óbvia.

Trate cada suposição do protótipo como pergunta, não como fato. É o que o roteiro
de [entrevista](templates/entrevista-viajante.md) faz. Cada suposição do protótipo precisa ser
reapresentada como pergunta no [roteiro de entrevista](templates/entrevista-viajante.md).

**Afinidade com o setor:** média. Você gosta de viajar, mas não conhece nem a
operação de agência nem o regulamento da ANAC. Corrigível com as 35 entrevistas
da Semana 2 e uma tarde lendo a Resolução 400 — que é, aliás, a matéria-prima do
caminho A.
