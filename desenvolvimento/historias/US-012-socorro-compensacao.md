# US.012 · Mostrar a compensação por preterição

---

## 0 · PRD

**Problema.** O art. 24 da Resolução 400 dá ao passageiro preterido uma
compensação **paga de imediato**: 250 DES no trecho doméstico, 500 no
internacional. `COMPENSACAO` está escrito e testado em `direitos.ts`, e nenhuma
tela o alcança — porque nenhuma tela consegue registrar preterição
([US.009](US-009-registrar-problema.md)) nem derivar o trecho
([US.011](US-011-socorro-trecho.md)).

**Objetivo.** Quem foi preterido vê o valor, a unidade, o artigo, e a frase para
pedir no balcão.

**O cuidado que define esta história.** DES é Direito Especial de Saque, unidade
de conta do FMI, e a cotação **varia todos os dias**. Converter para reais dentro
do aplicativo seria simpático e seria um erro: o número apareceria como promessa,
estaria desatualizado na hora do uso, e `AVISO_RESULTADO` existe justamente
porque o produto não promete dinheiro.

**Métrica de sucesso.** Preterição doméstica mostra 250 DES; internacional mostra
500. Nenhuma conversão para reais em lugar nenhum.

**Escopo.** O bloco de compensação: valor, artigo, explicação do que é DES,
frase de balcão, e a ressalva do mínimo.

**Fora de escopo.** Conversão de moeda, cálculo de prejuízo, cálculo de
indenização por dano moral.

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.012 |
| **Título** | Mostrar a compensação por preterição |
| **User Story** | Eu, como **passageiro que ficou de fora de um voo lotado**,<br><br>Quero **saber que existe compensação imediata e quanto é**,<br><br>Para que **eu peça no balcão em vez de descobrir meses depois que tinha direito**. |
| **Épico Relacionado** | [EP-03 · Direitos completos](EP-03-direitos.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.012.01** | Compensação só na preterição | Atraso e cancelamento não geram o art. 24. Mostrar ali seria informar direito inexistente | **Dado que** o gatilho é atraso ou cancelamento,<br>**Quando** o Socorro é montado,<br>**Então** nenhum bloco de compensação aparece |
| **RN.012.02** | O valor segue o trecho | Art. 24, I e II | **Dado que** a preterição é em trecho doméstico,<br>**Quando** o bloco aparece,<br>**Então** mostra **250 DES**; em internacional, **500 DES** |
| **RN.012.03** | Nunca converter para reais | Cotação varia diariamente e o produto não promete valor | **Dado que** o valor é exibido,<br>**Quando** a pessoa lê,<br>**Então** vê o número em DES e a orientação de conferir a cotação do dia, e **nenhum valor em reais** |
| **RN.012.04** | DES é explicado em uma frase | Ninguém sabe o que é DES, e a pessoa vai repetir isso no balcão | **Dado que** o bloco está visível,<br>**Quando** a pessoa lê,<br>**Então** vê que DES é unidade de referência do Fundo Monetário Internacional e que varia todo dia |
| **RN.012.05** | É mínimo, não teto | Dizer só o valor faz a pessoa aceitar o valor como fim da conversa | **Dado que** o valor é exibido,<br>**Quando** a pessoa lê o detalhe,<br>**Então** vê que é valor mínimo e não impede cobrar prejuízo maior |
| **RN.012.06** | A compensação é somada às quatro saídas, não trocada por elas | É onde a companhia mais tende a confundir o passageiro | **Dado que** a compensação aparece,<br>**Quando** a pessoa lê,<br>**Então** o texto diz **"além"** das quatro saídas, e as quatro continuam visíveis |
| **RN.012.07** | Trecho desconhecido não mostra valor | Mostrar 250 por padrão é repetir o defeito da linha 57 num lugar onde ele custa dinheiro | **Dado que** o trecho é desconhecido,<br>**Quando** o bloco é montado,<br>**Então** ele mostra a pergunta da [US.011](US-011-socorro-trecho.md) no lugar do valor |
| **RN.012.08** | O artigo aparece junto do valor | É o que a pessoa vai apontar no balcão | **Dado que** o valor está visível,<br>**Quando** a pessoa lê,<br>**Então** vê "Res. 400, art. 24, I" ou "art. 24, II", conforme o trecho |
| **RN.012.09** | Nenhuma palavra proibida | `PROIBIDAS` em `legal.ts` existe para esta tela mais do que para qualquer outra | **Dado que** o bloco está renderizado,<br>**Quando** o texto é verificado,<br>**Então** não contém "garantimos", "você receberá" nem nenhuma das demais |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.012.01** — Atraso e cancelamento **não** exibem o bloco de compensação.
- [ ] **AC.012.02** — Preterição doméstica exibe 250 DES com "art. 24, I".
- [ ] **AC.012.03** — Preterição internacional exibe 500 DES com "art. 24, II".
- [ ] **AC.012.04** — Nenhum valor em reais aparece na tela, em nenhum estado.
- [ ] **AC.012.05** — A explicação de DES e a ressalva de valor mínimo estão presentes.
- [ ] **AC.012.06** — O texto usa "além das quatro saídas", e as quatro continuam listadas.
- [ ] **AC.012.07** — Trecho desconhecido exibe a pergunta no lugar do valor.
- [ ] **AC.012.08** — A frase de balcão é copiável e menciona o artigo.
- [ ] **AC.012.09** — O número aparece em Plex Mono tabular, alinhado.
- [ ] **AC.012.10** — Teste afirma que nenhuma palavra de `PROIBIDAS` aparece no texto renderizado.
- [ ] **AC.012.11** — Contraste conferido: nenhum texto branco sobre laranja.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Atraso | Qualquer duração | Domínio | Sem compensação | `avaliacao.compensacao === undefined` |
| Cancelamento | — | Domínio | Sem compensação | Idem |
| Preterição doméstica | Trecho conhecido | Domínio | 250 DES, art. 24, I | `COMPENSACAO['domestico']` |
| Preterição internacional | Trecho conhecido | Domínio | 500 DES, art. 24, II | `COMPENSACAO['internacional']` |
| Preterição, trecho desconhecido | — | Frontend | Pergunta no lugar do valor | `derivarTrecho() === 'desconhecido'` |
| Conversão de moeda | Sempre | — | **Proibida** | Nenhuma chamada de cotação existe no produto |
| Exibição do valor | — | Frontend | Plex Mono tabular | `font.mono`, alinhamento à direita |
| Frase de balcão | Toque | Cliente | Copia | `Clipboard.setStringAsync(peça)` |

---

## 5 · Notas Técnicas e Dependências

**Dependências.** Esta história só é entregável depois da
[US.009](US-009-registrar-problema.md) (registrar preterição) e da
[US.011](US-011-socorro-trecho.md) (derivar o trecho). A ordem dentro da semana 7
é 009 → 010 → 011 → 012.

**Domínio.** Nenhum módulo novo. `COMPENSACAO` e o campo `Avaliacao.compensacao`
já existem em `direitos.ts`, completos e com `fonte` e `detalhe` escritos. Esta
história é **de tela**: o motor está pronto.

O `detalhe` do registro já contém a explicação de DES e a ressalva de valor
mínimo. A tela **renderiza esse texto**, não escreve outro — senão passam a
existir duas versões da mesma informação jurídica.

**Segurança e Privacidade.** Nada sai do aparelho. Nenhuma consulta de cotação —
é decisão de produto, não limitação técnica.

**Testes.** `direitos.test.ts` cobre `COMPENSACAO` nos dois trechos e a ausência
nos outros dois gatilhos. Acrescentar o teste de conteúdo: o texto renderizado
não contém nenhuma palavra de `PROIBIDAS` e não contém `R$`.

**Jurídico.** O valor e os artigos precisam constar da revisão do advogado da
semana 8, junto com `legal.ts`. É a informação de maior consequência financeira
que o produto exibe.

**Feature Flag.** Não se aplica.

**Impacto em outras áreas.** O guia em PDF (`plano/gerar-guia.py`) e as peças de
marketing mencionam a compensação. Os três precisam dizer o mesmo número e o
mesmo artigo. Como o guia é gerado por script, a fonte pode ser a mesma — e
deveria.

---

## 6 · Artefatos e Arquivos Relacionados

- **Motor:** `mobile/src/domain/direitos.ts` — `COMPENSACAO`, `Compensacao`
- **Testes:** `mobile/src/domain/__tests__/direitos.test.ts`
- **Avisos:** `mobile/src/domain/legal.ts` — `PROIBIDAS`, `AVISO_RESULTADO`
- **ANAC:** [`06-anac-completo.md`](../06-anac-completo.md)
- **Guia:** [`plano/gerar-guia.py`](../../plano/gerar-guia.py)
- **Depende de:** [US.009](US-009-registrar-problema.md), [US.011](US-011-socorro-trecho.md)
