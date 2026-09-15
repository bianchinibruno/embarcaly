# US.002 · Validar o código e abrir o app

---

## 0 · PRD

**Problema.** O código chegou. O momento entre ler o código na caixa de entrada e
estar dentro do aplicativo é onde a maioria dos fluxos sem senha perde gente:
digitação em seis caixas separadas, preenchimento automático que não funciona,
código que expirou sem avisar.

**Objetivo.** A pessoa digita ou cola os seis dígitos e entra. Em iPhone, o
preenchimento automático do código do e-mail funciona de primeira.

**Por que isso merece história própria.** A US.001 é um formulário. Esta é onde
mora o defeito real — e um defeito conhecido: `maxlength="1"` descarta os
dígitos extras **antes de o JavaScript vê-los**, que é exatamente o caminho do
preenchimento automático do iOS. O protótipo em `app/index.html` já resolve isso
com a função `distribuir()`, e a solução precisa sobreviver ao porte.

**Métrica de sucesso.** ≥ 90% de quem pede o código entra. Colar o código de uma
vez funciona em Android, iPhone e computador.

**Escopo.** Os seis campos, colagem, preenchimento automático, erro, expiração,
reenvio e a sessão que persiste.

**Fora de escopo.** Biometria, "lembrar deste aparelho" com prazo configurável,
múltiplos aparelhos com nome.

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.002 |
| **Título** | Validar o código e abrir o app |
| **User Story** | Eu, como **organizador que acabou de receber o código**,<br><br>Quero **informar os seis dígitos e entrar direto**,<br><br>Para que **eu comece a usar o aplicativo sem tropeçar na porta**. |
| **Épico Relacionado** | [EP-01 · Conta e identidade](EP-01-conta.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.002.01** | Colar o código inteiro distribui pelos campos | Nenhum campo pode ter `maxlength="1"`: o limite descarta os dígitos extras antes do código rodar, e é o mesmo caminho do preenchimento automático do iOS | **Dado que** o foco está no primeiro campo,<br>**Quando** a pessoa cola `481902`,<br>**Então** cada campo recebe um dígito, o foco vai para o último e a validação dispara |
| **RN.002.02** | Só dígito entra | Letra, espaço e sinal são descartados na entrada, não rejeitados depois | **Dado que** a pessoa digita `4a8`,<br>**Quando** o texto é processado,<br>**Então** os campos ficam com `4` e `8` |
| **RN.002.03** | Apagar volta um campo | Apagar num campo vazio move o foco para o anterior, que é o comportamento esperado de campo segmentado | **Dado que** o terceiro campo está vazio e em foco,<br>**Quando** a pessoa aciona apagar,<br>**Então** o foco vai para o segundo e o conteúdo dele é apagado |
| **RN.002.04** | Seis dígitos disparam sozinhos | Preenchido o sexto, não há razão para exigir um toque a mais | **Dado que** os seis campos estão preenchidos,<br>**Quando** o último recebe o dígito,<br>**Então** a validação é enviada sem toque adicional |
| **RN.002.05** | Código errado não diz qual erro | Distinguir "código errado" de "código expirado" entrega informação a quem está tentando adivinhar | **Dado que** o código está errado **ou** expirado,<br>**Quando** a validação volta,<br>**Então** a mensagem é a mesma: *"Código inválido ou expirado. Peça outro."* |
| **RN.002.06** | Cinco tentativas e o código morre | Seis dígitos são um milhão de combinações; sem limite, é força bruta viável | **Dado que** houve 5 tentativas erradas para o mesmo código,<br>**Quando** a sexta chega,<br>**Então** o código é invalidado e a pessoa precisa pedir outro |
| **RN.002.07** | Uso único | Um código que continua valendo depois de usado é um código que vale para quem leu o e-mail depois | **Dado que** o código já foi usado com sucesso,<br>**Quando** ele é enviado de novo,<br>**Então** é recusado como inválido |
| **RN.002.08** | Reenviar tem espera visível | Sem espera, a pessoa martela o botão e cai no limite da US.001 sem entender por quê | **Dado que** o código foi enviado há menos de 60 segundos,<br>**Quando** a pessoa olha o botão "Enviar de novo",<br>**Então** ele está indisponível com a contagem regressiva visível |
| **RN.002.09** | A sessão sobrevive a fechar o app | Pedir código toda vez é a forma mais rápida de perder o usuário | **Dado que** a pessoa entrou com sucesso,<br>**Quando** ela fecha e reabre o aplicativo,<br>**Então** ela continua dentro, sem novo código |
| **RN.002.10** | Voltar ao e-mail não perde o passo | Errar o e-mail digitado é comum, e corrigir precisa custar um toque | **Dado que** a tela está no passo do código,<br>**Quando** a pessoa aciona "Trocar e-mail",<br>**Então** volta ao passo anterior com o endereço preenchido e editável |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.002.01** — Colar `481902` no primeiro campo preenche os seis e dispara a validação, em Android, iPhone e computador.
- [ ] **AC.002.02** — No iPhone, o código sugerido pelo sistema acima do teclado preenche os seis campos de uma vez.
- [ ] **AC.002.03** — Digitar rápido os seis dígitos não perde nenhum caractere.
- [ ] **AC.002.04** — Código errado mostra a mensagem única e **não** limpa os campos antes de a pessoa ler.
- [ ] **AC.002.05** — Na sexta tentativa errada, o código é invalidado e a tela orienta a pedir outro.
- [ ] **AC.002.06** — "Enviar de novo" só fica disponível após 60 segundos, com contagem visível.
- [ ] **AC.002.07** — Após entrar, fechar e reabrir o aplicativo mantém a sessão.
- [ ] **AC.002.08** — "Trocar e-mail" volta ao passo anterior com o endereço preservado.
- [ ] **AC.002.09** — O campo tem `autoComplete="one-time-code"` e `inputMode="numeric"`.
- [ ] **AC.002.10** — Leitor de tela anuncia o passo, o erro e a contagem do reenvio.
- [ ] **AC.002.11** — A tela fica centralizada em 375px e em 1280px, usando `min-height: 100dvh`.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Entrada multi-dígito | Colagem ou preenchimento automático | Frontend | Distribui pelos campos | `distribuir(inicio, texto)` — remove `\D`, preenche a partir de `inicio` |
| Entrada parcial | < 6 dígitos | Frontend | Aguarda | `preenchidos < 6` |
| Entrada completa | = 6 dígitos | Frontend → Supabase | Valida | `verifyOtp({ email, token, type: 'email' })` |
| Código correto | Dentro de 10 min, não usado | Servidor | Sessão e navegação para `Tabs` | `hash(codigo) === guardado AND agora < expira_em AND usado === false` |
| Código errado | Tentativas < 5 | Servidor | Erro genérico, incrementa | `tentativas += 1` |
| Código errado | Tentativas = 5 | Servidor | Invalida o código | `usado = true`, erro genérico |
| Código expirado | `agora ≥ expira_em` | Servidor | **Mesmo** erro genérico | Nunca distinguir de "errado" |
| Reenvio | < 60 s do último | Frontend | Botão indisponível | `agora - enviadoEm < 60_000` |
| Sessão | Existe e válida | Cliente | Pula a tela `Entrar` | Sessão persistida; na web, `localStorage` |

---

## 5 · Notas Técnicas e Dependências

**Integrações.** Supabase Auth, `verifyOtp`.

**Domínio.** `src/domain/acesso.ts` ganha:

| Função | Responsabilidade |
|---|---|
| `distribuir(caixas: string[], inicio: number, texto: string): string[]` | Pura. Recebe o estado atual e o texto colado, devolve o novo estado |
| `codigoCompleto(caixas: string[]): boolean` | Seis posições preenchidas |
| `podeReenviar(enviadoEm: number, agora: number): boolean` | Fronteira dos 60 s |

`distribuir` é função pura de propósito: ela é o coração do defeito conhecido e
precisa de teste, não de inspeção visual.

**Segurança e Privacidade.**

- O código **nunca** entra em log, evento de analytics ou mensagem de erro.
- Mensagem única para errado e expirado — `RN.002.05`.
- O token de sessão não vai para URL em nenhuma circunstância.
- Em aparelho compartilhado, a sessão persiste. `Sair` na [US.003](US-003-conta-sair.md) precisa limpar sessão, localStorage **e** IndexedDB.

**Testes.** `acesso.test.ts` cobre: colar 6 a partir da posição 0; colar 6 a
partir da posição 2 (transborda e para no limite); colar com letras no meio;
colar string vazia (limpa a caixa atual); 5 e 6 dígitos na fronteira de
`codigoCompleto`; 59 s e 60 s na fronteira de `podeReenviar`.

**Feature Flag.** Não se aplica.

**Impacto em outras áreas.** Depois de entregue, `app/index.html` deixa de ser a
tela de entrada e vira redirecionamento para o app exportado — item final da
[US.000](US-000-export-web.md), e nesta ordem.

---

## 6 · Artefatos e Arquivos Relacionados

- **Implementação de referência, já escrita e publicada:** `app/index.html` — os seis campos, a função `distribuir()` e o rodapé legal
- **Decisão:** DT3 e DT4 em [`00-decisoes-tecnicas.md`](../00-decisoes-tecnicas.md)
- **Backend:** [`05-backend.md`](../05-backend.md)
- **História anterior:** [US.001](US-001-entrar-pedir-codigo.md)
- **UX:** [`03-ux.md`](../03-ux.md) — o momento de uso e acessibilidade
