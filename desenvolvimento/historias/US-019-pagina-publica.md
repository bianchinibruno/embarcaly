# US.019 · Acompanhar a viagem sem app e sem conta

---

## 0 · PRD

**Problema.** Quem recebe o link é, tipicamente, a mãe do organizador com um
celular de quatro anos e uma conexão instável. Ela não vai instalar aplicativo,
não vai criar conta, e não vai esperar oito segundos de carregamento.

**Objetivo.** Uma página que abre rápido, mostra onde a viagem está agora, e
funciona sem nada instalado.

**A decisão que define esta história.**

> **DT2 · O link público é página estática, fora do Expo.**

Quem recebe o link não pode baixar React Native para ler um itinerário. É HTML,
em `acompanhar/`, com orçamento de peso verificado pelo CI. A página existe para
abrir rápido na mão de alguém que não pediu nada.

**E o segundo objetivo, que não se anuncia.** A pessoa que recebe o link é o
próximo cliente. A página precisa ser boa o suficiente para dar vontade, sem
virar anúncio.

**Métrica de sucesso.** ≤ 30 kB comprimido. ≥ 10% de quem abre o link visita o
site do produto.

**Escopo.** A página, o estado de agora, os quatro estados de erro, e o convite
discreto.

**Fora de escopo.** Edição, comentário, confirmação de presença, conta para quem
recebe.

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.019 |
| **Título** | Acompanhar a viagem sem app e sem conta |
| **User Story** | Eu, como **mãe de quem está viajando**,<br><br>Quero **abrir um link e ver onde eles estão agora**,<br><br>Para que **eu fique tranquila sem ficar perguntando no WhatsApp**. |
| **Épico Relacionado** | [EP-05 · Acompanhar e compartilhar](EP-05-compartilhar.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.019.01** | Abre em menos de 2 segundos em rede ruim | É a única exigência de desempenho do produto inteiro, e é o que decide se a página é usada | **Dado que** a conexão é 3G lenta,<br>**Quando** o link é aberto,<br>**Então** o conteúdo aparece em até 2 segundos |
| **RN.019.02** | A primeira coisa é onde eles estão agora | Itinerário completo no topo obriga a procurar. A pergunta é sempre "e agora?" | **Dado que** o voo está no ar,<br>**Quando** a página abre,<br>**Então** o topo diz o que está acontecendo agora e o que vem em seguida |
| **RN.019.03** | Nenhum dado sensível | O snapshot é whitelist, e a página só sabe ler o que recebeu | **Dado que** a página está renderizada,<br>**Quando** o conteúdo é inspecionado,<br>**Então** não há localizador, assento, número de bilhete, sobrenome nem anexo — nem na tela, nem no código-fonte |
| **RN.019.04** | Sem conta, sem cadastro, sem cookie de rastreio | Pedir qualquer coisa a quem recebeu um link é quebrar a promessa do link | **Dado que** a página é aberta,<br>**Quando** ela carrega,<br>**Então** não há formulário, login nem cookie além do estritamente funcional |
| **RN.019.05** | Não é indexável | Itinerário em buscador é vazamento, mesmo com token | **Dado que** um buscador rastreia,<br>**Quando** ele chega à página,<br>**Então** encontra `noindex, nofollow` |
| **RN.019.06** | Token inválido, revogado e expirado são estados, não erros | Tela de erro técnico assusta quem não pediu nada | **Dado que** o token não vale mais,<br>**Quando** a página abre,<br>**Então** ela explica em uma frase comum que o acompanhamento terminou, com o logo e sem código de erro |
| **RN.019.07** | Atualiza sozinha enquanto aberta | Quem deixa a página aberta quer acompanhar, e recarregar na mão é atrito | **Dado que** a página está aberta,<br>**Quando** passam 60 segundos,<br>**Então** ela busca a versão nova e atualiza o bloco do agora |
| **RN.019.08** | Horário local de cada trecho | Quem está em Porto Alegre vendo um voo em Lisboa precisa saber de qual horário se fala | **Dado que** um trecho é internacional,<br>**Quando** o horário aparece,<br>**Então** vem com a indicação do fuso, sem conversão silenciosa |
| **RN.019.09** | O convite é discreto e no fim | Anúncio no topo transforma tranquilidade em propaganda | **Dado que** a pessoa chega ao fim da página,<br>**Quando** ela lê,<br>**Então** vê uma linha discreta sobre o Embarcaly, com link, e nada mais |
| **RN.019.10** | A identidade visual é a mesma | É o primeiro contato de alguém com a marca | **Dado que** a página é renderizada,<br>**Quando** comparada às demais,<br>**Então** usa a paleta v3, Poppins e Plex Mono para número |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.019.01** — Página + dados ≤ **30 kB comprimido**, verificado por passo de CI que falha acima disso.
- [ ] **AC.019.02** — Conteúdo visível em ≤ 2 s em 3G lenta simulada.
- [ ] **AC.019.03** — O bloco "agora" é o primeiro elemento abaixo do cabeçalho.
- [ ] **AC.019.04** — Nenhum dado sensível no HTML, no JSON ou em qualquer resposta de rede.
- [ ] **AC.019.05** — Nenhum formulário, login ou cookie de rastreio.
- [ ] **AC.019.06** — `noindex, nofollow` presentes em meta tag e em cabeçalho HTTP.
- [ ] **AC.019.07** — Token inválido, revogado e expirado apresentam a mesma tela calma, sem código de erro.
- [ ] **AC.019.08** — A página atualiza sozinha a cada 60 s enquanto visível, e para quando a aba perde o foco.
- [ ] **AC.019.09** — Horários trazem indicação de fuso nos trechos internacionais.
- [ ] **AC.019.10** — O convite aparece uma vez, no fim, em uma linha.
- [ ] **AC.019.11** — Funciona em 375px e em 1280px, e em navegador de celular antigo.
- [ ] **AC.019.12** — Contraste conferido; nenhum texto branco sobre laranja.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Abrir com token | Fragmento presente | Página | Busca o snapshot | `location.hash` → `GET /publico/:token` |
| Sem token | Fragmento vazio | Página | Tela "link incompleto" | Sem chamada de rede |
| Token válido | Não revogado, não expirado | Servidor | Devolve snapshot | Verificação **no servidor** |
| Token revogado | `revogado === true` | Servidor | 404 genérico | Nunca distinguir de inexistente |
| Token expirado | `agora > trip.end + 48 h` | Servidor | 404 genérico | Mesma resposta |
| Token inexistente | — | Servidor | 404 genérico | Mesma resposta, mesmo tempo |
| Bloco "agora" | Viagem em andamento | Página | Item atual e próximo | Mesma lógica de `derive.ts` |
| Antes do início | `agora < trip.start` | Página | Contagem para o embarque | — |
| Depois do fim | `agora > trip.end` | Página | "Viagem concluída" | Até a expiração do token |
| Atualização | Aba visível | Página | A cada 60 s | `document.visibilityState === 'visible'` |
| Indexação | Sempre | Página | Bloqueada | Meta + cabeçalho `X-Robots-Tag` |

---

## 5 · Notas Técnicas e Dependências

**Onde mora.** `acompanhar/index.html`, no mesmo repositório, publicado no mesmo
domínio. HTML, CSS e JavaScript simples, no padrão de `app/index.html` e
`privacidade/index.html`.

**Orçamento de peso — 30 kB comprimido.** É requisito, não meta. Um passo de CI
mede e falha acima disso. Sem o passo, o orçamento vira intenção e a página
engorda em três semanas. O que cabe: HTML, CSS embutido, JavaScript mínimo. O que
não cabe: biblioteca de interface, fonte web, ícone em imagem.

**Fontes.** A página usa a família do sistema com fallback para Poppins **se já
estiver em cache**. Baixar duas fontes estoura o orçamento e atrasa o primeiro
conteúdo — exatamente o que a `RN.019.01` proíbe.

**Reuso de lógica.** A lógica do "agora" é a mesma de `src/domain/derive.ts` e
`timeline.ts`, e a página é JavaScript puro fora do bundle. Duas implementações
divergem. **O servidor calcula e o snapshot já chega com o bloco do agora
resolvido** — é a única solução que mantém uma fonte de verdade e ainda reduz o
peso da página.

**Segurança e Privacidade.**

- 404 idêntico para revogado, expirado e inexistente — inclusive no tempo de
  resposta.
- Nenhum cookie de rastreio, nenhum analytics de terceiro.
- `noindex` em meta tag **e** em cabeçalho HTTP.
- O token fica no fragmento e nunca é enviado em cabeçalho `Referer`.

**Testes.** O snapshot vem de `publico.ts`, testado na
[US.018](US-018-compartilhar.md). Aqui, o que o CI verifica é o **peso**. O
resto é conferência manual: os três estados de token, as três fases da viagem, e
a abertura em rede lenta.

**Feature Flag.** `compartilharAtivo`.

**Impacto em outras áreas.** `legal.ts` ganha `paginaPublica` em `SUPERFICIES`.
A política de privacidade precisa cobrir o que é publicado e por quanto tempo.

---

## 6 · Artefatos e Arquivos Relacionados

- **Snapshot:** [US.018](US-018-compartilhar.md), `mobile/src/domain/publico.ts`
- **Modelo de página:** `app/index.html`, `privacidade/index.html`
- **Lógica do agora:** `mobile/src/domain/derive.ts`, `timeline.ts`
- **Marca:** [`brand/IDENTIDADE.md`](../../brand/IDENTIDADE.md)
- **Avisos:** `mobile/src/domain/legal.ts`
