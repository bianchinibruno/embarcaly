# US.005 · Ver e copiar o endereço de importação

---

## 0 · PRD

**Problema.** O aplicativo tem CRUD manual completo — e é por isso que não tem
usuário. Doze campos por reserva, oito reservas por viagem. O consumidor não
digita.

**Objetivo.** A pessoa descobre, sem ler manual, que basta encaminhar a
confirmação da companhia para um endereço de e-mail.

**Por que isso é história e não um texto na tela.** Porque o mecanismo inteiro
depende de a pessoa entender uma instrução que ela nunca viu em outro aplicativo.
Se a instrução não for óbvia no primeiro contato, o F1 não existe — e o F1 é o
primeiro item do MVP exatamente por isso.

**Métrica de sucesso.** ≥ 60% das viagens novas nascem de importação. Endereço
copiado em um toque.

**Escopo.** Onde a ação vive, o endereço, a cópia, a instrução e o que fazer no
computador.

**Fora de escopo.** A fila do que chegou, que é a [US.006](US-006-importar-fila.md).
A revisão, que é a [US.007](US-007-revisar-confirmar.md).

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.005 |
| **Título** | Ver e copiar o endereço de importação |
| **User Story** | Eu, como **organizador com oito confirmações na caixa de entrada**,<br><br>Quero **encaminhar cada e-mail para um endereço do Embarcaly**,<br><br>Para que **a viagem se monte sozinha e eu não preencha oito formulários**. |
| **Épico Relacionado** | [EP-02 · Entrada sem digitação](EP-02-importacao.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.005.01** | A ação aparece onde a viagem está vazia | Instrução em tela de configuração não é lida. Ela precisa estar onde a falta é sentida | **Dado que** a viagem não tem nenhuma reserva,<br>**Quando** o itinerário é aberto,<br>**Então** "Importar por e-mail" aparece como ação principal do estado vazio, acima do cadastro manual |
| **RN.005.02** | Um endereço por conta, não por viagem | Endereço por viagem obriga a pessoa a voltar ao app antes de cada encaminhamento, e o ganho todo se perde | **Dado que** a pessoa tem três viagens,<br>**Quando** ela abre `Importar` em qualquer uma,<br>**Então** o endereço mostrado é o mesmo |
| **RN.005.03** | Copiar em um toque, com retorno visível | Selecionar texto no celular é difícil, e sem retorno a pessoa copia duas vezes | **Dado que** a pessoa aciona "Copiar endereço",<br>**Quando** a cópia acontece,<br>**Então** o rótulo muda para "Copiado" por 2 segundos e o endereço está na área de transferência |
| **RN.005.04** | A instrução tem três passos e nenhum a mais | Instrução longa não é lida. Três passos cabem numa olhada | **Dado que** a tela `Importar` está aberta,<br>**Quando** a pessoa lê,<br>**Então** vê: abrir o e-mail da companhia · encaminhar para o endereço · voltar em alguns minutos |
| **RN.005.05** | O remetente é a identidade | A ligação entre o e-mail e a conta é o remetente. Sem isso, a reserva não sabe de quem é | **Dado que** a tela mostra o endereço,<br>**Quando** a pessoa lê a instrução,<br>**Então** ela diz claramente: encaminhe **do e-mail com que você entrou** |
| **RN.005.06** | Quais companhias funcionam, dito antes | Prometer "qualquer e-mail" e falhar destrói a confiança na primeira tentativa | **Dado que** a tela está aberta,<br>**Quando** a pessoa lê,<br>**Então** ela vê quais companhias são reconhecidas hoje e que as demais entram como reserva para completar à mão |
| **RN.005.07** | Pelo computador, o endereço vai por link | Copiar no celular e colar no computador não é caminho | **Dado que** a pessoa está no computador,<br>**Quando** aciona "Enviar para mim",<br>**Então** recebe no e-mail da conta uma mensagem com o endereço pronto para encaminhar |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.005.01** — Viagem sem reservas exibe "Importar por e-mail" como ação principal do estado vazio.
- [ ] **AC.005.02** — O endereço aparece em Plex Mono, legível, e não quebra no meio em 375px.
- [ ] **AC.005.03** — "Copiar endereço" copia e mostra "Copiado" por 2 segundos, em Android, iPhone e computador.
- [ ] **AC.005.04** — A instrução tem exatamente três passos.
- [ ] **AC.005.05** — A tela diz que o encaminhamento precisa sair do e-mail da conta.
- [ ] **AC.005.06** — A lista de companhias reconhecidas está visível e é lida de uma constante única, não escrita na tela.
- [ ] **AC.005.07** — "Enviar para mim" envia a mensagem e confirma na tela.
- [ ] **AC.005.08** — A tela exibe `AVISO_CALCULO` de `legal.ts` — o que é importado é proposta, não fato confirmado.
- [ ] **AC.005.09** — Toques ≥ 44px; 375px e 1280px sem rolagem lateral.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Itinerário vazio | `items.length === 0` | Frontend | Ação principal de importação | Estado vazio do `ItineraryScreen` |
| Itinerário com itens | `items.length > 0` | Frontend | Ação secundária no cabeçalho | Sempre acessível, nunca escondida |
| Copiar | Toque | Cliente | Área de transferência + retorno | `Clipboard.setStringAsync`; rótulo volta em 2000 ms |
| Enviar para mim | Toque | Servidor | E-mail com o endereço | `POST /importacao/lembrete` |
| Endereço | Por conta | Servidor | `viagem+<id>@embarcaly.com` | Sufixo derivado da conta, não sequencial |
| Companhias reconhecidas | Semana 6 | Constante | Latam, Gol | `REMETENTES` em `src/domain/importacao.ts` |
| Companhia não reconhecida | — | Servidor | Entra como proposta incompleta | Vai para a fila com `needs` preenchido |

---

## 5 · Notas Técnicas e Dependências

**Integrações.** A entrada de e-mail **não é Supabase e não existe ainda**.
Cloudflare Email Routing ou *inbound* do Postmark. **Contratar na semana 5**, não
na 6 — é o item de maior risco de prazo do épico.

**Endereço.** `viagem+<sufixo>@embarcaly.com`, com sufixo derivado da conta e não
sequencial. Sufixo sequencial permite adivinhar o endereço de outra pessoa e
injetar reserva na viagem alheia.

**Domínio.** `src/domain/importacao.ts`:

| Função | Responsabilidade |
|---|---|
| `enderecoDaConta(sufixo: string): string` | Monta o endereço |
| `REMETENTES` | Lista das companhias reconhecidas, com o padrão de cada uma |
| `reconhece(remetente: string): boolean` | Casa o remetente com a lista |

A lista de companhias na tela é **lida da constante**. Escrita na tela, ela
diverge do parser no dia em que alguém mexer num dos dois.

**Segurança e Privacidade.** O endereço é dado da conta e não vai para analytics.
A tela precisa deixar claro que **encaminhar um e-mail envia o conteúdo dele** —
incluindo anexos — para o Embarcaly. Está no consentimento e precisa estar na
política.

**Testes.** `importacao.test.ts` cobre a montagem do endereço e o casamento de
remetente, incluindo maiúsculas, subdomínio e remetente parecido mas diferente —
o caso que separa `latam.com` de `latam.com.br.atacante.com`.

**Feature Flag.** `importacaoAtiva`. Se a entrada de e-mail não ficar pronta na
semana 6, a tela some e o CRUD manual segue funcionando inteiro.

**Impacto em outras áreas.** `ItineraryScreen` ganha a ação no estado vazio.
`privacidade/index.html` precisa cobrir o processamento de e-mail encaminhado.

---

## 6 · Artefatos e Arquivos Relacionados

- **Épico:** [EP-02](EP-02-importacao.md)
- **MVP:** [`plano/05-mvp.md`](../../plano/05-mvp.md) — F1 e o porquê de ser o primeiro
- **Backend:** [`05-backend.md`](../05-backend.md)
- **Telas:** `mobile/src/screens/ItineraryScreen.tsx`
- **Próxima:** [US.006 · Acompanhar a fila do que chegou](US-006-importar-fila.md)
