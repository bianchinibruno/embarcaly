# US.016 · Rever os avisos daquele problema

---

## 0 · PRD

**Problema.** Quando um voo muda três vezes em seis horas — atrasa, atrasa de
novo, muda de portão — a pessoa recebe três avisos e perde o fio. Qual era o
horário original? Quantas vezes já mudou? O portão mudou antes ou depois do
último atraso?

**Objetivo.** Um bloco **"O que mudou"** dentro do Socorro, com a sequência de
mudanças daquela reserva.

**A decisão de produto que esta história registra.**

> **Não existe tela de histórico de avisos.**

Um histórico solto é uma tela que ninguém abre: a pessoa não acorda querendo ver
avisos antigos, ela acorda com um problema. O lugar certo é dentro do Socorro,
que já é a tela do problema — e a informação aparece onde ela é útil, ao lado dos
direitos que ela justifica.

**Métrica de sucesso.** Sequência completa e na ordem certa, incluindo mudanças
registradas à mão pela pessoa.

**Escopo.** O bloco dentro do Socorro, a ordem, o horário original e o estado
vazio.

**Fora de escopo.** Tela própria de histórico. Notificações — as três histórias
anteriores.

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.016 |
| **Título** | Rever os avisos daquele problema |
| **User Story** | Eu, como **passageiro cujo voo já mudou três vezes hoje**,<br><br>Quero **ver a sequência do que aconteceu com essa reserva**,<br><br>Para que **eu saiba de quanto tempo de atraso estou falando quando chegar no balcão**. |
| **Épico Relacionado** | [EP-04 · Aviso de mudança](EP-04-aviso.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.016.01** | O bloco vive dentro do Socorro | Decisão de produto: não há tela de histórico | **Dado que** há mudanças registradas na reserva,<br>**Quando** o Socorro é aberto,<br>**Então** o bloco "O que mudou" aparece abaixo dos direitos |
| **RN.016.02** | Ordem cronológica, mais recente primeiro | A mudança de agora é a que importa | **Dado que** há três mudanças,<br>**Quando** a lista é renderizada,<br>**Então** a mais recente está no topo, cada uma com a hora |
| **RN.016.03** | O horário original é sempre o primeiro da fila | Depois de três atrasos, ninguém lembra de onde partiu | **Dado que** o voo partiria às 14h20 e já mudou três vezes,<br>**Quando** o bloco é exibido,<br>**Então** o último item é *"Partida original: 14h20"* |
| **RN.016.04** | O total acumulado aparece | É o número que a pessoa vai dizer no balcão, e é o que destrava direito | **Dado que** houve dois atrasos somando 5 h 40,<br>**Quando** o bloco é exibido,<br>**Então** o acumulado aparece no topo, em Plex Mono tabular |
| **RN.016.05** | O acumulado é sempre do horário original | Somar incrementos dá resultado diferente quando uma mudança antecipa o voo | **Dado que** o voo atrasou 3 h e depois foi antecipado em 1 h,<br>**Quando** o acumulado é calculado,<br>**Então** ele é **2 h** — diferença entre o horário atual e o original |
| **RN.016.06** | Registro manual e automático se misturam na mesma lista | São a mesma coisa para quem lê; a origem é detalhe | **Dado que** a pessoa registrou um atraso à mão e depois chegou um aviso,<br>**Quando** a lista é exibida,<br>**Então** os dois aparecem em ordem, com a origem indicada de forma discreta |
| **RN.016.07** | Sem mudanças, o bloco não aparece | Bloco vazio é ruído numa tela que já é densa | **Dado que** não há mudanças registradas,<br>**Quando** o Socorro é aberto,<br>**Então** o bloco não é renderizado |
| **RN.016.08** | Cada linha diz o que mudou, não que algo mudou | "Houve uma alteração" não é informação | **Dado que** a mudança foi de portão,<br>**Quando** a linha é exibida,<br>**Então** ela diz "Portão: A12 → C07", com o anterior riscado |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.016.01** — Com mudanças registradas, o bloco aparece abaixo dos direitos.
- [ ] **AC.016.02** — A ordem é cronológica inversa, com a hora de cada mudança.
- [ ] **AC.016.03** — A partida original é o último item da lista.
- [ ] **AC.016.04** — O acumulado aparece no topo, em Plex Mono tabular.
- [ ] **AC.016.05** — Atraso de 3 h seguido de antecipação de 1 h resulta em acumulado de 2 h.
- [ ] **AC.016.06** — Registros manuais e automáticos aparecem na mesma lista, com origem discreta.
- [ ] **AC.016.07** — Sem mudanças, o bloco não é renderizado.
- [ ] **AC.016.08** — Mudança de portão exibe o valor anterior riscado e o novo.
- [ ] **AC.016.09** — O bloco funciona offline, lendo do banco local.
- [ ] **AC.016.10** — Com 10 mudanças, a tela continua legível em 375px, sem rolagem lateral.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Há mudanças | `mudancas.length > 0` | Domínio | Renderiza o bloco | Filtrado por `itemId` |
| Sem mudanças | `length === 0` | Frontend | Não renderiza | Nada de estado vazio |
| Ordenação | Sempre | Domínio | Recente primeiro | `sort` por `criadoEm` decrescente |
| Partida original | Sempre | Domínio | Último item, fixo | `item.delay.originalStart` |
| Acumulado | Mudanças de `start` | Domínio | Diferença do original | `atual - original`, **não** soma de incrementos |
| Antecipação | `para < de` | Domínio | Reduz o acumulado | Pode resultar em negativo → exibe "adiantado" |
| Origem manual | Registrado pela pessoa | Frontend | Marca discreta | `origem === 'manual'` |
| Origem automática | Veio da API | Frontend | Marca discreta | `origem === 'api'` |
| Mudança de campo não temporal | `campo !== 'start'` | Frontend | Linha "de → para" | Portão, terminal, situação |

---

## 5 · Notas Técnicas e Dependências

**Domínio.** `src/domain/mudanca.ts` ganha:

| Função | Responsabilidade |
|---|---|
| `historico(mudancas, itemId): Mudanca[]` | Filtra e ordena |
| `acumulado(original: Date, atual: Date): number` | Minutos, podendo ser negativo |
| `linhaDeMudanca(m: Mudanca): { rotulo, de, para }` | O texto de cada linha |

**`acumulado` merece atenção.** A implementação intuitiva — somar os incrementos
— dá resultado errado assim que uma mudança antecipa o voo. A definição correta
é a diferença entre o horário atual e o original, e o teste da antecipação é o
que impede a implementação intuitiva de passar.

**Segurança e Privacidade.** Nada sai do aparelho. O bloco lê do banco local.

**Testes.** `mudanca.test.ts` cobre: uma mudança; três em ordem embaralhada;
atraso seguido de antecipação (o caso do `RN.016.05`); antecipação maior que o
atraso, resultando em negativo; lista vazia; mudanças de outra reserva no mesmo
conjunto, que precisam ser filtradas.

**Feature Flag.** `avisosAtivos` esconde as mudanças de origem `api`. As de
origem `manual` aparecem de qualquer forma — vêm da
[US.009](US-009-registrar-problema.md) e não dependem do F3.

**Impacto em outras áreas.** `SocorroScreen` ganha um bloco. Nenhuma outra tela
muda.

---

## 6 · Artefatos e Arquivos Relacionados

- **Tela:** `mobile/src/screens/SocorroScreen.tsx`
- **Domínio:** `mobile/src/domain/mudanca.ts` (novo), `time.ts` (formatação)
- **Registro manual:** [US.009](US-009-registrar-problema.md)
- **Tipo `Mudanca`:** [US.013](US-013-aviso-tela.md)
- **UX:** [`03-ux.md`](../03-ux.md) — densidade do Socorro
