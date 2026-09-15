# US.014 · Receber o aviso no aparelho

---

## 0 · PRD

**Problema.** A landing promete *"e alguém de olho quando atrasa"*. Hoje o
aplicativo só descobre o problema se a pessoa abrir e registrar o atraso na mão —
e quem está no portão de embarque não abre aplicativo.

**Objetivo.** A mudança chega ao aparelho. Uma vez, no momento certo, com texto
que já diz algo útil na tela bloqueada.

**Por que isso tem história separada da tela.** Porque a entrega é um problema
inteiro: permissão, token, duplicata, notificação em tela bloqueada, silêncio de
madrugada, e o fato de push exigir build real de loja.

**A consequência de calendário.** Push exige credencial FCM e build assinado. A
conta Google Play estava na semana 9 e a verificação de identidade leva dias.
**Precisa ser aberta na semana 5** — US$25, e é o deslocamento mais barato do
plano inteiro.

**Métrica de sucesso.** ≥ 80% dos avisos chegam antes de a pessoa abrir o
aplicativo. Zero avisos duplicados.

**Escopo.** Permissão, registro do aparelho, entrega, toque, duplicata, janela de
silêncio, e o caminho para quem não autorizou.

**Fora de escopo.** O que a tela mostra — [US.013](US-013-aviso-tela.md). Quem
aperta enviar — [US.015](US-015-console-aprovacao.md).

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.014 |
| **Título** | Receber o aviso no aparelho |
| **User Story** | Eu, como **organizador que está no aeroporto sem olhar o celular**,<br><br>Quero **ser avisado quando o voo mudar**,<br><br>Para que **eu saiba antes de chegar no portão e ainda dê tempo de resolver**. |
| **Épico Relacionado** | [EP-04 · Aviso de mudança](EP-04-aviso.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.014.01** | A permissão é pedida com contexto, e não na abertura | Pedir permissão na primeira tela é a forma mais rápida de receber "não" | **Dado que** a pessoa acabou de cadastrar o primeiro voo,<br>**Quando** o cadastro é concluído,<br>**Então** o aplicativo explica o que vai avisar e **depois** aciona o pedido do sistema |
| **RN.014.02** | Negar não quebra nada | Push negado é escolha legítima, e o produto tem que continuar servindo | **Dado que** a pessoa negou a permissão,<br>**Quando** uma mudança acontece,<br>**Então** o registro é criado e aparece no Socorro ao abrir, sem push |
| **RN.014.03** | Reativar é possível de dentro do app | Quem negou por engano não sabe achar a configuração do sistema | **Dado que** os avisos estão desligados,<br>**Quando** a pessoa aciona "Ativar avisos" em `Conta`,<br>**Então** o aplicativo abre a tela de configuração do sistema no lugar certo |
| **RN.014.04** | Um aviso por mudança, por aparelho | Push duplicado é a reclamação mais comum de aplicativo de viagem | **Dado que** a mesma mudança é processada duas vezes,<br>**Quando** o envio ocorre,<br>**Então** só uma notificação é entregue, garantida por chave de deduplicação |
| **RN.014.05** | Aparelho novo não recebe o passado | Quem instala num celular novo não pode ser bombardeado com o histórico | **Dado que** a pessoa registra um aparelho novo,<br>**Quando** ele é registrado,<br>**Então** só mudanças posteriores ao registro são enviadas a ele |
| **RN.014.06** | Silêncio de madrugada, com exceção | Acordar alguém às 3h por mudança de portão é dano; não acordar por cancelamento do voo das 6h também | **Dado que** são 3h no fuso da pessoa,<br>**Quando** uma mudança **não crítica** ocorre,<br>**Então** o envio é adiado para as 7h |
| **RN.014.07** | Crítico atravessa o silêncio | Cancelamento e atraso que muda o dia não esperam o amanhecer | **Dado que** são 3h e o voo das 6h foi cancelado,<br>**Quando** a mudança é processada,<br>**Então** o aviso é enviado na hora |
| **RN.014.08** | O texto da notificação não vaza dado | Notificação aparece na tela bloqueada, à vista de quem estiver do lado | **Dado que** um aviso é entregue,<br>**Quando** ele aparece na tela bloqueada,<br>**Então** mostra a companhia e o que mudou, e **nunca** localizador, assento ou sobrenome |
| **RN.014.09** | Tocar leva à tela certa, mesmo com o app fechado | Aterrissar na lista de viagens depois de tocar um aviso é perder a pessoa | **Dado que** o aplicativo está fechado,<br>**Quando** a pessoa toca a notificação,<br>**Então** ele abre direto em `Aviso` com aquele identificador |
| **RN.014.10** | Token de aparelho morre com a sessão | Token vivo depois do `Sair` manda aviso da viagem de alguém para o aparelho de outro | **Dado que** a pessoa sai da conta,<br>**Quando** a saída conclui,<br>**Então** o token daquele aparelho é removido do servidor |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.014.01** — A permissão é pedida após o primeiro voo cadastrado, com explicação antes.
- [ ] **AC.014.02** — Com permissão negada, os registros continuam aparecendo no Socorro.
- [ ] **AC.014.03** — "Ativar avisos" em `Conta` abre a configuração do sistema.
- [ ] **AC.014.04** — Processar a mesma mudança duas vezes entrega **uma** notificação.
- [ ] **AC.014.05** — Aparelho recém-registrado não recebe avisos anteriores ao registro.
- [ ] **AC.014.06** — Mudança não crítica às 3h é entregue às 7h.
- [ ] **AC.014.07** — Cancelamento às 3h é entregue imediatamente.
- [ ] **AC.014.08** — Nenhum texto de notificação contém localizador, assento ou sobrenome; teste afirma.
- [ ] **AC.014.09** — Tocar a notificação com o app fechado abre `Aviso` com o identificador certo, em Android e iPhone.
- [ ] **AC.014.10** — Após `Sair`, o token some do servidor e o aparelho não recebe mais nada.
- [ ] **AC.014.11** — A conta Google Play está aberta e verificada **na semana 5**.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Pedir permissão | 1º voo cadastrado | Frontend | Explicação + pedido do sistema | Depois de `createItem` com `type === 'air'` |
| Permissão concedida | — | Cliente → Servidor | Registra token | `POST /aparelhos` |
| Permissão negada | — | Cliente | Marca preferência local | Sem push; registros continuam |
| Mudança relevante | `relevante(m) === true` | Servidor | Enfileira | `mudanca.relevante` |
| Mudança irrelevante | `relevante(m) === false` | Servidor | Grava, não envia | Ex.: 3 min de diferença |
| Deduplicação | Mesma chave | Servidor | Um envio | `hash(avisoId + token)`, único |
| Janela de silêncio | 23h–7h locais, não crítico | Servidor | Adia para 7h | Fuso do **usuário**, nunca do servidor |
| Crítico | Cancelamento, preterição, atraso ≥ 60 min | Servidor | Envia na hora | Atravessa o silêncio |
| Payload | Sempre | Servidor | `{ avisoId }` + título genérico | Nunca dado sensível |
| Toque | App fechado | SO → Cliente | Abre `Aviso` | *Deep link* `embarcaly://aviso/:id` |
| Sair | — | Cliente → Servidor | Remove token | `DELETE /aparelhos/:token` |

---

## 5 · Notas Técnicas e Dependências

**Integrações.** FCM para Android, APNs para iPhone, via `expo-notifications`.
Exige `extra.eas.projectId` preenchido — hoje está vazio e **trava o build de
loja**.

**Dependência de calendário, repetida porque é a que atrasa o épico.** Conta
Google Play na **semana 5**. Verificação de identidade leva dias e não depende de
você.

**Domínio.** `src/domain/mudanca.ts` ganha:

| Função | Responsabilidade |
|---|---|
| `ehCritico(m: Mudanca): boolean` | Atravessa a janela de silêncio |
| `podeEnviarAgora(agora, fuso, critico): boolean` | Janela de silêncio |
| `tituloNotificacao(m: Mudanca): string` | Texto seguro, sem dado sensível |

`tituloNotificacao` no domínio, e não na tela, para que exista um teste afirmando
que ela **nunca** inclui `pnr`, `seat` ou sobrenome. É a mesma disciplina de
whitelist da [US.019](US-019-pagina-publica.md).

**Segurança e Privacidade.**

- Payload mínimo: identificador e título genérico.
- Token some no `Sair` ([US.003](US-003-conta-sair.md)) e na exclusão
  ([US.004](US-004-conta-excluir.md)).
- A janela de silêncio usa o fuso do usuário. Usar o do servidor manda aviso às
  3h para quem está na Europa.

**Testes.** `mudanca.test.ts` cobre: 22h59 e 23h01 na fronteira do silêncio; 6h59
e 7h01 na saída; crítico dentro da janela; `tituloNotificacao` com item completo,
afirmando **ausência** de cada campo sensível.

**Feature Flag.** `avisosAtivos`.

**Impacto em outras áreas.** `app.json` — `projectId`, permissões, ícone de
notificação. `Conta` ganha a linha de ativação.

---

## 6 · Artefatos e Arquivos Relacionados

- **Anterior:** [US.013](US-013-aviso-tela.md)
- **Próxima:** [US.015 · Aprovar o aviso antes de ele sair](US-015-console-aprovacao.md)
- **Conta:** [US.003](US-003-conta-sair.md) — remoção do token
- **Configuração:** `mobile/app.json`
- **Orçamento:** [`plano/07-orcamento.md`](../../plano/07-orcamento.md) — os US$25 da Play
