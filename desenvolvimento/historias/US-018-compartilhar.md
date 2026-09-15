# US.018 · Gerar, conferir e revogar o link

---

## 0 · PRD

**Problema.** Quem ficou em casa pergunta *"a que horas vocês chegam?"* no
WhatsApp, e o organizador — que está numa fila de imigração — responde. Isso
acontece várias vezes por viagem.

**Objetivo.** Um link que o organizador manda uma vez, e que mostra a viagem em
andamento a quem recebeu. Sem aplicativo e sem conta de nenhum dos dois lados.

**Por que é barato e vale muito.** É o mecanismo de aquisição embutido: **quem
recebe o link é exatamente o próximo cliente**, porque também viaja.

**O risco que define a história.** Um itinerário compartilhado leva junto
localizador, assento, número de sequência e sobrenome — tudo o que basta para
alguém alterar ou cancelar uma reserva no site da companhia. **O link não pode
carregar nada disso.**

**Métrica de sucesso.** ≥ 30% das viagens geram link. Zero campos sensíveis no
que é publicado.

**Escopo.** Gerar, ver exatamente o que vai, compartilhar, revogar, e o prazo.

**Fora de escopo.** A página que o destinatário vê — [US.019](US-019-pagina-publica.md).
Colaboração, comentário, confirmação de presença.

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.018 |
| **Título** | Gerar, conferir e revogar o link |
| **User Story** | Eu, como **organizador viajando com a família enquanto meus pais acompanham de casa**,<br><br>Quero **mandar um link com a viagem e saber exatamente o que ele mostra**,<br><br>Para que **eles parem de perguntar no WhatsApp sem que eu exponha os dados das reservas**. |
| **Épico Relacionado** | [EP-05 · Acompanhar e compartilhar](EP-05-compartilhar.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.018.01** | O que vai é mostrado antes de gerar | Compartilhar sem saber o que se compartilha é o começo de todo arrependimento | **Dado que** a pessoa abre "Compartilhar",<br>**Quando** a tela carrega,<br>**Então** ela vê a prévia exata do que ficará visível, **antes** de gerar o link |
| **RN.018.02** | O que nunca vai, dito por escrito | Dizer o que é omitido é o que constrói confiança | **Dado que** a prévia está visível,<br>**Quando** a pessoa lê,<br>**Então** vê a lista do que **não** é compartilhado: localizador, assento, número de bilhete, sobrenome, anexos e documentos |
| **RN.018.03** | Whitelist, nunca blacklist | Com blacklist, todo campo novo em `Item` vaza por omissão no dia em que for criado | **Dado que** um campo novo é acrescentado a `Item`,<br>**Quando** o snapshot é gerado,<br>**Então** o campo **não** aparece, porque só o que está na lista permitida é copiado |
| **RN.018.04** | O token vai no fragmento da URL | Caminho de URL entra em log de servidor e em cabeçalho `Referer`; fragmento não sai do navegador | **Dado que** o link é gerado,<br>**Quando** a URL é montada,<br>**Então** ela tem a forma `embarcaly.com/acompanhar/#<token>` |
| **RN.018.05** | O link expira | Link eterno é link esquecido, e link esquecido é vazamento adiado | **Dado que** a viagem terminou há mais de 48 horas,<br>**Quando** alguém abre o link,<br>**Então** a página diz que o acompanhamento terminou |
| **RN.018.06** | Revogar é imediato e sem pergunta | Quem revoga já decidiu | **Dado que** a pessoa aciona "Encerrar link",<br>**Quando** confirma,<br>**Então** o token para de funcionar na mesma hora, para todos que o tenham |
| **RN.018.07** | Um token por viagem, regenerável | Vários tokens vivos tornam a revogação incompleta sem a pessoa perceber | **Dado que** já existe um link ativo,<br>**Quando** a pessoa gera outro,<br>**Então** o anterior é revogado e a tela avisa que o link antigo deixou de funcionar |
| **RN.018.08** | O token é imprevisível | Token adivinhável é itinerário público | **Dado que** um token é criado,<br>**Quando** ele é gerado,<br>**Então** tem ao menos 128 bits de entropia de fonte criptográfica, e não deriva do identificador da viagem |
| **RN.018.09** | Compartilhar usa a folha do sistema | Cada pessoa manda por onde quiser | **Dado que** o link foi gerado,<br>**Quando** a pessoa aciona "Compartilhar",<br>**Então** abre a folha do sistema com o link e uma frase curta |
| **RN.018.10** | Dado de acompanhante exige declaração | A viagem pode ter gente que não é usuária do produto | **Dado que** a viagem tem acompanhantes,<br>**Quando** o link é gerado,<br>**Então** a tela exibe `AVISO_DADOS` de `legal.ts` |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.018.01** — A prévia do que será visível aparece **antes** de o link existir.
- [ ] **AC.018.02** — A lista do que não é compartilhado está visível e completa.
- [ ] **AC.018.03** — `snapshotPublico()` é whitelist; teste afirma a **ausência** de `pnr`, `seat`, `sequence`, sobrenome, anexos e documentos.
- [ ] **AC.018.04** — A URL tem o token no fragmento; nenhum token aparece em caminho ou query.
- [ ] **AC.018.05** — 48 h após o fim da viagem, o link responde "acompanhamento encerrado".
- [ ] **AC.018.06** — "Encerrar link" derruba o acesso imediatamente, em outro aparelho já aberto.
- [ ] **AC.018.07** — Gerar um novo link revoga o anterior e avisa isso.
- [ ] **AC.018.08** — O token tem ≥ 128 bits de fonte criptográfica e não deriva do id da viagem.
- [ ] **AC.018.09** — "Compartilhar" abre a folha do sistema em Android, iPhone e web.
- [ ] **AC.018.10** — A tela exibe `AVISO_DADOS` de `legal.ts`.
- [ ] **AC.018.11** — Excluir a conta revoga todos os tokens ([US.004](US-004-conta-excluir.md)).
- [ ] **AC.018.12** — Cobertura de `publico.ts` em 100%.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Abrir a tela | — | Domínio | Prévia do snapshot | `snapshotPublico(trip, items)` |
| Gerar | Toque | Servidor | Cria token | 128 bits, `crypto.randomUUID` ou equivalente |
| Gerar com token ativo | Já existe | Servidor | Revoga o anterior, cria novo | Um token vivo por viagem |
| Montar URL | Após gerar | Cliente | Fragmento | `/acompanhar/#<token>` |
| Revogar | Toque | Servidor | Invalida | `revogado = true`, efeito imediato |
| Expiração | `agora > trip.end + 48 h` | Servidor | Recusa | Verificada **no servidor**, não no cliente |
| Conta excluída | — | Servidor | Revoga todos | Cascata da [US.004](US-004-conta-excluir.md) |
| Campo novo em `Item` | — | Domínio | **Não** é publicado | Whitelist em `CAMPOS_PUBLICOS` |
| Compartilhar | Toque | SO | Folha do sistema | `expo-sharing`, já é dependência |

---

## 5 · Notas Técnicas e Dependências

**Módulo novo.** `src/domain/publico.ts` — o módulo de maior consequência de
privacidade do produto:

```ts
export const CAMPOS_PUBLICOS = ['type','title','start','end',
  'from','to','fromCity','toCity','flight','operator'] as const;

export function snapshotPublico(trip: Trip, items: Item[]): SnapshotPublico;
```

**Por que whitelist.** Com blacklist, o dia em que alguém acrescentar
`Item.passaporte` o campo vai para a página pública **sem ninguém decidir isso**.
A whitelist inverte o padrão: o silêncio esconde, em vez de expor.

**O teste é escrito ao contrário.** Ele afirma a **ausência**:

```
const s = snapshotPublico(trip, items);
expect(JSON.stringify(s)).not.toContain(item.pnr);
expect(JSON.stringify(s)).not.toContain(item.seat);
// … e cada campo sensível, um por um
```

Testar presença dos campos permitidos não pegaria um campo novo vazando. Testar
ausência dos proibidos, sim.

**Tipos.** `Trip.shareToken?: string` e `SnapshotPublico` em `types.ts`. Migração
`SCHEMA_VERSION` 2 → 3, com espelho em `repo.web.ts`.

**Segurança e Privacidade.**

- Token: ≥ 128 bits, fonte criptográfica, sem relação com o id da viagem.
- No fragmento, nunca no caminho. Fragmento não é enviado ao servidor, não entra
  em log de acesso e não vaza por `Referer`.
- Expiração e revogação verificadas **no servidor**. No cliente seriam sugestão.
- A página pública não é indexável ([US.019](US-019-pagina-publica.md)).

**Testes.** `publico.test.ts` — o teste de ausência acima, com uma viagem cheia
de campos sensíveis preenchidos; viagem sem itens; item com campos opcionais
vazios; e um teste que falha de propósito se `CAMPOS_PUBLICOS` crescer sem
revisão.

**Feature Flag.** `compartilharAtivo`. Na ordem de corte, F5 é o **primeiro** a
sair, e a degradação é limpa: o resumo em texto pela folha do sistema, com
`expo-sharing`, que já é dependência.

**Impacto em outras áreas.** `TripsScreen` e `ItineraryScreen` ganham a ação.
`privacidade/index.html` precisa cobrir o compartilhamento.

---

## 6 · Artefatos e Arquivos Relacionados

- **Anterior:** [US.017](US-017-acompanhar.md) · **Próxima:** [US.019](US-019-pagina-publica.md)
- **Exclusão de conta:** [US.004](US-004-conta-excluir.md) — revogação em cascata
- **Tipos:** `mobile/src/domain/types.ts`
- **Avisos:** `mobile/src/domain/legal.ts` — `AVISO_DADOS`
- **Qualidade:** [`04-qualidade.md`](../04-qualidade.md) — por que `publico.ts` é crítico
