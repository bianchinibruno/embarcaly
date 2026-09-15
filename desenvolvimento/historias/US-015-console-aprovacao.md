# US.015 · Aprovar o aviso antes de ele sair

---

## 0 · PRD

**Problema.** O risco [R4](../../plano/10-riscos.md) diz, com todas as letras,
que *"os primeiros 50 avisos passam por você antes de sair — botão de enviar,
nunca automático"*.

**Esse botão não existe e não estava em lugar nenhum do cronograma.** A mitigação
de um risco classificado como dano fatal não tinha dono, nem semana, nem tela.

**Objetivo.** Uma página onde a fila de avisos pendentes é lida, corrigida e
aprovada um a um. Nada sai sem aprovação.

**A decisão que define esta história.**

> **HTML puro, fora do aplicativo React Native.**

Dentro do app, o console iria para a loja junto — uma tela de administração
visível na revisão da Apple, e um caminho a mais para dado de cliente vazar.
Fora, é uma página em `admin/` atrás do mesmo código de 6 dígitos, com allowlist
de um e-mail.

**Métrica de sucesso.** Zero avisos errados nos primeiros 50. Aprovação em menos
de 60 segundos por aviso.

**Escopo.** A fila, a leitura do que vai ser enviado, edição do texto, aprovar,
recusar e o registro de quem aprovou.

**Fora de escopo.** Envio automático. Só depois dos 50 revisados, e isso é
assunto de depois do G2.

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.015 |
| **Título** | Aprovar o aviso antes de ele sair |
| **User Story** | Eu, como **operador do Embarcaly nos primeiros 50 casos**,<br><br>Quero **ler e aprovar cada aviso antes de ele chegar ao cliente**,<br><br>Para que **nenhuma pessoa receba um alerta errado sobre a própria viagem**. |
| **Épico Relacionado** | [EP-04 · Aviso de mudança](EP-04-aviso.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.015.01** | Nada sai sem aprovação | É a mitigação do R4, e é o motivo desta história existir | **Dado que** o sistema detectou uma mudança,<br>**Quando** o registro é criado,<br>**Então** ele entra na fila como **pendente** e nenhuma notificação é enviada |
| **RN.015.02** | A fila mostra o que o cliente vai ver | Aprovar sem ver o texto final é aprovar às cegas | **Dado que** um aviso está pendente,<br>**Quando** ele é aberto no console,<br>**Então** aparecem o título da notificação, o conteúdo da tela e a cadeia calculada, exatamente como o cliente verá |
| **RN.015.03** | O texto é editável antes de aprovar | Corrigir uma palavra não pode exigir recusar e refazer | **Dado que** o texto gerado está confuso,<br>**Quando** o operador o edita e aprova,<br>**Então** o texto editado é o enviado, e o original fica registrado |
| **RN.015.04** | Recusar exige motivo | Sem motivo registrado, não há como melhorar a detecção | **Dado que** o operador recusa um aviso,<br>**Quando** a recusa é confirmada,<br>**Então** um motivo é obrigatório e fica gravado com o registro |
| **RN.015.05** | Aviso recusado não some da viagem | O registro tem valor mesmo sem push | **Dado que** um aviso foi recusado,<br>**Quando** o cliente abre o aplicativo,<br>**Então** nenhuma notificação foi enviada e nenhum aviso falso aparece na tela dele |
| **RN.015.06** | Urgente aparece primeiro, com o relógio à vista | Aviso de cancelamento aprovado 40 minutos depois não serve para nada | **Dado que** há avisos de gatilhos diferentes na fila,<br>**Quando** a lista é ordenada,<br>**Então** os críticos vêm primeiro, cada um com o tempo desde a detecção |
| **RN.015.07** | Acesso por allowlist de um e-mail | Console aberto é vazamento de dado de viagem de cliente | **Dado que** alguém acessa `/admin` com outro e-mail,<br>**Quando** o código é validado,<br>**Então** o acesso é recusado, com a mesma mensagem de código inválido |
| **RN.015.08** | Nenhum dado a mais do que o necessário | O console vê viagens de clientes; o mínimo é o limite | **Dado que** um aviso é aberto,<br>**Quando** os dados da viagem aparecem,<br>**Então** mostram só a reserva afetada e as afetadas pela cadeia — nunca localizador, assento ou anexos |
| **RN.015.09** | Toda ação fica registrada | Sem registro, não há como auditar um aviso errado que saiu | **Dado que** um aviso é aprovado ou recusado,<br>**Quando** a ação conclui,<br>**Então** ficam gravados quem, quando, o texto original e o texto final |
| **RN.015.10** | A página não é indexável e não tem link | Console que aparece em busca é console encontrado | **Dado que** um buscador rastreia o domínio,<br>**Quando** ele chega em `/admin`,<br>**Então** encontra `noindex` e nenhum link a partir das páginas públicas |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.015.01** — Mudança detectada entra como pendente e **nenhuma** notificação sai.
- [ ] **AC.015.02** — O console mostra título, conteúdo e cadeia, iguais ao que o cliente verá.
- [ ] **AC.015.03** — Editar o texto e aprovar envia o texto editado; o original fica gravado.
- [ ] **AC.015.04** — Recusar sem motivo é bloqueado.
- [ ] **AC.015.05** — Críticos aparecem primeiro, com o tempo desde a detecção.
- [ ] **AC.015.06** — E-mail fora da allowlist não acessa, com mensagem idêntica à de código inválido.
- [ ] **AC.015.07** — Nenhum localizador, assento ou anexo aparece no console.
- [ ] **AC.015.08** — Aprovação e recusa gravam quem, quando e os dois textos.
- [ ] **AC.015.09** — `/admin` responde `noindex` e não é alcançável por link a partir do site.
- [ ] **AC.015.10** — A página funciona em celular — a aprovação vai acontecer com o telefone na mão.
- [ ] **AC.015.11** — `legal.ts` ganha a superfície `admin`, e `legal.test.ts` passa.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Mudança detectada | Sempre | API de voo → Servidor | Fila, pendente | `estado = 'pendente'` |
| Aprovação | Operador | Console → Servidor | Envia push | `estado = 'aprovado'`, dispara [US.014](US-014-aviso-push.md) |
| Recusa | Operador + motivo | Console → Servidor | Não envia | `estado = 'recusado'`, `motivo` obrigatório |
| Edição | Antes de aprovar | Console | Substitui o texto | `texto_final`, com `texto_original` preservado |
| Ordenação | Sempre | Console | Críticos primeiro | `ehCritico()` e depois por detecção |
| Acesso | E-mail na allowlist | Servidor | Concede | `email === ADMIN_EMAIL`, no servidor |
| Acesso | Fora da allowlist | Servidor | Recusa com mensagem idêntica | Nunca revelar que a allowlist existe |
| Modo automático | Depois de 50 aprovados | — | **Fora deste escopo** | Decisão de produto pós-G2 |
| Indexação | Sempre | Página | `noindex, nofollow` | Meta tag e cabeçalho |

---

## 5 · Notas Técnicas e Dependências

**Onde mora.** `admin/index.html`, no mesmo repositório, publicado no mesmo
domínio. HTML, CSS e JavaScript simples, no padrão de `app/index.html` — que já
implementa a entrada por código de 6 dígitos e pode ser copiado quase inteiro.

**Por que não é React Native.** Três motivos, em ordem: iria para a loja junto; a
revisão da Apple veria tela de administração; e o console precisa ser alterável
em minutos, sem build.

**Autorização — o ponto crítico.** A allowlist é verificada **no servidor**, na
política de acesso à tabela. Verificação no cliente é decoração: qualquer pessoa
com o código de outra conta chamaria a API diretamente.

**Segurança e Privacidade.**

- Allowlist de um e-mail, no servidor.
- Nenhum dado sensível: sem `pnr`, `seat`, `sequence`, sobrenome ou anexos.
- `noindex`, sem link a partir das páginas públicas.
- Registro de auditoria com quem, quando e os dois textos.
- A política de privacidade precisa dizer que uma pessoa pode ler dados de
  viagem para revisar avisos. Não dizer isso é o problema; dizer é simples.

**Testes.** A lógica de ordenação e criticidade já está em `mudanca.ts`, no
domínio, testada. O console consome. O que se testa aqui manualmente: acesso
negado fora da allowlist, e o campo de motivo bloqueando a recusa vazia.

**Feature Flag.** `avisosAtivos`. Sem o F3, não há fila.

**Impacto em outras áreas.** `legal.ts` ganha `admin` em `SUPERFICIES`. A
política de privacidade ganha o parágrafo da revisão humana — item da semana 8,
com o advogado.

---

## 6 · Artefatos e Arquivos Relacionados

- **Risco que esta história mitiga:** [R4 em `plano/10-riscos.md`](../../plano/10-riscos.md)
- **Modelo de implementação:** `app/index.html` — entrada por código de 6 dígitos
- **Domínio:** `mobile/src/domain/mudanca.ts` — `ehCritico`, `tituloNotificacao`
- **Avisos:** `mobile/src/domain/legal.ts`
- **Backend:** [`05-backend.md`](../05-backend.md) — política de acesso da fila
- **Anterior:** [US.014](US-014-aviso-push.md) · **Próxima:** [US.016](US-016-socorro-o-que-mudou.md)
