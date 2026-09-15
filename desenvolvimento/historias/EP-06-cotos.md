# EP-06 · Os cotos de dado falso

**Semanas 10 e 11** (16–29/11) · 4 histórias · Nenhuma tela nova

---

## O problema

Cinco telas que existem, funcionam e parecem prontas têm dado inventado escrito
dentro do código. Não é bug de cálculo: é texto fixo que se passa por dado do
usuário.

| Onde | O que está escrito | O que a pessoa entende |
|---|---|---|
| `PassesScreen.tsx` | Passageiro `M1BIANCHINI/B` | *"o app sabe meu nome"* |
| `PassesScreen.tsx` | Três botões sem `onPress` | *"isso aqui faz alguma coisa"* |
| `DocsScreen.tsx` | "Passaporte" e "Seguro viagem" escritos na mão | *"meus documentos estão guardados"* |
| `DocsScreen.tsx` | Contagem `items.length + 2` | Um número que não corresponde a nada |
| `ItemScreen.tsx:126` | `Bagagem: 1 despachada` | *"eu despachei uma mala"* |

**O último é o perigoso.** Alguém chega no balcão achando que despachou.

Numa demonstração isto se chama protótipo e está tudo certo — foi assim que
nasceu. Com usuário real na frente, chama-se mentira, e o G2 reprova.

## A hipótese

> Nada aparece na tela sem existir no banco. Quando não existe, a linha some —
> não vira placeholder, não vira travessão, não vira zero.

## A métrica

| Mede | Alvo | Onde |
|---|---|---|
| Literal de dado de usuário em `src/screens/**` | **Zero** | Guarda de domínio no CI |
| Botão sem ação | **Zero** | Revisão de tela, checklist do v3 |
| Reclamação de dado errado no G2 | Zero | Entrevistas de uso real |

## As histórias

| ID | Título | Tela |
|---|---|---|
| [US.020](US-020-passes-passageiro.md) | Ver o meu nome no cartão de embarque | Cartões de embarque |
| [US.021](US-021-docs-contagem.md) | Ver só os documentos que existem | Docs |
| [US.022](US-022-reserva-bagagem.md) | Ver a bagagem que eu realmente despachei | Reserva |
| [US.023](US-023-guarda-de-dominio.md) | Impedir que a regra volte para a tela | — (CI) |

## A ordem importa

[US.023](US-023-guarda-de-dominio.md) é a última porque só faz sentido depois de
os cotos estarem cortados — uma guarda que já nasce vermelha é desligada no
primeiro dia. Cortar primeiro, travar depois.

## Riscos deste épico

| Risco | Mitigação |
|---|---|
| Campo novo em `Trip` e `Item` exige migração de schema | `SCHEMA_VERSION` 2 → 3, e **espelho em `repo.web.ts`** — o repo web é independente e é onde o esquema diverge em silêncio |
| Remover o dado falso deixa a tela vazia e feia | Estado vazio é requisito, não consequência. Cada história descreve o dela |
| A guarda de domínio pegar falso positivo e virar ruído | Lista de padrões curta e específica, nunca heurística. Está na US.023 |

## Fora de escopo

**Apple Wallet.** O botão "Adicionar à Carteira" da `PassesScreen` é **removido**,
não implementado. Wallet é fase 3, é iOS, e não decide compra.

**Seção "Pessoais" do `DocsScreen`.** Some, e não volta como tela de documento.
Guardar passaporte é outro produto, com outro regime de privacidade.
