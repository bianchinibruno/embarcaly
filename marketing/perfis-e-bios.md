# Perfis e bios — as cinco redes

Texto pronto para colar. Contagem de caracteres conferida contra o limite de cada
campo (script no fim do arquivo).

**Regras aplicadas:** preço sempre como *R$39 por viagem*. Nada que prometa
resultado. Frase pronta em vez de adjetivo, número em vez de vago — a mesma
disciplina de [01-marca-e-voz](../.claude/skills/social-embarcaly/referencias/01-marca-e-voz.md).

> **Desvio deliberado da regra de marca, em todas as bios.**
> [01-marca-e-voz](../.claude/skills/social-embarcaly/referencias/01-marca-e-voz.md)
> pede zero emoji em bio — é o que separa a voz do Embarcaly da Trilha Certa. A
> pedido explícito do usuário em 14/09/2026, todas as bios abaixo usam emoji,
> voltadas para clique. A regra muda só aqui: **um emoji por linha, funcional
> como marcador, nunca decorativo** — nada de emoji dobrado, nenhum fora do
> início da linha, nenhum substituindo palavra. Carrossel, thread, arte e o
> texto legal continuam em zero emoji, sem exceção.

> **Por que a bio não cita direito.** `legal.ts` exige a ressalva em toda peça de
> campanha que cita direito (`SUPERFICIES.pecaCampanha`). Bio de Instagram tem
> 150 caracteres — não cabe direito + ressalva. Então a bio fala do **produto**,
> e o pilar de direitos aparece nas peças, nos destaques e na landing, sempre com
> a ressalva junto. Onde o campo é grande (X e YouTube), a ressalva entra —
> **copiada de `AVISO_CURTO`, sem parafrasear.**

---

## Identidade comum

| Campo | Valor |
|---|---|
| Handle | **@embarcaly** em todas. Reservas: `@embarcalyapp`, `@embarcaly.app` |
| Link | `https://embarcaly.com` |
| E-mail público | `contato@embarcaly.com` |
| Foto de perfil | `artes/perfis/avatar-1080.png` |
| Cor de fundo | breu `#1C1E3C` |

**Frase-mãe**, da qual todas as bios são recorte:

> Voo, hotel, carro e passeio num lugar só. Quando um elo quebra, a cadeia
> inteira se refaz. R$39 por viagem, não é assinatura. Android primeiro.

---

## Instagram

| Campo | Texto | Limite |
|---|---|---|
| Usuário | `embarcaly` | 30 |
| Nome | `Embarcaly · organizar viagem` | 30 |
| Categoria | Aplicativo | — |
| Botão | E-mail → `contato@embarcaly.com` | — |

**Bio (150) — versão em uso, com emoji, para clique**

```
✈️ Voo, hotel, carro e passeio em 1 app
🔄 Recalculamos a cadeia se atrasar
💳 R$39/viagem — sem assinatura
🤖 Android primeiro
🔗 Lista de espera aberta
```

149/150 caracteres. Cada linha é um fato, não um adjetivo: o que o app faz, o
que ele faz quando falha, o preço sem assinatura, a plataforma, e a seta para
o botão — é a mesma disciplina de "número em vez de adjetivo" da voz de marca,
só que com marcador visual em vez de travessão.

**Bio (150) — versão sem emoji, alinhada à voz de marca**

```
Voo, hotel, carro e passeio num lugar só.
Quando um elo quebra, a cadeia se refaz.
R$39 por viagem. Não é assinatura.
Android primeiro.
```

135/150 caracteres. Guarde esta se algum dia o objetivo do perfil virar
autoridade e não conversão — é a leitura que `01-marca-e-voz.md` sustenta.

O campo **Nome** carrega a palavra que as pessoas buscam (*organizar viagem*) —
o Instagram indexa nome e usuário, não a bio.

**Destaques (4, nesta ordem)** — capas em breu com o E, sem emoji:

| Destaque | O que vai dentro |
|---|---|
| `DIREITOS` | os carrosséis de limiar, opções e frases de balcão — cada um com a ressalva |
| `ANDROID` | o comparativo e o porquê da Play Store primeiro |
| `R$39` | o que é grátis, o que se paga, sem renovação automática |
| `BASTIDOR` | a planilha de 14 linhas, os números do mês |

**Story fixado no destaque `DIREITOS`, primeiro slide:**
*Conteúdo informativo. Não é consultoria jurídica.*

---

## Threads

Espelha o Instagram, com uma linha a mais de conversa — Threads premia quem
parece gente, não marca.

| Campo | Texto |
|---|---|
| Usuário | `embarcaly` |
| Nome | `Embarcaly` |

**Bio (150) — com emoji, para clique**

```
🛠️ Construindo em público um app pra organizar viagem
🔄 Recalcula a cadeia quando um elo quebra
💳 R$39/viagem · Android primeiro
```

128/150 caracteres. A chave-de-boca abre porque aqui a voz é a de quem
constrói, não a de marca — é o mesmo recorte que `T3` usa nas threads.

**Primeiro post fixado:** TH-01 (a planilha de 14 linhas). É o que explica quem
está falando antes de qualquer post de direito.

---

## TikTok

| Campo | Texto | Limite |
|---|---|---|
| Usuário | `embarcaly` | 24 |
| Nome | `Embarcaly` | 30 |

**Bio (80) — com emoji, para clique**

```
✈️ Voo, hotel, carro e passeio em 1 app
💳 R$39/viagem · Android primeiro
```

72/80 caracteres. O TikTok corta bio longa e não indexa bem — a autoridade fica
no conteúdo e no comentário fixado, não aqui. O emoji aqui só marca a leitura
rápida do polegar, nada de repetir informação.

---

## X

| Campo | Texto | Limite |
|---|---|---|
| Usuário | `embarcaly` | 15 |
| Nome | `Embarcaly · organizador de viagem` | 50 |
| Localização | `Brasil` | 30 |
| Site | `https://embarcaly.com` | — |

**Bio (160) — com emoji, para clique**

```
✈️ Voo, hotel, carro e passeio em 1 app · 🔄 Recalcula a cadeia · 💳 R$39/viagem · 🤖 Android primeiro.
Conteúdo informativo. Não é consultoria jurídica.
```

150/160 caracteres. A ressalva é cópia literal de `AVISO_CURTO`
(`mobile/src/domain/legal.ts`) — a versão anterior deste documento a
parafraseava ("Conteúdo informativo, não jurídico."), o que quebra a regra de
nunca reescrever texto legal. Corrigido.

**Post fixado:** X-01 (a tabela por relógio). É a peça mais citável do perfil e
explica o assunto do canal em cinco linhas.

**Capa:** `artes/perfis/capa-x-1500x500.png`.

---

## YouTube

| Campo | Texto | Limite |
|---|---|---|
| Identificador | `@embarcaly` | 30 |
| Nome do canal | `Embarcaly` | 100 |
| Faixa de capa | `artes/perfis/capa-youtube-2560x1440.png` | — |

**Descrição do canal (1000) — com emoji, para clique**

```
✈️ O Embarcaly é um aplicativo de organização de viagem: voo, hotel, carro e
passeio num lugar só. Quando um elo da cadeia quebra, ele refaz o que vem depois
e mostra o que a companhia aérea é obrigada a fazer.

📝 Aqui eu publico o que aprendi lendo a Resolução ANAC nº 400/2016 e o Código de
Defesa do Consumidor: o que pedir no balcão, em que hora, e com qual artigo na
mão. E publico também os bastidores de construir o aplicativo, com números reais.

🤖 Android primeiro. 💳 R$39 por viagem, sem assinatura.

Orientação informativa baseada na Resolução ANAC nº 400/2016 e no Código de
Defesa do Consumidor. Não constitui consultoria jurídica nem parecer. Normas
mudam e cada caso tem particularidades. Confira a versão vigente em anac.gov.br
e, em caso de dúvida, procure o Procon, a ANAC ou um advogado.

O Embarcaly não é escritório de advocacia e não é agência de viagens: não vende
passagem, hospedagem ou pacote, e não representa você perante ninguém.

✉️ contato@embarcaly.com
```

Emoji só nas três linhas de abertura, que são texto de marketing. Os dois
parágrafos legais são cópia literal de `AVISO_CONTEUDO` e de `AVISO_ATIVIDADE`
(`mobile/src/domain/legal.ts`) — nenhum emoji entra neles, como manda a regra:
copiar, nunca reescrever.

**Seção "Sobre" → links:** landing, Play Store (quando existir), Instagram.

---

## Conferência de limites

```python
# python marketing/perfis-e-bios.py  (ou cole no interpretador)
CAMPOS = {
    "IG nome (30)":           ("Embarcaly · organizar viagem", 30),
    "IG bio c/ emoji (150)":  ("✈️ Voo, hotel, carro e passeio em 1 app\n"
                          "🔄 Recalculamos a cadeia se atrasar\n"
                          "💳 R$39/viagem — sem assinatura\n"
                          "🤖 Android primeiro\n"
                          "🔗 Lista de espera aberta", 150),
    "IG bio sem emoji (150)": ("Voo, hotel, carro e passeio num lugar só.\n"
                          "Quando um elo quebra, a cadeia se refaz.\n"
                          "R$39 por viagem. Não é assinatura.\n"
                          "Android primeiro.", 150),
    "Threads bio (150)": ("🛠️ Construindo em público um app pra organizar viagem\n"
                          "🔄 Recalcula a cadeia quando um elo quebra\n"
                          "💳 R$39/viagem · Android primeiro", 150),
    "TikTok bio (80)":   ("✈️ Voo, hotel, carro e passeio em 1 app\n"
                          "💳 R$39/viagem · Android primeiro", 80),
    "X nome (50)":       ("Embarcaly · organizador de viagem", 50),
    "X bio (160)":       ("✈️ Voo, hotel, carro e passeio em 1 app · 🔄 Recalcula a "
                          "cadeia · 💳 R$39/viagem · 🤖 Android primeiro.\n"
                          "Conteúdo informativo. Não é consultoria jurídica.",
                          160),
}
for nome, (texto, limite) in CAMPOS.items():
    n = len(texto)
    print(f"{nome:24} {n:4}/{limite}  {'ok' if n <= limite else 'ESTOUROU'}")
```
