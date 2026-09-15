# US.013 · Ver o que mudou e o que isso quebrou

---

## 0 · PRD

**Problema.** O painel do aeroporto diz *"voo atrasado"*. Não diz que o carro
alugado fecha às 22h, que o check-in do hotel expira à meia-noite e que o passeio
de amanhã cedo virou impossível.

`src/domain/cascata.ts` já calcula isso. O que falta é o lugar onde a pessoa
aterrissa quando recebe o aviso — e esse lugar não pode ser a lista de viagens.

**Objetivo.** Uma tela que responde três perguntas, nesta ordem: **o que mudou**,
**o que isso quebrou**, **o que eu faço agora**.

**A decisão que define esta história.**

> **A tela renderiza do registro salvo, nunca do payload do push.**

Payload de push chega truncado, duplicado, fora de ordem, e pode chegar
adulterado. O push carrega um identificador e nada mais.

**Métrica de sucesso.** ≥ 50% dos avisos enviados são abertos. Nenhum aviso
renderiza conteúdo vindo da notificação.

**Escopo.** A tela `Aviso`: o que mudou, a cadeia afetada, as ações.

**Fora de escopo.** A entrega do push — [US.014](US-014-aviso-push.md). O envio —
[US.015](US-015-console-aprovacao.md).

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.013 |
| **Título** | Ver o que mudou e o que isso quebrou |
| **User Story** | Eu, como **organizador que acabou de ser avisado de uma mudança no voo**,<br><br>Quero **ver numa tela só o que mudou e o que isso derruba na viagem**,<br><br>Para que **eu decida o que fazer sem abrir cinco confirmações de reserva**. |
| **Épico Relacionado** | [EP-04 · Aviso de mudança](EP-04-aviso.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.013.01** | O conteúdo vem do registro | O push carrega identificador; o conteúdo é buscado | **Dado que** a pessoa toca a notificação,<br>**Quando** a tela abre,<br>**Então** o conteúdo é lido do registro salvo, e nenhum texto do payload é renderizado |
| **RN.013.02** | Antes e depois, lado a lado | "Seu voo mudou" sem o valor anterior obriga a pessoa a lembrar | **Dado que** a partida mudou de 14h20 para 18h50,<br>**Quando** o aviso é exibido,<br>**Então** os dois horários aparecem, com o anterior riscado |
| **RN.013.03** | A cadeia vem logo abaixo | É a única coisa que o produto faz e o painel do aeroporto não | **Dado que** a mudança afeta três reservas,<br>**Quando** a tela é renderizada,<br>**Então** as três aparecem com o efeito de cada uma, saído de `cascata.ts` |
| **RN.013.04** | Nada quebrado também é resposta | Aviso sem consequência é a informação mais tranquilizadora que existe, e some se não for dita | **Dado que** a mudança não afeta nenhuma outra reserva,<br>**Quando** a tela é exibida,<br>**Então** ela diz explicitamente que o resto da viagem continua de pé |
| **RN.013.05** | O caminho para os direitos está na tela | Quem foi avisado de cancelamento precisa de um toque até o Socorro | **Dado que** a mudança é cancelamento ou atraso relevante,<br>**Quando** a tela é exibida,<br>**Então** há ação direta para o Socorro daquela reserva |
| **RN.013.06** | Aviso antigo não vira alarme | Abrir um aviso de três dias atrás com cara de urgência é ruído | **Dado que** o aviso tem mais de 24 horas,<br>**Quando** ele é aberto,<br>**Então** aparece a data e hora do aviso, sem cor de situação ativa |
| **RN.013.07** | Sem rede, o aviso já salvo abre | A pessoa está num aeroporto, com roaming acabando na imigração | **Dado que** o registro já foi baixado e o aparelho está offline,<br>**Quando** a tela abre,<br>**Então** ela renderiza normalmente, do banco local |
| **RN.013.08** | Registro ausente é estado próprio | Push de aviso já apagado precisa de uma tela, não de um erro | **Dado que** o registro não existe mais,<br>**Quando** a tela abre,<br>**Então** informa que o aviso não está mais disponível e oferece abrir a viagem |
| **RN.013.09** | O aviso não decide pela pessoa | `AVISO_CALCULO` existe exatamente para esta superfície | **Dado que** a tela sugere o que fazer,<br>**Quando** a pessoa lê,<br>**Então** vê `AVISO_CALCULO` e a orientação de confirmar com a companhia |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.013.01** — Tocar a notificação abre `Aviso` com o conteúdo lido do registro.
- [ ] **AC.013.02** — Antes e depois aparecem juntos, com o valor anterior riscado.
- [ ] **AC.013.03** — As reservas afetadas aparecem com o efeito de cada uma.
- [ ] **AC.013.04** — Mudança sem consequência exibe a frase de tranquilidade.
- [ ] **AC.013.05** — Há ação direta para o Socorro quando o gatilho a justifica.
- [ ] **AC.013.06** — Aviso com mais de 24 h exibe data e hora e não usa cor de situação ativa.
- [ ] **AC.013.07** — Offline, um aviso já baixado abre normalmente.
- [ ] **AC.013.08** — Registro inexistente apresenta o estado próprio, não erro.
- [ ] **AC.013.09** — Nenhum texto renderizado vem do payload; teste afirma isso.
- [ ] **AC.013.10** — A tela exibe `AVISO_CALCULO` de `legal.ts`.
- [ ] **AC.013.11** — 375px e 1280px sem rolagem lateral; toques ≥ 44px.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Abertura por push | Payload tem `avisoId` | Cliente | Busca o registro | `navigate('Aviso', { id })` — só o id |
| Registro local | Existe | Banco local | Renderiza | `mudancas.get(id)` |
| Registro ausente local | Online | Servidor | Busca e grava | `GET /avisos/:id` |
| Registro ausente | Offline | Frontend | Estado "indisponível" | Sem erro de rede na tela |
| Cadeia afetada | `pendencias().length > 0` | Domínio | Lista com efeitos | `cascata.recalcular` |
| Cadeia intacta | `pendencias().length === 0` | Frontend | Frase de tranquilidade | Estado próprio, não vazio |
| Atraso ≥ 60 min ou cancelamento | — | Frontend | Ação para o Socorro | Limiar do art. 27, I |
| Idade do aviso | `agora - criadoEm > 24 h` | Frontend | Sem cor ativa, com data | — |
| Leitura | Tela aberta | Cliente → Servidor | Marca lido | `aviso_aberto`, para a métrica do épico |

---

## 5 · Notas Técnicas e Dependências

**Tipo novo.** `Mudanca` em `src/domain/types.ts`:

```
id, tripId, itemId, criadoEm,
campo: 'start' | 'gate' | 'status' | 'terminal',
de: string, para: string,
gatilho?: Gatilho, origem: 'api' | 'manual'
```

Guardar `de` e `para` como texto já formatado seria mais simples e seria errado:
a tela precisa poder reformatar por fuso e por idioma. Guardar o valor, formatar
na renderização.

**Domínio.** `src/domain/mudanca.ts`:

| Função | Responsabilidade |
|---|---|
| `descrever(m: Mudanca): string` | A frase do "o que mudou" |
| `relevante(m: Mudanca): boolean` | Se merece aviso — mudança de 3 minutos não merece |
| `ehRecente(m, agora): boolean` | Fronteira das 24 h |

`relevante()` é a função que decide se alguém é interrompido. Errar para mais é
ruído que faz desligar a notificação; errar para menos é a promessa do produto
não cumprida. Vai para o domínio, com gate de 100%, e é o motivo de `mudanca.ts`
estar na lista de módulos críticos do plano.

**Navegação.** `RootStackParamList` ganha `Aviso: { id: string }`. **Só o id** —
se a rota aceitar conteúdo, alguém vai acabar passando o payload por ela.

**Segurança e Privacidade.** O payload do push carrega `avisoId` e um título
genérico. **Nunca** localizador, assento, sobrenome ou destino: notificação
aparece na tela bloqueada, à vista de quem estiver perto.

**Testes.** `mudanca.test.ts` cobre `relevante()` nas fronteiras de minutos, e
`ehRecente` em 23 h 59 e 24 h 01. O teste de tela afirma que o texto renderizado
vem do registro — monta um registro com um valor e um payload com outro, e
verifica qual apareceu.

**Feature Flag.** `avisosAtivos`. Se o F3 for cortado, a tela some e o Socorro
continua funcionando por registro manual.

**Impacto em outras áreas.** `AppState` ganha as mudanças. O Socorro ganha o
bloco da [US.016](US-016-socorro-o-que-mudou.md).

---

## 6 · Artefatos e Arquivos Relacionados

- **Cascata:** `mobile/src/domain/cascata.ts` — `recalcular`, `pendencias`, `codigo`
- **Socorro:** `mobile/src/screens/SocorroScreen.tsx`
- **Tipos:** `mobile/src/domain/types.ts`
- **Backend:** [`05-backend.md`](../05-backend.md)
- **Risco:** [R4 em `plano/10-riscos.md`](../../plano/10-riscos.md)
- **Próxima:** [US.014 · Receber o aviso no aparelho](US-014-aviso-push.md)
