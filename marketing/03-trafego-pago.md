# Tráfego pago — estrutura completa

**Valores de mercado de setembro de 2026.** Documento de planejamento.
**Nada aqui é para executar antes do G2** — a conta abaixo explica por quê.

---

## 1. A conta que precisa vir antes de qualquer campanha

| Item | Valor |
|---|---|
| Preço | R$39 |
| Menos 15% da loja | R$33,15 |
| Menos custo variável | −R$1,80 |
| **Contribuição por viagem paga** | **R$31,35** |

### Custo real de mídia no Brasil, 2026

| Métrica | Faixa | Observação |
|---|---|---|
| CPM Feed Instagram | R$ 12 – 25 | |
| **CPM Stories/Reels** | **R$ 8 – 18** | O mais barato, e o formato certo pro nosso criativo |
| CPM Feed Facebook | R$ 6 – 15 | Público mais velho |
| CPC serviço local | R$ 0,80 – 3,00 | |
| CPC São Paulo | R$ 1,20 – 4,80 | Praça cara |
| Orçamento mínimo por conjunto | R$ 50/dia | Abaixo disso não sai da fase de aprendizado |

**Meta Ads ficou 12,15% mais caro em 2026**, com repasse de PIS/Cofins (9,25%) e
ISS (2,9%). O custo sobe, o ticket não.

### O funil pago, com números reais

Partindo de CPC de R$1,50, que é o meio da faixa:

| Etapa | Taxa | Resultado por R$1.000 |
|---|---|---|
| Cliques | — | 667 |
| Clique → instalação | 25% | 167 |
| Instalação → ativação | 40% | 67 |
| Ativação → compra em D-7 | 8% | **5,3 viagens** |
| Receita | R$31,35 cada | **R$166** |

> **R$1.000 investidos devolvem R$166.** CAC de ≈ R$188 contra contribuição de
> R$31,35. **Perde R$157 por cliente adquirido.**
>
> Mesmo no melhor cenário — CPC de R$0,80, conversão de 12% — o CAC fica em
> R$67. Ainda mais que o dobro do que a viagem paga.

**Conclusão: tráfego pago não fecha a R$39 por viagem. Não é pessimismo, é
aritmética.** É por isso que o plano de 6 meses é orgânico.

## 2. Quando passaria a fechar

Três gatilhos. Nenhum antes do G3.

| Gatilho | O que muda | CAC viável |
|---|---|---|
| **Plano anual de R$99 com 40% de adesão** | LTV sobe para ~R$70 | R$50 |
| **Recompra de 35% ao ano** | LTV sobe para ~R$42 | R$30 |
| **Preço a R$59** | Contribuição sobe para R$48 | R$45 |
| Os três juntos | LTV ~R$120 | **R$85 — aí fecha** |

**Revisar esta página quando o G3 fechar.** Antes disso, ela é referência, não
plano de ação.

## 3. Os R$300 do ciclo — comprando informação, não usuário

| Quando | Valor | Objetivo | Métrica que importa |
|---|---|---|---|
| **Semana 3 · 28/09** | R$150 | Qual mensagem converte | **Custo por cadastro na lista** |
| Semana 12 · dez | R$150 | CAC real com produto no ar | **Custo por ativação** |

### Teste 1 · Semana 3 — laboratório de mensagem

**Estrutura:**

```
Campanha: EMB_TESTE_MENSAGEM_S3
Objetivo: Tráfego
Orçamento: R$30/dia por conjunto × 5 dias
Praça: Brasil, exceto capitais caras (SP, RJ) — CPM menor
Idade: 28–55
Posicionamento: Stories e Reels apenas (CPM R$8–18)
Otimização: cliques no link

├── Conjunto A · R$50 total
│   Público: interesse em Viagens + Turismo
│   Criativo: "Seu voo atrasou 4h. Você tem direito a hotel."
│
├── Conjunto B · R$50 total
│   Público: idêntico ao A
│   Criativo: "Voo, hotel, carro e passeio num lugar só. Finalmente no Android."
│
└── Conjunto C · R$50 total
    Público: idêntico ao A
    Criativo: "A planilha não te ajuda quando o voo atrasa."
```

**Regra de ouro: os públicos são idênticos.** A única variável é o criativo. Sem
isso o teste não mede nada.

**Criativos prontos:** as folhas 1 dos carrosséis em
[`artes/`](artes/) servem direto como imagem de anúncio.

**Leitura do resultado, na ordem:**
1. Custo por cadastro na lista de espera — a única que decide
2. CTR — diz se o gancho para o dedo
3. Custo por clique — diz se o público está certo

**Não olhe instalações.** Não é o objetivo desta campanha.

**Entrega:** a mensagem vencedora vira o título da landing de pré-venda, o gancho
dos carrosséis e a descrição curta da Play Store. **R$150 por essa resposta, três
semanas antes do G1, é a melhor compra do plano.**

**Regra dura:** R$150, cinco dias, desliga. Sem prorrogar, sem "só mais R$50".

### Teste 2 · Semana 12 — CAC real

Mesma estrutura, criativo vencedor, objetivo **Instalações de aplicativo**.
Meta: descobrir o CAC real e **enterrar de vez a hipótese de mídia paga**.

Se o CAC vier abaixo de R$60, reabra a discussão. Se vier acima, feche o assunto
por escrito e volte para o orgânico sem culpa.

## 4. Estrutura para quando fizer sentido — depois do G3

Documentada agora para não improvisar depois.

### Campanha 1 · Aquisição fria
```
Objetivo: Instalações de aplicativo
Orçamento: R$100/dia
Posicionamento: Reels + Stories
Otimização: evento de ativação (viagem cadastrada), não instalação

├── Interesse amplo: Viagens, Turismo, Companhias aéreas
├── Comportamento: Viajantes frequentes internacionais
└── Semelhante 1% de quem já pagou
```

> **Otimize por ativação, não por instalação.** Instalação barata que não ativa é
> dinheiro queimado, e o algoritmo entrega exatamente o que você pedir.

### Campanha 2 · Remarketing de ativação
```
Público: instalou e NÃO cadastrou viagem em 3 dias
Orçamento: R$30/dia
Criativo: "Leva 3 minutos. Encaminha o e-mail da confirmação."
```
**É a campanha mais rentável do conjunto**, porque ataca o maior vazamento do
funil.

### Campanha 3 · Remarketing de D-7
```
Público: tem viagem cadastrada começando em 7 dias
Orçamento: R$20/dia
Criativo: "Sua viagem começa em 7 dias. Quer que eu acompanhe?"
```
Conversão altíssima e público minúsculo. **Teto baixo, retorno ótimo.**

### Campanha 4 · Sazonal
Dezembro, janeiro e julho. Mesmo criativo, orçamento dobrado, janela de 3 semanas.

## 5. Google Ads — por que fica fora

Busca por "organizador de viagem" tem volume baixo e intenção difusa. Busca por
"voo atrasado o que fazer" tem volume alto, mas a intenção é **informação
gratuita**, não instalar aplicativo — e é exatamente onde o SEO orgânico ganha de
graça.

**Google Ads entra só se e quando** a rede de busca mostrar conversão no
Analytics do orgânico. Não antes.

## 6. Rastreamento — o mínimo honesto

| Evento | Onde | Por quê |
|---|---|---|
| Cadastro na lista | Site | Métrica do teste 1 |
| Instalação | Play Console | Padrão da loja |
| **Ativação** | App | **A métrica que importa** |
| Compra | Loja | Receita |

**Sem pixel de rede social dentro do aplicativo.** Está na
[política de privacidade](../juridico/02-politica-de-privacidade.md) e não vai
mudar por causa de campanha.

## 7. O que nunca fazer

- ❌ Rodar mídia sem o G2 fechado. Você estaria comprando tráfego para um produto
  que ainda não provou que entrega
- ❌ Otimizar por instalação em vez de ativação
- ❌ Prorrogar teste que "estava indo bem". O orçamento é R$300 e acabou
- ❌ Anunciar direito do passageiro com promessa de resultado. Ver
  [proteção jurídica](../juridico/00-protecao.md)
- ❌ Público de capital cara sem necessidade. SP e RJ custam até 2× mais
