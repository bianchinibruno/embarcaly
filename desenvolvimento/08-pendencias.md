# Pendências — o que precisa da sua decisão

Tudo o que a documentação deixou em aberto, reunido num lugar só.

**58 itens.** Sete grupos, por **quem decide** e **quando** — não por documento,
porque ninguém revisa por documento.

> **Atualização de 15/09.** O grupo C foi conferido contra o **texto oficial**
> da Resolução 400, extraído do PDF publicado no Diário Oficial da União
> (14/12/2016, retificado em 15/12/2016) — não mais de memória. Onze pontos que
> estavam marcados **⚠ confirmar** foram resolvidos por citação direta. Dois
> afirmações da versão anterior **estavam erradas** e foram corrigidas. E
> apareceram achados novos que nenhuma versão anterior tinha visto — o maior é
> o [Achado 1](#achados-novos), uma seção inteira da norma que o produto não
> modela. Detalhe completo em [`06-anac-completo.md`](06-anac-completo.md).
>
> **Leia o grupo G primeiro**, como antes. São decisões que eu tomei
> escrevendo, e que você pode não concordar.

---

## Resumo por prazo

| Quando | Grupo | Itens |
|---|---|---|
| **Agora** — custa minutos | [A · Verificações operacionais](#a--verificações-operacionais) | 5 |
| **Agora** — custa minutos | [F · Correções no repositório](#f--correções-no-repositório) | 5 |
| **Antes da semana 5** (12/10) | [D · Contratações com custo](#d--contratações-com-custo) | 7 |
| **Antes da semana 5** | [G · Decisões que eu tomei por você](#g--decisões-que-eu-tomei-por-você) | 10 |
| **Semana 7** (26/10) | [B · Decisões de produto em aberto](#b--decisões-de-produto-em-aberto) | 10 |
| **Semana 8** (02/11) | [C · Revisão jurídica](#c--revisão-jurídica--semana-8) | 4 |
| **Antes do G2** | [E · Números que eu inventei](#e--números-que-eu-inventei) | 7 |

**Contagem por status do grupo C, para não perder o antes/depois:**

| | Itens |
|---|---|
| Estava `⚠ confirmar`, **resolvido por citação direta** | 8 |
| Estava **errado**, corrigido | 2 |
| **Achado novo**, não existia em versão nenhuma | 3 |
| Continua precisando do advogado | 4 |

---

## A · Verificações operacionais

Custam minutos e destravam coisas maiores. Nenhuma depende de decisão.

| # | O quê | Por que importa |
|---|---|---|
| **A1** | **Confirmar que `contato@embarcaly.com` recebe de verdade.** Mande um e-mail de outra conta e veja chegar | É o endereço publicado em quatro páginas. Se não recebe, você está perdendo contato sem saber |
| **A2** | **Testar um envio real em cada formulário.** Landing, captura, "quero conversar" | Formulário que não entrega é pior que ausência de formulário |
| **A3** | **Conferir a quota do Formspree.** Os formulários compartilham o endpoint `mgaejzrr`, e são **50 envios por mês no total** | Uma peça de marketing que funcione queima a quota num dia, e os envios seguintes somem sem aviso |
| **A4** | **Abrir `embarcaly.com` em Android e iPhone, e conferir as quatro páginas** | O domínio virou hoje. Vale confirmar que o certificado pegou nos dois |
| **A5** | ~~Baixar a versão vigente da Resolução 400~~ **Feito.** Extraída do Diário Oficial de 14/12/2016. Continua em vigor sem alteração de conteúdo nos artigos citados aqui — ver [06-anac-completo.md §2](06-anac-completo.md#2--a-norma-e-o-que-a-alterou) | Só falta confirmar se a revisão em consulta pública (encerrada 09/03/2026) já foi publicada — **item A6** |
| **A6** | **Confirmar em gov.br/anac se a revisão da Resolução 400 já saiu.** A consulta pública fechou em 09/03/2026, seis meses atrás; a ANAC pode ter publicado a norma nova desde então | Se sim, `06-anac-completo.md` inteiro precisa ser reconferido contra o texto novo |

---

## B · Decisões de produto em aberto

Cresceu de 6 para 10 itens. Os quatro novos vieram da leitura do texto oficial
— são direitos reais que a norma dá e que o produto hoje não sabe que existem.

### Os quatro que apareceram na leitura do texto oficial

| # | O quê | O que a norma diz | Detalhe |
|---|---|---|---|
| **B7** | **Alteração programada (art. 12) — funcionalidade nova, não uma tela** | Mudança de horário avisada com **menos de 72h**, ou alteração **> 30 min doméstico / 1h internacional** sem a pessoa concordar, dá direito a reacomodação ou reembolso — **mesmo sem atraso no dia do voo**. É um regime inteiro que o produto não modela | [06-anac-completo.md §9](06-anac-completo.md#9--achado-novo--a-alteração-programada-não-é-a-mesma-coisa-que-atraso) |
| **B8** | **PNAE — hospedagem sem exigir pernoite** | Passageiro com Necessidade de Assistência Especial (Resolução 280/2013) e acompanhantes têm hospedagem garantida mesmo sem pernoite. É o **perfil 4 do ICP**, e hoje o produto não pergunta nada sobre isso | [06-anac-completo.md §4](06-anac-completo.md#passageiro-com-necessidade-de-assistência-especial) |
| **B9** | **A exceção do art. 27, §3º** — quando a pessoa escolhe remarcar por conveniência ou pedir reembolso integral, a companhia **deixa de dever** assistência material. Hoje `direitos.ts` sempre mostra as duas listas juntas | Recomendação registrada: manter as duas sempre visíveis (nunca informa menos do que existe) e só ajustar a frase de balcão | [06-anac-completo.md §4](06-anac-completo.md#a-exceção-que-a-versão-anterior-não-tinha) |
| **B10** | **Preterição negociada não é a mesma coisa que preterição involuntária** (art. 23) — quem aceita uma oferta da companhia no balcão não tem o piso de 250/500 DES do art. 24 | O formulário de "Não embarquei" precisa distinguir os dois casos, ou informa um direito que pode não existir | [06-anac-completo.md §6](06-anac-completo.md#preterição-voluntária-não-é-a-mesma-coisa) |

### Os seis que já estavam registrados

| # | O quê | Bloqueia |
|---|---|---|
| **B1** | **Valor dos três planos** — por viagem, por ano, vitalício | A oferta da semana 9. E a landing já diz "valor em definição" desde 14/09 |
| **B2** | **A relação entre Embarcaly e Trilha Certa** | Nada técnico. Mas as duas marcas compartilham paleta e tipografia, e a decisão fica mais cara a cada peça publicada |
| **B3** | **Escurecer o preenchimento dos botões para `#C96A16`?** Permitiria texto branco com contraste aprovado (4,6:1) | O checklist visual do v3 |
| **B4** | **Tema claro do app** — o sistema v3 assume só escuro | Se a loja exigir, é decisão nova |
| **B5** | **A ilustração da marca** foi portada por inversão de paleta, sem revisão de desenho | Suficiente para tela e loja. Não revisado |
| **B6** | **Publicar o app na web muda a conversa com a loja?** | Nada impede. É escolha de posicionamento |

---

## C · Revisão jurídica — semana 8

**Caiu de 14 para 4 itens.** Onze foram resolvidos por citação direta ao texto
oficial — não precisam mais do advogado, precisam só de conferência de
calendário (A6). Os quatro que sobram são genuinamente jurisprudenciais ou de
calendário regulatório, e nenhum documento interno resolve sozinho.

| # | Ponto | Por que continua do advogado |
|---|---|---|
| **C1** | **Se a revisão da Resolução 400 (consulta pública encerrada 09/03/2026) já foi publicada**, e o que ela muda | A proposta em consulta já sinalizava mudança na forma de informar alteração de voo e nas exceções por força maior |
| **C9** | **Valor vigente dos limites da Convenção de Montreal** (art. 22) — hoje 5.346 DES para atraso de passageiro e 1.288 DES para bagagem, revisão de 28/12/2019 | A OACI revisa periodicamente. Pode ter havido revisão nova |
| **C10** | **Prazo de dano moral em voo internacional: 2 ou 5 anos?** O Tema 210 do STF (2017) fixou 2 anos para dano **material**; o Tema 1240 aponta para a **inaplicabilidade** dos tratados a dano **moral**, o que devolveria o prazo ao CDC — 5 anos, igual ao doméstico | É a jurisprudência mais recente e menos assentada de todo este documento |
| **C12** | **Revisão de `legal.ts` inteiro**, dos termos §5, e do campo de controlador na política — sem CNPJ ainda | Continuam minuta, como o próprio `legal.ts` diz no cabeçalho |

### Resolvidos nesta revisão — não precisam mais do advogado

Para você ver o que saiu da lista e por quê. Citação completa em
[`06-anac-completo.md`](06-anac-completo.md).

| Era | Resolvido como |
|---|---|
| Citação de `art. 21, I, a` e `art. 21, I, b` | **Não existe.** Reacomodação é `art. 28, I`; remarcação é `art. 28, II`. Corrigido nos dois documentos |
| Compensação pode ser substituída por milhas, mediante concordância | **Não existe essa cláusula no art. 24.** A substituição por concordância existe, mas é de **hospedagem** do PNAE (art. 27, §2º), não de dinheiro |
| Assistência com passageiro a bordo, portas abertas | Confirmado, sem exceção — texto literal do art. 27 |
| Traslado para quem reside na localidade | Confirmado — art. 27, §1º, e precisão nova: é o **município do aeroporto de origem**, não "onde a pessoa mora" em sentido amplo |
| Prioridade a passageiro com necessidade especial | Confirmado, com o nome oficial — **PNAE**, Resolução 280/2013 |
| Reembolso integral com taxa de embarque | Confirmado por citação direta: art. 29 remete ao art. 4º, §1º, II — "tarifas aeroportuárias" |
| Momento do pagamento da compensação do art. 24 | Confirmado — "imediatamente", por transferência, voucher ou espécie |
| Interrupção do serviço — existe como gatilho oficial? | **Sim**, com artigo próprio (art. 25) e seção própria (art. 26, III). Vira decisão de produto — [G11](#g--decisões-que-eu-tomei-por-você) |

### Achados novos

Três coisas que nenhuma versão anterior deste plano mencionou, porque a leitura
anterior era de memória, não do texto.

1. **O art. 12 — alteração programada.** Ver B7 acima. É o maior achado desta
   revisão: um regime de direito inteiro, provavelmente mais comum que atraso
   de 4 horas, que o produto não sabe que existe.
2. **PNAE sem pernoite.** Ver B8.
3. **Preterição negociada (art. 23) não é preterição involuntária (art. 24).**
   Ver B10.

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
leva dias e não depende de você.

---

## E · Números que eu inventei

Metas e limites que escrevi nos documentos sem você ter definido.

| # | Número | Onde | De onde veio |
|---|---|---|---|
| **E1** | ≥ 90% entram na primeira tentativa | [EP-01](historias/EP-01-conta.md) | Meu |
| **E2** | ≥ 8% de conversão da oferta em D-7 | [EP-05](historias/EP-05-compartilhar.md) | Meu |
| **E3** | ≥ 30% das viagens geram link | [EP-05](historias/EP-05-compartilhar.md) | Meu |
| **E4** | ≥ 50% dos avisos são abertos · ≥ 80% chegam antes | [EP-04](historias/EP-04-aviso.md) | Meu |
| **E5** | **30 kB comprimido** na página pública | [DT2](00-decisoes-tecnicas.md) | Meu. Vira passo de CI que reprova |
| **E6** | Código: TTL 10 min · 5 tentativas · 5 pedidos/e-mail e 20/IP por 15 min | [05-backend.md](05-backend.md) | Prática comum, não medida |
| **E7** | Janela de silêncio do push: **23h–7h** no fuso do usuário | [US.014](historias/US-014-aviso-push.md) | Meu |

---

## F · Correções no repositório

| # | O quê | Onde |
|---|---|---|
| **F1** | **`brand/IDENTIDADE.md` diz que o DNS ainda responde no registrador.** Não responde — o domínio virou dia 15/09, e o `DOSSIE.md` do mesmo commit já cita `embarcaly.com` | `brand/IDENTIDADE.md`, seção de pendências |
| **F2** | **`README.md` descreve `brand/MARCA.md`.** O arquivo é `brand/IDENTIDADE.md` | `README.md`, árvore de diretórios |
| **F3** | **`app/manifest.webmanifest` aponta `start_url: "/app/"`**, hoje a tela de entrada em HTML. Vira o app exportado na [US.000](historias/US-000-export-web.md) | `app/manifest.webmanifest` |
| **F4** | O CI avisa que `actions/checkout@v4` e `setup-node@v4` usam Node 20, descontinuado | `.github/workflows/ci.yml` |
| **F5** | **O guia em PDF converte DES para reais com valor fixo escrito no código**: "250 DES ficam perto de R$1.800 e 500 DES perto de R$3.600". Conferido hoje contra a cotação do dia (≈R$7,05/DES via XE): a diferença é pequena agora (~2%), mas o número **vai envelhecer sem avisar**, exatamente o que `AVISO_CALCULO` e a decisão de nunca converter DES existem para evitar. É um PDF **já publicado e baixável** em `guia-direitos-do-passageiro.pdf` | `plano/gerar-guia.py:445-446`. Não regerei o PDF sozinho — a correção certa é junto da atualização de conteúdo do guia com os achados do grupo B, não só trocar dois números |

---

## G · Decisões que eu tomei por você

**O grupo mais importante desta lista.** Ganhou um item nesta revisão — G11 —
porque a leitura do texto oficial trouxe um caso que eu precisei decidir para o
documento continuar consistente.

| # | O que decidi | O que descartei | Reverter custa |
|---|---|---|---|
| **G1** | **F4 antes de F3**, invertendo o cronograma | A ordem escrita no plano | Nada. É ordem de duas semanas |
| **G2** | **O parser cobre só Latam e Gol**, a 100% | Os cinco remetentes do MVP escrito | Nada agora. Muito na semana 6 |
| **G3** | **Conta Google Play na semana 5** | Semana 9, como estava | US$ 25 antes da hora |
| **G4** | **"Adicionar à Carteira" é removido, não implementado** | Implementar Wallet | Nada. Wallet é fase 3 e é iOS |
| **G5** | **A seção "Pessoais" do `DocsScreen` some** e não volta como tela | Guardar passaporte e seguro | Nada |
| **G6** | **Não existe tela de histórico de avisos.** Vira bloco dentro do Socorro | Tela própria | Nada |
| **G7** | **A oferta aparece numa janela de 6 a 8 dias**, não exatamente em D-7 | D-7 exato | Nada |
| **G8** | **Só três campos obrigatórios na importação** — tipo, título, início | Exigir mais | Nada |
| **G9** | **`Conta` entra pelo topo da aba `Docs`**, não como sexta aba | Sexta aba | Nada |
| **G10** | **`DelayForm` vira `ProblemaForm`** | Manter o nome | Nada |
| **G11** | **Interrupção do serviço recomendada como quarta opção no mesmo formulário de cancelamento**, não como funcionalidade separada — ver [06-anac-completo.md §3](06-anac-completo.md#3--os-gatilhos--e-uma-correção-de-estrutura) | Um motor separado para interrupção, ou não cobrir | Nada. É uma opção a mais num formulário que já existe |

**G2 continua o que merece mais atenção.** Se você discordar, a semana 6 muda
de tamanho.

**G11 é novo e é pequeno**, mas nasce de um direito real que a norma dá e que
nenhuma versão anterior deste plano tinha visto — vale ler
[06-anac-completo.md §3](06-anac-completo.md#3--os-gatilhos--e-uma-correção-de-estrutura)
antes de aceitar a recomendação.

---

## O que **não** precisa da sua revisão

| Não precisa | Por quê |
|---|---|
| Os seis defeitos de dado falso nas telas | Estão verificados no código, com arquivo e linha |
| O gate de 100% e os passos de CI que já existem | Estão no `package.json` e no workflow, funcionando |
| A paleta, a tipografia e o checklist do v3 | Você aprovou em 14/09 |
| O texto das landings | Você revisou linha a linha |
| As decisões DT1, DT4, DT5, DT7 a DT12 | Decorrem de fato verificado no repositório, não de opinião |
| A regra "desconhecido é pergunta, nunca padrão" | É a correção de um defeito real, não uma preferência |
| **A citação de artigo em `06-anac-completo.md` §4, 5 e 6** | Conferida contra o texto oficial nesta revisão, com trecho citado |
