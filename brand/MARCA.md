# Embarcaly — manual de marca

Conceito **Três Tempos**. Um **E** cujas três barras são os três estados da tela
principal do app: **agora**, **depois** e **mais tarde**.

A barra do topo, em tinta de carimbo, é sempre a ação atual. A do meio é o passo
seguinte. A de baixo desbota porque o futuro é menos definido.

É a única marca da exploração em que a inicial do nome, a tese do produto e a
hierarquia da interface são a mesma forma.

---

## Correção que vale registrar

Na primeira versão, o braço de baixo era mais **curto** que o do meio — a ideia
era "o futuro encolhe". Ao renderizar o ícone em 512px, ele era lido como **F**.

Proporção de E pede braços de cima e de baixo iguais, com o do meio mais curto.
Então quem passou a dizer "menos definido" foi o **tom**, não o comprimento — e
a metáfora ficou melhor: futuro incerto é mais claro, não mais curto.

**Nunca encurte o braço inferior.** É a regra que sustenta a legibilidade da marca.

---

## Arquivos

| Arquivo | Uso |
|---|---|
| `embarcaly-mark.svg` | Marca isolada, fundo claro |
| `embarcaly-mark-dark.svg` | Marca isolada, fundo escuro |
| `embarcaly-mark-mono.svg` | Monocromática (`currentColor`) — herda a cor do contexto |
| `embarcaly-lockup.svg` | Marca + assinatura, horizontal, fundo claro |
| `embarcaly-lockup-dark.svg` | Idem, fundo escuro |
| `embarcaly-icon.svg` | Ícone de app, fundo tinta |
| `embarcaly-icon-light.svg` | Ícone de app, fundo papel |
| `favicon.svg` | Favicon vetorial |
| `png/icon-1024.png` | App Store |
| `png/icon-512.png` `png/icon-192.png` | Play Store e PWA |
| `png/icon-180.png` `png/icon-120.png` | iOS |
| `png/mark-1024.png` | Marca isolada, fundo transparente |
| `png/mark-dark-1024.png` | Idem, para fundo escuro |
| `png/favicon-32.png` `png/favicon-16.png` `png/favicon.ico` | Navegador |

> Os lockups usam texto vivo com a família **Familjen Grotesk**. Antes de mandar
> para impressão ou para a loja, **converta o texto em curvas** — senão o nome
> quebra em qualquer máquina sem a fonte instalada.

---

## Cores

| Papel | Claro | Escuro |
|---|---|---|
| Tinta (`ink`) | `#171C20` | `#E9EDEE` |
| Carimbo (`stamp`) — ação e agora | `#B0432B` | `#D4715A` |
| Papel (`paper`) — fundo | `#FBFAF7` | `#1A2025` |

A barra "mais tarde" é a tinta a **55%** de opacidade.

**Cor não decora, classifica.** O carimbo é reservado ao que exige ação — nunca
use vermelho como enfeite, ou ele perde a função dentro do produto.

---

## Assinatura

Sempre **embarca** em tinta e **ly** em carimbo.

Isso separa visualmente a palavra portuguesa do sufixo, o que ajuda a leitura de
estrangeiro se a expansão vier, e amarra o nome à cor de ação do app.

---

## Regras de uso

**Tamanho mínimo:** 16px para a marca isolada, 90px de largura para o lockup.
Abaixo disso as barras se fundem.

**Área de respiro:** a altura de uma barra (6,5 unidades da grade de 48) em volta
de todo o conjunto. Nada entra nessa margem.

**Ícone:** a marca ocupa 75% do quadrado. Raio do canto 22,26% do lado, que é a
curva do *squircle* do iOS.

### Não faça

- Não encurte o braço de baixo — vira **F**.
- Não troque a cor da barra do topo. Ela é a ação de agora.
- Não aplique sombra, gradiente ou contorno. A marca é impressa, não digital.
- Não incline nem rotacione. O carimbo do design system já cumpre esse papel.
- Não use a marca isolada em peça sem contexto de produto — nessa situação, use o lockup.

---

## Regenerar

Toda a geometria vive em um único lugar, na lista `BARS` do script gerador
(`gen_brand.py`). Alterou lá, roda de novo e todos os SVGs e PNGs saem coerentes.

---

Embarcaly · manual de marca v1.0
Antes de aplicar comercialmente, rode busca de marca no INPI nas classes de
software e de serviços de viagem.
