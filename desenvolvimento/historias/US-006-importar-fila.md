# US.006 · Acompanhar a fila do que chegou

---

## 0 · PRD

**Problema.** A pessoa encaminha oito e-mails e volta ao aplicativo. Se não vir
nada, ela não sabe se o sistema recebeu, se está processando, ou se errou o
endereço. Silêncio depois de uma ação é o que faz alguém desistir e cadastrar na
mão — ou pior, não cadastrar.

**Objetivo.** Uma fila visível do que chegou e em que estado está, com o que
fazer em cada caso.

**Por que separada da US.005.** Aquela é instrução; esta é acompanhamento. Têm
estados diferentes, erros diferentes e uma delas pode atrasar sem derrubar a
outra.

**Métrica de sucesso.** Tempo do encaminhamento à reserva na tela ≤ 5 min no p95.
Nenhum item permanece em "processando" por mais de 30 minutos sem virar erro.

**Escopo.** A fila, os estados, o que aconteceu com cada mensagem e o caminho
para a revisão.

**Fora de escopo.** A tela de revisão em si — [US.007](US-007-revisar-confirmar.md).

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.006 |
| **Título** | Acompanhar a fila do que chegou |
| **User Story** | Eu, como **organizador que acabou de encaminhar oito e-mails**,<br><br>Quero **ver o que o Embarcaly recebeu e em que pé está**,<br><br>Para que **eu saiba se deu certo sem ficar recarregando o itinerário**. |
| **Épico Relacionado** | [EP-02 · Entrada sem digitação](EP-02-importacao.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.006.01** | Recebido aparece antes de processado | O sinal que a pessoa precisa primeiro é *"chegou"*. Esperar o parser para mostrar qualquer coisa é silêncio de minutos | **Dado que** o servidor recebeu o e-mail,<br>**Quando** a fila é consultada,<br>**Então** o item aparece com o assunto e o estado "Recebido", antes de qualquer extração |
| **RN.006.02** | Cinco estados, e nenhum a mais | Estado demais vira ruído; de menos esconde o erro | **Dado que** a fila está visível,<br>**Quando** a pessoa lê,<br>**Então** cada item está em: Recebido · Lendo · **Para revisar** · Importado · Não consegui |
| **RN.006.03** | "Para revisar" é ação, não informação | O item parado à espera de confirmação precisa se distinguir dos outros quatro | **Dado que** há item em "Para revisar",<br>**Quando** a lista é renderizada,<br>**Então** ele aparece no topo, com o laranja de situação, e tocá-lo abre a revisão |
| **RN.006.04** | Erro diz o que fazer | "Não consegui" sem saída deixa a pessoa parada | **Dado que** um item está em "Não consegui",<br>**Quando** a pessoa o abre,<br>**Então** vê o motivo em uma frase e duas saídas: cadastrar à mão, ou anexar o e-mail à reserva existente |
| **RN.006.05** | Processamento travado vira erro | Item eternamente "Lendo" é pior que erro: a pessoa espera para sempre | **Dado que** um item está em "Lendo" há mais de 30 minutos,<br>**Quando** a fila é consultada,<br>**Então** ele aparece como "Não consegui", com motivo de tempo excedido |
| **RN.006.06** | Duplicata não vira reserva dupla | Encaminhar o mesmo e-mail duas vezes é comum, e a segunda não pode duplicar o voo | **Dado que** já existe reserva com o mesmo localizador e número de voo,<br>**Quando** a extração termina,<br>**Então** o item é marcado como duplicata e **não** cria reserva nova |
| **RN.006.07** | A fila é do aparelho, e atualiza sozinha enquanto visível | Puxar para atualizar é aceitável; exigir isso não é | **Dado que** a tela está aberta,<br>**Quando** passam 15 segundos,<br>**Então** a fila é reconsultada sem ação da pessoa, e para de consultar quando a tela sai de foco |
| **RN.006.08** | Offline mostra o último estado conhecido | A fila não pode virar tela de erro por falta de rede | **Dado que** o aparelho está sem conexão,<br>**Quando** a tela abre,<br>**Então** mostra a fila salva com a hora da última atualização, e um aviso discreto de que está desatualizada |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.006.01** — E-mail encaminhado aparece na fila em até 60 segundos, como "Recebido".
- [ ] **AC.006.02** — Cada item mostra assunto, remetente e hora de chegada.
- [ ] **AC.006.03** — Itens "Para revisar" aparecem no topo, com marcação de situação.
- [ ] **AC.006.04** — "Não consegui" mostra o motivo em uma frase e oferece as duas saídas.
- [ ] **AC.006.05** — Item parado em "Lendo" por 30 minutos vira "Não consegui" automaticamente.
- [ ] **AC.006.06** — Encaminhar o mesmo e-mail duas vezes não cria duas reservas.
- [ ] **AC.006.07** — A fila atualiza sozinha com a tela aberta, e **para** quando a tela perde o foco.
- [ ] **AC.006.08** — Offline, mostra o último estado com a hora da atualização.
- [ ] **AC.006.09** — Fila vazia tem estado vazio próprio, que repete a instrução de três passos.
- [ ] **AC.006.10** — Nenhum dado do corpo do e-mail aparece na lista além de assunto e remetente.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| E-mail chega | Remetente com conta | Provedor → Servidor | Cria registro "Recebido" | `estado = 'recebido'`, `recebido_em = agora` |
| E-mail chega | Remetente sem conta | Servidor | Conta pendente + link de entrada | Funil de cadastro do F1 |
| Extração inicia | — | Servidor | "Lendo" | `estado = 'lendo'` |
| Extração completa | Todos os campos obrigatórios | Servidor | "Para revisar" | `estado = 'revisar'`, `needs = []` |
| Extração parcial | Falta campo obrigatório | Servidor | "Para revisar" com pendência | `estado = 'revisar'`, `needs = ['start', …]` |
| Extração falha | Remetente desconhecido | Servidor | "Não consegui" | `motivo = 'remetente'` |
| Extração travada | `agora - lendo_em > 30 min` | Servidor | "Não consegui" | `motivo = 'tempo'` |
| Duplicata | `pnr` + `flight` já existem | Servidor | "Importado (duplicata)" | Não cria item |
| Confirmação | Pessoa confirma | Cliente | "Importado" | [US.007](US-007-revisar-confirmar.md) |
| Consulta periódica | Tela em foco | Cliente | A cada 15 s | `AppState === 'active'` **e** tela focada |

---

## 5 · Notas Técnicas e Dependências

**Integrações.** Provedor de entrada de e-mail e o parser do servidor.

**Tipo novo.** `Importacao` em `src/domain/types.ts`:

```
id, assunto, remetente, recebidoEm,
estado: 'recebido' | 'lendo' | 'revisar' | 'importado' | 'erro',
motivo?: 'remetente' | 'formato' | 'tempo' | 'duplicata',
proposta?: ItemInput, needs: string[]
```

**Domínio.** `src/domain/importacao.ts` ganha:

| Função | Responsabilidade |
|---|---|
| `ordenarFila(itens, agora)` | "Para revisar" primeiro, depois por chegada |
| `expirou(item, agora)` | Fronteira dos 30 minutos |
| `ehDuplicata(proposta, existentes)` | Mesmo `pnr` **e** mesmo `flight` |

**Consulta periódica.** 15 segundos, **e só com a tela focada**. Consulta em
segundo plano gasta bateria e dado móvel de alguém que está viajando, que é
exatamente o pior momento para isso.

**Segurança e Privacidade.** A lista mostra assunto e remetente. O corpo do
e-mail **não é exibido** e é descartado depois da confirmação ou do erro —
guardar corpo de e-mail de terceiro sem necessidade é exposição sem contrapartida.
O prazo de descarte precisa constar da política.

**Testes.** `importacao.test.ts` cobre a ordenação com fila mista; 29 e 31
minutos na fronteira de `expirou`; duplicata com mesmo `pnr` e voo diferente
(**não** é duplicata) e com os dois iguais (é).

**Feature Flag.** `importacaoAtiva`, a mesma da US.005.

**Impacto em outras áreas.** `AppState` ganha a fila. Nada do organizador muda.

---

## 6 · Artefatos e Arquivos Relacionados

- **Anterior:** [US.005](US-005-importar-endereco.md)
- **Próxima:** [US.007 · Confirmar a reserva proposta](US-007-revisar-confirmar.md)
- **Backend:** [`05-backend.md`](../05-backend.md)
- **Tipos:** `mobile/src/domain/types.ts`
- **Estado:** `mobile/src/state/AppState.tsx`
