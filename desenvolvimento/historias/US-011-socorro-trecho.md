# US.011 · Descobrir o trecho, e perguntar quando não souber

---

## 0 · PRD

**Problema.** `SocorroScreen.tsx`, **linha 57**:

```ts
trecho: 'domestico',
```

Com um comentário no código admitindo a limitação. É um valor padrão silencioso
num campo que altera direito.

**O que exatamente muda — dito com precisão.** A assistência material dos
**arts. 20 e 27** é **idêntica** no doméstico e no internacional: informação a
cada 30 minutos, comunicação em 1 h, alimentação em 2 h, hospedagem em 4 h. O
campo `trecho` altera **somente** a compensação por preterição do art. 24 — 250
DES no doméstico, 500 no internacional.

O defeito, portanto, é menor do que "internacional recebe regra doméstica"
sugere, e continua sendo real: **um passageiro preterido num voo internacional
vê metade da compensação a que tem direito.**

**Objetivo.** O trecho é derivado dos aeroportos da reserva. Quando não dá para
derivar, a tela **pergunta** — e nunca assume.

**Métrica de sucesso.** 100% dos aeroportos brasileiros da lista reconhecidos.
Zero suposição silenciosa.

**Escopo.** O módulo de aeroportos, a derivação, a pergunta, e a exibição da
suposição quando houver.

**Fora de escopo.** Convenção de Montreal, limites de bagagem internacional,
conversão de DES para reais.

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.011 |
| **Título** | Descobrir o trecho, e perguntar quando não souber |
| **User Story** | Eu, como **passageiro de um voo para fora do Brasil**,<br><br>Quero **que o aplicativo saiba que meu trecho é internacional**,<br><br>Para que **o direito que ele me informa seja o meu, e não o de outra viagem**. |
| **Épico Relacionado** | [EP-03 · Direitos completos](EP-03-direitos.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.011.01** | O trecho é derivado, não assumido | É a correção da linha 57 | **Dado que** a reserva tem `from = 'GRU'` e `to = 'LIS'`,<br>**Quando** a situação é montada,<br>**Então** `trecho` é `'internacional'`, derivado dos dois códigos |
| **RN.011.02** | Doméstico é origem **e** destino no Brasil | Um dos dois fora já torna o trecho internacional | **Dado que** `from = 'GRU'` e `to = 'POA'`,<br>**Quando** o trecho é derivado,<br>**Então** é `'domestico'` |
| **RN.011.03** | Aeroporto desconhecido não vira padrão | É a regra que dá nome a esta história | **Dado que** `to = 'XYZ'`, fora da lista,<br>**Quando** o trecho é derivado,<br>**Então** o resultado é `'desconhecido'`, e **nenhum** valor é assumido |
| **RN.011.04** | Desconhecido vira pergunta na tela | O usuário sabe para onde está indo. O aplicativo é que não sabe | **Dado que** o trecho é desconhecido,<br>**Quando** o Socorro abre,<br>**Então** a primeira coisa na tela é *"Este voo é dentro do Brasil?"*, com sim e não, e os direitos aparecem depois da resposta |
| **RN.011.05** | A resposta é lembrada por reserva | Perguntar de novo a cada abertura, com a pessoa no balcão, é inaceitável | **Dado que** a pessoa respondeu,<br>**Quando** ela reabre o Socorro,<br>**Então** a resposta anterior vale, e é alterável |
| **RN.011.06** | Faltando aeroporto, também se pergunta | Reserva cadastrada à mão pode não ter `from` e `to` | **Dado que** a reserva não tem `to`,<br>**Quando** o trecho é derivado,<br>**Então** é `'desconhecido'` e a pergunta aparece |
| **RN.011.07** | O que o trecho muda fica dito | Esconder o efeito faz a pergunta parecer burocracia | **Dado que** a pergunta está na tela,<br>**Quando** a pessoa lê,<br>**Então** vê que a resposta altera o valor da compensação em caso de preterição |
| **RN.011.08** | A assistência material não espera a resposta | Arts. 20 e 27 independem do trecho. Bloquear alimentação por uma pergunta sem efeito sobre ela é errado | **Dado que** o trecho é desconhecido e o atraso é de 2 horas,<br>**Quando** o Socorro abre,<br>**Então** informação, comunicação e alimentação **já aparecem**, e só o bloco de compensação espera a resposta |
| **RN.011.09** | O trecho exibido cita a origem | Dado derivado precisa parecer derivado | **Dado que** o trecho foi derivado,<br>**Quando** ele é exibido,<br>**Então** aparece como *"Trecho internacional · GRU → LIS"*, mostrando de onde veio |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.011.01** — `GRU → LIS`, `GIG → MIA`, `LIS → GRU` derivam internacional.
- [ ] **AC.011.02** — `GRU → POA`, `CGH → SDU`, `BSB → MAO` derivam doméstico.
- [ ] **AC.011.03** — Código fora da lista deriva `'desconhecido'` e **não** assume nada.
- [ ] **AC.011.04** — Reserva sem `from` ou sem `to` deriva `'desconhecido'`.
- [ ] **AC.011.05** — Trecho desconhecido apresenta a pergunta no topo do Socorro.
- [ ] **AC.011.06** — A resposta persiste na reserva e é alterável.
- [ ] **AC.011.07** — Com trecho desconhecido e atraso de 2 h, a assistência material já aparece.
- [ ] **AC.011.08** — O trecho derivado é exibido com o par de aeroportos que o originou.
- [ ] **AC.011.09** — `SocorroScreen.tsx` não contém o literal `'domestico'` nem `'internacional'`; a guarda de domínio confirma.
- [ ] **AC.011.10** — `aeroportos.ts` cobre 100% dos IATA brasileiros com voo comercial regular, e o teste enumera cada um.
- [ ] **AC.011.11** — Cobertura de `aeroportos.ts` em 100% de statements, branches, functions e lines.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Ambos no Brasil | `from` e `to` na lista BR | Domínio | `'domestico'` | `ehBrasileiro(from) && ehBrasileiro(to)` |
| Um fora | Um dos dois conhecido e não-BR | Domínio | `'internacional'` | `conhecido(x) && !ehBrasileiro(x)` |
| Código desconhecido | Fora da lista | Domínio | `'desconhecido'` | **Nunca** um padrão |
| Campo ausente | `from` ou `to` vazio | Domínio | `'desconhecido'` | — |
| Resposta do usuário | Existe | Cliente | Prevalece sobre a derivação | `item.trechoConfirmado` |
| Derivação vs. resposta | Divergem | Cliente | A resposta vence, e a tela informa a divergência | Pessoa > heurística |
| Assistência material | Qualquer trecho | Domínio | Igual nos dois | Arts. 20 e 27 |
| Compensação | Preterição + trecho conhecido | Domínio | 250 ou 500 DES | Art. 24, I e II |
| Compensação | Preterição + desconhecido | Frontend | Espera a resposta | Bloco em espera, resto liberado |

---

## 5 · Notas Técnicas e Dependências

**Módulo novo.** `src/domain/aeroportos.ts`:

```ts
export type TrechoDerivado = Trecho | 'desconhecido';
export function ehBrasileiro(iata: string): boolean;
export function conhecido(iata: string): boolean;
export function derivarTrecho(from?: string, to?: string): TrechoDerivado;
```

**Por que `'desconhecido'` é um valor do tipo e não `undefined`.** Porque
`undefined` convida a um `??` — e `?? 'domestico'` é exatamente o defeito que
esta história corrige. Um terceiro valor explícito obriga o `switch` a tratá-lo,
e o `strict` do TypeScript cobra.

**A lista.** IATA brasileiros com voo comercial regular, escrita à mão e conferida
contra a fonte. Fora da lista é desconhecido — **nunca** heurística por prefixo,
por estado ou por nome de cidade.

**Tipo.** `Item.trechoConfirmado?: Trecho`, gravado quando a pessoa responde.
Entra na migração `SCHEMA_VERSION` 2 → 3 junto com os campos da
[US.009](US-009-registrar-problema.md), e com espelho em `repo.web.ts`.

**Segurança e Privacidade.** Nada sai do aparelho. Nenhuma consulta de rede: a
lista é constante compilada no bundle.

**Testes.** `aeroportos.test.ts` — o teste mais exaustivo do repositório depois
de `direitos.test.ts`:

- cada IATA brasileiro da lista, enumerado, afirmando `ehBrasileiro === true`
- uma amostra de internacionais conhecidos: `LIS`, `MIA`, `JFK`, `EZE`, `SCL`, `CDG`
- código inexistente, string vazia, minúsculas, com espaço, com 2 e com 4 letras
- as quatro combinações de `derivarTrecho` com ausência de `from` e de `to`

**Feature Flag.** Não se aplica.

**Impacto em outras áreas.** `ItemScreen` pode exibir o trecho. A
[US.012](US-012-socorro-compensacao.md) depende inteiramente desta.

---

## 6 · Artefatos e Arquivos Relacionados

- **Defeito:** `mobile/src/screens/SocorroScreen.tsx:57`
- **Motor:** `mobile/src/domain/direitos.ts` — `Trecho`, `COMPENSACAO`
- **Tipos:** `mobile/src/domain/types.ts` — `Item.from`, `Item.to`
- **ANAC:** [`06-anac-completo.md`](../06-anac-completo.md) — art. 24 e a tabela de DES
- **Guarda de CI:** [US.023](US-023-guarda-de-dominio.md)
- **Anterior:** [US.010](US-010-socorro-gatilhos.md) · **Próxima:** [US.012](US-012-socorro-compensacao.md)
