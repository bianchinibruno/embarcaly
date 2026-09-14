# Embarcaly — sistema visual v2 · "Painel"

Substitui a paleta, a tipografia e as regras de layout do [MARCA.md](MARCA.md)
**em todas as superfícies digitais**. O manual antigo continua valendo para a
geometria da marca e para o raciocínio de que cor classifica em vez de decorar —
que é a única coisa dele que este sistema preserva, e leva mais longe.

---

## O conceito

**O painel do aeroporto te diz o que aconteceu. Este te diz o que fazer.**

Todo brasileiro que já viajou conhece a tela: fundo escuro, linhas em fonte
monoespaçada, uma coluna de horário e uma coluna de situação que muda sozinha.
`NO HORÁRIO`. `ATRASADO`. `CANCELADO`.

Essa tela é a imagem mais reconhecível do problema que o produto resolve, e ela é
inútil: informa o fato e abandona a pessoa. O Embarcaly é o mesmo painel virado
para o lado de quem viaja — com a sua viagem inteira nas linhas, e a coluna de
situação dizendo **o que fazer agora**.

Toda decisão abaixo sai daí. Nada é escolhido por gosto.

### Duas armadilhas já superadas

**A primeira.** O sistema de bilhete impresso (papel creme, carimbo terracota)
caiu no visual mais comum de página gerada por IA: creme, um acento terracota,
título em grotesk, etiqueta em mono maiúsculo, régua fina entre seções.

**A segunda.** A primeira correção trocou aquilo por preto chapado com verde,
âmbar e vermelho. É o outro cluster da mesma lista: fundo escuro liso com um
acento neon. Trocar um padrão por outro não resolve.

O que resolve é **material**. Fundo chapado, sem textura, sem registro, sem
imperfeição, é o tell mais forte de todos, em qualquer paleta. Papel tem fibra.
Tinta desalinha. Carimbo entorta. Formulário tem furo de arquivo e marca de
gráfica. Nada disso é enfeite: é o que separa uma peça feita de uma peça
gerada.

---

## Cor

**Regra única e inegociável: a página é monocromática. Cor só aparece onde há
situação.**

Isso não é estilo, é a lógica do painel. Num aeroporto, verde e vermelho não
enfeitam a tela — são a informação. Aqui é igual. Se um bloco não comunica
situação, ele não tem cor.

### Base

| Papel | Hex | Uso |
|---|---|---|
| `breu` | `#07090C` | Fundo da página |
| `painel` | `#0E141A` | Superfície de linha, cartão, bloco |
| `painel-alto` | `#151D26` | Linha destacada, hover |
| `risco` | `#1C2630` | Fio de 1px entre linhas |
| `risco-forte` | `#2B3947` | Borda de bloco |

### Fósforo — o texto

| Papel | Hex | Uso |
|---|---|---|
| `fosforo` | `#E8EEF4` | Texto principal e títulos |
| `fosforo-2` | `#93A3B3` | Texto de apoio |
| `fosforo-3` | `#5B6B7B` | Rótulo, legenda, coluna secundária |

Branco levemente frio, nunca puro. Painel de aeroporto tem temperatura.

### Situação — a única cor da identidade

| Código | Hex | Quando |
|---|---|---|
| `ok` | `#2FBF87` | No horário. Direito já garantido. Confirmado |
| `atencao` | `#E9A23B` | Atrasado. Contando. Precisa de ação |
| `critico` | `#E0524F` | Cancelado. Perdido. Quebrou |

**Nunca** use `atencao` como cor de marca, de botão genérico ou de destaque
decorativo. No instante em que âmbar aparecer em algo que não é situação, o
sistema inteiro perde a função.

O botão primário é **fósforo sobre breu** — claro sobre escuro, sem cor. Ação é
contraste, não matiz.

### Papel — a superfície impressa

Tela e papel são substratos diferentes e o sistema trata cada um pelo que ele é.
O painel do aeroporto é retroiluminado; o formulário é impresso em offset.

| Papel | Hex | Uso |
|---|---|---|
| `papel` | `#EFEEE6` | Base do documento |
| `barra` | `#DCE3D8` | Banda de tabela, listagem greenbar |
| `chumbo` | `#14170F` | Tinta 1, texto |
| `chumbo-2` | `#5C6356` | Texto de apoio |
| `chumbo-3` | `#8B9185` | Rótulo, numeração de folha |
| `fio` | `#B4B8A9` | Régua |
| `carimbo` | `#46356E` | **Tinta 2.** Violeta de carimbo de repartição |

**No papel existe uma tinta de cor só.** Situação no impresso é comunicada por
peso tipográfico, caixa e moldura, nunca por três cores. Isso é honesto com o
processo: formulário se imprime em duas cores, não em quatro.

O violeta é escolha deliberada. Carimbo de repartição brasileira é roxo, não
vermelho, e vermelho levaria de volta ao terracota.

### Material — obrigatório no impresso

Sem estes quatro, o documento fica chapado e volta a parecer gerado:

1. **Fibra.** Ruído fino e irregular no papel inteiro. Milhares de pontos
   minúsculos em opacidade baixa
2. **Desalinho de registro.** A segunda tinta bate 0,7 a 0,8pt fora da primeira.
   Visível nas marcas de canto e na moldura do carimbo
3. **Carimbo torto.** Entre 4 e 7 graus, nunca reto, com moldura dupla
4. **Ferragem de escritório.** Furo de arquivo na calha, marca de registro da
   gráfica nos cantos, picote pontilhado onde a página se destaca

### Tema de tela

**Só escuro.** Não existe versão clara da tela. Painel claro não é painel.

---

## Tipografia

| Papel | Família | Onde |
|---|---|---|
| Display | **Archivo Narrow** 700 | Manchete e título. Condensada, densa, registro de sinalização oficial |
| Texto | **Archivo** 400/600 | Parágrafo, botão, descrição |
| Dado | **Courier Prime** | Horário, código, rótulo, carimbo, campo de formulário |

**Courier Prime no lugar de Martian Mono.** Martian é monoespaçada moderna e
geométrica, e puxa a peça para o registro de terminal de programador, que é
território saturado. Courier Prime é máquina de escrever: registro de documento,
de formulário, de ofício. É o que o assunto pede.

**Archivo** é grotesk industrial de origem de sinalização, com eixo de largura.
Títulos vão em `font-stretch: 112%` e peso 800 — largos e densos, como letreiro
de aeroporto. Não é Inter e não é Space Grotesk.

### Escala

| Papel | Tamanho | Peso | Tracking |
|---|---|---|---|
| Manchete | `clamp(2.6rem, 8vw, 5rem)` | 800, `wdth 112` | `-0.04em` |
| Título de seção | `clamp(1.5rem, 4.4vw, 2.2rem)` | 800, `wdth 108` | `-0.03em` |
| Texto | `1.0625rem` / 1.62 | 400 | normal |
| Dado e codigo | `0.8rem` | 700 mono | `0.08em`, caixa alta |
| Horario grande | `clamp(1.6rem, 5vw, 2.4rem)` | 700 mono | `-0.02em`, `tabular-nums` |

**Toda coluna de número usa `font-variant-numeric: tabular-nums`.** Painel com
dígito dançando não é painel.

---

## Layout — a linha

A página não é feita de seções com cartões. É feita de **linhas de painel**.

Cada linha tem três colunas fixas, na mesma ordem, sempre:

```
HORA / CHAVE        SITUAÇÃO        CONTEÚDO
mono, fosforo-3     mono, cor       archivo, fosforo
```

No celular a coluna de situação sobe para cima do conteúdo e as três viram duas.
A ordem nunca muda.

### Regras

- **Sem canto arredondado.** Nada de `border-radius` em lugar nenhum. Painel é
  retangular
- **Sem sombra e sem gradiente.** Profundidade vem de valor de cinza, não de blur
- **Sem cartão flutuante.** O que separa uma linha da outra é um fio de 1px
- **Fio horizontal separa, fio vertical estrutura.** A coluna da esquerda tem
  régua contínua, como a calha de um painel
- **Alinhamento à esquerda.** Nada centralizado, nunca. Painel não centraliza
- **Respiro vertical grande, horizontal apertado.** Densidade de informação é
  característica, não defeito

---

## Movimento

Painel de aeroporto tem **um** movimento: a linha que vira quando a situação
muda. O site tem o mesmo, e só ele.

- A linha de situação troca uma vez no carregamento, de `NO HORÁRIO` para
  `ATRASADO`, arrastando as linhas seguintes junto
- Duração 260ms, sem curva elástica, sem bounce
- **A página está legível e completa antes da animação.** Ela nasce no estado
  final; o movimento é uma passagem por ele, não uma revelação
- `prefers-reduced-motion` entrega o estado final direto
- Nada mais anima. Sem fade ao rolar, sem parallax, sem contador subindo

---

## Voz

O produto fala como painel: **curto, direto, sem literatura.**

| Faça | Não faça |
|---|---|
| Frase curta. Ponto final. | Travessão no meio da frase para criar suspense |
| Número concreto: `3h45`, `R$39`, `81%` | "Muito", "boa parte", "a maioria" |
| Verbo no imperativo: "Peça o voucher" | "É importante que você solicite" |
| Português falado do Brasil | Português de apresentação corporativa |
| Dizer o que o produto não faz | Superlativo, "revolucionário", "único" |

**Proibido:** construção "não é X, é Y" repetida; pergunta retórica fechando
seção; sequência de três itens como recurso de ritmo; emoji em qualquer peça;
negrito espalhado no meio do parágrafo para simular ênfase.

Uma palavra em negrito por parágrafo, no máximo. Se tudo é importante, nada é.

---

## Marca

A marca `E` de Três Tempos do [MARCA.md](MARCA.md) **continua válida** e não foi
redesenhada — ela é boa e trocá-la é decisão de outro dia. O que muda é a
aplicação: ela vive em fósforo sobre breu, nunca em carimbo sobre papel.

Na web, a assinatura é **tipográfica**: `EMBARCALY` em Courier Prime 700, tracking
`0.22em`, em fósforo. Lê como cabeçalho de painel, que é o ponto.

---

## Checklist antes de publicar qualquer peça

- [ ] Tem cor em algum lugar que não comunica situação? Tire
- [ ] Tem canto arredondado, sombra ou gradiente? Tire
- [ ] Tem algo centralizado? Alinhe à esquerda
- [ ] Os números estão em `tabular-nums`?
- [ ] Tem travessão no meio de frase? Reescreva em duas frases
- [ ] Tem emoji? Tire
- [ ] A página está inteira legível com a animação desligada?
- [ ] **No impresso:** tem fibra, desalinho de registro, carimbo torto e
      ferragem de escritório? Sem os quatro, não publique
- [ ] **No impresso:** tem mais de uma tinta de cor? Tire

---

Embarcaly · sistema visual v2 · setembro de 2026
