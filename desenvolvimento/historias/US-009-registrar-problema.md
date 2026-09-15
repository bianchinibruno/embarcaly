# US.009 · Registrar o problema, não só o atraso

---

## 0 · PRD

**Problema.** `DelayFormScreen.tsx` registra **minutos**. É tudo que ele sabe
perguntar. Mas `src/domain/direitos.ts` trabalha com três gatilhos — atraso,
cancelamento e preterição — e os dois últimos não têm por onde entrar no
aplicativo.

Quem teve o voo cancelado hoje precisa digitar um atraso fictício para o Socorro
reagir. E aí recebe a regra do atraso, que é diferente: no cancelamento as quatro
saídas do art. 21 valem **imediatamente**, sem esperar as quatro horas.

**Objetivo.** A tela pergunta **o que aconteceu** antes de perguntar quanto tempo.

**Métrica de sucesso.** Os três gatilhos registráveis. Nenhum campo com valor
padrão silencioso.

**Escopo.** A tela de registro: gatilho, tempo decorrido, domicílio, remoção do
registro.

**Fora de escopo.** O que o Socorro faz com o registro — [US.010](US-010-socorro-gatilhos.md).
A detecção automática, que é o F3 e vem na semana 8.

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.009 |
| **Título** | Registrar o problema, não só o atraso |
| **User Story** | Eu, como **passageiro que acabou de ouvir que o voo foi cancelado**,<br><br>Quero **registrar o que de fato aconteceu, e não fingir que é atraso**,<br><br>Para que **o aplicativo me diga o direito certo para a minha situação**. |
| **Épico Relacionado** | [EP-03 · Direitos completos](EP-03-direitos.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.009.01** | A primeira pergunta é o que aconteceu | O gatilho determina tudo o que vem depois. Perguntar minutos primeiro força a pessoa a traduzir cancelamento em número | **Dado que** a pessoa abre "Registrar problema",<br>**Quando** a tela carrega,<br>**Então** a primeira escolha é entre **Atrasou**, **Cancelaram** e **Não embarquei (preterição)** |
| **RN.009.02** | Preterição é explicada, não nomeada | Ninguém no portão de embarque usa a palavra "preterição" | **Dado que** a terceira opção está visível,<br>**Quando** a pessoa lê,<br>**Então** vê *"Não embarquei"* com a explicação *"o voo saiu sem mim: overbooking, remarcação sem aviso ou recusa de embarque"* |
| **RN.009.03** | Só o atraso pergunta o tempo | Cancelamento e preterição liberam as quatro saídas de imediato; o relógio não altera a resposta | **Dado que** a pessoa escolheu "Cancelaram",<br>**Quando** a tela avança,<br>**Então** o campo de minutos **não** aparece |
| **RN.009.04** | O atraso é informado pelo horário novo, não por minutos | Ninguém sabe dizer "187 minutos". Todo mundo sabe ler "nova previsão: 23h40" no painel | **Dado que** a pessoa escolheu "Atrasou",<br>**Quando** o campo aparece,<br>**Então** ela informa a **nova previsão de partida**, e os minutos são calculados a partir do horário original |
| **RN.009.05** | O horário original vem da reserva | Pedir de novo o que já está cadastrado é desperdiçar o dado que o aplicativo tem | **Dado que** a reserva tem `start`,<br>**Quando** o atraso é registrado,<br>**Então** `delay.originalStart` recebe o `start` original, e não o valor digitado |
| **RN.009.06** | Domicílio é pergunta, com padrão inferido e visível | O art. 27, III muda de hospedagem para traslado quando a pessoa está na própria cidade. Assumir errado informa direito errado | **Dado que** o gatilho foi registrado,<br>**Quando** a pergunta de domicílio aparece,<br>**Então** ela é *"você está na cidade onde mora?"*, com a inferência marcada como suposição corrigível |
| **RN.009.07** | Motivo é opcional e nunca muda o direito | A Resolução 400 não condiciona assistência material ao motivo. Um campo obrigatório de motivo sugeriria que condiciona | **Dado que** a pessoa não informa o motivo,<br>**Quando** ela conclui o registro,<br>**Então** o registro é válido e os direitos são os mesmos |
| **RN.009.08** | Remover o registro volta tudo ao normal | Voo que voltou ao horário precisa poder voltar ao horário | **Dado que** existe um problema registrado,<br>**Quando** a pessoa aciona "Remover registro",<br>**Então** a reserva volta ao estado original e o Socorro volta ao estado "nada quebrado" |
| **RN.009.09** | Registrar não promete resultado | É a superfície onde a pessoa mais espera que o aplicativo resolva por ela | **Dado que** a tela está visível,<br>**Quando** a pessoa lê o rodapé,<br>**Então** vê `AVISO_RESULTADO`, palavra por palavra de `legal.ts` |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.009.01** — Os três gatilhos são selecionáveis, e "Não embarquei" traz a explicação em linguagem comum.
- [ ] **AC.009.02** — Escolher "Cancelaram" ou "Não embarquei" **não** apresenta campo de minutos.
- [ ] **AC.009.03** — Escolher "Atrasou" pede a nova previsão de partida, não minutos.
- [ ] **AC.009.04** — Nova previsão anterior ao horário original é recusada com mensagem clara.
- [ ] **AC.009.05** — `delay.originalStart` grava o `start` da reserva, e não o valor digitado.
- [ ] **AC.009.06** — A pergunta de domicílio aparece nos três gatilhos, com a inferência visível e corrigível.
- [ ] **AC.009.07** — Motivo em branco conclui o registro normalmente.
- [ ] **AC.009.08** — "Remover registro" restaura a reserva e o Socorro volta ao estado vazio.
- [ ] **AC.009.09** — Registrar funciona offline e persiste.
- [ ] **AC.009.10** — A tela exibe `AVISO_RESULTADO` de `legal.ts`, sem reescrita.
- [ ] **AC.009.11** — Nenhum gatilho vem pré-selecionado; a tela abre sem escolha feita.
- [ ] **AC.009.12** — Alvos ≥ 44px; 375px e 1280px sem rolagem lateral.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Abrir a tela | — | Frontend | Nenhum gatilho selecionado | Estado inicial `gatilho = undefined` |
| Gatilho = atraso | — | Frontend | Pede nova previsão | Mostra campo de horário |
| Gatilho = cancelamento | — | Frontend | Pula o tempo | `decorridoMin` irrelevante para as escolhas |
| Gatilho = preterição | — | Frontend | Pula o tempo, exige trecho | Trecho vem da [US.011](US-011-socorro-trecho.md) |
| Nova previsão < original | Validação | Domínio | Recusa | `novaPrevisao <= item.start` |
| Cálculo dos minutos | Atraso | Domínio | `minutes` | `(novaPrevisao - item.start) / 60000` |
| Domicílio — inferência | Origem = cidade base | Domínio | Sugere "sim", marcado como suposição | `item.from` = aeroporto da cidade base |
| Domicílio — sem base conhecida | — | Frontend | Pergunta sem sugestão | Nunca assume |
| Salvar | Online ou offline | Cliente | Grava local | `updateItem` |
| Remover | Registro existe | Cliente | Limpa `delay` e `status` | Volta ao estado original |

---

## 5 · Notas Técnicas e Dependências

**Mudanças de tipo.** `src/domain/types.ts`:

```
Item.status?: 'ok' | 'atrasado' | 'cancelado' | 'preterido'
Delay.gatilho: Gatilho          // já existe o tipo em direitos.ts
Delay.noDomicilio?: boolean
```

`Delay` hoje tem `originalStart`, `minutes` e `reason`. O tipo continua servindo,
com `minutes` significando zero nos gatilhos imediatos — e o Socorro nunca lê
`minutes` para cancelamento e preterição, porque `avaliar()` já ignora o relógio
nesses casos.

**Migração.** `SCHEMA_VERSION` 2 → 3, com espelho obrigatório em
`src/db/repo.web.ts`. O repositório web é implementação independente: uma coluna
adicionada só em `schema.ts` compila, passa no teste e **some no navegador**.

**Domínio.** `src/domain/problema.ts`:

| Função | Responsabilidade |
|---|---|
| `minutosDeAtraso(original: Date, nova: Date): number` | Cálculo, recusando nova ≤ original |
| `exigeTempo(g: Gatilho): boolean` | Só `'atraso'` |
| `rotuloGatilho(g: Gatilho): string` | Texto da tela, em um lugar só |

**Renomear a tela.** `DelayFormScreen` → `ProblemaFormScreen`, e a rota
`DelayForm` → `ProblemaForm` em `RootStackParamList`. Nome que descreve metade do
domínio é o começo do defeito que esta história corrige.

**Segurança e Privacidade.** Nada sai do aparelho nesta história. O registro é
local, como todo o resto do organizador.

**Testes.** `problema.test.ts` cobre: nova previsão igual ao original (recusa);
um minuto depois (aceita, 1); atravessando meia-noite; `exigeTempo` nos três
gatilhos.

**Feature Flag.** Não se aplica. É correção de defeito de conteúdo.

**Impacto em outras áreas.** `ItemScreen` e `SocorroScreen` leem `Delay`.
`cascata.ts` usa `minutes` para recalcular a cadeia — e para cancelamento
precisa tratar o item como **removido**, não como deslocado. Isso está na
[US.010](US-010-socorro-gatilhos.md) e é o ponto de maior atenção técnica do
épico.

---

## 6 · Artefatos e Arquivos Relacionados

- **Motor:** `mobile/src/domain/direitos.ts` — `Gatilho`, `Situacao`, `avaliar`
- **Tela atual:** `mobile/src/screens/DelayFormScreen.tsx`
- **Cascata:** `mobile/src/domain/cascata.ts`
- **Schema:** `mobile/src/db/schema.ts`, `mobile/src/db/repo.web.ts`
- **ANAC:** [`06-anac-completo.md`](../06-anac-completo.md)
- **Próxima:** [US.010 · Atender cancelamento e preterição](US-010-socorro-gatilhos.md)
