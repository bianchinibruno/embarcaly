# US.023 · Impedir que a regra volte para a tela

---

## 0 · PRD

**Problema.** Sete das histórias deste backlog corrigem a mesma coisa: uma
decisão que deveria estar no domínio, escrita dentro de uma tela.

| Onde | O que |
|---|---|
| `SocorroScreen.tsx:52` | `gatilho: 'atraso'` |
| `SocorroScreen.tsx:57` | `trecho: 'domestico'` |
| `PassesScreen.tsx:70` | `M1BIANCHINI/B` |
| `DocsScreen.tsx:38` | `items.length + 2` |
| `DocsScreen.tsx:62-65` | Passaporte e seguro escritos à mão |
| `ItemScreen.tsx:126` | `1 despachada` |

Corrigir os seis resolve hoje. Não impede o sétimo.

**Objetivo.** Um passo de CI que varre `src/screens/**` procurando literais que
deveriam morar no domínio, e reprova o merge quando encontra.

**Por que isto é necessário aqui.** `mobile/package.json` exige **100% de
cobertura em `src/domain/` e `src/components/`**, e `src/screens/` **não tem
limiar nenhum**. O gate protege o domínio — e por isso a regra escrita na tela
escapa inteira. O incentivo, hoje, empurra na direção errada.

E **não há ESLint no repositório**, por decisão. A guarda escrita como teste é o
jeito que existe de tornar a regra executável — e `legal.test.ts`, que já reprova
o CI quando uma superfície fica sem aviso, é o precedente desse estilo.

**Métrica de sucesso.** A guarda pega os seis literais conhecidos quando rodada
contra o código de hoje, e passa limpa depois das correções.

**Escopo.** O teste, a lista de padrões, as exceções e a mensagem de erro.

**Fora de escopo.** Adotar ESLint. Cobertura mínima para `src/screens/`.

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.023 |
| **Título** | Impedir que a regra volte para a tela |
| **User Story** | Eu, como **responsável pela qualidade do Embarcaly**,<br><br>Quero **que o CI reprove quando uma regra de negócio for escrita dentro de uma tela**,<br><br>Para que **o defeito do `trecho: 'domestico'` não volte a existir com outro nome**. |
| **Épico Relacionado** | [EP-06 · Os cotos de dado falso](EP-06-cotos.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.023.01** | A guarda reprova o CI | Aviso que não reprova é aviso ignorado | **Dado que** um literal proibido está em `src/screens/`,<br>**Quando** o pipeline roda,<br>**Então** o teste falha e o merge é bloqueado |
| **RN.023.02** | A mensagem diz arquivo, linha e o que fazer | "Padrão proibido encontrado" manda a pessoa caçar | **Dado que** a guarda falha,<br>**Quando** a saída é lida,<br>**Então** ela traz arquivo, linha, o trecho e a frase *"esta decisão pertence a `src/domain/`"* |
| **RN.023.03** | A lista é específica, nunca heurística | Guarda que dá falso positivo é guarda desligada na primeira semana | **Dado que** a lista de padrões é revisada,<br>**Quando** ela é aplicada,<br>**Então** cada padrão corresponde a um defeito real já observado, e não a uma suspeita genérica |
| **RN.023.04** | Valores de domínio não aparecem em tela | É a regra central | **Dado que** uma tela contém `'domestico'`, `'internacional'`, `'atraso'`, `'cancelamento'` ou `'preterição'` como literal,<br>**Quando** a guarda roda,<br>**Então** ela falha |
| **RN.023.05** | Limiar em minutos não aparece em tela | 60, 120 e 240 são a tabela do art. 27, e a tabela mora no domínio | **Dado que** uma tela compara um valor com `60`, `120` ou `240` minutos,<br>**Quando** a guarda roda,<br>**Então** ela falha e aponta `direitos.ts` |
| **RN.023.06** | Dado de pessoa não aparece em tela | Era o `M1BIANCHINI/B` | **Dado que** uma tela contém um nome próprio ou um código em formato BCBP,<br>**Quando** a guarda roda,<br>**Então** ela falha |
| **RN.023.07** | Botão sem ação reprova | Era o "Adicionar à Carteira" | **Dado que** um `<Button>` em `src/screens/` não tem `onPress`,<br>**Quando** a guarda roda,<br>**Então** ela falha, salvo quando `disabled` está explícito |
| **RN.023.08** | Exceção existe, e é declarada no lugar | Guarda sem escape vira guarda contornada por refatoração pior | **Dado que** um caso legítimo casa com um padrão,<br>**Quando** o comentário `// guarda-ok: <motivo>` está na linha anterior,<br>**Então** a guarda aceita e o motivo fica versionado |
| **RN.023.09** | A guarda se prova contra o código antigo | Guarda que nunca falhou pode estar quebrada | **Dado que** a guarda é escrita,<br>**Quando** ela roda contra o código anterior às correções,<br>**Então** encontra os seis literais conhecidos |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.023.01** — A guarda roda no CI e reprova o merge quando encontra ocorrência.
- [ ] **AC.023.02** — A mensagem traz arquivo, linha, trecho e a orientação.
- [ ] **AC.023.03** — Rodada contra o código anterior às correções, encontra os **seis** literais conhecidos.
- [ ] **AC.023.04** — Rodada contra o código corrigido, passa limpa.
- [ ] **AC.023.05** — Literais de gatilho e trecho em `src/screens/` reprovam.
- [ ] **AC.023.06** — Limiares de 60, 120 e 240 minutos em `src/screens/` reprovam.
- [ ] **AC.023.07** — `<Button>` sem `onPress` e sem `disabled` reprova.
- [ ] **AC.023.08** — `// guarda-ok: <motivo>` na linha anterior permite a exceção; sem motivo, não permite.
- [ ] **AC.023.09** — A guarda não varre `src/domain/`, `src/components/` nem arquivos de teste.
- [ ] **AC.023.10** — A guarda roda em menos de 2 segundos.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Varredura | Sempre | CI | Lê `src/screens/**/*.tsx` | Exclui `__tests__` |
| Literal de domínio | Casa a lista | Teste | Falha | `'domestico'`, `'internacional'`, `'atraso'`, `'cancelamento'`, `'preterição'` |
| Limiar em minutos | Comparação numérica | Teste | Falha | `60`, `120`, `240` junto de `min`/`Min`/`minutos` |
| Formato BCBP | Padrão `M1[A-Z]+/[A-Z]` | Teste | Falha | Era o `M1BIANCHINI/B` |
| Botão sem ação | `<Button` sem `onPress` | Teste | Falha | A menos que tenha `disabled` |
| Exceção declarada | Comentário na linha anterior | Teste | Aceita | `// guarda-ok: <motivo não vazio>` |
| Exceção sem motivo | Comentário vazio | Teste | Falha | Escape precisa de justificativa |
| Domínio e componentes | — | — | Não varre | Já têm gate de 100% |
| Novo padrão | Defeito observado | Revisão | Entra na lista | Nunca por suspeita |

---

## 5 · Notas Técnicas e Dependências

**Onde mora.** `mobile/src/__tests__/guarda-dominio.test.ts`. É teste Jest, roda
com `npm test`, e não exige ferramenta nova — coerente com a decisão de não ter
ESLint no repositório.

**A forma.** Lê os arquivos de `src/screens/`, aplica a lista de padrões, e
acumula **todas** as ocorrências antes de falhar. Falhar na primeira faz a pessoa
rodar o CI seis vezes para corrigir seis linhas.

**Precedente.** `mobile/src/domain/__tests__/legal.test.ts` já faz exatamente
isto para os avisos legais: reprova o CI quando uma superfície fica sem aviso. A
guarda de domínio é o mesmo mecanismo aplicado a outra classe de defeito.

**Por que a exceção precisa de motivo.** Um escape sem justificativa é usado para
calar a guarda, e ninguém revisa depois. Com motivo obrigatório, ele aparece no
diff, alguém lê, e a conversa acontece na revisão em vez de acontecer no
aeroporto.

**Por que a lista não é heurística.** A tentação é procurar "qualquer string
literal em JSX". Isso acusaria todo rótulo de botão e toda mensagem de tela, a
guarda viraria ruído, e alguém a desligaria — com razão. A lista cresce por
defeito observado, não por suspeita.

**Ordem dentro do épico.** Esta história é a **última**. Uma guarda que nasce
vermelha, apontando seis defeitos ainda não corrigidos, é desligada no primeiro
dia. Cortar primeiro, travar depois.

**Testes.** A guarda é testada contra um par de arquivos de exemplo dentro do
próprio teste: um que deve falhar e um que deve passar. Guarda não testada é
guarda que pode estar sempre verde por engano — o modo de falha mais silencioso
que um teste pode ter.

**Feature Flag.** Não se aplica.

**Impacto em outras áreas.** Nenhum código de produto muda. Só o pipeline.

---

## 6 · Artefatos e Arquivos Relacionados

- **Precedente:** `mobile/src/domain/__tests__/legal.test.ts`
- **Configuração de cobertura:** `mobile/package.json` — `collectCoverageFrom`, limiares
- **Qualidade:** [`04-qualidade.md`](../04-qualidade.md)
- **Os defeitos que originaram a guarda:** [US.010](US-010-socorro-gatilhos.md), [US.011](US-011-socorro-trecho.md), [US.020](US-020-passes-passageiro.md), [US.021](US-021-docs-contagem.md), [US.022](US-022-reserva-bagagem.md)
