# EP-00 · O app na web

**Semana 5** (12–18/10) · 1 história · Habilitador técnico

---

## O problema

O aplicativo Expo **já roda na web** e ninguém consegue abrir. `react-native-web`,
`react-dom` e `@expo/metro-runtime` estão instalados, `npm run web` existe, e há
quatro arquivos de variação web escritos — `src/db/repo.web.ts` sobre
localStorage, `src/db/attachments.web.ts` sobre IndexedDB,
`src/components/DateTimeField.web.tsx` e o teste dele.

Falta configurar a saída e publicar. É a menor quantidade de trabalho do plano
inteiro com o maior efeito: dez telas prontas passam de invisíveis a acessíveis
por link.

## A hipótese

> Se o organizador conseguir abrir o Embarcaly pelo navegador do celular, sem
> instalar nada, ele testa antes de decidir — e a loja deixa de ser o gargalo do
> lançamento.

## A métrica

| Mede | Alvo | Onde |
|---|---|---|
| O app abre em `embarcaly.com/app/` | Sim | Manual, Android e iPhone |
| Recarregar numa rota interna | Não dá 404 | Manual |
| `expo export --platform web` no CI | Verde | GitHub Actions |

## As histórias

| ID | Título |
|---|---|
| [US.000](US-000-export-web.md) | Publicar o app como site |

## Riscos deste épico

| Risco | Mitigação |
|---|---|
| `web.output: "static"` não funciona sem expo-router, e este repo usa React Navigation | Usar **`"single"`**. Está escrito na US.000 e é a decisão DT1 |
| O GitHub Pages roda Jekyll e **remove pasta com underscore**; o export emite `_expo/static/js/…` | `.nojekyll` na raiz publicada. Sem isso: tela branca, sem erro no console |
| Um split `.web.tsx` quebrado só aparece no navegador, nunca no teste | Passo de CI `expo export --platform web` |
| `app.json` ainda está no v2 — `primaryColor #B0432B`, splash creme | Atualizar junto. A casca não pode ser creme num app azul |

## Fora de escopo

Service worker, funcionamento offline pela web e instalação como PWA ficam para
depois do G2. O `manifest.webmanifest` de `app/` já existe e cobre o ícone; o
resto é otimização de algo que ainda não tem usuário.
