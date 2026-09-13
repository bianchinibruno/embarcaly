# Validação — portões, métricas e critérios de parada

Quatro portões. Números escritos antes de você ver o resultado.

---

## G0 — A dor existe e é lembrada? · Semana 2 · **dom 27/09**

> **Revisado em 13/09.** A [validação de demanda por pesquisa](12-validacao-de-demanda.md)
> provou a existência e o tamanho do problema melhor do que 20 entrevistas
> provariam: 100 mil reclamações por ano, e a ANAC construindo plataforma
> dedicada em 2026. **As metas caíram de 20 para 12 entrevistas.** O que o
> levantamento não responde — desconhecimento dos direitos e disposição a pagar —
> continua valendo integralmente.

| Critério | Passa | Resultado |
|---|---|---|
| Entrevistas com viajantes | ≥ 12 | ___ |
| Que lembram de um problema real de viagem nos últimos 24 meses | ≥ 8 | ___ |
| Que **não sabiam** do direito a hospedagem com 4h de atraso | ≥ 15 | ___ |
| Que viajam com alguém dependendo deles | ≥ 8 | ___ |
| Que perderam dinheiro ou uma reserva por causa de um atraso | ≥ 4 | ___ |
| **Que mostraram a planilha, o print ou a pasta de e-mail** | ≥ 8 | ___ |
| **Usuários de Android entre os 12** | ≥ 8 | ___ |
| **De fora do seu círculo pessoal** | ≥ 6 | ___ |

**Dois critérios carregam este portão.**

O **desconhecimento dos direitos** valida a camada que se cobra: se a maioria já
souber, o motor de direitos deixa de ser diferencial.

O **improviso visível** valida a camada de baixo: quem te mostra a planilha
prova que a dor de centralizar existe e que nada no mercado resolveu para ela.
Peça para ver. É o dado mais honesto que você vai coletar, e vale mais que
qualquer resposta falada.

**Composição também é critério.** Vinte amigos seus com iPhone respondendo que a
ideia é ótima é o resultado mais perigoso possível: parece validação e não é.
Os alvos de Android e de fora do círculo estão em [02-icp.md](02-icp.md).

## G1 — Alguém paga de verdade? · Semana 4 · **dom 11/10**

| Critério | Passa | Resultado |
|---|---|---|
| **Pré-vendas pagas** de R$19, com devolução garantida | ≥ 10 | ___ |
| Vindas de fora do seu círculo pessoal | ≥ 4 | ___ |
| Lista de espera | ≥ 150 | ___ |
| Alcance somado dos posts de direitos | ≥ 10 mil | ___ |

> ⚠️ **É o portão mais difícil do plano, e é de propósito.** Intenção declarada
> não vale nada aqui: precisa de Pix de estranho. Se ele travar, você economizou
> sete semanas de construção — e é essa a função dele.
>
> **Os 4 de fora do círculo são o critério real.** Dez amigos pagando R$19 por
> gentileza não provam mercado nenhum.

**Reprovou:** não construa backend. Ou o conteúdo não alcança, ou a promessa não
converte. Nos dois casos o problema é anterior ao produto.

## G2 — O produto entrega? · Semana 11 · **dom 29/11**

| Critério | Passa | Resultado |
|---|---|---|
| Viagens acompanhadas de ponta a ponta | ≥ 30 | ___ |
| Viagens **pagas** | ≥ 20 | ___ |
| **Direitos informados corretamente** | **100%** | ___ |
| Casos em que a pessoa usou o texto no balcão | ≥ 5 | ___ |
| Casos em que ela **conseguiu** o que pediu | ≥ 3 | ___ |
| Importação por e-mail que funcionou sem sua intervenção | ≥ 70% | ___ |
| **Viagens com 4+ reservas de fornecedores diferentes** | ≥ 20 | ___ |
| **Usuários em Android** | ≥ 60% | ___ |

**A linha dos 3 casos em que a pessoa conseguiu** é a mais valiosa do plano
inteiro: é depoimento, é conteúdo e é a prova de que o produto entrega dinheiro
real, não informação.

## G3 — Vira negócio? · Semana 16 · **dom 03/01/2027**

| Critério | Passa | Resultado |
|---|---|---|
| Viagens pagas acumuladas | ≥ 100 | ___ |
| Novas ativações no último mês | ≥ 400 | ___ |
| Conversão de ativação em compra | ≥ 2,5% | ___ |
| Que compraram uma **segunda** viagem, ou disseram que comprariam | ≥ 25% | ___ |
| CAC em dinheiro | < R$5 | ___ |
| Avaliação média na Play Store | ≥ 4,3 | ___ |
| Crescimento do alcance mês a mês | positivo 3 meses seguidos | ___ |

**A métrica que decide:** *crescimento do alcance*. Num negócio B2C sem verba, a
pergunta não é "o produto é bom" — é "a máquina de conteúdo compõe sozinha?".
Se o alcance estagnou, o produto pode ser ótimo e o negócio não existe.

**Três saídas:**
- **Continuar** — passou. Próximo ciclo: 500 viagens pagas e o plano anual.
- **Congelar** — produto bom, aquisição parada. Mantenha no ar com custo mínimo,
  publique quando der. Viagem é sazonal; janeiro e julho podem mudar o quadro.
- **Encerrar** — sem crescimento de alcance e menos de 40 viagens pagas.
  Post-mortem público. O motor de direitos, o app nas duas lojas e a marca
  continuam seus — e o [caminho arquivado](arquivo/README.md) reaproveita quase
  tudo com um funil catorze vezes menor.

---

## Métricas semanais

| Métrica | O que revela |
|---|---|
| Alcance somado das publicações | Se a máquina compõe ou estagna |
| Novas ativações | Topo do funil |
| Viagens pagas | A única que importa de fato |
| Direitos informados / corretos | A qualidade da promessa central |
| Horas gastas | Se a rotina se sustenta |

## Proibidas

Seguidores. Downloads sem ativação. Curtidas. Cobertura de teste. Commits.
Nenhuma responde "alguém paga por isso".
