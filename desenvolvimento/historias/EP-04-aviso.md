# EP-04 · Aviso de mudança — F3

**Semana 8** (02–08/11) · 4 histórias

---

## O problema

O painel do aeroporto diz *"voo atrasado"*. Não diz que o carro alugado fecha às
22h, que o check-in do hotel expira à meia-noite e que o passeio de amanhã cedo
virou impossível.

`src/domain/cascata.ts` já calcula isso — `recalcular()`, `pendencias()`,
`codigo()` — e a `SocorroScreen` já mostra. Só que a pessoa precisa **abrir o
aplicativo e registrar o atraso na mão** para descobrir. Quem está no portão de
embarque não abre aplicativo.

## A hipótese

> Se o aviso chegar antes de a pessoa perceber, com o que **mais** quebrou junto,
> o produto cumpre a frase que está na landing — *"e alguém de olho quando
> atrasa"* — e deixa de ser um organizador a mais.

## A decisão que define o épico

> **A tela renderiza do registro salvo, nunca do payload do push.**

Payload de push é dado de rede, chega truncado, chega duplicado, chega fora de
ordem e pode chegar adulterado. O push carrega **um identificador e nada mais**;
a tela lê o registro que o servidor gravou.

## E o botão que ninguém tinha nomeado

O risco [R4](../../plano/10-riscos.md) diz, com todas as letras, que *"os
primeiros 50 avisos passam por você antes de sair — botão de enviar, nunca
automático"*.

**Esse botão não existia em lugar nenhum do cronograma.** Vira
`admin/index.html`, HTML puro atrás do mesmo código de 6 dígitos, com allowlist
de um e-mail — e **fora do aplicativo React Native**, senão vai para a loja
junto.

## A métrica

| Mede | Alvo | Onde |
|---|---|---|
| Aviso enviado antes de a pessoa abrir o app | ≥ 80% | `aviso_enviado_em` < `aviso_aberto_em` |
| Aviso errado enviado | **Zero nos primeiros 50** | Fila de aprovação, revisão manual |
| Aviso aberto | ≥ 50% | `aviso_aberto` ÷ `aviso_enviado` |

## As histórias

| ID | Título | Tela |
|---|---|---|
| [US.013](US-013-aviso-tela.md) | Ver o que mudou e o que isso quebrou | Aviso |
| [US.014](US-014-aviso-push.md) | Receber o aviso no aparelho | Aviso |
| [US.015](US-015-console-aprovacao.md) | Aprovar o aviso antes de ele sair | Console de aprovação |
| [US.016](US-016-socorro-o-que-mudou.md) | Rever os avisos daquele problema | Socorro |

## Riscos deste épico

| Risco | Mitigação |
|---|---|
| **Push exige credencial FCM e build real de loja**, e a conta estava na semana 9 | **Abrir a conta Google Play na semana 5.** US$25, e é o deslocamento mais barato do plano |
| Aviso errado é dano classificado como fatal — R4 | Console de aprovação. Nada sai automático nos primeiros 50 |
| API de status de voo é custo recorrente antes da receita | Contratada na semana 7 pelo F4. Aqui já existe |
| O console vazar dado de viagem de cliente | Allowlist de um e-mail, mesmo código de 6 dígitos, sem índice, sem link público |

## Fora de escopo

**Tela de histórico de avisos.** Um histórico solto é uma tela que ninguém abre.
Os avisos daquele problema viram um bloco *"O que mudou"* dentro do Socorro, que
já é a tela para onde a pessoa vai quando algo quebra ([US.016](US-016-socorro-o-que-mudou.md)).

**Aviso automático.** Só depois dos 50 casos revisados à mão, e isso é assunto de
depois do G2.
