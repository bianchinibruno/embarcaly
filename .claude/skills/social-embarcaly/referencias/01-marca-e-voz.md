# Marca e voz — como o Embarcaly fala em público

Resumo operacional de [`brand/IDENTIDADE.md`](../../../../brand/IDENTIDADE.md).
Em conflito, o IDENTIDADE.md vence.

---

## A frase que organiza tudo

> **Azul estrutura. Laranja aponta. Laranja é o tempo que está contando.**

E, na escrita:

> A Trilha Certa fala como quem já foi avisando quem vai. O Embarcaly fala com a
> mesma pessoa, **no pior momento da viagem dela**. Isso corta literatura.

A pessoa que lê está num balcão de aeroporto às duas da manhã, com a mãe de 70
anos sentada na mala. Ela não precisa de calor, precisa de número legível e da
frase pronta para dizer ao atendente.

---

## Os quatro pares que ensinam o tom

| Faça | Não faça |
|---|---|
| Passou de 4 horas. Peça o hotel e o traslado. | Você pode ter direito a algumas assistências. |
| A locadora fecha às 22h. Seu voo chega 01h20. | Atenção: sua reserva pode ser impactada. |
| Leia isto no balcão: "Já passou de duas horas..." | Nós brigamos pelos seus direitos. |
| R$39 por viagem. Não é assinatura. | Planos a partir de R$39. Cancele quando quiser. |

**O padrão:** número em vez de adjetivo, ação em vez de possibilidade, frase
pronta em vez de promessa.

---

## Regras de escrita

- **Prazo em número, sempre.** "4 horas", não "algumas horas".
- **Artigo sempre junto do direito.** Direito sem artigo é boato.
- **Sem travessão de suspense.** Sem pergunta retórica fechando seção.
- **Uma palavra em negrito por parágrafo.** Em rede social, uma por bloco.
- **Frase curta.** Se passou de duas linhas na tela do celular, quebre.
- **Segunda pessoa.** "Seu voo", "você tem", "peça". Nunca "o passageiro".
- **Sem jargão de marketing.** Nada de "revolucionar", "no cenário atual",
  "mergulhar", "descomplicar", "game changer", "a verdade que ninguém te conta".
- **Erro se admite com número.** "Errei o prazo do internacional: são 21 dias,
  não 7. Corrigido." Bastidor sem número vira desabafo.

## Palavras proibidas

*garantimos* · *você vai receber* · *indenização certa* · *brigamos por você* ·
*direito garantido* · *assessoria* · *representamos* · *processo fácil*

Cada uma transforma um app de organização em promessa de resultado. Há teste em
`mobile/src/domain/__tests__/legal.test.ts` que quebra a build se algumas delas
aparecem nos textos legais — em rede social não há build para quebrar, então a
trava é esta linha.

---

## Emoji, hashtag e formatação por rede

| Rede | Emoji | Hashtag | Negrito |
|---|---|---|---|
| Instagram | até 2 na legenda, nunca na arte, nunca substituindo palavra | 5 a 8, no fim, específicas | não existe nativo — use quebra de linha |
| TikTok | até 2 | 3 a 5 | — |
| YouTube | zero no título; até 1 na descrição | 3 na descrição | — |
| X / Threads | zero | 0 a 2, dentro da frase | não use unicode falso de negrito |

**Nunca use unicode "𝐧𝐞𝐠𝐫𝐢𝐭𝐨"** — quebra leitor de tela e leitura de acessibilidade.

---

## Arte — o que o gerador precisa saber

Artes saem de [`marketing/gerar-artes.py`](../../../../marketing/gerar-artes.py),
que já está no sistema v3.

| Item | Regra |
|---|---|
| Fundo | `#1C1E3C` (breu). Cartão `#262A54`. Claro: `#F2F1EF` |
| Laranja | `#ED8426` só onde há tempo contando. Aponte e pergunte "o que conta aqui" |
| Texto sobre laranja | **azul-marinho `#33366A` peso 700**, nunca branco |
| Laranja como texto sobre claro | `#C96A16` |
| Tipografia | Poppins no texto, **IBM Plex Mono em todo número**, com largura tabular |
| Cantos | reto ou pílula. Nada de 8/12/16px |
| Proibido | sombra, gradiente, emoji, ícone preenchido |
| Marca | o E de Três Tempos, braço de baixo inteiro (encurtou, virou F) |
| Grafismo | E ampliado cortado pela borda · a linha (hora, fio, conteúdo, situação) · régua de tempo · caixa laranja atrás da conclusão · barra laranja de rodapé |

**Situação:** `ok` `#2FBF87` · `atencao` `#ED8426` · `critico` `#FF7A6E`.

---

## O conflito com a Trilha Certa

O aviso de atividade diz que o Embarcaly **não é agência de viagens**. A Trilha
Certa é. As duas marcas compartilham paleta e tipografia.

**Enquanto não houver decisão registrada em `brand/IDENTIDADE.md`:** nenhuma peça
do Embarcaly cita a agência, nem assina junto, nem faz cross-post com atribuição.
Referência de estilo é permitida; endosso, não.
