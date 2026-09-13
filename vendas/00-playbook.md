# Playbook de vendas

**Setembro de 2026 a fevereiro de 2027.** Documento mestre da área.

Sub-documentos: [precificação e ofertas](01-precificacao.md) ·
[plano de lançamento](02-lancamento.md)

---

## 1 · O que esta área vende

Não vende o app. Vende **sossego numa viagem que outras pessoas dependem de
você**. O produto é a prova, não o argumento.

E não vende por conversa, exceto nos primeiros 20 clientes. Depois disso, quem
vende é o produto no momento certo — o que transforma "vendas" numa disciplina
de **timing e copy dentro do app**, não de ligação.

## 2 · A descoberta que reorganiza a área

| Métrica | Referência 2026 |
|---|---|
| Instalação → compra, categoria viagem | 2,42% |
| **Teste → pago, categoria viagem** | **48,7% mediana · 54,3% no quartil superior** |
| Teste → pago, freemium puro | 2,6% |
| Cobrança antecipada vs. freemium | 10,7% contra 2,1% |

Viagem **lidera todas as categorias** em conversão de teste para pago. A razão
apontada nos benchmarks é literal: *utilidade sensível ao tempo* — a pessoa paga
no instante em que a viagem está chegando.

> **Consequência operacional.** O momento de cobrança não é uma escolha de
> design, é a variável que decide a receita. Cobrar na instalação joga fora a
> vantagem inteira da categoria.
>
> **Cobrança em D-7 do embarque.** Não antes, não depois.

## 3 · O funil

| Etapa | Onde | Taxa alvo | Fonte da taxa |
|---|---|---|---|
| Alcance | Instagram, busca, loja | — | |
| Perfil visitado | 5% do alcance | | |
| Instalação | 16% do perfil | | |
| **Ativação** — instalou e cadastrou a 1ª viagem | **40%** | onde mais vaza | |
| Viagem completa — 4+ reservas | 60% da ativação | | |
| **Compra em D-7** | **8%** da ativação | acima do 2,42% da categoria, por causa do timing | |
| Recompra na 2ª viagem | 25% | meta do G3 | |

### Onde o funil vaza, em ordem

1. **Ativação.** Cadastrar a primeira viagem. É por isso que o F1 (importar por
   e-mail encaminhado) é a primeira funcionalidade do MVP
2. **Viagem incompleta.** Quem cadastra só o voo nunca vê o valor da cadeia.
   Empurrar para 4+ reservas é trabalho de produto, não de marketing
3. **D-7 sem resposta.** Se a pessoa ignora, ela não entendeu o que está
   comprando. Problema de copy, não de preço

## 4 · Os três momentos de venda

### Momento 1 · D-7 do embarque — o principal
A viagem está montada, a contagem apareceu, a ansiedade subiu.

> **Sua viagem começa em 7 dias.**
> Quer que eu acompanhe? R$39, uma vez, até você voltar.
> Se algo mudar, você fica sabendo antes do painel do aeroporto — e eu te digo
> o que a companhia é obrigada a fazer.
>
> `[Acompanhar esta viagem · R$39]`   `[Agora não]`

**Regras:** aparece uma vez. "Agora não" volta em D-3, uma única vez. Nunca
bloqueia nada que já era grátis.

### Momento 2 · O primeiro problema — o mais forte, e o mais delicado
A pessoa não pagou, o voo atrasou, e o app sabe.

> **Seu voo atrasou 2h10.**
> A companhia já deve alimentação. Em 1h50 deve hotel e transporte.
> `[Ver o que fazer · R$39]`

> ⚠️ **Aqui existe uma linha ética e ela não se cruza.** O aviso **de que
> atrasou** é gratuito e sempre será. O que se cobra é o recálculo da cadeia e o
> passo a passo dos direitos.
>
> Cobrar pela informação de que a pessoa está em apuros é extorsão, não venda.
> Se a distinção ficar confusa na tela, o produto perde a confiança que é o
> único ativo dele.

### Momento 3 · Retorno + 2 dias — recompra e indicação
O produto acabou de provar valor.

> Você voltou. Nesta viagem eu avisei 3 mudanças e você economizou uma diária.
> `[Avaliar na Play Store]`   `[Indicar a alguém]`
> Próxima viagem? R$39 de novo, ou R$99 por um ano ilimitado.

**É aqui que o plano anual aparece pela primeira vez.** Nunca antes da segunda
compra.

## 5 · Os 20 primeiros — venda na mão

Antes do G2, venda é conversa. Roteiro completo em
[recrutamento](../plano/templates/recrutamento.md) e
[entrevista](../plano/templates/entrevista-viajante.md).

### A pré-venda do G1 · 28/09 a 11/10

**Oferta:** R$19 agora, devolvo se você não gostar. Vale a primeira viagem.

**Script, por mensagem, depois da entrevista:**

> [nome], gravei uma demo de 90 segundos do que eu te falei: [link]
>
> Pergunta direta, sem rodeio: **posso te cobrar R$19 agora pra você ser um dos
> 10 primeiros?** Devolvo se não gostar, sem perguntar nada.
>
> Você viaja [destino/data que ela falou] — dá tempo de estar pronto.

**Meta:** 10 pagas, sendo **4 de fora do seu círculo**. Os 4 são o critério real.

### Onboarding dos 10 primeiros · semanas 10–11

Um por dia, manual, por chamada de 20 min:
1. Cadastre a viagem **junto com a pessoa**, com a viagem real dela
2. Combine qual viagem vai ser acompanhada primeiro
3. Dê seu WhatsApp. Responda em minutos
4. **D+7:** *"o que quase te fez desistir de usar?"* — a melhor pergunta de
   retenção que existe
5. **No retorno:** peça avaliação e indicação, nessa ordem

## 6 · Objeções, e a resposta

| Objeção | Resposta |
|---|---|
| **"Já uso o TripIt / Google"** | "Eles organizam bem. Quando o voo atrasa, eles te dizem que atrasou. Nenhum te diz que o transfer já era e o hotel precisa ser avisado." |
| **"R$39 é caro"** | "TripIt Pro custa R$270 por ano. Você viaja uma vez. Prefere pagar R$270 ou R$39?" |
| **"Vou usar só uma vez"** | "Exatamente. Por isso não tem assinatura. Você paga essa viagem e pronto." |
| **"E se eu não precisar?"** | "Aí você gastou R$39 e a viagem correu bem. É o mesmo racional do seguro viagem, que você já compra." |
| **"Meu voo nunca atrasa"** | "112 mil voos são cancelados por ano no Brasil, 11,6% do total. Mas o produto não é só atraso — é a viagem inteira num lugar." |
| **"Não confio em app pra guardar documento"** | "Funciona offline e o documento fica no seu aparelho. E o app nunca gera código de barras, porque só a companhia emite." |
| **"Vocês conseguem a indenização pra mim?"** | "Não. Eu te mostro o direito e o texto pra você cobrar. Indenização é com advogado ou com LiberFly." |
| **"Só tem no Android?"** | "Android primeiro, iPhone em janeiro. O melhor app brasileiro disso só existe no iPhone, e 81% do Brasil ficou de fora." |
| Silêncio depois do preço | **Fique em silêncio também.** Conte até dez. |

## 7 · O que nunca fazer

- ❌ Dar desconto abaixo de R$19 na pré-venda. Quem pede desconto sobre R$19 não
  tem a dor, tem curiosidade — e isso é informação, não objeção a contornar
- ❌ Prometer indenização, prazo de reembolso da companhia, ou resultado jurídico
- ❌ Cobrar pelo aviso de que houve problema
- ❌ Vender para quem está fora do [ICP](../plano/02-icp.md). Cliente errado gera
  churn, avaliação ruim e roteiro de produto errado
- ❌ Prometer data de lançamento que você não controla. A revisão da loja não é sua

## 8 · Metas por trimestre

| | Q4 2026 (out–dez) | Q1 2027 (jan–fev) |
|---|---|---|
| Ativações/mês | 400 | 900 |
| Viagens pagas acumuladas | **100** | **500** |
| Conversão ativação → compra | 6% | 8% |
| Recompra | 25% | 35% |
| Receita líquida acumulada | R$3.300 | R$16.500 |
| Avaliação na Play | ≥ 4,3 | ≥ 4,5 |

*Receita líquida já descontados os 15% da loja.*

## 9 · Controle

Uma planilha, sete colunas. Nada de CRM antes de 100 clientes.

| Coluna | |
|---|---|
| Pessoa | nome e contato |
| Origem | círculo · indicação · conteúdo · loja · grupo |
| Etapa | lista · ativou · viagem completa · pagou · recomprou |
| 1ª viagem | data e nº de reservas |
| Pagou em | data e valor |
| Avisos enviados / corretos | a qualidade da promessa |
| Indicou | quem |

**Revisão toda sexta**, junto com o [diário](../plano/templates/diario.md).
