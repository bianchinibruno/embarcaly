# Embarcaly — sistema visual v3

**Substitui o [v2 "Painel"](IDENTIDADE-v2-arquivado.md) por inteiro.** Em conflito com
qualquer peça anterior, vale este documento. Peça antiga não vira regra por antiguidade.

A geometria da marca continua vindo do [MARCA.md](MARCA.md), que segue válido para o
desenho do **E de Três Tempos**. O que muda aqui é a paleta, a tipografia, os grafismos
e as regras de aplicação.

---

## O conceito

**Azul estrutura. Laranja aponta.**

O sistema é herdado da Trilha Certa Viagens e adaptado para um produto. A agência usa a
paleta para dizer o que importa; aqui o laranja ganha um significado mais estreito e mais
duro:

> **Laranja é o tempo que está contando.**

Um prazo correndo, uma ação que precisa acontecer agora. Fora disso, a tela é azul e
branca. Esta é a única regra que vale em todas as superfícies, e o teste é uma pergunta:

**aponte para qualquer laranja da peça e pergunte o que está contando ali.** Se não houver
resposta, esse laranja é enfeite e sai.

---

## Cor

### Base, herdada

| Papel | Hex | Uso |
|---|---|---|
| Azul marinho | `#33366A` | Estrutura, fundo de bloco, texto sobre claro |
| Laranja | `#ED8426` | Contando, agir agora. Preenchimento de botão |
| Branco | `#FFFFFF` | Respiro |

### Superfícies do produto

O app roda **em escuro, sempre**. O fundo é o azul da marca escurecido, não preto: quem
abre o aplicativo às duas da manhã não leva um facho de luz na cara, e a marca continua
reconhecível.

| Papel | Hex | Uso |
|---|---|---|
| `breu` | `#1C1E3C` | Fundo do app e dos blocos escuros da web |
| `carta` | `#262A54` | Cartão, linha elevada |
| `azul` | `#33366A` | Bloco de destaque, linha alta |
| `fio` | `#414682` | Fio de 1px |
| `apoio` | `#C9CBE4` | Texto de apoio sobre escuro |
| `fraco` | `#7C80AE` | Rótulo, legenda, coluna secundária |

### Superfícies claras

| Papel | Hex | Uso |
|---|---|---|
| `papel` | `#F2F1EF` | Base das páginas claras |
| `branco` | `#FFFFFF` | Cartão sobre papel |
| `fio-claro` | `#DEDDD9` | Régua e borda |
| `apoio-claro` | `#5A5D80` | Texto de apoio |
| `fraco-claro` | `#8A8A96` | Rótulo e legenda |

### Situação — o que o produto tem e a agência não precisa

No manual da Trilha Certa, verde e vermelho só existem em comparação. Aqui eles são
**informação de produto** e vivem na tela o tempo todo. É a única divergência estrutural
entre os dois sistemas.

| Código | Escuro | Claro | Quando |
|---|---|---|---|
| `ok` | `#2FBF87` | `#1E9E5A` | No horário. Direito liberado. Reserva de pé |
| `atencao` | `#ED8426` | `#C96A16` | Contando. Precisa de ação |
| `critico` | `#FF7A6E` | `#C0392F` | Cancelado. Perdido. Quebrou |

A cor de atenção **é a cor da marca**. Não foi escolhida por acaso: no Embarcaly, chamar
atenção e marcar o tempo correndo são a mesma coisa.

### A armadilha do laranja

`#ED8426` com texto branco em cima dá **2,6:1**. Reprova em qualquer tamanho.

| Combinação | Contraste | Veredito |
|---|---|---|
| Branco sobre `#ED8426` | 2,6:1 | ❌ nunca |
| Azul `#33366A` sobre `#ED8426` | 4,3:1 | ✅ a partir de 18px |
| `#ED8426` sobre `#1C1E3C` | 7,7:1 | ✅ em tudo |
| Branco sobre `#C96A16` | 4,6:1 | ✅ em tudo |

**Na prática:** botão laranja leva texto azul-marinho em peso 700, nunca branco. Quando o
texto precisa mesmo ser branco, o fundo passa a ser `#C96A16`. Laranja como **texto sobre
claro** é sempre `#C96A16`; como **preenchimento**, sempre `#ED8426`.

Nos tokens do app isso está separado: `stamp` é o laranja de texto (muda por esquema),
`stampFill` é o de preenchimento, e `onStamp` é a única cor permitida em cima dele.

### Proporção

Alvo de 74% escuro, 18% branco, 8% laranja numa tela do app. Vale como alvo, não como
régua. Numa tela sem atraso, o laranja tende a zero — e isso é o certo.

---

## Tipografia

**A agência assina com a mão. O produto assina com o dado.**

A Trilha Certa usa uma manuscrita para dar o toque humano. Aqui ela **não entra**: quem
está no balcão às duas da manhã não precisa de calor, precisa de número legível.

| Papel | Família | Onde |
|---|---|---|
| Texto | **Poppins** 300/400/500/600/700 | Título, parágrafo, botão, rótulo de campo, aviso |
| Dado | **IBM Plex Mono** 400/500/600 | Hora, duração, voo, assento, valor, prazo, artigo |

Na dúvida: **se muda quando a viagem muda, é dado.**

### Escala

| Papel | Tamanho | Peso | Espaço |
|---|---|---|---|
| Manchete | `clamp(2.35rem, 6.4vw, 3.75rem)` | 700 | `-0.045em` |
| Título de seção | `clamp(1.7rem, 4.2vw, 2.5rem)` | 700 | `-0.035em` |
| Título de tela | `1.15rem` | 600 | `-0.02em` |
| Texto | `1rem` / 1.6 | 400 | normal |
| Texto leve e aviso | `0.9375rem` / 1.6 | 300 | normal |
| Tempo decorrido | `2.4rem` mono | 600 | `-0.02em` |
| Código e trecho | `0.75rem` mono | 500 | `+0.04em` |
| Situação | `0.625rem` mono, caixa alta | 500 | `+0.12em` |
| Fonte da norma | `0.6875rem` mono | 400 | normal |

**Toda coluna de número usa `tabular-nums`.** Um relógio que dança a cada segundo não é
relógio.

### Substitutas

Sem Poppins: **Montserrat**, depois Segoe UI, depois Arial. Sem Plex Mono: a monoespaçada
do sistema, via `ui-monospace`. No React Native isso resolve sem instalar nada.

### O que saiu

Archivo Narrow, Archivo e Courier Prime ficam arquivadas com o sistema de papel impresso.
Courier Prime era máquina de escrever e puxava tudo para registro de ofício; Plex Mono é
da mesma família de desenho geométrico da Poppins e convive com ela sem briga.

Os arquivos continuam em `fonts/` porque o gerador do guia e o das artes ainda os usam.
Saem quando esses dois migrarem.

---

## Marca

O **E de Três Tempos** não foi redesenhado. As três barras continuam sendo agora, depois e
mais tarde, e a de baixo continua desbotando a 55%.

O que muda:

- A barra do topo passa a ser **laranja `#ED8426`**. Ela sempre foi "a ação de agora", e
  agora tem a cor que quer dizer exatamente isso
- **Sem canto arredondado.** `rx` era 1 e passa a 0
- A assinatura é **Poppins 700**, minúscula, com `embarca` em azul ou branco e `ly` em
  laranja
- O ícone de app é **marca branca sobre `#1C1E3C`**, com o raio de 22,26% do lado

**Nunca encurte o braço de baixo.** Em 512px ele vira **F**. Continua sendo a regra que
sustenta a legibilidade da marca.

Kit gerado por `gen_brand.py`. Rode-o depois de qualquer mudança de paleta.

---

## Elementos gráficos

Seis herdados da agência, um que só existe aqui.

1. **O E ampliado.** Ampliado até sair da peça, em azul sobre claro ou branco sobre azul,
   sempre cortado pela borda. Nessa escala ele é textura, não marca, e por isso **perde a
   barra laranja**. Nunca inteiro, nunca atrás de parágrafo
2. **A linha.** Hora à esquerda em mono, fio vertical, conteúdo à direita, situação no fim.
   A ordem das três colunas nunca muda, nem quando a linha é de hotel, carro ou passeio
3. **A régua de tempo.** Marcos preenchidos são direito liberado, o vazado é o que está
   contando. É a única peça do sistema que usa três cores ao mesmo tempo
4. **A caixa de destaque.** Retângulo laranja chapado atrás da conclusão, nunca da
   pergunta. Uma por peça
5. **A pílula de ação.** Cheia para a ação principal, vazada para a secundária. É o único
   canto redondo do sistema
6. **Ícones de linha.** Contorno de 1,6px na grade de 24, ponta e canto arredondados.
   Nunca preenchido, nunca emoji
7. **A barra laranja de rodapé.** 12 a 16px colada na base, sem margem

### Cantos, profundidade e grão

- **Cantos:** ou é reto, ou é pílula. Não existe 8, 12 ou 16px. A exceção é o ícone de app
- **Profundidade:** vem do valor do azul, não de sombra. Uma linha elevada é `#262A54`
  sobre `#1C1E3C`, e pronto
- **Grão:** só nas superfícies claras da landing e do impresso. Nunca dentro do app — em
  tela OLED ele vira sujeira

---

## Componentes do aplicativo

Nenhuma tela inventa componente. **Toda área de toque tem no mínimo 44px.**

| Componente | Regra |
|---|---|
| **Botão** | Cheio para a ação principal, vazado para a secundária, apagado quando não dá para tocar. Altura 48px, pílula. **Nunca dois cheios na mesma tela** |
| **Linha de reserva** | Hora em mono, título e nota, situação à direita |
| **Cartão de direito** | Marco, situação, título, **a frase pronta entre aspas** e o artigo. A frase é o produto |
| **Campo** | Moldura laranja em foco, vermelha quando o valor não foi entendido. O erro diz o que fazer, não o que está errado |
| **Abas** | Quatro, fixas. A ativa ganha régua laranja no topo. Sem emblema com número |
| **Aviso** | Texto de peso 300 sobre fio fino, nunca caixa colorida |
| **Estado vazio** | Explica o que vai aparecer ali. Não pede desculpa |

---

## Voz

A Trilha Certa fala como quem já foi avisando quem vai. O Embarcaly fala com a mesma
pessoa, só que **no pior momento da viagem dela**. Isso corta literatura.

| Faça | Não faça |
|---|---|
| Passou de 4 horas. Peça o hotel e o traslado. | Você pode ter direito a algumas assistências. |
| A locadora fecha às 22h. Seu voo chega 01h20. | Atenção: sua reserva pode ser impactada. |
| Leia isto no balcão: "Já passou de duas horas..." | Nós brigamos pelos seus direitos. |
| R$39 por viagem. Não é assinatura. | Planos a partir de R$39. Cancele quando quiser. |

**Regras:** prazo em número, sempre. Artigo sempre junto do direito. Sem travessão de
suspense, sem pergunta retórica fechando seção, sem emoji em arte, tela ou notificação.
Uma palavra em negrito por parágrafo.

### Palavras proibidas

*garantimos* · *você vai receber* · *indenização certa* · *brigamos por você* · *direito
garantido* · *assessoria* · *representamos* · *processo fácil*

Cada uma transforma um aplicativo de organização em promessa de resultado. Existe teste
em `mobile/src/domain/__tests__/legal.test.ts` que **quebra a build** se algumas delas
aparecerem nos textos legais.

---

## Proteção jurídica

Três frentes, três avisos, e todos vivem em **um arquivo só**:
`mobile/src/domain/legal.ts`.

| Frente | O que cobre | Onde aparece |
|---|---|---|
| **Atividade** | Não é advocacia, não é agência de viagens, não representa ninguém | Rodapé da landing, ajustes, termos |
| **Conteúdo** | Base na Resolução 400 e no CDC, sem constituir parecer | Toda tela e peça que cite direito |
| **Cálculo** | Hora e situação saem de dado digitado pela própria pessoa | Socorro, cascata, qualquer hora recalculada |

> **Copie de `legal.ts`, nunca reescreva na peça.** Reescrever é como se perde a proteção.

### 🔴 Conflito aberto entre as marcas

O aviso de atividade diz, com estas palavras, que o Embarcaly **também não é agência de
viagens**. A Trilha Certa Viagens é uma agência, e este sistema visual amarra as duas
marcas na mesma paleta e na mesma tipografia.

As duas coisas não podem continuar verdadeiras do jeito que estão escritas. **Decida a
relação entre as marcas antes de assinar qualquer peça com as duas**, e ajuste o texto
legal conforme a decisão. Três saídas:

| Saída | O que implica |
|---|---|
| **Independente** | Nenhuma peça cita a agência. Herda o visual e nada mais. Mais seguro juridicamente |
| **Endossada** | "uma ferramenta da Trilha Certa" em mono, no rodapé. Ganha confiança, e obriga a reescrever o aviso de atividade |
| **Produto da agência** | Assinatura conjunta no topo. Máxima confiança, e aí o Embarcaly é uma agência de viagens, com tudo que isso implica |

Isto não é parecer jurídico — não sou advogado. É uma incoerência entre dois documentos
seus, e ela precisa de decisão antes de virar peça publicada.

---

## Checklist antes de publicar

**Toda peça**

- [ ] Cada laranja responde "o que está contando aqui"?
- [ ] Tem texto branco sobre laranja? Troque por azul-marinho
- [ ] Todo número está em Plex Mono, com largura tabular?
- [ ] O braço de baixo do E está do mesmo tamanho do de cima?
- [ ] Tem canto arredondado que não seja pílula nem ícone de app?
- [ ] Tem sombra, gradiente ou emoji?
- [ ] Área de toque com menos de 44px?

**Peça que cita direito**

- [ ] O artigo da Resolução 400 está na peça, não só na legenda?
- [ ] A norma foi reconferida neste trimestre?
- [ ] O aviso foi copiado de `legal.ts`, sem reescrever?
- [ ] A peça informa o direito, sem prometer o resultado?
- [ ] Aparece alguma das palavras proibidas?
- [ ] Se há hora recalculada, o aviso de cálculo está junto?

---

## Estado da migração

| Arquivo | Situação |
|---|---|
| `mobile/src/theme/tokens.ts` | ✅ v3 |
| `mobile/src/components/primitives.tsx` | ✅ v3 |
| `mobile/App.tsx` + fontes | ✅ Poppins e IBM Plex Mono |
| `index.html` | ✅ v3 |
| `captura/index.html` | ✅ v3 |
| `brand/gen_brand.py` e o kit | ✅ v3 |
| `brand/gen_og.py` e `og-image.png` | ✅ v3 |
| `marketing/gerar-artes.py` | 🔴 ainda no v2 |
| `plano/gerar-guia.py` | 🔴 ainda no v2 |
| `prototipo/index.html` | 🔴 ainda no v2 |

**O motor não muda.** `direitos.ts`, `cascata.ts` e `legal.ts` são domínio, não aparência.
Os 305 testes continuam valendo.

### O que ainda falta

1. **O E redesenhado à mão** em vetor. O `gen_brand.py` gera a partir da geometria de 48
   unidades, o que é suficiente para tela e loja, mas não houve revisão de desenho
2. **Tema claro do app.** Este sistema assume só escuro. Se a loja exigir, é decisão nova
3. **Revisão jurídica** dos textos de `legal.ts` — cronograma semana 8, R$400
4. **Domínio próprio.** As páginas ainda apontam para `bianchinibruno.github.io/embarcaly`

---

Embarcaly · sistema visual v3 · setembro de 2026
