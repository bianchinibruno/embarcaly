# Proteção jurídica — mapa de exposição

> ⚠️ **Eu não sou advogado e isto não é parecer jurídico.** É um mapa de
> exposição e um conjunto de minutas, escritos para você levar a um advogado —
> não para substituí-lo. A revisão está no [cronograma](../plano/06-cronograma.md)
> (semana 8) e no [orçamento](../plano/07-orcamento.md) (R$400).
>
> **Não publique nada disto sem revisão.**

Fonte única dos textos: [`mobile/src/domain/legal.ts`](../mobile/src/domain/legal.ts),
com [teste](../mobile/src/domain/__tests__/legal.test.ts) que falha se alguém
escrever uma promessa que o produto não pode cumprir.

---

## As três exposições, e qual é a pior

### 1 · Conteúdo — informar um direito errado
Você publica que a companhia deve hotel com 2h de atraso. A pessoa exige, passa
vergonha, e culpa você.

**Gravidade: média. Probabilidade: baixa** se o processo for seguido.

**O que já protege:**
- A tabela cita o artigo em cada verbete, e é testada exaustivamente
- Nenhum número foi escrito de memória — todos vieram de conferência na fonte
- `AVISO_CONTEUDO` em toda superfície
- Reconferência trimestral da norma virou tarefa fixa de marketing

### 2 · Atividade — parecer o que você não é
Alguém entende que o Embarcaly é escritório de advocacia (exercício ilegal da
profissão, art. 1º da Lei 8.906/94) ou agência de viagens (cadastro obrigatório
no Cadastur, Lei 11.771/08).

**Gravidade: alta. Probabilidade: baixa**, mas cresce se a comunicação escorregar.

**O que já protege:**
- `AVISO_ATIVIDADE` nega as duas coisas, com todas as letras
- O produto não vende passagem, não intermedeia reserva e não representa ninguém
- A landing e o guia têm um bloco "o que ele não faz"

**O que aumenta o risco, e por isso é proibido:**
- ❌ Dizer "conseguimos sua indenização" ou qualquer variação
- ❌ Peticionar, redigir documento jurídico ou orientar processo específico
- ❌ Receber comissão de fornecedor de viagem
- ❌ Falar "seu caso" em vez de "casos assim"

### 3 · Produto — a pessoa perder algo confiando no cálculo ⚠️
**Esta é a pior, e é a que quase ninguém antecipa.**

O aplicativo diz `PERDIDO` sobre um transfer real e `INVIÁVEL` sobre um passeio
real. A pessoa cancela, e o transfer teria esperado. Ou o aplicativo diz `OK` e
ela perde a conexão.

O cálculo roda em cima de dado **digitado pelo usuário**, sem fonte oficial de
status de voo. Errar é o comportamento esperado, não a exceção.

**Gravidade: alta. Probabilidade: alta.** É a exposição mais provável do produto.

**O que já protege:**
- `AVISO_CALCULO` diz que é apoio, que não há garantia, que é para confirmar com
  o fornecedor, e que **a decisão é sua** — e aparece na própria tela do Socorro
- A ação sugerida é sempre "confirme", "avise", "remarque", nunca "cancele sem falar"
- Nenhuma ação é executada pelo aplicativo. Ele não cancela nem remarca nada

**O que falta e o advogado precisa escrever:**
- Cláusula de limitação de responsabilidade nos termos de uso
- Aceite explícito no primeiro uso da tela de Socorro

---

## Onde cada aviso aparece

| Superfície | Avisos | Situação |
|---|---|---|
| Tela de Socorro | cálculo + conteúdo + resultado | ✅ no ar |
| Guia em PDF | conteúdo + atividade | ✅ no ar |
| Landing | conteúdo + atividade | ✅ no ar |
| Peça de campanha | curto | ✅ nas artes |
| Ficha da Play Store | os três | ✅ no texto pronto |
| **Termos de uso** | completo + dados | 🔴 [minuta](01-termos-de-uso.md), falta revisão |
| **Política de privacidade** | — | 🔴 [minuta](02-politica-de-privacidade.md), **bloqueia o envio à loja** |

---

## Decisões de posicionamento que protegem

Estas não são só jurídicas. São de produto, e cada uma reduz exposição:

| Decisão | O que evita |
|---|---|
| **Nunca gerar código de barras de embarque** | Documento de embarque inválido no portão |
| **Sem scraping, sem API não oficial** | Violação de termos de uso de terceiro, e quebra silenciosa |
| **Sem login na conta do usuário na companhia** | Guarda de credencial de terceiro |
| **Não vender passagem nem intermediar reserva** | Enquadramento como agência de viagens |
| **Não receber comissão de fornecedor** | Conflito de interesse e relação de consumo |
| **Cobrar por viagem, não por assinatura** | Discussão de renovação automática e cancelamento (art. 49 do CDC) |
| **Devolução sem pergunta em 7 dias** | Reclamação de arrependimento vira devolução, não processo |
| **Dado no aparelho, excluído 30 dias após a viagem** | Exposição de LGPD |

---

## Antes de publicar em loja — bloqueantes

1. **Política de privacidade em URL pública.** A Play recusa o envio sem ela
2. **Termos de uso aceitos no primeiro uso**
3. **Revisão por advogado** de `legal.ts`, dos termos e da política — R$400
4. **Aceite explícito na tela de Socorro**, no primeiro uso
5. Conferir se o CNAE do MEI cobre a atividade de software

---

## O que perguntar ao advogado

Leve esta lista. É o que economiza a consulta:

1. A minuta de termos limita responsabilidade de forma que resista ao CDC?
2. `AVISO_ATIVIDADE` basta para afastar enquadramento como agência de viagens?
3. Informar direito com citação de artigo configura consultoria jurídica?
4. Qual o risco de o usuário agir sobre `PERDIDO` e o cálculo estar errado?
5. O aceite precisa ser por tela separada, ou basta o rodapé?
6. Preciso de CNPJ antes de cobrar, ou MEI em CPF resolve na fase de validação?
7. A devolução em 7 dias cobre o direito de arrependimento do art. 49?
8. Guardar documento de viagem de acompanhante exige consentimento formal dele?
9. Qual CNAE do MEI cobre isto?
10. Que seguro faz sentido nesta fase, se algum?
