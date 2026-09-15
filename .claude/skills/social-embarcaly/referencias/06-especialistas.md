# Painel de especialistas — as lentes que criticam a peça

Adaptação enxuta dos 60 perfis do
[filnik/social-media-manager-AI](https://github.com/filnik/social-media-manager-AI)
e do pacote de agentes nomeados do
[ComposioHQ](https://github.com/ComposioHQ/awesome-claude-skills): em vez de
imitar pessoas reais, cada lente é **uma pergunta que precisa ter resposta**.

**Como usar:** toda peça passa por **dois**. Um é sempre o Jurídico quando a peça
cita direito. O outro é o da métrica-alvo da peça.

---

## As dez lentes

### 1 · O Jurídico
*Obrigatório em toda peça que cita direito.*
- O artigo está **na peça** ou só na legenda?
- O prazo bate com `mobile/src/domain/direitos.ts`?
- A ressalva foi **copiada** de `legal.ts`, sem reescrever?
- Alguma palavra proibida entrou? Alguma frase promete resultado?
- Se a norma mudou no trimestre, isso foi reconferido?

### 2 · O Passageiro no Balcão
*Usabilidade sob estresse.*
- Dá pra usar isso com uma mão, no aeroporto, às 2h da manhã, sem ler duas vezes?
- Tem frase pronta, ou só explicação do que a lei diz?
- Se a pessoa só ler a primeira e a última folha, ela sai com alguma coisa?

### 3 · O Algoritmo
*Distribuição.*
- Isso é **salvável** ou só curtível? O que a pessoa vai querer guardar?
- O gancho sobrevive aos primeiros 3 segundos / às duas primeiras linhas?
- A peça pede uma ação que a rede recompensa (salvar, compartilhar, responder)?
- O formato bate com o que a rede está distribuindo agora?

### 4 · O Cético
*Confiança.*
- Cadê a fonte? Um estranho conseguiria conferir em 30 segundos?
- Tem alguma afirmação que só se sustenta porque nós dissemos?
- Onde a peça admite o que não sabe ou o que o app não faz?

### 5 · O Especialista em Milhas (advogado do diabo)
*Ataque técnico.*
- Qual exceção ele vai citar nos comentários?
- A peça já responde, ou vai precisar de errata?
- Estamos otimizando pra agradar ele? (Se sim, refaça — não é o público.)

### 6 · O Competidor
*Posicionamento.*
- A peça diz que somos melhores que o Tripsy no que ele faz? (Proibido.)
- Fica claro **onde** ganhamos: Android, cadeia inteira, direitos?
- Um leitor do Wanderlog ou do TripIt entenderia o que muda aqui?

### 7 · O Growth
*Conversão.*
- Qual é o próximo passo concreto de quem gostou?
- A ponte para a landing está num lugar permitido (`E3`) ou vazou pra peça?
- Essa peça vale a ponte, ou é semana de puro alcance?

### 8 · O Editor
*Voz.*
- Tem travessão de suspense, pergunta retórica fechando seção, jargão de
  marketing, mais de um negrito por bloco?
- Toda frase passa do teste "número em vez de adjetivo"?
- Alguma linha soa a IA? Corte-a e reescreva com a cena.

### 9 · O Designer
*Arte.*
- Cada laranja responde "o que está contando aqui"?
- Texto branco sobre laranja? (Troque por azul-marinho.)
- Todo número em Plex Mono tabular? O braço de baixo do E está inteiro?
- Sombra, gradiente, emoji, canto de 12px? Fora.

### 10 · O Analista
*Aprendizado.*
- Que hipótese essa peça testa? (Pilar, formato ou gancho — uma por vez.)
- Qual número diz que deu certo, e em quantos dias?
- Se der certo, o que vira série? Se der errado, o que morre?

---

## Saída da crítica

Ao rodar `/critica`, entregue nesta forma — curto, sem elogio de cortesia:

```
Lente:            [nome]
Passa?            sim / não / com ajuste
O que quebra:     [item concreto, citando a linha]
Correção:         [a reescrita, já pronta]
```

Se duas lentes discordarem, o Jurídico vence sempre; depois dele, o Passageiro no
Balcão. Alcance nunca vence correção de direito.
