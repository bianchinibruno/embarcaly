# US.001 · Pedir o código de entrada

---

## 0 · PRD

**Problema.** O aplicativo não sabe quem está usando. F1 precisa ligar um e-mail
a uma pessoa, F3 precisa saber para qual aparelho mandar o aviso, F5 precisa
saber quem pode revogar um link.

**Objetivo.** A pessoa informa o e-mail e recebe um código de 6 dígitos. Sem
senha, sem cadastro, sem confirmação de nada.

**Por que sem senha.** A política de privacidade **já publicada** diz *"não
guardamos senha porque o aplicativo não tem senha"*. A decisão DT3 não é
preferência técnica: é a consequência de um texto que está no ar.

**Métrica de sucesso.** ≥ 90% de quem pede o código entra. Código na caixa em
≤ 60 s no p95.

**Escopo.** O primeiro passo da tela `Entrar`: campo de e-mail, envio do pedido,
tratamento de erro e limite de tentativa.

**Fora de escopo.** A validação do código, que é a [US.002](US-002-entrar-validar-codigo.md).
Perfil, nome, foto, login social — nada disso existe no MVP.

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.001 |
| **Título** | Pedir o código de entrada |
| **User Story** | Eu, como **organizador que está abrindo o Embarcaly**,<br><br>Quero **informar meu e-mail e receber um código**,<br><br>Para que **eu entre sem inventar e sem lembrar de mais uma senha**. |
| **Épico Relacionado** | [EP-01 · Conta e identidade](EP-01-conta.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.001.01** | E-mail válido antes de enviar | A validação acontece no cliente antes da chamada, para não gastar quota nem tempo do usuário | **Dado que** o campo contém `ana@`,<br>**Quando** a pessoa aciona "Receber código",<br>**Então** o botão não dispara e a mensagem *"Confira o e-mail digitado"* aparece abaixo do campo |
| **RN.001.02** | Normalização do endereço | O endereço é comparado em minúsculas e sem espaços nas pontas, para que `Ana@X.com` e `ana@x.com ` sejam a mesma conta | **Dado que** a pessoa digita ` Ana@Exemplo.COM `,<br>**Quando** o pedido é enviado,<br>**Então** o servidor recebe `ana@exemplo.com` |
| **RN.001.03** | Um código por vez | Pedir de novo invalida o código anterior. Dois códigos válidos ao mesmo tempo dobram a superfície de ataque e confundem quem tem duas mensagens na caixa | **Dado que** já existe código válido para aquele e-mail,<br>**Quando** um novo é pedido,<br>**Então** o anterior deixa de funcionar imediatamente |
| **RN.001.04** | Resposta idêntica para conhecido e desconhecido | Resposta diferente revela quem tem conta no Embarcaly. É vazamento de base | **Dado que** o e-mail nunca foi visto,<br>**Quando** o código é pedido,<br>**Então** a resposta, o texto na tela e o tempo de resposta são **iguais** aos de um e-mail com conta |
| **RN.001.05** | Limite por e-mail e por IP | Sem limite, o endpoint vira ferramenta de spam contra terceiro | **Dado que** já houve 5 pedidos para o mesmo e-mail em 15 minutos,<br>**Quando** o sexto chega,<br>**Então** o servidor responde sucesso, **não envia mensagem** e registra o evento |
| **RN.001.06** | Falha de rede não perde o que foi digitado | Entrar é o primeiro contato com o produto. Perder o e-mail digitado aqui custa o usuário | **Dado que** o aparelho está sem conexão,<br>**Quando** a pessoa aciona "Receber código",<br>**Então** aparece *"Sem conexão. Tente de novo."*, o campo continua preenchido e o botão volta a ficar disponível |
| **RN.001.07** | Aviso legal na superfície | Toda superfície do produto carrega o aviso correspondente, saído de `legal.ts` | **Dado que** a tela `Entrar` está visível,<br>**Quando** a pessoa rola até o rodapé,<br>**Então** o texto exibido é exatamente `AVISO_CURTO`, com links para termos e privacidade |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.001.01** — Com e-mail válido, o código chega na caixa de entrada em até 60 segundos.
- [ ] **AC.001.02** — Com e-mail inválido, a mensagem aparece abaixo do campo e **nenhuma chamada de rede** é feita.
- [ ] **AC.001.03** — Durante o envio, o botão fica indisponível e mostra estado de carregamento; não é possível disparar dois pedidos.
- [ ] **AC.001.04** — Com o aparelho offline, a mensagem de erro aparece e o e-mail digitado permanece no campo.
- [ ] **AC.001.05** — Pedir código para e-mail sem conta produz **exatamente** a mesma tela de um e-mail com conta.
- [ ] **AC.001.06** — O campo tem `type="email"`, `inputMode="email"`, `autoComplete="email"` e abre o teclado de e-mail no celular.
- [ ] **AC.001.07** — A fonte do campo é ≥ 16px, e o iPhone não dá zoom ao focar.
- [ ] **AC.001.08** — `legal.ts` ganha a superfície `telaEntrar`, e `legal.test.ts` passa.
- [ ] **AC.001.09** — Alvo de toque do botão ≥ 44px; a tela funciona em 375px e em 1280px sem rolagem lateral.
- [ ] **AC.001.10** — Nenhum texto branco sobre laranja em nenhum estado do botão.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| E-mail malformado | — | Frontend | Mensagem no campo, sem rede | `emailValido(v) === false` em `src/domain/acesso.ts` |
| E-mail válido, 1º pedido | — | Frontend → Supabase | Envia código | `signInWithOtp({ email })` |
| Pedido repetido | < 15 min, ≥ 5 vezes | Servidor | Sucesso aparente, sem envio | `contagem(email, 15min) >= 5` |
| Pedido repetido por IP | < 15 min, ≥ 20 vezes | Servidor | Sucesso aparente, sem envio | `contagem(ip, 15min) >= 20` |
| Conta inexistente | — | Servidor | Cria conta pendente e envia | Mesmo fluxo, resposta idêntica |
| Sem conexão | — | Frontend | Erro recuperável, campo preservado | `catch` de rede, `estado = 'erro-rede'` |
| Código emitido | Vigência 10 min | Servidor | Grava **hash**, nunca o código | `expira_em = agora + 10min`, `usado = false` |

---

## 5 · Notas Técnicas e Dependências

**Integrações.** Supabase Auth, `signInWithOtp`. O provedor de e-mail
transacional precisa estar configurado **na semana 5** — o remetente padrão do
Supabase cai em spam e mata a métrica de entrada.

**Domínio.** Módulo novo `src/domain/acesso.ts`:

| Função | Responsabilidade |
|---|---|
| `emailValido(v: string): boolean` | Formato |
| `normalizarEmail(v: string): string` | Minúsculas, aparado |
| `podePedir(tentativas, agora): boolean` | Limite no cliente, espelhando o do servidor |

Entra no gate de 100% automaticamente — `collectCoverageFrom` já é
`src/domain/**/*.ts`.

**Segurança e Privacidade.**

- O servidor guarda o **hash** do código. Nunca o código.
- Resposta e **tempo de resposta** idênticos para conhecido e desconhecido.
- O e-mail digitado não vai para log de analytics, nem em evento, nem em erro.
- O e-mail não entra em URL, query string ou fragmento.

**Testes.** `acesso.test.ts` cobre os três casos de formato, a normalização com
espaço e maiúscula, e a fronteira do limite — 4 tentativas passa, 5 bloqueia.

**Feature Flag.** Não se aplica; sem a conta o resto do MVP não funciona.

**Impacto em outras áreas.** A partir daqui a política de privacidade publicada
precisa de revisão: passa a existir um dado no servidor. É item da semana 8, com
o advogado, e está no risco 3 do [EP-01](EP-01-conta.md).

---

## 6 · Artefatos e Arquivos Relacionados

- **Protótipo funcional já escrito:** `app/index.html` — layout, campo e rodapé já implementados e publicados
- **Decisão:** DT3 e DT4 em [`00-decisoes-tecnicas.md`](../00-decisoes-tecnicas.md)
- **Backend:** [`05-backend.md`](../05-backend.md) — contrato do endpoint e formato de erro
- **Avisos:** `mobile/src/domain/legal.ts`, `mobile/src/domain/__tests__/legal.test.ts`
- **Política publicada:** [`privacidade/index.html`](../../privacidade/index.html)
