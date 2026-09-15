# EP-02 · Entrada sem digitação — F1

**Semana 6** (19–25/10) · 4 histórias

---

## O problema

O aplicativo tem CRUD manual completo e funcionando. E é exatamente por isso que
ele não tem usuário: **o consumidor não digita**. Doze campos por reserva, oito
reservas por viagem, e o funil morre antes da tela que levou meses para ficar
pronta.

[`plano/05-mvp.md`](../../plano/05-mvp.md) coloca o F1 como primeiro item da
lista por esse motivo, não por ordem alfabética.

## A hipótese

> Se o organizador encaminhar a confirmação para `viagem@embarcaly.com` e a
> reserva aparecer, ele cadastra a viagem inteira em oito encaminhamentos — e
> nunca preenche um formulário.

E um efeito de segunda ordem que sai de graça: **o e-mail encaminhado é a âncora
de identidade**. Chegou mensagem de um remetente sem conta, o servidor cria a
conta pendente e responde com o link de entrada. O F1 vira o funil de cadastro.

## A decisão que define o épico

> **O parser produz proposta, não fato.**

Nada entra no itinerário sem alguém confirmar. O campo `Item.needs` já existe em
`src/domain/types.ts` exatamente para isto — está escrito lá como *"campo que a
extração não encontrou e precisa do usuário"*, desde antes desta história.

Um parser que erra e escreve direto é pior que digitar: a pessoa confia no que
está na tela e perde o voo.

## A métrica

| Mede | Alvo | Onde |
|---|---|---|
| Reserva importada sem correção | ≥ 70% (critério do **G2**) | `importacoes.confirmada_sem_edicao` ÷ total |
| Viagens criadas por importação | ≥ 60% das viagens novas | Evento `viagem_origem` |
| Tempo do encaminhamento à reserva na tela | ≤ 5 min p95 | Log da fila |

## As histórias

| ID | Título | Tela |
|---|---|---|
| [US.005](US-005-importar-endereco.md) | Ver e copiar o endereço de importação | Importar |
| [US.006](US-006-importar-fila.md) | Acompanhar a fila do que chegou | Importar |
| [US.007](US-007-revisar-confirmar.md) | Confirmar a reserva proposta | Revisar importação |
| [US.008](US-008-revisar-completar.md) | Completar o que a extração não achou | Revisar importação |

## Riscos deste épico

| Risco | Mitigação |
|---|---|
| **Backend do zero em duas semanas a 11h30/semana não cabe** | Cobrir **só Latam e Gol**, a 100%. Dois remetentes certos batem cinco a 40%, e o G2 pede ≥70% |
| A entrada de e-mail não é Supabase e não existe ainda | Cloudflare Email Routing ou *inbound* do Postmark. **Contratar na semana 5**, não na 6 |
| Parser silenciosamente errado é pior que parser ausente | Proposta sempre revisável; `needs` obrigatório; nenhuma confirmação automática no MVP |
| E-mail de terceiro chega junto (cônjuge encaminha) | A âncora é o remetente. Remetente desconhecido gera conta pendente, nunca escreve na conta de outro |

## Fora de escopo

**OCR de PDF.** O e-mail encaminhado cobre 80% do volume com uma fração do
esforço. O anexo é guardado como arquivo, não lido.

**Azul, Booking e Decolar.** Estão no MVP escrito, saem desta semana por risco de
prazo. Voltam depois do G2, ou antes se Latam e Gol fecharem em três dias.
