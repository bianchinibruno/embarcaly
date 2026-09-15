# US.017 · Entender e contratar o acompanhamento

---

## 0 · PRD

**Problema.** O produto tem uma camada que se cobra — o acompanhamento da viagem,
com aviso de mudança e motor de direitos — e nenhum lugar onde isso seja
explicado a quem já está usando o organizador.

**Objetivo.** Uma tela que explica o que muda quando a viagem é acompanhada, e
leva para a contratação — **sem mostrar preço e sem cobrar dentro do aplicativo**.

**A decisão que define esta história.**

> **DT6 · O dinheiro entra pela web, não pela loja.**

A Apple proíbe vender bem digital fora do billing dela, e proíbe até **linkar**
para fora de dentro do app. O aplicativo lê um booleano — `trip.acompanhada` — e
nunca menciona valor. Quebrar isso é rejeição na revisão, e rejeição custa
semanas.

**O momento, que é metade da história.** A oferta aparece em **D-7**. Em D-60,
na hora do cadastro, a pessoa ainda não sente ansiedade nenhuma e a viagem não
está montada. Em D-7 a cadeia existe, a véspera se aproxima, e a frase que o ICP
usa — *"eu não durmo direito na véspera do voo"* — está a sete dias de acontecer.

**Métrica de sucesso.** ≥ 8% de conversão da oferta em D-7.

**Escopo.** O momento, a explicação, a saída para a web, e o estado de viagem já
acompanhada.

**Fora de escopo.** Pagamento, preço, plano, cupom. Nada disso existe dentro do
aplicativo.

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.017 |
| **Título** | Entender e contratar o acompanhamento |
| **User Story** | Eu, como **organizador a uma semana de embarcar com a família**,<br><br>Quero **entender o que o Embarcaly faz se algo der errado na viagem**,<br><br>Para que **eu decida se quero essa rede de segurança antes de sair de casa**. |
| **Épico Relacionado** | [EP-05 · Acompanhar e compartilhar](EP-05-compartilhar.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.017.01** | A oferta aparece em D-7 | Antes disso a pessoa não sente a dor, e a oferta vira ruído | **Dado que** faltam 7 dias para o início da viagem,<br>**Quando** a lista de viagens é aberta,<br>**Então** um convite discreto aparece no cartão daquela viagem |
| **RN.017.02** | Nunca mais de um convite por viagem | Insistir converte menos e irrita mais | **Dado que** a pessoa dispensou o convite,<br>**Quando** ela abre o aplicativo de novo,<br>**Então** o convite não reaparece, e a tela continua acessível pelo menu da viagem |
| **RN.017.03** | A tela não menciona valor | DT6. É requisito de publicação, não preferência | **Dado que** a tela `Acompanhar` está aberta,<br>**Quando** a pessoa lê,<br>**Então** não há preço, plano, moeda nem botão de pagar |
| **RN.017.04** | A explicação é o que muda, não o que é | Lista de funcionalidade não vende; consequência vende | **Dado que** a tela é lida,<br>**Quando** a pessoa chega ao meio,<br>**Então** vê três consequências concretas: aviso quando o voo muda, o que isso derruba na viagem, e o que a companhia deve naquele momento |
| **RN.017.05** | A saída é para o navegador | A Apple proíbe o link direto de pagamento dentro do app; a ponte é uma página informativa | **Dado que** a pessoa aciona "Quero acompanhar esta viagem",<br>**Quando** a ação ocorre,<br>**Então** o navegador abre em `embarcaly.com`, numa página que explica e conduz |
| **RN.017.06** | Voltar já acompanhada é percebido | Quem pagou precisa ver que pagou | **Dado que** a contratação foi concluída na web,<br>**Quando** a pessoa volta ao aplicativo,<br>**Então** a viagem aparece como acompanhada, sem que ela precise fazer nada |
| **RN.017.07** | Nada é prometido | `AVISO_RESULTADO` e `AVISO_ATIVIDADE` valem com mais força numa tela de venda | **Dado que** a tela apresenta o benefício,<br>**Quando** a pessoa lê o rodapé,<br>**Então** vê que o Embarcaly não é escritório de advocacia, não intermedeia e não garante resultado |
| **RN.017.08** | Viagem já acompanhada tem outra tela | Oferecer de novo a quem já pagou é o erro mais caro de confiança | **Dado que** `trip.acompanhada` é verdadeiro,<br>**Quando** a tela é aberta,<br>**Então** ela mostra o que está ativo e até quando, sem nenhuma oferta |
| **RN.017.09** | O acesso é por viagem, e o aplicativo só lê | Guardar regra de cobrança no cliente é guardar regra onde ela pode ser alterada | **Dado que** o aplicativo precisa saber se a viagem é acompanhada,<br>**Quando** ele consulta,<br>**Então** lê um booleano vindo do servidor e **não** calcula nada sobre pagamento |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.017.01** — O convite aparece exatamente em D-7 e não antes.
- [ ] **AC.017.02** — Dispensado uma vez, não reaparece; a tela continua acessível pelo menu.
- [ ] **AC.017.03** — Nenhum preço, moeda, plano ou botão de pagamento na tela — em nenhum estado.
- [ ] **AC.017.04** — As três consequências estão descritas em linguagem de resultado.
- [ ] **AC.017.05** — A ação abre o navegador externo, e o aplicativo permanece onde estava.
- [ ] **AC.017.06** — Depois da contratação, voltar ao aplicativo mostra a viagem como acompanhada, sem ação manual.
- [ ] **AC.017.07** — A tela exibe `AVISO_ATIVIDADE` e `AVISO_RESULTADO` de `legal.ts`.
- [ ] **AC.017.08** — Viagem já acompanhada apresenta o estado ativo, sem oferta.
- [ ] **AC.017.09** — `trip.acompanhada` é lido do servidor; nenhuma lógica de cobrança existe no cliente.
- [ ] **AC.017.10** — Teste afirma que a tela não contém `R$`, `preço`, `plano` nem `assinatura`.
- [ ] **AC.017.11** — Toques ≥ 44px; nenhum texto branco sobre laranja.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Convite | `trip.start - agora` entre 6 e 8 dias | Domínio | Mostra no cartão | `ehJanelaDeOferta(trip, agora)` |
| Convite | Fora da janela | Domínio | Nada | — |
| Convite | Já dispensado | Cliente | Nada | `trip.ofertaDispensada === true` |
| Convite | `trip.acompanhada === true` | Cliente | Nada | Nunca oferecer a quem já tem |
| Abrir a tela | Qualquer momento | Frontend | Explicação | Acessível pelo menu da viagem |
| Contratar | Toque | Navegador | Página web | `Linking.openURL` com identificador da viagem |
| Retorno | App volta ao primeiro plano | Cliente → Servidor | Reconsulta o estado | `AppState` → `active` |
| Estado ativo | `acompanhada === true` | Servidor | Mostra o que está ativo | Booleano, nunca calculado no cliente |
| Preço | Sempre | — | **Não existe no app** | Requisito de publicação |

---

## 5 · Notas Técnicas e Dependências

**Tipos.** `Trip.acompanhada?: boolean` e `Trip.ofertaDispensada?: boolean`,
gravados no banco local e sincronizados. Entram na migração `SCHEMA_VERSION`
2 → 3, com espelho em `repo.web.ts`.

**Domínio.** `src/domain/acesso.ts` ganha:

| Função | Responsabilidade |
|---|---|
| `ehJanelaDeOferta(trip, agora): boolean` | A janela de D-7 |
| `podeOferecer(trip, agora): boolean` | Janela **e** não dispensada **e** não acompanhada |

`podeOferecer` existe como função única para que nenhuma tela reimplemente a
condição — é a diferença entre oferecer no momento certo e oferecer a quem já
pagou. Está na lista de módulos críticos do plano com a consequência escrita:
*"cobrar de quem já pagou"*.

**A janela é de 6 a 8 dias, não exatamente 7.** Quem não abre o aplicativo no dia
exato nunca veria a oferta. A janela absorve isso, e a regra de "uma vez só"
impede que vire insistência.

**Segurança e Privacidade.** O identificador da viagem vai na URL da página de
contratação. **É identificador opaco, nunca o nome da viagem nem o destino** —
URL entra em histórico do navegador e em log de servidor.

**Conformidade com a loja.** O ponto mais sensível do épico:

| Proibido dentro do app | Permitido |
|---|---|
| Preço, moeda, plano | Explicar o que o acompanhamento faz |
| Botão de pagar | Ação que abre o navegador |
| Link direto para checkout | Link para página informativa |
| "Assine por R$ X" | "Quero acompanhar esta viagem" |

**Testes.** `acesso.test.ts` cobre a janela em 5, 6, 7, 8 e 9 dias; viagem já
acompanhada; oferta já dispensada; viagem que já começou.

**Feature Flag.** `ofertaAtiva`. Se a cobrança não estiver pronta na semana 9, a
tela some sem afetar mais nada.

**Impacto em outras áreas.** `TripsScreen` ganha o convite no cartão. A página de
contratação em `embarcaly.com` é trabalho de landing, não de aplicativo, e
precisa existir antes desta história ser considerada pronta.

---

## 6 · Artefatos e Arquivos Relacionados

- **Decisão:** DT6 em [`00-decisoes-tecnicas.md`](../00-decisoes-tecnicas.md)
- **Preço:** [`vendas/01-precificacao.md`](../../vendas/01-precificacao.md) — três formas, valores em definição
- **Telas:** `mobile/src/screens/TripsScreen.tsx`
- **Avisos:** `mobile/src/domain/legal.ts`
- **Landing:** [`index.html`](../../index.html)
- **Próxima:** [US.018 · Gerar, conferir e revogar o link](US-018-compartilhar.md)
