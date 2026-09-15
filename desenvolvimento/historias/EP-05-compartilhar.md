# EP-05 · Acompanhar e compartilhar — F5 e receita

**Semana 9** (09–15/11) · 3 histórias

---

## O problema

Duas coisas diferentes que moram na mesma semana porque dependem uma da outra.

**A receita.** O organizador precisa entender o que é acompanhar uma viagem, e
decidir. Hoje não existe lugar nenhum no produto onde isso seja explicado.

**A aquisição.** Quem ficou em casa pergunta *"a que horas vocês chegam?"* no
WhatsApp, e o organizador responde. O link resolve isso — e **quem recebe o link
é exatamente o próximo cliente**, porque também viaja.

## As duas decisões que definem o épico

> **DT6 · O dinheiro entra pela web, não pela loja.**

A Apple proíbe vender bem digital fora do billing dela, e proíbe até linkar para
fora de dentro do app. O aplicativo **lê um booleano** — `trip.acompanhada` — e
nunca mostra preço. A tela `Acompanhar` explica e leva para fora; a cobrança
acontece no navegador.

> **DT2 · O link público é página estática, fora do Expo.**

Quem recebe o link não pode baixar React Native para ler um itinerário. É HTML,
em `acompanhar/`, com orçamento de peso. A página existe para abrir rápido na
mão de alguém que não pediu nada.

## A hipótese

> Se o acompanhamento for oferecido em D-7, quando a ansiedade já começou e a
> viagem já está montada, ele é comprado. Oferecido em D-60, na hora do cadastro,
> não é.

## A métrica

| Mede | Alvo | Onde |
|---|---|---|
| Conversão da oferta em D-7 | ≥ 8% | `acompanhar_contratado` ÷ `acompanhar_visto` |
| Link gerado por viagem | ≥ 30% das viagens | Evento `link_gerado` |
| Visitante de link que abre o app | ≥ 10% | `?de=link` na origem |
| **Peso da página pública** | ≤ 30 kB comprimido | Passo de CI |

## As histórias

| ID | Título | Tela |
|---|---|---|
| [US.017](US-017-acompanhar.md) | Entender e contratar o acompanhamento | Acompanhar viagem |
| [US.018](US-018-compartilhar.md) | Gerar, conferir e revogar o link | Compartilhar |
| [US.019](US-019-pagina-publica.md) | Acompanhar a viagem sem app e sem conta | Página pública |

## Riscos deste épico

| Risco | Mitigação |
|---|---|
| **Vender bem digital dentro do app é rejeição na Apple** | DT6. O app lê booleano, não mostra preço, não linka para pagamento |
| **Incidente de privacidade** — o link vaza localizador, assento, sobrenome | `snapshotPublico()` é **whitelist, nunca blacklist**, e o teste afirma a *ausência* de cada campo sensível |
| Token em log de servidor ou em cabeçalho `Referer` | Token no **fragmento (`#`)**, nunca no caminho |
| Link continua vivo depois da viagem | Expira 48 h depois do fim, e é revogável a qualquer momento |
| O organizador compartilha sem saber o que compartilhou | A tela mostra **exatamente o que vai**, antes de gerar |

## Fora de escopo

**Colaboração.** Quem recebe o link lê. Não edita, não comenta, não confirma
presença. Edição em tempo real é o forte do Wanderlog e não se briga por ele
agora.

**Conta para quem recebe.** O link não tem conta de nenhum dos dois lados. É o
que o torna barato e é o que o torna canal de aquisição.
