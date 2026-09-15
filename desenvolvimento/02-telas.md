# Telas — a ficha de cada uma

Dezessete telas e três páginas. Esta é a visão de conjunto: o que cada uma faz,
de que dado vive, e o que precisa acontecer para ela ser considerada pronta.

> **O detalhe está em [`historias/`](historias/README.md).** Aqui cabe a ficha;
> lá cabem as regras em Gherkin, os critérios de aceitação e a tabela de decisão.
> Quando os dois divergirem, **a história vence** — ela é o documento que o
> desenvolvedor lê no dia.

**Os quatro estados.** Toda tela precisa dos quatro, não só do feliz: **vazio**,
**carregando**, **erro** e **offline**. Onde a ficha abaixo não menciona um
deles, é porque ele não existe naquela tela — e isso é uma afirmação, não um
esquecimento.

---

## Mapa

| Tela | Situação | Semana |
|---|---|---|
| [Viagens](#viagens) · [Agora](#agora) · [Itinerário](#itinerário) · [Nova viagem](#nova-viagem--editar-viagem) · [Nova reserva](#nova-reserva--editar-reserva) | Prontas | — |
| [Reserva](#reserva) · [Cartões de embarque](#cartões-de-embarque) · [Docs](#docs) · [Socorro](#socorro) · [Registrar problema](#registrar-problema) | **Com dado falso** | 7, 10 |
| [Entrar](#entrar) · [Conta](#conta) · [Importar](#importar) · [Revisar importação](#revisar-importação) · [Aviso](#aviso) · [Acompanhar](#acompanhar-viagem) · [Compartilhar](#compartilhar) | **Faltam** | 5–9 |
| [Página pública](#página-pública) · [Console de aprovação](#console-de-aprovação) | **Faltam** (HTML) | 8, 9 |

---

# Prontas

Entram no MVP praticamente como estão. Mudam só quando uma história nova as
toca de raspão.

## Viagens

`TripsScreen.tsx` · aba

**Objetivo.** Escolher em qual viagem se está trabalhando. É a raiz de tudo.

| | |
|---|---|
| **Dados** | `trips` de `AppState` |
| **Vazio** | Convite para criar a primeira viagem, ou carregar o exemplo |
| **Navegação** | → Nova viagem · → Tabs da viagem selecionada |
| **Muda em** | [US.017](historias/US-017-acompanhar.md) — o convite de D-7 aparece no cartão |
| **Pronto** | Selecionar troca o contexto das outras quatro abas, e persiste ao reabrir |

## Agora

`NowScreen.tsx` · aba

**Objetivo.** O que está acontecendo, o que vem em seguida, e o que fazer no
minuto. É a única tela do produto que **nenhum concorrente tem** — os outros
mostram o itinerário; nenhum mostra o minuto.

| | |
|---|---|
| **Dados** | `useUpcoming()`, `derive.ts`, `timeline.ts`, `time.ts` |
| **Vazio** | Viagem sem reservas, ou viagem que já terminou |
| **Offline** | Funciona inteira. É o caso de uso principal |
| **Pronto** | O relógio anda sozinho; `leaveBy` e `arriveBy` aparecem marcados como estimativa |

## Itinerário

`ItineraryScreen.tsx` · aba

**Objetivo.** A viagem inteira em ordem, agrupada por dia, com os intervalos
entre reservas visíveis.

| | |
|---|---|
| **Dados** | `items` de `AppState`, `gapLabel` de `time.ts` |
| **Vazio** | **Muda em [US.005](historias/US-005-importar-endereco.md)** — "Importar por e-mail" vira a ação principal, acima do cadastro manual |
| **Navegação** | → Reserva · → Nova reserva · → Importar |
| **Pronto** | Dias vazios não somem; o intervalo entre voos distingue conexão de espera |

## Nova viagem · Editar viagem

`TripFormScreen.tsx` · modal

**Objetivo.** Nome, subtítulo e datas.

| | |
|---|---|
| **Dados** | `TripInput` |
| **Erro** | Fim antes do início é recusado no campo |
| **Muda em** | [US.020](historias/US-020-passes-passageiro.md) — ganha o campo de passageiro |
| **Pronto** | Criar e editar usam a mesma tela; excluir pede confirmação |

## Nova reserva · Editar reserva

`ItemFormScreen.tsx` · modal

**Objetivo.** Cadastrar qualquer coisa reservada que ocupa um horário: voo,
hospedagem, trem, passeio, carro.

| | |
|---|---|
| **Dados** | `ItemInput`, `ChipsField` para o tipo, `DateTimeField` para instantes |
| **Erro** | Campo obrigatório vazio bloqueia; formato inválido mostra exemplo |
| **Muda em** | [US.008](historias/US-008-revisar-completar.md) abre pré-preenchido por rascunho · [US.022](historias/US-022-reserva-bagagem.md) ganha bagagem, só em voo |
| **Pronto** | Os cinco tipos funcionam; campos de voo só aparecem em voo |

---

# Com dado falso dentro

Existem, funcionam, e mentem em algum ponto. Cada uma tem a linha exata
identificada.

## Reserva

`ItemScreen.tsx` · pilha

**Objetivo.** Tudo sobre uma reserva: horários, marcos, portão, anexos, e o
caminho para o cartão de embarque.

| | |
|---|---|
| **Defeito** | **Linha 126** — `<DataRow k="Bagagem" v="1 despachada" />`, fixo em toda reserva de voo |
| **Por que é o pior** | Os outros cotos mostram dado errado. Este faz alguém decidir errado no balcão |
| **Corrige em** | [US.022](historias/US-022-reserva-bagagem.md), semana 10 |
| **Dados** | `Item`, `timeline.ts`, `verso.ts`, anexos |
| **Pronto** | Sem dado de bagagem, a linha **some** — nunca "0", nunca "—" |

## Cartões de embarque

`PassesScreen.tsx` · pilha

**Objetivo.** Os cartões emitidos, os pendentes, e os que só abrem no app da
companhia.

| | |
|---|---|
| **Defeitos** | **Linha 70** — `M1BIANCHINI/B`, o nome do desenvolvedor no bilhete de todo mundo. **Linhas 96, 102, 112** — três `<Button>` sem `onPress` |
| **Corrige em** | [US.020](historias/US-020-passes-passageiro.md), semana 10 |
| **Dados** | `passState()`, `passLabel()`, `Trip.passenger` (novo), `bcbp.ts` (novo) |
| **Vazio** | Viagem sem voo não mostra a tela |
| **Pronto** | Sem passageiro, a linha do nome não é renderizada. "Adicionar à Carteira" **deixa de existir** — Wallet é fase 3 |

## Docs

`DocsScreen.tsx` · aba

**Objetivo.** Os arquivos anexados às reservas, disponíveis sem rede.

| | |
|---|---|
| **Defeitos** | **Linha 38** — `items.length + 2`, um número que não corresponde a nada. **Linhas 62–65** — "Passaporte val. 2031" e "Seguro viagem AP-55219", escritos à mão |
| **Risco real** | Alguém viajar achando que tem seguro |
| **Corrige em** | [US.021](historias/US-021-docs-contagem.md), semana 10 |
| **Vazio** | "nenhum arquivo", com instrução de como anexar |
| **Muda em** | [US.003](historias/US-003-conta-sair.md) — ganha a entrada para `Conta`, no topo |
| **Pronto** | A seção "Pessoais" não existe mais. "offline" só aparece quando é verdade |

## Socorro

`SocorroScreen.tsx` · aba · **a camada 3 do produto**

**Objetivo.** Quando algo quebra: o que mais caiu junto, e o que a companhia é
obrigada a fazer agora.

| | |
|---|---|
| **Defeitos** | **Linha 52** — `gatilho: 'atraso'`. **Linha 57** — `trecho: 'domestico'`, com comentário admitindo a limitação |
| **Consequência** | Cancelamento e preterição **não têm tela**. Quem teve o voo cancelado vê *"em 4h você poderá escolher"* quando o direito já é dele. E preterição internacional mostra metade da compensação |
| **Corrige em** | [US.010](historias/US-010-socorro-gatilhos.md), [US.011](historias/US-011-socorro-trecho.md), [US.012](historias/US-012-socorro-compensacao.md), semana 7 |
| **Ganha** | O bloco "O que mudou" ([US.016](historias/US-016-socorro-o-que-mudou.md)) |
| **Vazio** | "Nada quebrado" — e é uma resposta, não uma ausência |
| **Legal** | `SUPERFICIES.telaDireitos` — `AVISO_CONTEUDO` e `AVISO_RESULTADO` |
| **Pronto** | As **seis combinações** — 3 gatilhos × 2 trechos — conferidas contra o texto da Resolução 400 |

## Registrar problema

`DelayFormScreen.tsx` → `ProblemaFormScreen.tsx` · modal

**Objetivo.** Informar o que aconteceu com uma reserva.

| | |
|---|---|
| **Defeito** | Registra **minutos**. É tudo que sabe perguntar. Cancelamento e preterição não têm por onde entrar |
| **Corrige em** | [US.009](historias/US-009-registrar-problema.md), semana 7 |
| **Muda** | A primeira pergunta passa a ser **o que aconteceu**. O atraso é informado pela **nova previsão de partida**, não por minutos — ninguém sabe dizer "187 minutos", todo mundo sabe ler "23h40" no painel |
| **Renomeia** | Rota `DelayForm` → `ProblemaForm`. Nome que descreve metade do domínio é o começo do defeito |
| **Pronto** | Nenhum gatilho pré-selecionado; domicílio perguntado com a inferência visível e corrigível |

---

# Faltam

## Entrar

`SignIn` · fora das abas · **semana 5**

**Objetivo.** E-mail, código de 6 dígitos, e dentro.

| | |
|---|---|
| **Histórias** | [US.001](historias/US-001-entrar-pedir-codigo.md) pedir · [US.002](historias/US-002-entrar-validar-codigo.md) validar |
| **Já existe** | `app/index.html`, publicado e funcionando — layout, campos e a função `distribuir()` |
| **Erro** | Mensagem **única** para código errado e expirado. Distinguir entrega informação a quem está adivinhando |
| **Offline** | Bloqueia com mensagem, e **preserva o e-mail digitado** |
| **Legal** | `SUPERFICIES.telaEntrar` — `AVISO_CURTO` |
| **Pronto** | Colar os seis dígitos funciona em Android, iPhone e computador. Nenhum campo com `maxlength="1"` |

## Conta

`Conta` · pilha, a partir de Docs · **semana 9**

**Objetivo.** Cinco linhas: e-mail conectado, avisos, termos, privacidade, sair.
Mais a exclusão, em bloco separado.

| | |
|---|---|
| **Histórias** | [US.003](historias/US-003-conta-sair.md) sair · [US.004](historias/US-004-conta-excluir.md) excluir |
| **Por que bloqueia a loja** | A Play Store exige caminho de exclusão de conta **dentro do app**, e outro na web sem instalar |
| **Fora de escopo** | Perfil inteiro. Nenhum campo editável além do interruptor de aviso |
| **Offline** | `Sair` funciona. `Excluir` exige rede e não apaga nada sem confirmação do servidor |
| **Legal** | `SUPERFICIES.telaConta` — `AVISO_ATIVIDADE` |
| **Pronto** | `Sair` limpa os **três** depósitos: sessão, banco local e anexos |

## Importar

`Import` · modal · **semana 6**

**Objetivo.** Mostrar o endereço, ensinar em três passos, e acompanhar a fila.

| | |
|---|---|
| **Histórias** | [US.005](historias/US-005-importar-endereco.md) endereço · [US.006](historias/US-006-importar-fila.md) fila |
| **Cinco estados de item** | Recebido · Lendo · **Para revisar** · Importado · Não consegui |
| **Vazio** | Repete a instrução de três passos |
| **Erro** | "Não consegui" traz o motivo em uma frase e duas saídas |
| **Offline** | Mostra a última fila conhecida, com a hora |
| **Pronto** | Item parado em "Lendo" por 30 min vira erro sozinho. Encaminhar o mesmo e-mail duas vezes não duplica |

## Revisar importação

`ImportReview {id}` · modal · **semana 6**

**Objetivo.** Conferir o que foi entendido, completar o que faltou, confirmar.

| | |
|---|---|
| **Histórias** | [US.007](historias/US-007-revisar-confirmar.md) confirmar · [US.008](historias/US-008-revisar-completar.md) completar |
| **A regra** | **Proposta, não fato.** Nada entra no itinerário sem confirmação |
| **Obrigatórios** | Só três: `type`, `title`, `start`. Todo campo a mais na lista é abandono |
| **Erro** | Formato inválido mostra o formato esperado **com exemplo** |
| **Offline** | Confirmar funciona; entra no aparelho e sincroniza depois |
| **Legal** | `AVISO_CALCULO` |
| **Pronto** | Campo obrigatório ausente fica **vazio e marcado**. Nenhum valor padrão é atribuído |

## Aviso

`Aviso {id}` · pilha · **semana 8**

**Objetivo.** Onde o push aterrissa. O que mudou, o que quebrou, o que fazer.

| | |
|---|---|
| **Histórias** | [US.013](historias/US-013-aviso-tela.md) tela · [US.014](historias/US-014-aviso-push.md) entrega |
| **A regra** | Renderiza do **registro salvo**, nunca do payload do push |
| **Vazio** | "Nada mais quebrou" é resposta, e é a mais tranquilizadora que a tela pode dar |
| **Erro** | Registro ausente tem tela própria, não erro técnico |
| **Offline** | Aviso já baixado abre normalmente |
| **Legal** | `AVISO_CALCULO` |
| **Pronto** | A rota aceita `{ id }` e nada mais |

## Acompanhar viagem

`Acompanhar {tripId}` · modal · **semana 9**

**Objetivo.** Explicar o que muda quando a viagem é acompanhada. Não cobrar.

| | |
|---|---|
| **História** | [US.017](historias/US-017-acompanhar.md) |
| **Momento** | **D-7.** Em D-60 a pessoa não sente a dor e a oferta vira ruído |
| **A regra** | Nenhum preço, plano, moeda ou botão de pagar. É requisito de publicação |
| **Estado ativo** | Viagem já acompanhada mostra o que está ativo, **sem oferta** |
| **Legal** | `AVISO_ATIVIDADE` e `AVISO_RESULTADO` |
| **Pronto** | O convite aparece uma vez por viagem e não reaparece se dispensado |

## Compartilhar

`Compartilhar {tripId}` · modal · **semana 9**

**Objetivo.** Gerar o link, mostrar exatamente o que ele expõe, e revogar.

| | |
|---|---|
| **História** | [US.018](historias/US-018-compartilhar.md) |
| **A regra** | A prévia do que será visível aparece **antes** de o link existir |
| **O que nunca vai** | Localizador, assento, sequência, sobrenome, anexos, documentos |
| **Offline** | Gerar e revogar exigem rede. São operações do servidor |
| **Legal** | `AVISO_DADOS` |
| **Pronto** | `snapshotPublico()` é whitelist, e o teste afirma a **ausência** de cada campo sensível |

---

# Páginas, fora do aplicativo

## Página pública

`acompanhar/index.html` · **semana 9**

**Objetivo.** Quem ficou em casa abre um link e vê onde a viagem está agora.

| | |
|---|---|
| **História** | [US.019](historias/US-019-pagina-publica.md) |
| **Quem abre** | Tipicamente a mãe do organizador, celular antigo, conexão ruim |
| **Orçamento** | **≤ 30 kB comprimido**, verificado por passo de CI que falha acima disso |
| **Erro** | Token inválido, revogado e expirado dão a **mesma** tela calma — e o mesmo 404 no servidor |
| **Pronto** | Conteúdo visível em ≤ 2 s em 3G lenta. `noindex` em meta tag **e** em cabeçalho |

## Console de aprovação

`admin/index.html` · **semana 8**

**Objetivo.** Ler, corrigir e aprovar cada aviso antes de ele sair.

| | |
|---|---|
| **História** | [US.015](historias/US-015-console-aprovacao.md) |
| **Por que existe** | O risco [R4](../plano/10-riscos.md) exige *"botão de enviar, nunca automático"* nos primeiros 50 avisos — e o botão não tinha dono, nem semana, nem tela |
| **Por que fora do app** | Dentro, iria para a loja junto, e a revisão da Apple veria tela de administração com dado de cliente |
| **Acesso** | Allowlist de um e-mail, verificada **no servidor** |
| **Pronto** | Funciona em celular — a aprovação vai acontecer com o telefone na mão |

---

## O que nenhuma tela faz

Registrado porque a ausência é decisão, não esquecimento.

| Não existe | Por quê |
|---|---|
| **Histórico de avisos** | Ninguém acorda querendo ver aviso antigo. Vira bloco dentro do Socorro |
| **Tela de documento pessoal** | Guardar passaporte muda o regime de privacidade do produto inteiro |
| **Perfil** | Nome, foto, fuso, preferências. Fora do MVP, e `Conta` não tem campo editável |
| **Busca** | Uma viagem cabe na tela. Busca é sintoma de lista longa demais |
| **Configurações** | As duas preferências que existem cabem em `Conta` |
