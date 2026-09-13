# Cronograma — 16 semanas

Início: **segunda-feira, 7 de setembro de 2026.** Fim da janela: **28 de dezembro de 2026.**
~11h30 por semana ([01-preparacao.md](../../01-preparacao.md), 1.2).

Os portões **G0–G3** são de [08-validacao.md](validacao.md). Portão reprovado
significa parar e reavaliar, não "empurrar mais uma semana".

---

## Fase 1 — Preparação · Semanas 1–2

### Semana 1 (7–13/set) — Montar a lista e a isca
- [ ] Ler [00-decisoes.md](../README.md) inteiro e marcar o que discorda
- [ ] Listar **60 consultores de viagens independentes** no Instagram (planilha: @, nicho, seguidores, se posta viagem de cliente)
- [ ] Entrar em 3 grupos de WhatsApp / comunidades de agentes
- [ ] Publicar landing de espera ([templates/landing.md](../landing-b2b2c.md)) no domínio atual do GitHub Pages
- [ ] Escrever o roteiro de entrevista ([templates/entrevista.md](../entrevista-agente.md))
- [ ] Verificar `embarcaly.com.br` no Registro.br e busca de marca no INPI (classes de software e serviços de viagem)

### Semana 2 (14–20/set) — Falar com gente · **G0**
- [ ] Enviar 60 DMs ([templates/outbound.md](../outbound-agente.md)), 12 por dia
- [ ] Realizar **15 entrevistas** de 20 min
- [ ] Anotar, para cada uma: quantas viagens/mês, o que já paga, e **o último caso real** de problema com cliente viajando
- [ ] Fechar a Semana 2 preenchendo o **G0**

> 🚦 **G0 — passa ou para.** Ver [08-validacao.md](validacao.md).
> Reprovou? Vá para o alvo alternativo de [D7](../README.md) e repita a Semana 2.
> Não comece a construir.

---

## Fase 2 — Mão na massa · Semanas 3–10

### Semana 3 (21–27/set) — Vender antes de construir
- [ ] Gravar demo de 90s com o protótipo HTML existente
- [ ] Oferecer aos 15 entrevistados: **R$39/mês vitalício, cobrado quando entregar**
- [ ] Meta: **5 cartas de intenção** — nome, WhatsApp e um "sim, eu pago"
- [ ] Definir a stack do backend e provisionar o ambiente (uma tarde, decisão travada)

> 🚦 **G1 — o portão mais importante do plano.**
> Menos de 5 intenções de pagamento? **Não construa.** Volte à Semana 2.

### Semanas 4–5 (28/set–11/out) — F1 e F5
- [ ] Backend: modelo de viagem, reserva e agente
- [ ] **F1** — cadastro de viagem em menos de 3 min (cronometrado)
- [ ] **F5** — painel do agente
- [ ] Você mesmo cadastra 3 viagens reais de conhecidos

### Semanas 6–7 (12–25/out) — F2 e F3
- [ ] **F2** — link público do viajante com a tela "Agora"
- [ ] **F3** — envio do aviso com a marca do agente + cópia para o agente
- [ ] Teste de fogo: uma viagem real de ponta a ponta, sua ou de um amigo

### Semanas 8–9 (26/out–8/nov) — F4 e onboarding
- [ ] **F4** — recálculo da cadeia (regras na mão, 5 casos mais comuns)
- [ ] Roteiro de onboarding de 20 min por vídeo
- [ ] Colocar os **5 primeiros agentes para dentro**, um por dia
- [ ] Rotina manual diária: conferir os voos do dia de manhã e à noite ([04-mvp.md](mvp.md))

### Semana 10 (9–15/nov) — Primeiro dinheiro · **G2**
- [ ] Cobrar o primeiro Pix dos 5
- [ ] Sessão de feedback de 30 min com cada um
- [ ] Corrigir os 3 atritos mais citados, e só esses

> 🚦 **G2 — 5 agentes pagando de verdade.**
> Passou? Libera: API de status de voo, MEI, e verba de mídia.

---

## Fase 3 — Refinamento · Semanas 11–16

### Semanas 11–12 (16–29/nov) — Automatizar o que doeu
- [ ] Contratar API oficial de status de voo (comparativo em [06-orcamento.md](orcamento.md))
- [ ] Substituir a conferência manual por consulta em janelas críticas + cache por voo
- [ ] Abrir MEI

### Semanas 13–14 (30/nov–13/dez) — Escalar a aquisição
- [ ] 60 novas DMs, agora com prova social real
- [ ] Publicar 2 posts/semana no Instagram (*building in public*, [07-gtm.md](gtm.md))
- [ ] Primeira conversa com uma *host agency*
- [ ] Primeiro teste de mídia paga: **R$300** ([06-orcamento.md](orcamento.md))

### Semana 15 (14–20/dez) — Empacotar
- [ ] Página de vendas com depoimento dos primeiros clientes
- [ ] Autoatendimento no cadastro (tirar você do onboarding)
- [ ] Ligar a cobrança recorrente

### Semana 16 (21–28/dez) — Fechar o ciclo · **G3**
- [ ] Medir: MRR, churn, viagens ativas, avisos enviados, avisos certos
- [ ] Retrospectiva escrita das 16 semanas
- [ ] **Decidir: continuar, congelar ou encerrar**

> 🚦 **G3 — 20 pagantes e retenção de 80% no mês 2.**

---

## Marcos

| Data | Marco |
|---|---|
| 20/set | 15 entrevistas · G0 |
| 27/set | 5 intenções de pagamento · **G1** |
| 15/nov | 5 pagantes reais · **G2** |
| 28/dez | 20 pagantes · **G3** |

## Se atrasar

Atraso de até 2 semanas é normal e já está absorvido. Passou disso, **corte
escopo, nunca prazo** — e a ordem de corte é: F4 → F5 → F3. F1 e F2 são
intocáveis, porque sem elas não existe produto.
