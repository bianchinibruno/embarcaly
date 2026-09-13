# Estado do projeto — retomar daqui

**Última atualização: 13/09/2026.**

Se a sessão acabou no meio, abra este arquivo e diga **"continua"**. Ele existe
para que nenhuma sessão precise reconstruir contexto.

---

## Onde o projeto está

**Ciclo de validação em curso: 10/09/2026 → 03/01/2027.**
Plano completo em [plano/README.md](plano/README.md).

| Portão | Data | Situação |
|---|---|---|
| G0 · **12** entrevistas | dom 27/09 | 🔴 não iniciado |
| G1 · 10 pré-vendas pagas | dom 11/10 | 🔴 não iniciado |
| G2 · 20 viagens pagas | dom 29/11 | 🔴 não iniciado |
| G3 · 100 viagens pagas | dom 03/01 | 🔴 não iniciado |

**Regra que atravessa tudo: código de produto proibido até o G1 (11/10).**
O que já foi construído é infraestrutura e material de campanha, não produto
novo — e foi feito porque não dependia de validação.

## O que existe, pronto

| Área | Entregue |
|---|---|
| **Estratégia** | 12 documentos em `plano/`, decisões travadas, ICP, benchmark, portões |
| **Identidade** | `brand/IDENTIDADE.md` — sistema v2 "Painel", superfície impressa |
| **Landing** | `index.html`, no sistema v2, com formulário e fallback por e-mail |
| **Guia em PDF** | 8 folhas, `plano/guia-direitos-do-passageiro.pdf`, gerador versionado |
| **App — motor de direitos** | `mobile/src/domain/direitos.ts` · 38 testes |
| **App — recálculo da cadeia** | `mobile/src/domain/cascata.ts` · 18 testes |
| **Artes** | 30 folhas de carrossel + 6 prints de loja + capa, em `marketing/artes/` |
| **Marketing** | Plano de 6 meses, calendário editorial de 26 semanas, ASO completo |
| **Vendas** | Playbook, precificação, plano de lançamento |

**Suíte de testes: 271 passando, 100% de cobertura no domínio, CI verde.**

## O que falta, em ordem de dependência

### Bloqueia o G1 — só conversa, zero código
1. Ler [02-icp.md](plano/02-icp.md) e montar a lista de 25 do círculo
2. Publicar P1 e P2 (artes prontas em `marketing/artes/`)
3. Trocar `SEU_ID` do Formspree no `index.html`
4. **12** entrevistas até 27/09
5. Abrir a pré-venda de R$19 e fechar 10 até 11/10

### Bloqueia o lançamento — depois do G1
6. **Backend.** Não existe nada. É a maior lacuna do projeto
7. **F1 · importar por e-mail encaminhado** — parser de Latam, Gol, Azul, Booking, Decolar
8. **F2** — ligar a tela do agora ao servidor
9. **F3** — envio de aviso (push e e-mail)
10. **Integrar** `direitos.ts` e `cascata.ts` na interface. A lógica está pronta e testada; falta a tela
11. **API de status de voo** — contratar no degrau barato
12. **Política de privacidade** em URL pública — bloqueia o envio à Play
13. Conta Google Play, build assinado, ficha ([texto pronto](marketing/02-aso-play-store.md))

### Depois do G2
14. Conta Apple (janeiro, paga com receita)
15. Blog e SEO
16. Programa de indicação

## Decisões que não se reabrem sem motivo novo

| | |
|---|---|
| **B2C** | O viajante paga. B2B2C arquivado em `plano/arquivo/` |
| **R$39 por viagem** | Não assinatura. Ver `vendas/01-precificacao.md` |
| **Android primeiro** | Play Store antes da App Store, sempre |
| **Centralizar é grátis** | Cobra-se o dia em que a viagem sai do plano |
| **Sistema visual v2** | Papel impresso, duas tintas, uma cor só. `brand/IDENTIDADE.md` |
| **Sem scraping** | Fonte oficial ou entrada manual |

## Armadilhas registradas

- **R1 · construir em vez de vender.** O maior risco do projeto, e ele chega
  como uma razão técnica muito sensata para ir mexer no código
- **Especialista em milhas** é o anti-ICP. Se aparecer na entrevista, encerre
- **Erro em direito** acaba com o canal e com o produto. Confira na Resolução 400
- **Tripsy pode lançar Android.** A janela não fica aberta para sempre

## Como retomar

```
continua
```

Eu leio este arquivo, o `plano/README.md` e o `git log`, e sigo do ponto exato.
Se quiser dirigir, diga a área: `plano`, `app`, `landing`, `artes`, `marketing`,
`vendas`.
