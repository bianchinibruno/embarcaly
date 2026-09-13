# Fase 3 — Refinamento

Semanas 11–16, e o que vem depois do G3. Só faz sentido com o G2 aprovado.

---

## Comunidade

O curso trata a comunidade Micro-SaaS PRO como parte do método. O uso que rende:

- **Leve problema, não ideia.** "Como vocês cobram antes de ter CNPJ" rende
  resposta útil; "o que acham do meu produto" rende elogio educado e inútil.
- **Filtre por estágio.** Conselho de quem tem 500 clientes raramente serve para
  quem tem 5. Peça contexto antes de aplicar.
- **Aprenda com o erro dos outros** — é o único tipo de erro barato.
- **Benchmark.** Quem já vende B2B no Brasil e resolveu cobrança, contrato e
  suporte já pagou por respostas que você pode receber de graça.

**O que levar para a comunidade nesta janela:** a conta de custo por consulta de
[07-orcamento.md](07-orcamento.md). É um problema concreto, com número, e
problemas assim atraem as melhores respostas.

## Automatizar o que doeu

Ordem por dor real medida entre as Semanas 8 e 10 — não por elegância técnica:

1. **Conferência manual de voo** → API oficial + janelas críticas + cache
2. **Envio do aviso** → automático, depois de 50 avisos revisados na mão
3. **Onboarding** → autoatendimento, depois que 10 chamadas mostrarem onde trava
4. **Cobrança** → Stripe ou Asaas recorrente

**Não automatize nada que ainda não doeu.** Automação de dor imaginada é a forma
mais cara de escrever código morto.

## Escala gradual

O curso fala em subir por degraus. Traduzido para clientes:

| Degrau | Clientes | O que precisa existir antes |
|---|---|---|
| 5 | G2 | Onboarding manual, aviso revisado por você |
| 20 | G3 | Cobrança recorrente, autoatendimento no cadastro |
| 50 | +2 meses | Aviso automático, suporte com FAQ, primeira host agency |
| 100 | +4 meses | Multi-idioma? Segundo perfil de ICP? Decisão nova, ciclo novo |

Cada degrau é um ciclo de 16 semanas com portões próprios. **Não pule degrau** —
é onde produto de um dono só quebra.

## Branding e conteúdo

Marca congelada até o G3 ([R12](10-riscos.md)). O que sim, nesta fase:

- Página de vendas com depoimento real, nome e foto dos primeiros clientes
- Um caso de uso escrito por extenso: uma viagem real que deu errado e como o
  produto se comportou — incluindo o que ele **não** resolveu
- Publicar o app nas duas lojas, mesmo com o link web sendo o canal principal:
  presença na loja é prova de existência para o agente que vai te contratar

## Documentação

Uma pasta, quatro arquivos, atualizados de verdade:

| Arquivo | Conteúdo |
|---|---|
| `decisoes.md` | Decisão, data, motivo. Continuação do [00-decisoes.md](00-decisoes.md) |
| `clientes.md` | Quem é, quando entrou, o que pediu, por que saiu |
| `avisos.md` | Todo aviso enviado: certo ou errado, e por quê. **É o dataset do F4** |
| `diario.md` | O semanal. Vira post e vira post-mortem |

## Depois do G3

**Passou.** Novo ciclo de 16 semanas, meta 100 clientes, tese nova a validar:
o agente indica outros agentes sem você pedir?

**Congelou.** Rodando com menos de 2h/semana. Reavaliar em abril de 2027. Não
mate um produto que sustenta 15 clientes felizes só porque não virou o que você
imaginou.

**Encerrou.** Post-mortem público — é o melhor conteúdo que você vai produzir no
ano inteiro, e é o que transforma R$2.000 e 16 semanas em reputação. O motor de
próxima ação e a marca continuam seus, e [D7](00-decisoes.md) já aponta o
próximo alvo.
