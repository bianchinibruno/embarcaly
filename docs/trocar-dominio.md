# Apontar embarcaly.com para o site

O repositório inteiro já cita `embarcaly.com`. Falta o DNS e o arquivo `CNAME`.
**A ordem importa** — invertida, ela derruba a landing que está no ar.

---

## Estado em 14/09/2026

| | |
|---|---|
| `embarcaly.com` resolve para | `2.57.91.91` — servidor do registrador, não é o site |
| GitHub Pages responde em | `185.199.108.153` a `185.199.111.153` |
| Site publicado hoje | `bianchinibruno.github.io/embarcaly/` |
| Arquivo `CNAME` no repositório | não existe (correto, por enquanto) |

---

## Passo 1 · DNS, no registrador

No painel do domínio, apague o registro que aponta para `2.57.91.91` e crie:

| Tipo | Nome | Valor |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `bianchinibruno.github.io.` |

Os quatro A são o mesmo serviço em endereços diferentes — é assim mesmo.
Os AAAA são opcionais e só valem para quem acessa por IPv6; se o painel não
aceitar, siga sem eles.

**Espere a propagação antes do passo 2.** Confira com:

```bash
nslookup embarcaly.com
```

Só siga quando a resposta trouxer `185.199.*`, e não `2.57.91.91`.

---

## Passo 2 · O arquivo CNAME, no repositório

```bash
printf 'embarcaly.com\n' > CNAME && git add CNAME && git commit -m "build: point the site to the embarcaly.com domain"
```

Commit dedicado, só esse arquivo. É o que diz ao GitHub Pages para servir no
domínio e redirecionar o `github.io`.

> **Por que não antes:** com o `CNAME` no repositório e o DNS ainda no
> registrador, o Pages passa a redirecionar `bianchinibruno.github.io/embarcaly`
> para um endereço que não responde. O site fica fora do ar até o DNS propagar.

---

## Passo 3 · GitHub

`Settings` → `Pages`:

1. **Custom domain:** `embarcaly.com` → Save (ele revalida o DNS sozinho)
2. Espere o certificado — costuma levar de minutos a uma hora
3. Marque **Enforce HTTPS** assim que o botão sair do cinza

---

## Passo 4 · Conferir

```bash
curl -sI https://embarcaly.com | head -1
curl -sI https://www.embarcaly.com | head -1
curl -sI https://embarcaly.com/captura/ | head -1
curl -sI https://embarcaly.com/guia-direitos-do-passageiro.pdf | head -1
curl -sI https://bianchinibruno.github.io/embarcaly/ | head -3
```

Os quatro primeiros devem responder `200`. O último deve responder `301` com
`location: https://embarcaly.com/...`.

---

## O que já foi trocado no repositório

| Arquivo | O que mudou |
|---|---|
| `index.html` | `canonical`, `og:url`, `og:image` e os links do rodapé |
| `captura/index.html` | `og:image` e `twitter:image` |
| `README.md`, `DOSSIE.md` | links da landing, captura, guia e protótipo |
| `brand/IDENTIDADE.md` | o item "domínio próprio" agora aponta para este documento |
| `marketing/02-aso-play-store.md` | URL da política de privacidade da ficha da loja |
| `marketing/perfis-e-bios.md` | link das cinco redes sociais |
| `plano/gerar-guia.py` + os dois PDFs | rodapé e campo do guia, já regerados |
| `plano/05-mvp.md` | `viagem@embarcaly.com.br` → `viagem@embarcaly.com` |

**Não foi trocado, de propósito:** `CHANGELOG.md`. A linha que cita o
`github.io` descreve o que era verdade naquela versão, e changelog não se
reescreve.

---

## Antes de publicar as redes sociais

As bios de [`marketing/perfis-e-bios.md`](../marketing/perfis-e-bios.md) já
apontam para `https://embarcaly.com`. **Só cole o link nos perfis depois do
passo 4** — link quebrado na bio no primeiro dia do canal custa caro.

Enquanto o DNS não propaga, use `https://bianchinibruno.github.io/embarcaly/` na
bio e troque depois: é um campo só, em cinco redes.

---

## Pendências que o domínio novo destrava

- **Política de privacidade em `embarcaly.com/privacidade`** — a ficha da Play
  Store exige, e a página ainda não existe. O texto já está pronto em
  [`juridico/02-politica-de-privacidade.md`](../juridico/02-politica-de-privacidade.md)
- **E-mail no domínio** — `contato@embarcaly.com` já está em toda peça, no site e
  nos documentos jurídicos. Confirme que a caixa recebe antes de publicar as
  redes
