# Histórias — o que vai ser construído, tela por tela

Este diretório é o **backlog pronto para desenvolvimento**. Cada tela faltante
tem pelo menos uma User Story no padrão *Ready for Dev*, e cada User Story
carrega o próprio PRD.

> **Nada aqui vira código antes do G1 · 11/10.**
> Escrever história não é construir. Se o G1 reprovar, este diretório é
> arquivado inteiro e nenhuma linha de `mobile/src/` foi tocada.

---

## Como estes documentos estão organizados

**Um arquivo por história.** O template pede seis seções; aqui são sete, porque
a seção `0` é o PRD.

| Seção | O que responde |
|---|---|
| **0 · PRD** | Por que esta história existe, que métrica ela move, o que fica de fora |
| **1 · Cabeçalho** | ID, título, a frase `Eu, como… / Quero… / Para que…`, épico |
| **2 · Regras de Negócio** | O comportamento obrigatório, cada regra com cenário em Gherkin |
| **3 · Critérios de Aceitação** | A lista que precisa estar toda marcada para a história fechar |
| **4 · Tabelas de Decisão e Fronteira** | Estado lógico → origem → ação → gatilho técnico exato |
| **5 · Notas Técnicas** | Módulos, migração, testes, privacidade, o que não pode vazar |
| **6 · Artefatos** | Arquivos do repositório que a história toca ou depende |

**Por que o PRD está dentro da US e não num arquivo separado.** Um PRD solto
envelhece sem ninguém perceber e vira ficção; um PRD que abre o documento que o
desenvolvedor lê no dia é lido. O contexto de nível maior — hipótese, risco,
métrica do épico — está no arquivo do épico.

### Convenção de identificadores

| Forma | Exemplo | Onde aparece |
|---|---|---|
| `EP-NN` | `EP-03` | Épico |
| `US.NNN` | `US.011` | História |
| `RN.NNN.NN` | `RN.011.02` | Regra de negócio, dentro da história `NNN` |
| `AC.NNN.NN` | `AC.011.03` | Critério de aceitação |

O prefixo numérico do `RN` e do `AC` **é sempre o da própria história**. Isso
existe para que um critério possa ser citado num teste, num commit ou numa
conversa sem precisar dizer de onde veio.

---

## Os épicos

| # | Épico | Semana | Histórias | O que destrava |
|---|---|---|---|---|
| **[EP-00](EP-00-app-na-web.md)** | O app na web | 5 | 1 | Tudo. Sem export web não há produto para entregar |
| **[EP-01](EP-01-conta.md)** | Conta e identidade | 5 · 9 | 4 | Backend, sincronização e a publicação na loja |
| **[EP-02](EP-02-importacao.md)** | Entrada sem digitação · **F1** | 6 | 4 | O funil. Consumidor não digita |
| **[EP-03](EP-03-direitos.md)** | Direitos completos · **F4** | 7 | 4 | A receita. É o que diferencia o produto |
| **[EP-04](EP-04-aviso.md)** | Aviso de mudança · **F3** | 8 | 4 | A promessa de "alguém de olho" |
| **[EP-05](EP-05-compartilhar.md)** | Acompanhar e compartilhar · **F5** | 9 | 3 | Aquisição e cobrança |
| **[EP-06](EP-06-cotos.md)** | Os cotos de dado falso | 10 · 11 | 4 | O G2. Dado inventado reprova |

---

## As histórias, em ordem de construção

| ID | Título | Tela | Épico | Semana |
|---|---|---|---|---|
| [US.000](US-000-export-web.md) | Publicar o app como site | — (infra) | EP-00 | 5 |
| [US.001](US-001-entrar-pedir-codigo.md) | Pedir o código de entrada | Entrar | EP-01 | 5 |
| [US.002](US-002-entrar-validar-codigo.md) | Validar o código e abrir o app | Entrar | EP-01 | 5 |
| [US.003](US-003-conta-sair.md) | Sair, avisos e links legais | Conta | EP-01 | 9 |
| [US.004](US-004-conta-excluir.md) | Excluir a conta | Conta | EP-01 | 9 |
| [US.005](US-005-importar-endereco.md) | Ver e copiar o endereço de importação | Importar | EP-02 | 6 |
| [US.006](US-006-importar-fila.md) | Acompanhar a fila do que chegou | Importar | EP-02 | 6 |
| [US.007](US-007-revisar-confirmar.md) | Confirmar a reserva proposta | Revisar importação | EP-02 | 6 |
| [US.008](US-008-revisar-completar.md) | Completar o que a extração não achou | Revisar importação | EP-02 | 6 |
| [US.009](US-009-registrar-problema.md) | Registrar o problema, não só o atraso | Registrar problema | EP-03 | 7 |
| [US.010](US-010-socorro-gatilhos.md) | Atender cancelamento e preterição | Socorro | EP-03 | 7 |
| [US.011](US-011-socorro-trecho.md) | Descobrir o trecho, e perguntar quando não souber | Socorro | EP-03 | 7 |
| [US.012](US-012-socorro-compensacao.md) | Mostrar a compensação por preterição | Socorro | EP-03 | 7 |
| [US.013](US-013-aviso-tela.md) | Ver o que mudou e o que isso quebrou | Aviso | EP-04 | 8 |
| [US.014](US-014-aviso-push.md) | Receber o aviso no aparelho | Aviso | EP-04 | 8 |
| [US.015](US-015-console-aprovacao.md) | Aprovar o aviso antes de ele sair | Console de aprovação | EP-04 | 8 |
| [US.016](US-016-socorro-o-que-mudou.md) | Rever os avisos daquele problema | Socorro | EP-04 | 8 |
| [US.017](US-017-acompanhar.md) | Entender e contratar o acompanhamento | Acompanhar viagem | EP-05 | 9 |
| [US.018](US-018-compartilhar.md) | Gerar, conferir e revogar o link | Compartilhar | EP-05 | 9 |
| [US.019](US-019-pagina-publica.md) | Acompanhar a viagem sem app e sem conta | Página pública | EP-05 | 9 |
| [US.020](US-020-passes-passageiro.md) | Ver o meu nome no cartão de embarque | Cartões de embarque | EP-06 | 10 |
| [US.021](US-021-docs-contagem.md) | Ver só os documentos que existem | Docs | EP-06 | 10 |
| [US.022](US-022-reserva-bagagem.md) | Ver a bagagem que eu realmente despachei | Reserva | EP-06 | 10 |
| [US.023](US-023-guarda-de-dominio.md) | Impedir que a regra volte para a tela | — (CI) | EP-06 | 11 |

---

## As quatro regras que toda história obedece

Estas não se repetem dentro de cada arquivo. Valem para todas.

**1 · A regra mora no domínio.** `src/domain/` e `src/components/` têm gate de
**100% de statements, branches, functions e lines**. `src/screens/` não tem
gate nenhum. Toda decisão que possa estar errada vai para o domínio — não por
elegância, mas porque é o único lugar onde o CI impede que quebre em silêncio.

**2 · Desconhecido é pergunta, nunca padrão.** Um `?? 'domestico'` dentro de uma
tela é o defeito que este backlog inteiro existe para não repetir. Quando o dado
não é sabido, a tela pergunta ou declara a suposição de forma corrigível.

**3 · Nenhuma tela reescreve aviso legal.** Todo texto de proteção sai de
`mobile/src/domain/legal.ts`. Superfície nova entra em `SUPERFICIES`, e
`legal.test.ts` reprova o CI se alguém esquecer.

**4 · O checklist visual do v3 fecha a história.** Cada laranja responde *"o que
está contando aqui"*; nenhum texto branco sobre laranja; número em Plex Mono
tabular; alvo de toque de 44px; 375px e 1280px sem rolagem lateral; os quatro
estados — vazio, carregando, erro e offline. Os detalhes estão em
[`brand/IDENTIDADE.md`](../../brand/IDENTIDADE.md).

---

## O contexto que estas histórias assumem

As histórias citam o diretório acima o tempo todo. Vale saber o que há lá antes
de implementar qualquer uma:

| | |
|---|---|
| [`../00-decisoes-tecnicas.md`](../00-decisoes-tecnicas.md) | DT1–DT12. O que está travado, e o que faria reabrir |
| [`../01-arquitetura.md`](../01-arquitetura.md) | As camadas, as fronteiras, e o modo de falha do `repo.web.ts` |
| [`../02-telas.md`](../02-telas.md) | A visão de conjunto das 17 telas |
| [`../03-ux.md`](../03-ux.md) | Os quatro perfis, os três momentos de uso, o tom |
| [`../04-qualidade.md`](../04-qualidade.md) | O gate, os passos de CI, e o incentivo invertido |
| [`../05-backend.md`](../05-backend.md) | Endpoints, RLS, erro, retenção |
| [`../06-anac-completo.md`](../06-anac-completo.md) | **A tabela da Resolução 400** — insumo direto da semana 7 |
| [`../07-criterios-de-pronto.md`](../07-criterios-de-pronto.md) | O checklist que fecha cada tela |

---

## O que não está aqui

Marca e identidade visual estão em [`brand/IDENTIDADE.md`](../../brand/IDENTIDADE.md).
Preço e oferta estão em [`vendas/01-precificacao.md`](../../vendas/01-precificacao.md).
Escopo do MVP e ordem de corte estão em [`plano/05-mvp.md`](../../plano/05-mvp.md).
Riscos do projeto estão em [`plano/10-riscos.md`](../../plano/10-riscos.md).
