# Pendências — o que precisa da sua decisão

Tudo o que a documentação deixou em aberto, reunido num lugar só.

**53 itens.** Sete grupos, por **quem decide** e **quando** — não por documento,
porque ninguém revisa por documento.

> **Leia o grupo G primeiro.** São decisões que eu tomei escrevendo, e que você
> pode não concordar. Elas já estão dentro das histórias como se fossem
> definitivas, e é o grupo de maior risco desta documentação inteira.

---

## Resumo por prazo

| Quando | Grupo | Itens |
|---|---|---|
| **Agora** — custa minutos | [A · Verificações operacionais](#a--verificações-operacionais) | 5 |
| **Agora** — custa minutos | [F · Correções no repositório](#f--correções-no-repositório) | 4 |
| **Antes da semana 5** (12/10) | [D · Contratações com custo](#d--contratações-com-custo) | 7 |
| **Antes da semana 5** | [G · Decisões que eu tomei por você](#g--decisões-que-eu-tomei-por-você) | 10 |
| **Semana 7** (26/10) | [C.11 · O quarto gatilho](#c--revisão-jurídica--semana-8) | 1 |
| **Semana 8** (02/11) | [C · Revisão jurídica](#c--revisão-jurídica--semana-8) | 13 |
| **Quando der** | [B · Decisões de produto em aberto](#b--decisões-de-produto-em-aberto) | 6 |
| **Antes do G2** | [E · Números que eu inventei](#e--números-que-eu-inventei) | 7 |

---

## A · Verificações operacionais

Custam minutos e destravam coisas maiores. Nenhuma depende de decisão.

| # | O quê | Por que importa |
|---|---|---|
| **A1** | **Confirmar que `contato@embarcaly.com` recebe de verdade.** Mande um e-mail de outra conta e veja chegar | É o endereço publicado em quatro páginas. Se não recebe, você está perdendo contato sem saber |
| **A2** | **Testar um envio real em cada formulário.** Landing, captura, "quero conversar" | Formulário que não entrega é pior que ausência de formulário |
| **A3** | **Conferir a quota do Formspree.** Os formulários compartilham o endpoint `mgaejzrr`, e são **50 envios por mês no total** | Uma peça de marketing que funcione queima a quota num dia, e os envios seguintes somem sem aviso |
| **A4** | **Abrir `embarcaly.com` em Android e iPhone, e conferir as quatro páginas** | O domínio virou hoje. Vale confirmar que o certificado pegou nos dois |
| **A5** | **Baixar a versão vigente da Resolução 400 de anac.gov.br** | Item C1. É o insumo de tudo na semana 7, e a 400 foi alterada desde 2016 |

---

## B · Decisões de produto em aberto

Registradas em [`00-decisoes-tecnicas.md`](00-decisoes-tecnicas.md#o-que-não-está-decidido).
Nenhuma bloqueia a documentação; todas bloqueiam alguma semana.

| # | O quê | Bloqueia |
|---|---|---|
| **B1** | **Valor dos três planos** — por viagem, por ano, vitalício | A oferta da semana 9. E a landing já diz "valor em definição" desde 14/09 |
| **B2** | **A relação entre Embarcaly e Trilha Certa** | Nada técnico. Mas as duas marcas compartilham paleta e tipografia, e a decisão fica mais cara a cada peça publicada |
| **B3** | **Escurecer o preenchimento dos botões para `#C96A16`?** Permitiria texto branco com contraste aprovado (4,6:1) | O checklist visual do v3. Hoje a regra é "nenhum texto branco sobre laranja", e ela restringe todo botão do produto |
| **B4** | **Tema claro do app** — o sistema v3 assume só escuro | Se a loja exigir, é decisão nova. Está aberto em `brand/IDENTIDADE.md` |
| **B5** | **A ilustração da marca** foi portada por inversão de paleta, sem revisão de desenho | Suficiente para tela e loja. Não revisado |
| **B6** | **Publicar o app na web muda a conversa com a loja?** O produto passa a existir fora dela antes de estar nela | Nada impede. Mas é uma escolha de posicionamento que vale ser consciente |

---

## C · Revisão jurídica — semana 8

Os 11 pontos marcados **⚠ confirmar** em
[`06-anac-completo.md`](06-anac-completo.md), mais três herdados.

> **Eu não sou advogado e o documento diz isso na primeira linha.** A
> transcrição da norma foi feita para virar código; onde ela pode estar
> imprecisa, está marcado. Estes são os lugares onde a revisão precisa parar.

### Resolução ANAC 400

| # | Ponto | Consequência de estar errado |
|---|---|---|
| **C1** | **Versão vigente da Res. 400 e todas as alterações.** A 556/2020 é a que se conhece, e pode não ser a única | Toda a tabela do produto |
| **C2** | Dispositivo da assistência com **passageiro a bordo e portas abertas** | Caso comum que o produto não trata hoje |
| **C3** | Dispositivo do **traslado para quem reside na localidade** | Muda hospedagem por transporte. Já implementado, artigo não confirmado |
| **C4** | **Prioridade de assistência a passageiro com necessidade especial** — idoso, criança desacompanhada | É o **perfil 4 do ICP**. Não é detalhe |
| **C5** | Citação correta: **`art. 21, I, a`** para reacomodação e **`art. 21, I, b`** para remarcação | Hoje o código cita "art. 21" sem inciso. É o que a pessoa aponta no balcão |
| **C6** | Dispositivo da **integralidade do reembolso, com a taxa de embarque** | Segunda maior consequência financeira do produto |
| **C7** | **Momento do pagamento** da compensação do art. 24 | O código diz "paga na hora" |
| **C8** | **Substituição da compensação** por crédito ou milhas, e o **direito de recusar** | É o que a companhia vai oferecer. O passageiro precisa saber que pode dizer não |
| **C9** | A formulação sobre **Montreal** é suficiente sem citar valores? | Omitir limites pode gerar expectativa errada |
| **C10** | **Prazos: 5 anos (CDC) no doméstico, 2 anos (Montreal, art. 35) no internacional**, e o alcance da tese do STF | É a seção de menor confiança do documento inteiro |

### C11 · O quarto gatilho — **decisão sua, semana 7, não do advogado**

O art. 21 lista **quatro** hipóteses: atraso, cancelamento, **interrupção do
serviço** e preterição. `direitos.ts` modela três.

Interrupção é o voo que começa e não termina como contratado — pousa em aeroporto
diferente, ou para no meio e não segue. Quem está em Confins a caminho de Recife
tem os mesmos direitos do art. 21 e **não tem tela**.

> **Não cobrir é aceitável. Não cobrir em silêncio não é** — a pessoa conclui que
> não tem direito.

Duas saídas: entra como quarto gatilho, ou o Socorro diz explicitamente que não
cobre. **A segunda custa uma frase.**

### Herdados

| # | Ponto |
|---|---|
| **C12** | **Revisão de `legal.ts` inteiro.** São minuta, e o próprio arquivo diz isso no cabeçalho |
| **C13** | **Termos §5** e o campo de controlador na política de privacidade — não há CNPJ, e o [D7](../plano/00-decisoes.md) adia o MEI |
| **C14** | **A política publicada diz que os dados ficam no aparelho.** Conta e servidor tornam isso parcialmente falso. Revisar **antes** de o backend subir |

**C14 é o mais urgente dos três.** É a única promessa publicada que o próprio
plano torna falsa.

---

## D · Contratações com custo

> Nenhuma destas foi feita. A regra que você deu vale:
> **não fazer nada que envolva custos sem a sua decisão.**

| # | O quê | Quando | Ordem de grandeza |
|---|---|---|---|
| **D1** | **Conta Google Play** | **Semana 5**, não a 9 | US$ 25, uma vez |
| **D2** | **Entrada de e-mail do F1** — Cloudflare Email Routing ou *inbound* do Postmark | Semana 5 | Cloudflare tem plano gratuito; Postmark é pago |
| **D3** | **Provedor de e-mail transacional** para o código de entrada | Semana 5 | O remetente padrão do Supabase cai em spam |
| **D4** | **API de status de voo** | Semana 7 | O maior custo recorrente, e entra com receita perto de zero |
| **D5** | **Advogado** | Semana 8 | R$ 400, já no orçamento |
| **D6** | **Provedor de cobrança** | Semana 9 | Percentual |
| **D7** | **Conta Apple Developer** | Semana 9 | US$ 99/ano |

**D1 é o mais urgente e o mais barato.** A verificação de identidade da Google
leva dias e não depende de você. Push exige credencial FCM e build assinado, e o
F3 é a semana 8 — abrir a conta na semana 9 chega tarde.

---

## E · Números que eu inventei

Metas e limites que escrevi nos documentos sem você ter definido. Estão lá como
se fossem acordados.

| # | Número | Onde | De onde veio |
|---|---|---|---|
| **E1** | ≥ 90% entram na primeira tentativa | [EP-01](historias/EP-01-conta.md) | Meu |
| **E2** | ≥ 8% de conversão da oferta em D-7 | [EP-05](historias/EP-05-compartilhar.md) | Meu |
| **E3** | ≥ 30% das viagens geram link | [EP-05](historias/EP-05-compartilhar.md) | Meu |
| **E4** | ≥ 50% dos avisos são abertos · ≥ 80% chegam antes | [EP-04](historias/EP-04-aviso.md) | Meu |
| **E5** | **30 kB comprimido** na página pública | [DT2](00-decisoes-tecnicas.md) | Meu. Vira passo de CI que reprova |
| **E6** | Código: TTL 10 min · 5 tentativas · 5 pedidos/e-mail e 20/IP por 15 min | [05-backend.md](05-backend.md) | Prática comum, não medida |
| **E7** | Janela de silêncio do push: **23h–7h** no fuso do usuário | [US.014](historias/US-014-aviso-push.md) | Meu |

**≥ 70% de importação sem correção** não está aqui porque é seu — é critério do
G2 e já estava escrito.

---

## F · Correções no repositório

Coisas que encontrei e não corrigi, por serem de outra sessão ou fora do escopo
do que você pediu.

| # | O quê | Onde |
|---|---|---|
| **F1** | **`brand/IDENTIDADE.md` diz que o DNS ainda responde no registrador.** Não responde — o domínio virou hoje, e o `DOSSIE.md` do mesmo commit já cita `embarcaly.com`. Os dois se contradizem | `brand/IDENTIDADE.md`, seção de pendências |
| **F2** | **`README.md` descreve `brand/MARCA.md`.** O arquivo é `brand/IDENTIDADE.md` | `README.md`, árvore de diretórios |
| **F3** | **`app/manifest.webmanifest` aponta `start_url: "/app/"`**, que hoje é a tela de entrada em HTML. Vira o app exportado na [US.000](historias/US-000-export-web.md) | `app/manifest.webmanifest` |
| **F4** | **O CI avisa que `actions/checkout@v4` e `setup-node@v4` usam Node 20, descontinuado.** Não quebra nada hoje; vai quebrar | `.github/workflows/ci.yml` |

---

## G · Decisões que eu tomei por você

**O grupo mais importante desta lista.** Escrevendo as histórias, tomei decisões
que não estavam em lugar nenhum. Elas estão dentro dos documentos com a mesma
confiança do resto — e não deviam ter esse peso até você olhar.

| # | O que decidi | O que descartei | Reverter custa |
|---|---|---|---|
| **G1** | **F4 antes de F3**, invertendo o cronograma | A ordem escrita no plano | Nada. É ordem de duas semanas |
| **G2** | **O parser cobre só Latam e Gol**, a 100% | Os cinco remetentes do MVP escrito — Azul, Booking e Decolar saem | Nada agora. Muito na semana 6 |
| **G3** | **Conta Google Play na semana 5** | Semana 9, como estava | US$ 25 antes da hora |
| **G4** | **"Adicionar à Carteira" é removido, não implementado** | Implementar Wallet | Nada. Wallet é fase 3 e é iOS |
| **G5** | **A seção "Pessoais" do `DocsScreen` some** e não volta como tela | Guardar passaporte e seguro | Nada. E guardar documento de identidade muda o regime de privacidade do produto inteiro |
| **G6** | **Não existe tela de histórico de avisos.** Vira bloco dentro do Socorro | Tela própria | Nada |
| **G7** | **A oferta aparece numa janela de 6 a 8 dias**, não exatamente em D-7 | D-7 exato | Nada. Quem não abre o app no dia exato nunca veria a oferta |
| **G8** | **Só três campos obrigatórios na importação** — tipo, título, início | Exigir mais | Nada. Cada campo a mais é abandono |
| **G9** | **`Conta` entra pelo topo da aba `Docs`**, não como sexta aba | Sexta aba | Nada. Seis abas não cabem em 375px com alvo de 44px |
| **G10** | **`DelayForm` vira `ProblemaForm`** | Manter o nome | Nada |

**G2 é o que merece mais atenção.** É desvio explícito do MVP escrito, e a
justificativa é de prazo: dois remetentes certos batem cinco a 40%, e o G2 pede
≥ 70%. Se você discordar, a semana 6 muda de tamanho.

---

## O que **não** precisa da sua revisão

Para você não gastar tempo procurando.

| Não precisa | Por quê |
|---|---|
| Os seis defeitos de dado falso nas telas | Estão verificados no código, com arquivo e linha |
| O gate de 100% e os passos de CI que já existem | Estão no `package.json` e no workflow, funcionando |
| A paleta, a tipografia e o checklist do v3 | Você aprovou em 14/09 |
| O texto das landings | Você revisou linha a linha |
| As decisões DT1, DT4, DT5, DT7 a DT12 | Decorrem de fato verificado no repositório, não de opinião |
| A regra "desconhecido é pergunta, nunca padrão" | É a correção de um defeito real, não uma preferência |
