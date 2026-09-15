# Decisões técnicas

O que está travado, por quê, e o que faria reabrir.

> **Uma decisão só entra aqui depois de ter custado alguma coisa para ser
> tomada.** Preferência não é decisão. Se a alternativa descartada não tinha
> mérito, não era escolha — era o caminho óbvio, e caminho óbvio não precisa de
> registro.

Formato de cada verbete: **Decidido · Por quê · Alternativa descartada · Reabre
quando**. O último campo é o que impede este arquivo de virar dogma.

---

## Índice

| # | Decisão | Custo de reverter |
|---|---|---|
| [DT1](#dt1--o-app-é-o-expo-exportado-para-web) | O app é o Expo exportado para web | Baixo |
| [DT2](#dt2--o-link-público-do-f5-é-página-estática-fora-do-expo) | O link público do F5 é página estática | Baixo |
| [DT3](#dt3--login-sem-senha-e-mail--código) | Login sem senha, e-mail + código | **Alto** — a política publicada depende disso |
| [DT4](#dt4--supabase-como-backend) | Supabase como backend | Médio |
| [DT5](#dt5--o-aparelho-é-a-fonte-da-verdade) | O aparelho é a fonte da verdade | **Alto** |
| [DT6](#dt6--o-dinheiro-entra-pela-web-não-pela-loja) | O dinheiro entra pela web | Médio |
| [DT7](#dt7--o-parser-produz-proposta-não-fato) | O parser produz proposta, não fato | Baixo |
| [DT8](#dt8--o-snapshot-público-é-whitelist) | O snapshot público é whitelist | **Alto** — reverter é vazar |
| [DT9](#dt9--desconhecido-é-um-valor-do-tipo-não-undefined) | `'desconhecido'` é um valor do tipo | Baixo |
| [DT10](#dt10--o-console-de-aprovação-fica-fora-do-aplicativo) | O console de aprovação fica fora do app | Médio |
| [DT11](#dt11--a-guarda-de-domínio-é-teste-não-linter) | A guarda de domínio é teste, não linter | Baixo |
| [DT12](#dt12--o-token-do-f5-vai-no-fragmento-da-url) | O token do F5 vai no fragmento da URL | Médio |

---

## DT1 · O app é o Expo exportado para web

**Decidido.** Uma base de código. As mesmas telas viram site, Android e iPhone.
A saída web usa `web.output: "single"`.

**Por quê.** Explorando o repositório para montar o plano, descobri que a decisão
já estava **80% tomada e ninguém tinha percebido**: `react-native-web`,
`react-dom` e `@expo/metro-runtime` instalados, `npm run web` no `package.json`,
e quatro arquivos de variação web já escritos — `repo.web.ts`,
`attachments.web.ts`, `DateTimeField.web.tsx` e o teste dele. `HeaderBack`, o
`Confirm` e a correção de botão-dentro-de-botão no `Ticket` existem por causa da
web.

Faltava configurar a saída. Foi o item de maior efeito e menor esforço do plano
inteiro.

**Alternativa descartada.** Site separado em HTML, reaproveitando só o desenho.
Custaria reescrever dez telas que já funcionam, e criaria duas implementações da
mesma regra — que é a coisa que este projeto mais evita.

**`"static"` não serve.** O modo `static` do Expo só pré-renderiza com
expo-router, e este repositório usa React Navigation. Tentar `static` dá página
em branco sem erro no console, que é o pior modo de falha possível.

**Reabre quando.** Se o desempenho na web ficar inaceitável em celular antigo, ou
se o bundle passar de um tamanho que faça a primeira abertura demorar mais que a
paciência de quem chegou por link.

---

## DT2 · O link público do F5 é página estática, fora do Expo

**Decidido.** `acompanhar/index.html`. HTML, CSS embutido e JavaScript mínimo,
com orçamento de **30 kB comprimido** verificado por passo de CI.

**Por quê.** Quem recebe o link é, tipicamente, a mãe do organizador, com um
celular de quatro anos e conexão instável. Ela não vai baixar React Native para
ler um itinerário.

**Alternativa descartada.** Rota pública dentro do app web. Herdaria o bundle
inteiro para mostrar uma lista de horários — e a métrica que decide se a página é
usada é o tempo até o primeiro conteúdo.

**O orçamento é requisito, não meta.** Sem o passo de CI medindo, o número vira
intenção e a página engorda em três semanas. Com o passo, engordar exige uma
decisão explícita.

**Reabre quando.** Se a página precisar de interatividade real — e hoje ela não
precisa, porque quem recebe o link lê e não edita ([DT nenhuma; é escopo](../plano/05-mvp.md)).

---

## DT3 · Login sem senha, e-mail + código

**Decidido.** Código de 6 dígitos por e-mail. TTL de 10 minutos, uso único, 5
tentativas, limite por e-mail e por IP. O servidor guarda o hash, nunca o código.

**Por quê — e este é o verbete mais importante da lista.** A política de
privacidade **já publicada** diz, no ar, hoje:

> *"não guardamos senha porque o aplicativo não tem senha"*

A decisão não é preferência técnica. É a consequência de um texto que já existe
publicamente e que foi escrito antes de o login existir. Mudar para senha exige
republicar a política, e um usuário que leu a versão antiga leu uma promessa que
deixou de valer.

**Alternativa descartada.** E-mail + senha, e login social. Senha traz
recuperação de senha, política de força, vazamento, e um campo a mais entre a
pessoa e o produto. Login social traz dependência de plataforma para a coisa mais
básica do sistema.

**Um efeito de segunda ordem que cai de graça.** O e-mail encaminhado do F1 vira
a âncora de identidade: chegou mensagem de remetente sem conta, o servidor cria a
conta pendente e responde com o link de entrada. **O F1 vira o funil de cadastro
e ninguém preenche formulário.**

**Reabre quando.** Se a taxa de entrada na primeira tentativa ficar abaixo de
90%, o problema é a entrega do e-mail — não a ausência de senha. A resposta é
provedor transacional melhor, não senha.

---

## DT4 · Supabase como backend

**Decidido.** Supabase — Postgres, Auth com `signInWithOtp`, e Row Level
Security.

**Por quê.** Duas coisas prontas que seriam semanas de trabalho: o código por
e-mail, e o RLS. **O RLS é literalmente a regra do link público** — "esta linha
só pode ser lida por quem tem este token" é uma política de acesso, não código de
aplicação.

**Alternativa descartada.** Servidor próprio. Duas semanas a 11h30 por semana não
cabem, e a parte que sobraria de fora seria justamente a autenticação, que é onde
errar custa mais.

**A fronteira que protege da dependência.** O domínio **não importa SDK de
backend**. `src/domain/` é TypeScript puro. Trocar de backend é trocar
`src/db/` — que já é uma camada isolada, com duas implementações
(`repo.ts` e `repo.web.ts`) provando que a fronteira funciona.

**Reabre quando.** Risco [R9](../plano/10-riscos.md) — mudança de preço,
mudança de política, ou limite de plano gratuito atingido antes de haver receita.
A mitigação está escrita acima e é o que torna a reabertura barata.

---

## DT5 · O aparelho é a fonte da verdade

**Decidido.** SQLite local, e o servidor é cópia. A tela lê do aparelho, sempre.

**Por quê.** Já estava decidido e escrito em `src/db/schema.ts`, no comentário do
topo do arquivo:

> *"o app promete funcionar quando o roaming acaba na imigração"*

É a decisão mais antiga do repositório e a que mais define o produto. Um
organizador de viagem que precisa de rede para mostrar o horário do voo é inútil
exatamente no momento em que é necessário.

**Alternativa descartada.** Servidor como fonte, com cache. É o padrão da
indústria e está errado para este caso de uso.

**Consequência boa que já existe.** `created_at` e `updated_at` já estão nas duas
tabelas. **Não há mudança de schema local para sincronizar** — o Supabase entra
acima de `src/db/`, como camada, sem tocar em tela nenhuma.

**Reabre quando.** Não reabre. Se reabrisse, o produto seria outro.

---

## DT6 · O dinheiro entra pela web, não pela loja

**Decidido.** A cobrança acontece no navegador, em `embarcaly.com`. O aplicativo
lê um booleano — `trip.acompanhada` — e **nunca mostra preço**.

**Por quê.** A Apple proíbe vender bem digital fora do billing dela, e proíbe até
**linkar** para fora de dentro do app. Quebrar isso é rejeição na revisão, e
rejeição custa semanas num cronograma que tem sete.

**Alternativa descartada.** Compra dentro do aplicativo. Significa 15% a 30% de
comissão, integração de billing nas duas lojas, e uma dependência de aprovação
para cada mudança de preço — num produto cujo preço ainda está em definição.

**O que é permitido e o que não é, para não haver dúvida na implementação:**

| Proibido dentro do app | Permitido |
|---|---|
| Preço, moeda, nome de plano | Explicar o que o acompanhamento faz |
| Botão de pagar | Ação que abre o navegador |
| Link direto para checkout | Link para página informativa |
| "Assine por R$ X" | "Quero acompanhar esta viagem" |

**Reabre quando.** Se a conversão pela web ficar tão baixa que a comissão da loja
saia mais barata que o atrito. É mensurável, e a métrica está na
[US.017](historias/US-017-acompanhar.md).

---

## DT7 · O parser produz proposta, não fato

**Decidido.** Nada importado entra no itinerário sem alguém confirmar. Campo
obrigatório não encontrado fica **vazio e marcado**, nunca preenchido com padrão.

**Por quê.** Um parser que erra e escreve direto é pior do que digitar: a pessoa
confia no que está na tela, não confere, e chega no aeroporto com o horário
errado — ou no fuso errado, que é o erro mais comum e o menos visível.

**Isto já estava no código antes de ser decidido.** `Item.needs` existe em
`src/domain/types.ts` desde antes deste plano, descrito como *"campo que a
extração não encontrou e precisa do usuário"*. O produto já tinha sido desenhado
com a ideia; faltava a tela.

**Alternativa descartada.** Confirmação automática quando a extração tem alta
confiança. "Alta confiança" é um número que alguém escolhe, e o dia em que ele
estiver errado ninguém fica sabendo.

**Reabre quando.** Depois do G2, com ≥ 70% de confirmação sem edição medido em
uso real — e ainda assim, só para os campos que nunca precisaram de correção.

---

## DT8 · O snapshot público é whitelist

**Decidido.** `snapshotPublico()` copia apenas os campos de `CAMPOS_PUBLICOS`. O
teste afirma a **ausência** de `pnr`, `seat`, `sequence`, sobrenome, anexos e
documentos.

**Por quê.** Com blacklist, o dia em que alguém acrescentar `Item.passaporte` o
campo vai para a página pública **sem ninguém decidir isso**. A whitelist inverte
o padrão: o silêncio esconde, em vez de expor.

**E o teste é escrito ao contrário de propósito.** Testar a presença dos campos
permitidos não pega um campo novo vazando. Testar a ausência dos proibidos, sim.

**O que está em jogo.** Localizador, assento e sobrenome são, juntos, o
suficiente para alguém alterar ou cancelar a reserva de outra pessoa no site da
companhia. Não é dado embaraçoso; é credencial.

**Alternativa descartada.** Remover os campos sensíveis do objeto antes de
publicar. É a mesma coisa que blacklist, com outro nome.

**Reabre quando.** Não reabre. A lista de campos permitidos cresce; o mecanismo,
não.

---

## DT9 · `'desconhecido'` é um valor do tipo, não `undefined`

**Decidido.** `derivarTrecho()` devolve `Trecho | 'desconhecido'`, e não
`Trecho | undefined`.

**Por quê.** `undefined` convida a um `??`. E `?? 'domestico'` é exatamente o
defeito que a [US.011](historias/US-011-socorro-trecho.md) corrige — está na
linha 57 do `SocorroScreen.tsx` hoje, com um comentário admitindo a limitação.

Um terceiro valor explícito obriga o `switch` a tratá-lo, e o `strict` do
TypeScript cobra. A ausência deixa de ser um caso esquecível e vira um caso
nomeado.

**Alternativa descartada.** `undefined` com verificação em cada chamada. Funciona
até alguém ter pressa.

**Onde mais isto se aplica.** `textoBagagem()` devolve `string | undefined` pelo
mesmo motivo invertido: ali a ausência precisa **sumir da tela**, e o retorno
opcional força quem chama a decidir o que fazer, em vez de receber string vazia e
renderizar uma linha em branco.

**Reabre quando.** Não reabre. É a regra número 2 do backlog inteiro.

---

## DT10 · O console de aprovação fica fora do aplicativo

**Decidido.** `admin/index.html`, HTML puro, no mesmo domínio, atrás do mesmo
código de 6 dígitos, com allowlist de um e-mail verificada **no servidor**.

**Por quê.** Três motivos, em ordem de peso:

1. Dentro do app, iria para a loja junto — e a revisão da Apple veria uma tela de
   administração com dado de cliente.
2. O console precisa ser alterável em minutos, sem build e sem publicação.
3. É o único lugar do sistema que lê dados de viagem de outras pessoas. Quanto
   menos superfície, melhor.

**Por que existe.** O risco [R4](../plano/10-riscos.md) diz que *"os primeiros
50 avisos passam por você antes de sair — botão de enviar, nunca automático"*.
**Esse botão não tinha dono, nem semana, nem tela.** A mitigação de um risco
classificado como dano fatal estava escrita e não estava construída.

**Alternativa descartada.** Aprovar por e-mail, com link de confirmação. Não
permite editar o texto antes de enviar, que é metade do valor da revisão.

**Reabre quando.** Depois de 50 avisos revisados à mão, com zero erros. Aí a
conversa é sobre envio automático, e é decisão de produto, não técnica.

---

## DT11 · A guarda de domínio é teste, não linter

**Decidido.** `mobile/src/__tests__/guarda-dominio.test.ts` varre
`src/screens/**` procurando literais que deveriam estar no domínio, e reprova o
CI.

**Por quê.** Não há ESLint no repositório, por decisão anterior. E o incentivo
atual empurra na direção errada: `package.json` exige **100% em `src/domain/` e
`src/components/`**, e `src/screens/` **não tem limiar nenhum**. O gate protege o
domínio, e por isso a regra escrita na tela escapa inteira.

**O precedente já existe.** `src/domain/__tests__/legal.test.ts` reprova o CI
quando uma superfície fica sem aviso legal. A guarda de domínio é o mesmo
mecanismo aplicado a outra classe de defeito.

**Alternativa descartada.** Adotar ESLint com regra customizada. Traz
configuração, plugin, versão, e um segundo lugar onde a qualidade é definida —
para resolver um problema que um teste de 60 linhas resolve.

**A lista de padrões é específica, nunca heurística.** A tentação é procurar
"qualquer string literal em JSX". Isso acusaria todo rótulo de botão, a guarda
viraria ruído, e alguém a desligaria com razão. A lista cresce por defeito
observado.

**Reabre quando.** Se o repositório adotar ESLint por outro motivo, a guarda
migra para regra. Não antes.

---

## DT12 · O token do F5 vai no fragmento da URL

**Decidido.** `embarcaly.com/acompanhar/#<token>`. Nunca no caminho, nunca em
query string.

**Por quê.** O fragmento não é enviado ao servidor. Não entra em log de acesso,
não entra em cabeçalho `Referer`, não aparece no histórico de proxy corporativo.
Token no caminho aparece nos quatro.

**Alternativa descartada.** Token no caminho, com log desligado. Depende de
configuração de infraestrutura que muda sem ninguém avisar, e de todo
intermediário respeitar a mesma configuração.

**Acompanha a decisão.** 128 bits de entropia de fonte criptográfica, sem relação
com o identificador da viagem; revogável; expira 48 h depois do fim da viagem; e
expiração e revogação verificadas **no servidor** — no cliente seriam sugestão.

**Reabre quando.** Não reabre. É a prática correta e não tem custo.

---

## O que não está decidido

Registrado para não parecer esquecimento.

| Aberto | Quando decide |
|---|---|
| **Provedor da entrada de e-mail do F1** — Cloudflare Email Routing ou *inbound* do Postmark | Semana 5. É o item de maior risco de prazo do [EP-02](historias/EP-02-importacao.md) |
| **API de status de voo** — qual, e a que custo | Semana 7. Entra com receita perto de zero, e a conta está em [`plano/07-orcamento.md`](../plano/07-orcamento.md) |
| **Valor dos três planos** — por viagem, por ano, vitalício | [`vendas/01-precificacao.md`](../vendas/01-precificacao.md) |
| **A relação entre Embarcaly e Trilha Certa** | [`brand/IDENTIDADE.md`](../brand/IDENTIDADE.md) |
| **Se o preenchimento dos botões escurece para `#C96A16`** | Checklist do v3, e depende de teste com gente real |
