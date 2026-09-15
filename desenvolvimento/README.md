# Desenvolvimento — as telas que faltam

**Janela: semanas 5 a 11, de 12/10 a 29/11** ([cronograma](../plano/06-cronograma.md)).
Nada aqui é construído antes do **G1 · 11/10**.

---

## A regra que vale mais que este diretório

> **Commit de código de produto está proibido até o G1.**
> `app.json` é código de produto. `src/` é código de produto.

Estes documentos existem para que a semana 7 seja transcrição em vez de
pensamento. Escrever tabela não é construir. Se o G1 reprovar, nada daqui vira
código.

## Leia nesta ordem

1. **[00-decisoes-tecnicas.md](00-decisoes-tecnicas.md)** — o que está travado e por quê
2. **[01-arquitetura.md](01-arquitetura.md)** — onde cada coisa mora
3. **[historias/](historias/README.md)** — **o backlog pronto para desenvolvimento**
4. **[06-anac-completo.md](06-anac-completo.md)** — a tabela que falta no F4
5. **[08-pendencias.md](08-pendencias.md)** — o que ainda depende de você

> Se você veio para construir alguma coisa, vá direto para
> **[`historias/`](historias/README.md)**. São 7 épicos e 24 User Stories no
> padrão *Ready for Dev*, uma por tela faltante, cada uma com o próprio PRD,
> regras em Gherkin, critérios de aceitação e tabela de decisão.

## Os arquivos

| | |
|---|---|
| **[historias/](historias/README.md)** | **Épicos e User Stories · o que vai ser construído** ✅ |
| [00-decisoes-tecnicas.md](00-decisoes-tecnicas.md) | DT1–DT12, o que descartei e o que reabre |
| [01-arquitetura.md](01-arquitetura.md) | Expo na web, a página do F5, sincronização, fronteiras |
| [02-telas.md](02-telas.md) | Ficha por tela — a visão de conjunto que `historias/` detalha |
| [03-ux.md](03-ux.md) | Os quatro perfis na interface, o momento de uso, acessibilidade |
| [04-qualidade.md](04-qualidade.md) | O que vai para o domínio, os passos de CI, o que fica sem cobertura |
| [05-backend.md](05-backend.md) | Endpoints, RLS, erros, o que nunca sai do aparelho |
| [06-anac-completo.md](06-anac-completo.md) | **Cancelamento, preterição e internacional** — o insumo da semana 7 |
| [07-criterios-de-pronto.md](07-criterios-de-pronto.md) | Aceite por tela e o checklist do v3 |
| **[08-pendencias.md](08-pendencias.md)** | **53 itens que precisam da sua decisão** — leia o grupo G |

---

## O estado de cada tela

Dez telas existem e funcionam. Sete faltam. Cinco existentes têm dado falso
dentro.

### Existem e estão certas

| Tela | Arquivo |
|---|---|
| Viagens | `mobile/src/screens/TripsScreen.tsx` |
| Agora | `mobile/src/screens/NowScreen.tsx` |
| Itinerário | `mobile/src/screens/ItineraryScreen.tsx` |
| Nova viagem · Editar | `mobile/src/screens/TripFormScreen.tsx` |
| Nova reserva · Editar | `mobile/src/screens/ItemFormScreen.tsx` |

### Existem com dado falso dentro

| Tela | O que está errado | Semana |
|---|---|---|
| **Socorro** | Só trata atraso, e fixa trecho doméstico | **7** |
| Registrar atraso | Registra minutos, não o gatilho | 7 |
| Cartões de embarque | Passageiro fixo; três botões sem ação | 10–11 |
| Docs | Passaporte e seguro escritos na mão | 10–11 |
| Reserva | Linha de bagagem fixa | 10–11 |

### Faltam

| Tela | F | Semana |
|---|---|---|
| Entrar | infra | 5 |
| Importar · Revisar importação | **F1** | 6 |
| Aviso | **F3** | 8 |
| Conta | bloqueador de loja | 9 |
| Acompanhar viagem | receita | 9 |
| Compartilhar · página pública | **F5** | 9 |
| Console de aprovação | risco [R4](../plano/10-riscos.md) | 8 |

---

## O que este diretório não cobre

Marca e identidade visual estão em [`brand/IDENTIDADE.md`](../brand/IDENTIDADE.md)
e não se reabrem aqui. Preço e oferta estão em
[`vendas/01-precificacao.md`](../vendas/01-precificacao.md). Escopo do MVP e a
ordem de corte estão em [`plano/05-mvp.md`](../plano/05-mvp.md).
