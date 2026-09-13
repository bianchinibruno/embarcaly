# Plano de lançamento

**Data-alvo na Play Store: semana 9 · 09 a 15 de novembro de 2026.**

Não é um evento. É uma sequência de seis semanas com uma regra: nada vai ao ar
antes de ter sido usado numa viagem real.

---

## 1 · Pré-requisitos bloqueantes

Nenhum destes é negociável. Sem os seis, não envia.

| # | Item | Responsável | Prazo |
|---|---|---|---|
| 1 | **Política de privacidade pública** em URL própria | você | S8 |
| 2 | Conta Google Play paga · US$25 | você | S8 |
| 3 | Ficha completa: nome, descrições, 6 prints, capa | [ASO](../marketing/02-aso-play-store.md) | S8 |
| 4 | **Revisão jurídica do motor de direitos** | advogado, R$400 | S8 |
| 5 | Uma viagem real acompanhada de ponta a ponta, sem erro | você | S8 |
| 6 | Cobrança funcionando e testada com valor real | você | S8 |

> O item 4 não é formalidade. O motor de direitos orienta ação no mundo real, e
> a tabela está em [`mobile/src/domain/direitos.ts`](../mobile/src/domain/direitos.ts)
> com artigo citado em cada verbete — leve esse arquivo para o advogado, não um
> resumo.

## 2 · Semana a semana

### S8 · 02–08/11 — véspera
- [ ] Fechar os seis bloqueantes
- [ ] Build de produção assinado
- [ ] Testar em **três aparelhos Android diferentes**, incluindo um de entrada
- [ ] Contar para os 10 fundadores que a semana chegou

### S9 · 09–15/11 — envio
- [ ] **Segunda:** enviar para revisão da Play. Cedo, para caber reenvio na semana
- [ ] Preparar o post de lançamento, mas **não publicar**
- [ ] Terça e sexta: conteúdo normal, sem anunciar nada
- [ ] Aprovado: publicar em **produção limitada**, só para quem tem o link

> **Por que produção limitada primeiro.** A nota média da Play é quase
> impossível de recuperar. Os 10 fundadores entram antes de qualquer público
> frio, avaliam, e só então o link abre.

### S10 · 16–22/11 — os dez, um por dia
- [ ] Um onboarding por dia, por chamada, 20 min
- [ ] Cadastrar a viagem **junto** com a pessoa
- [ ] Rotina manual: conferir voos de manhã e à noite
- [ ] Todo aviso passa por você antes de sair
- [ ] **Meta: 10 ativados, zero aviso errado**

### S11 · 23–29/11 — abertura e G2
- [ ] Pedir avaliação a quem já viajou. **Só a quem teve aviso correto**
- [ ] Com 5 avaliações e nota ≥ 4,5: abrir para público
- [ ] **Post de lançamento na sexta 27/11**
- [ ] Fechar o [G2](../plano/09-validacao.md)

### S12 · 30/11–06/12 — empurrar
- [ ] Sobe para 4 publicações/semana
- [ ] Reddit, segunda e última vez: relato de quem construiu
- [ ] R$150 no teste de CAC
- [ ] Primeiro caso real de usuário vira conteúdo

## 3 · O post de lançamento

**Sexta, 27/11.** Carrossel de 7 folhas, no gerador de artes.

| Folha | Texto |
|---|---|
| 1 | **ESTÁ NO AR.** E finalmente no Android. |
| 2 | Há 3 meses eu voltei de uma viagem com 13 reservas e terminei numa planilha. |
| 3 | Conversei com 12 pessoas que organizam a viagem do grupo. *(o número real)* de 12 não sabiam que tinham direito a hotel com 4h de atraso. |
| 4 | Construí isto: voo, hotel, carro e passeio num lugar só. Offline. Em português. |
| 5 | E quando um voo atrasa, ele refaz a viagem inteira: o transfer que já era, o hotel que precisa ser avisado, o passeio de amanhã que ficou impossível. |
| 6 | Organizar é de graça pra sempre. Acompanhar uma viagem custa R$39, uma vez. |
| 7 | **Link na bio.** E o guia de direitos continua de graça, com ou sem app. |

**Regra:** este é o único post do plano que pode dizer "link na bio". Lançamento
é a exceção que confirma a regra.

## 4 · Comunicação com a lista de espera

**Uma mensagem. Uma só.** Foi o que você prometeu.

> Assunto: **O Embarcaly está no ar**
>
> Você entrou na lista de espera e eu prometi uma mensagem no dia do lançamento.
> É esta.
>
> Está na Play Store: [link]
>
> Organizar sua viagem é de graça. Se quiser que eu acompanhe uma viagem —
> avisando de mudança, refazendo a cadeia e mostrando seus direitos — são R$39
> por viagem, sem assinatura.
>
> O guia de direitos continua de graça, com ou sem o app: [link]
>
> Obrigado por esperar.
> Bruno

**Sem sequência de e-mail. Sem "última chance". Sem contagem regressiva.**
Você prometeu uma mensagem e vai mandar uma.

## 5 · O que pode dar errado

| Risco | Probabilidade | Plano B |
|---|---|---|
| **Revisão da Play demora ou recusa** | média | Enviar na segunda da S9. Sobra a semana inteira para corrigir e reenviar. Não anuncie data pública antes da aprovação |
| Aviso errado nos primeiros dias | média | Todo aviso passa por você até 50 avisos. Se sair errado: avise a pessoa antes dela descobrir, e conte publicamente |
| Nota baixa nos primeiros dias | média | Produção limitada até 5 avaliações ≥ 4,5 |
| Bug em aparelho de entrada | média | Testar em três aparelhos, um deles antigo |
| API de voo estoura o orçamento | baixa | Alerta de gasto no fornecedor. Teto duro |
| **Ninguém instala** | média | O problema é anterior ao lançamento. Volte ao [G1](../plano/09-validacao.md) |

## 6 · Definição de sucesso

O lançamento deu certo se, em 06/12:

| | Meta |
|---|---|
| Instalações | ≥ 150 |
| Ativações | ≥ 60 |
| Viagens pagas | ≥ 20 |
| **Avisos corretos** | **100%** |
| Avaliações | ≥ 8, nota ≥ 4,3 |
| Casos em que a pessoa conseguiu o que pediu no balcão | ≥ 3 |

**A última linha vale mais que todas as outras.** Ela é depoimento, é conteúdo, e
é a prova de que o produto devolve dinheiro real, não informação.

## 7 · Depois do lançamento

Lançar não é o fim do ciclo. O [G3](../plano/09-validacao.md), em 03/01, é.

| Janela | Foco |
|---|---|
| Dez | Alta temporada. Volume de uso real e coleta de caso |
| Jan | SEO entra. Conta da Apple, paga com receita |
| Fev | Indicação dentro do produto. Primeira parceria |
