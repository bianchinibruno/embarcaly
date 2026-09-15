# EP-03 · Direitos completos — F4

**Semana 7** (26/10–01/11) · 4 histórias · ⭐ **É o que o produto vende**

---

## O problema, dito sem suavizar

`mobile/src/domain/direitos.ts` implementa **três gatilhos** — atraso,
cancelamento e preterição — e **dois trechos** — doméstico e internacional, com
a compensação de 250 e 500 DES do art. 24.

`mobile/src/screens/SocorroScreen.tsx` fixa `gatilho: 'atraso'` na **linha 52** e
`trecho: 'domestico'` na **linha 57**, com um comentário admitindo a limitação.

> **Hoje, um voo internacional recebe regra doméstica, e um cancelamento não tem
> tela.** Dois terços do motor que o produto vende estão escritos e
> inalcançáveis.

O G2 exige *100% dos direitos informados corretamente*. O risco
[R5](../../plano/10-riscos.md) chama isto de o único bug inaceitável. É um
direito errado já escrito, esperando um voo.

## A correção que vale registrar

A assistência material dos **arts. 20 e 27** — informação a cada 30 min, e depois
comunicação em 1 h, alimentação em 2 h, hospedagem em 4 h — **é idêntica no
doméstico e no internacional**. O campo `trecho` altera **somente** a compensação
por preterição do art. 24: 250 DES no doméstico, 500 no internacional.

Dizer que o internacional "recebe outra tabela de assistência" é falso, e estava
escrito assim numa versão anterior deste plano. A consequência prática do defeito
continua real — só é menor do que parecia, e está inteiramente na preterição.

## A hipótese

> Se o produto disser o direito certo no balcão, com o artigo na tela e a frase
> pronta para falar, o organizador paga — porque é a única coisa do mercado que
> ninguém oferece.

## A métrica

| Mede | Alvo | Onde |
|---|---|---|
| **Seis combinações corretas** — 3 gatilhos × 2 trechos | 6/6 | Teste de domínio + conferência manual contra a Resolução 400 |
| Aeroporto brasileiro reconhecido | 100% dos IATA da lista | `aeroportos.test.ts` |
| Trecho assumido em silêncio | **Zero** | Guarda de domínio no CI ([US.023](US-023-guarda-de-dominio.md)) |

## As histórias

| ID | Título | Tela |
|---|---|---|
| [US.009](US-009-registrar-problema.md) | Registrar o problema, não só o atraso | Registrar problema |
| [US.010](US-010-socorro-gatilhos.md) | Atender cancelamento e preterição | Socorro |
| [US.011](US-011-socorro-trecho.md) | Descobrir o trecho, e perguntar quando não souber | Socorro |
| [US.012](US-012-socorro-compensacao.md) | Mostrar a compensação por preterição | Socorro |

## Por que este épico vem antes do F3

O cronograma original punha F3 na semana 7 e F4 na 8. **Está invertido aqui de
propósito:** F4 é intocável e F3 é cortável. Se a semana der errado, o que
precisa estar pronto é o intocável.

## Riscos deste épico

| Risco | Mitigação |
|---|---|
| **Direito errado no balcão** — R5, e destrói o produto | Tudo em `src/domain/`, sob o gate de 100%. Conferência manual das seis combinações antes de fechar a semana |
| `?? 'domestico'` volta para dentro de uma tela | Guarda de domínio no CI varre `src/screens/**` por literais de regra |
| O produto parecer escritório de advocacia | `AVISO_CONTEUDO` e `AVISO_RESULTADO` na tela, saindo de `legal.ts`, nunca reescritos |
| DES é cotação do FMI e varia todo dia | A tela mostra o número de DES e manda conferir a cotação. **Nunca converte para reais** |

## Fora de escopo

**Convenção de Montreal.** A v1 informa que o trecho internacional tem regime
próprio e manda guardar comprovante. Não calcula limite, não converte moeda.

**Consultar status de voo em fonte oficial.** Entra pelo F3, na semana 8. Aqui, o
gatilho vem da mão do viajante — e `AVISO_CALCULO` diz isso na tela.
