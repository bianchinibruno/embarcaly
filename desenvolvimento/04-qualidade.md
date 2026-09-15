# Qualidade — o que se mede, o que não se mede, e por quê

> **Cobertura é chão, não progresso.**
>
> [`plano/09-validacao.md`](../plano/09-validacao.md) lista *"Cobertura de
> teste"* e *"Commits"* entre as métricas **proibidas** de relatório. Cem por
> cento de cobertura não diz que o produto funciona; diz que nada quebra em
> silêncio. São coisas diferentes, e confundir as duas é como um projeto com um
> QA sênior na liderança técnica acaba com muito teste e nenhum usuário.

---

## 1 · O que já está montado

`mobile/package.json`, verificado:

```json
"collectCoverageFrom": [
  "src/domain/**/*.ts",
  "src/components/**/*.tsx",
  "!src/domain/types.ts",
  "!src/**/__tests__/**"
],
"coverageThreshold": {
  "src/domain/":     { "statements": 100, "branches": 100, "functions": 100, "lines": 100 },
  "src/components/": { "statements": 100, "branches": 100, "functions": 100, "lines": 100 }
}
```

Três consequências que valem mais do que parecem:

**1. Arquivo novo de domínio entra no gate sozinho.** `collectCoverageFrom` é
glob. Não há configuração a tocar, e não há como criar um módulo de regra sem
cobertura por esquecimento.

**2. `types.ts` está fora, de propósito.** Tipo não tem execução. Mantê-lo dentro
obrigaria a escrever teste de tipo, que não prova nada e treina o time a
contornar o gate.

**3. `src/screens/`, `src/state/`, `src/db/` e `src/navigation/` não têm
limiar.** É decisão, não omissão — e é a origem do problema tratado na seção 3.

---

## 2 · A regra: o que decide vai para o domínio

> **`domain/` decide. Tela arruma pixel e chama função.**

Não por elegância. É o único lugar onde o CI impede que quebre em silêncio.

### Os módulos críticos, com a consequência de errar escrita

| Módulo | Se errar |
|---|---|
| `direitos.ts` | **Direito errado no balcão.** A pessoa passa vergonha, e é o que destrói o produto |
| `aeroportos.ts` | Direito errado por trecho. R5, e critério direto do G2 |
| `mudanca.ts` | Aviso errado. R4, dano classificado como fatal |
| `publico.ts` | **Incidente de privacidade** |
| `acesso.ts` | Cobrar de quem já pagou |
| `cascata.ts` | Cadeia errada. Corrigível, mas erode a confiança |
| `problema.ts`, `bcbp.ts`, `importacao.ts` | Dado errado, corrigível |

### `publico.ts` merece nota

`snapshotPublico()` é **whitelist, nunca blacklist**
([DT8](00-decisoes-tecnicas.md#dt8--o-snapshot-público-é-whitelist)), e o teste
precisa afirmar a **ausência** de `pnr`, `seat`, `sequence`, sobrenome, anexos e
documentos.

```ts
const s = snapshotPublico(trip, items);
expect(JSON.stringify(s)).not.toContain(item.pnr);
expect(JSON.stringify(s)).not.toContain(item.seat);
// … cada campo sensível, um por um
```

**Testar a presença dos campos permitidos não pega um campo novo vazando.**
Testar a ausência dos proibidos, sim. Com blacklist, todo campo novo em `Item`
vaza por omissão no dia em que for criado.

### `legal.ts` é o precedente do estilo

`legal.test.ts` já reprova o CI quando uma superfície fica sem aviso. O mecanismo
está montado; as histórias novas só acrescentam entradas em `SUPERFICIES`:
`telaEntrar`, `telaConta`, `paginaPublica`, `admin`.

E `PROIBIDAS` reprova quando uma palavra que promete resultado aparece no
produto. É teste de conteúdo, e é raro — e é exatamente onde a formação em
qualidade rende mais que em qualquer suíte de unidade.

---

## 3 · O incentivo invertido, e a guarda

Aqui está o problema estrutural, dito sem suavizar:

> **O gate de 100% cobre `domain/` e `components/`. `screens/` não tem limiar
> nenhum.**
>
> Escrever a regra dentro da tela **contorna o gate inteiro**. É mais rápido,
> passa no CI, e ninguém percebe.

Não é hipótese. É o que aconteceu seis vezes:

| Onde | O quê |
|---|---|
| `SocorroScreen.tsx:52` | `gatilho: 'atraso'` |
| `SocorroScreen.tsx:57` | `trecho: 'domestico'` |
| `PassesScreen.tsx:70` | `M1BIANCHINI/B` |
| `DocsScreen.tsx:38` | `items.length + 2` |
| `DocsScreen.tsx:62-65` | Passaporte e seguro escritos à mão |
| `ItemScreen.tsx:126` | `1 despachada` |

Corrigir os seis resolve hoje. **Não impede o sétimo.** Por isso a
[US.023](historias/US-023-guarda-de-dominio.md): um teste que varre
`src/screens/**` atrás de literais que pertencem ao domínio, e reprova o merge.

Sem ESLint no repositório — decisão anterior, mantida em
[DT11](00-decisoes-tecnicas.md#dt11--a-guarda-de-domínio-é-teste-não-linter) — a
guarda escrita como teste é o jeito que existe de tornar a regra executável.

**A guarda é testada contra si mesma.** Um par de arquivos de exemplo dentro do
próprio teste: um que deve falhar, um que deve passar. Guarda não testada pode
estar sempre verde por engano, que é o modo de falha mais silencioso de todos.

---

## 4 · Os passos de CI

### Hoje

`.github/workflows/ci.yml`, em `push` para `main` e em todo *pull request*:

| Passo | Pega |
|---|---|
| `npm run typecheck` | Tipo |
| `npm run test:coverage -- --ci` | Regra, e cobertura abaixo de 100% |
| `npx expo-doctor` | Configuração do projeto |
| `expo export --platform android` | Import quebrado, dependência nativa faltando |
| `expo export --platform ios` | Idem |

O comentário no próprio arquivo já explica por que os bundles estão lá:
*"typecheck sozinho não pega import quebrado nem dependência nativa faltando —
só o empacotamento pega"*.

### O que entra

| Passo | Pega | Quando |
|---|---|---|
| **`expo export --platform web`** | **Split `.web.tsx` quebrado** — o modo de falha deste repositório, que tem quatro | Semana 5 |
| **Paridade web** | Para todo `X.web.ts(x)`, existe `X.ts(x)`, e os dois exportam os mesmos símbolos | Semana 5 |
| **Guarda de domínio** | Literal de regra em `src/screens/**`; `<Button>` sem `onPress` | Semana 11 |
| **Orçamento do F5** | `acompanhar/` acima de 30 kB comprimido | Semana 9 |

**A paridade web é o passo menos óbvio e o mais necessário.** `repo.web.ts` é
implementação independente: uma função escrita só em `repo.ts` compila, passa no
teste, e **deixa os dados no navegador**. O teste unitário roda contra uma das
duas implementações e não sabe da outra.

### O que não entra, e por quê

| Não entra | Por quê |
|---|---|
| **ESLint / Prettier** | Decisão anterior, mantida. A guarda cobre o caso real |
| **Teste de ponta a ponta** | Custo de manutenção alto para um produto que muda toda semana. Volta depois do G2 |
| **Cobertura em `screens/`** | Levaria a testar composição de pixel. A guarda resolve o problema real, que é regra fora de lugar |
| **Teste de regressão visual** | Uma pessoa, sete semanas |

---

## 5 · O que fica sem cobertura, de propósito

| Sem cobertura | Por quê | Como se protege |
|---|---|---|
| `src/screens/` | É composição. Teste de tela testa layout, e layout muda toda semana | Guarda de domínio + conferência manual |
| `src/state/` | Orquestração fina sobre `db/` e `domain/` | Os dois extremos são testados |
| `src/db/` | É transporte. O que se testaria é o SQLite | Paridade web + o teste "grava, sai, reabre" |
| `src/navigation/` | Declaração de rota | `expo export` pega rota quebrada |
| `types.ts` | Tipo não executa | `tsc --noEmit` |
| `acompanhar/` e `admin/` | HTML fora do bundle | A lógica vem de `publico.ts` e `mudanca.ts`, testados |

---

## 6 · Os testes que valem mais que a suíte inteira

Três, e nenhum deles é de unidade.

### 1 · As seis combinações da Resolução 400

> Abrir o Socorro com **atraso**, **cancelamento** e **preterição**, em trecho
> **doméstico** e **internacional**, e conferir cada saída contra o texto da
> norma, artigo por artigo.

Seis combinações. O G2 exige **100%**.

**O teste automatizado prova que o código faz o que o teste diz. Só a leitura da
norma prova que o teste diz a coisa certa.** É a diferença entre verificação e
validação, e é onde `direitos.test.ts` sozinho não alcança.

Insumo: [`06-anac-completo.md`](06-anac-completo.md).

### 2 · O teste de ausência do snapshot público

Uma viagem com **todos** os campos sensíveis preenchidos, e a afirmação de que
nenhum deles aparece no que é publicado. É o único teste do repositório cuja
falha é um incidente, não um bug.

### 3 · Gravar, sair, reabrir — nas duas implementações

Criar viagem, `Sair`, reabrir, afirmar lista vazia. Em `repo.ts` **e** em
`repo.web.ts`. Pega a divergência silenciosa entre as duas, que é o modo de falha
característico deste repositório.

---

## 7 · Aceite bugs — e os que não

De [`plano/05-mvp.md`](../plano/05-mvp.md), e vale repetir porque orienta onde
gastar esforço:

| Tudo bem | Inaceitável |
|---|---|
| Parser errar formato | **Direito informado errado** |
| Fuso trocado numa reserva de hotel | Campo sensível no link público |
| Push duplicado | Aviso errado enviado ao cliente |
| Layout apertado em 320px | Dado inventado se passando por dado do usuário |
| Importação falhar em companhia não coberta | Perder dado que a pessoa digitou |

**Mandar alguém exigir hotel com 2h de atraso faz a pessoa passar vergonha no
balcão e destrói a única coisa que o produto vende.** A tabela do F4 é o único
código deste MVP que merece teste exaustivo.

---

## 8 · O ritual de fim de semana de construção

```bash
cd mobile
npm run typecheck
npm run test:coverage -- --ci
npx expo-doctor
npx expo export --platform web     --output-dir ./.export-web
npx expo export --platform android --output-dir ./.export
```

E, por tela, antes de considerá-la pronta, o checklist de
[`07-criterios-de-pronto.md`](07-criterios-de-pronto.md).

---

## 9 · O que não vai para relatório

| Proibido | Por quê |
|---|---|
| Cobertura de teste | É chão. 100% é o ponto de partida, não conquista |
| Número de commits | Mede digitação |
| Linhas escritas | Mede o contrário do que se quer |
| Telas construídas | Tela sem usuário é protótipo |

**O que vai:** entrevistas feitas, reservas importadas sem correção, direitos
conferidos contra a norma, e pessoas que usaram numa viagem real.
