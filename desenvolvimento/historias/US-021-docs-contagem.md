# US.021 · Ver só os documentos que existem

---

## 0 · PRD

**Problema.** `DocsScreen.tsx` tem duas mentiras pequenas e uma delas é perigosa.

**Linha 38:**

```tsx
<Label>{`${items.length + 2} arquivos · offline`}</Label>
```

O `+ 2` existe para casar com dois cartões escritos à mão. E `items.length` conta
reservas, não arquivos — o número não corresponde a nada.

**Linhas 62 a 65:**

```tsx
<Divider>Pessoais</Divider>
<Card top="DOC" name="Passaporte" meta="val. 2031" />
<Card top="DOC" name="Seguro viagem" meta="AP-55219" />
```

Um passaporte com validade que ninguém informou, e uma apólice com número
inventado. **Alguém pode viajar achando que tem seguro.**

**Objetivo.** A contagem é de arquivos reais. O bloco "Pessoais" desaparece.

**Métrica de sucesso.** O número na tela é igual ao número de arquivos anexados.
Nenhum documento aparece sem ter sido anexado.

**Escopo.** A contagem, a remoção do bloco, e o estado vazio que sobra.

**Fora de escopo.** Guardar passaporte, RG, visto ou seguro. Ver abaixo.

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.021 |
| **Título** | Ver só os documentos que existem |
| **User Story** | Eu, como **viajante conferindo o que tenho guardado antes de sair de casa**,<br><br>Quero **ver apenas os arquivos que eu realmente anexei**,<br><br>Para que **eu não embarque achando que tenho um documento que nunca guardei**. |
| **Épico Relacionado** | [EP-06 · Os cotos de dado falso](EP-06-cotos.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.021.01** | A contagem conta arquivos | Correção da linha 38 | **Dado que** a viagem tem 5 reservas e 3 anexos,<br>**Quando** a tela é aberta,<br>**Então** o rótulo diz **3 arquivos** |
| **RN.021.02** | Zero arquivos é zero, não um erro | Esconder o número quando é zero é esconder a informação mais útil para agir | **Dado que** não há anexos,<br>**Quando** a tela é aberta,<br>**Então** o rótulo diz "nenhum arquivo" e o estado vazio explica como anexar |
| **RN.021.03** | Singular e plural corretos | "1 arquivos" é o detalhe que faz um produto parecer descuidado | **Dado que** há 1 anexo,<br>**Quando** o rótulo é montado,<br>**Então** diz "1 arquivo" |
| **RN.021.04** | "offline" só quando é verdade | O rótulo promete disponibilidade sem rede. Se um anexo não está no aparelho, a promessa é falsa | **Dado que** todos os anexos estão no aparelho,<br>**Quando** o rótulo é montado,<br>**Então** inclui "offline"; caso contrário, indica quantos ainda faltam baixar |
| **RN.021.05** | O bloco "Pessoais" é removido | Passaporte e seguro inventados são dado falso com consequência real | **Dado que** a tela é aberta,<br>**Quando** ela é renderizada,<br>**Então** não existe seção "Pessoais", nem cartão de passaporte, nem de seguro |
| **RN.021.06** | Documento pessoal não vira funcionalidade agora | Guardar passaporte é outro produto, com outro regime de privacidade | **Dado que** a pessoa procura onde guardar o passaporte,<br>**Quando** ela olha a tela,<br>**Então** não há promessa, nem campo, nem "em breve" |
| **RN.021.07** | Os arquivos são listados por reserva | Lista solta de arquivos não diz a que pertence cada um | **Dado que** há anexos em três reservas,<br>**Quando** a tela é exibida,<br>**Então** eles aparecem agrupados pela reserva de origem |
| **RN.021.08** | Arquivo ilegível é dito, não escondido | Anexo que não abre e some é pior do que anexo que avisa | **Dado que** um anexo não pode ser lido,<br>**Quando** a lista é exibida,<br>**Então** ele aparece marcado como indisponível, com a opção de anexar de novo |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.021.01** — Com 5 reservas e 3 anexos, o rótulo diz "3 arquivos".
- [ ] **AC.021.02** — Sem anexos, o rótulo diz "nenhum arquivo" e o estado vazio explica como anexar.
- [ ] **AC.021.03** — Com 1 anexo, o rótulo diz "1 arquivo".
- [ ] **AC.021.04** — "offline" só aparece quando todos os anexos estão no aparelho.
- [ ] **AC.021.05** — A seção "Pessoais" não existe mais no código.
- [ ] **AC.021.06** — Nenhum documento aparece sem ter sido anexado por alguém.
- [ ] **AC.021.07** — Os arquivos aparecem agrupados por reserva.
- [ ] **AC.021.08** — Anexo ilegível aparece como indisponível, com ação de reanexar.
- [ ] **AC.021.09** — `DocsScreen.tsx` não contém literal de dado de usuário; a guarda de domínio confirma.
- [ ] **AC.021.10** — A contagem funciona igual em nativo e em web.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Contagem | Sempre | Domínio | Nº de anexos | `attachments.length`, nunca `items.length` |
| Zero anexos | `length === 0` | Frontend | "nenhum arquivo" + estado vazio | — |
| Um anexo | `length === 1` | Domínio | "1 arquivo" | `pluralArquivos(n)` |
| Vários | `length > 1` | Domínio | "N arquivos" | Idem |
| Todos locais | Cada anexo com `uri` válido | Domínio | Acrescenta "offline" | `todosDisponiveis(anexos)` |
| Algum ausente | Um `uri` inválido | Frontend | Indica quantos faltam | Sem a promessa de offline |
| Bloco Pessoais | Sempre | — | **Removido** | Linhas 62–65 apagadas |
| Agrupamento | Sempre | Domínio | Por `itemId` | `agruparPorReserva(anexos, items)` |
| Anexo ilegível | Leitura falha | Frontend | Marca indisponível | Nunca remover em silêncio |

---

## 5 · Notas Técnicas e Dependências

**Domínio.** `src/domain/attachmentName.ts` já existe e trata nome de arquivo. As
funções novas vão para lá ou para um `documentos.ts` — a decisão pode ser tomada
na implementação, desde que fiquem em `src/domain/`:

| Função | Responsabilidade |
|---|---|
| `pluralArquivos(n: number): string` | "nenhum arquivo", "1 arquivo", "N arquivos" |
| `todosDisponiveis(anexos): boolean` | Se a promessa de offline é verdadeira |
| `agruparPorReserva(anexos, items)` | Agrupamento para a lista |

**Paridade web.** A verificação de disponibilidade é diferente nas duas
plataformas — sistema de arquivos no nativo, IndexedDB na web. A função de
domínio recebe o resultado da verificação; **não faz a verificação**. Assim ela
continua pura e testável, e a diferença de plataforma fica em
`attachments.ts` / `attachments.web.ts`, onde ela pertence.

**Segurança e Privacidade.** Remover o bloco "Pessoais" também remove uma
promessa implícita de guardar documento de identidade. Isso é bom: guardar
passaporte muda o regime de privacidade do produto inteiro e exige texto
específico na política. Não é decisão para tomar por acidente, num cartão de
exemplo esquecido.

**Testes.** `pluralArquivos` em 0, 1, 2. `todosDisponiveis` com lista vazia
(verdadeiro — não há promessa a quebrar), com todos válidos, com um inválido.
`agruparPorReserva` com anexo órfão, cuja reserva foi apagada.

**Feature Flag.** Não se aplica.

**Impacto em outras áreas.** `DocsScreen` recebe a entrada da tela `Conta`
([US.003](US-003-conta-sair.md)). As duas histórias tocam o mesmo arquivo — se a
ordem permitir, vale fazê-las juntas.

---

## 6 · Artefatos e Arquivos Relacionados

- **Defeito:** `mobile/src/screens/DocsScreen.tsx:38`, `:62-65`
- **Anexos:** `mobile/src/db/attachments.ts`, `attachments.web.ts`, `mobile/src/components/Attachments.tsx`
- **Domínio:** `mobile/src/domain/attachmentName.ts`
- **Conta:** [US.003](US-003-conta-sair.md)
- **Guarda de CI:** [US.023](US-023-guarda-de-dominio.md)
