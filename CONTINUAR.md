# Estado do projeto — retomar daqui

**Última atualização: 13/09/2026.**
Escrito para você abrir uma sessão nova e dizer só **"continua"**.

---

> **Contexto completo e detalhado:** [DOSSIE.md](DOSSIE.md).
> Este arquivo é o resumo operacional; aquele é a história inteira.

## 0 · Como usar este arquivo

Comando de abertura da próxima sessão:

```
Leia CONTINUAR.md e plano/README.md, depois continue de onde parou.
```

Para dirigir uma área específica:
`plano` · `app` · `landing` · `artes` · `marketing` · `vendas` · `juridico`

---

## 1 · O que é o projeto

**Embarcaly** — organizador de viagem que junta voo, hotel, carro e passeio num
lugar só e, quando um elo quebra, refaz a cadeia inteira e diz o que a companhia
aérea é obrigada a fazer.

| | |
|---|---|
| Modelo | **B2C · R$39 por viagem**, não assinatura |
| Camadas 1 e 2 (centralizar, conduzir) | Grátis para sempre |
| Camada 3 (socorrer) | É o que se cobra |
| Diferencial | Android + fornecedor brasileiro + Resolução ANAC 400 |
| Ciclo de validação | **10/09/2026 → 03/01/2027** |
| Repositório | https://github.com/bianchinibruno/embarcaly |
| Painel de controle | https://claude.ai/code/artifact/545256a7-8a0d-435e-a17d-854d2a967e49 |
| **Índice geral** · ed. 02 | https://claude.ai/code/artifact/520b947e-9703-40df-aea7-c2c228b2ff5b |

---

## 2 · Os portões

| Portão | Data | Passa com | Situação |
|---|---|---|---|
| **G0** | dom 27/09 | 12 entrevistas · 10 que não sabiam dos direitos · 8 em Android · 6 de fora do círculo | 🔴 não iniciado |
| **G1** | dom 11/10 | 10 pré-vendas pagas de R$19, sendo 4 de estranhos | 🔴 não iniciado |
| **G2** | dom 29/11 | 20 viagens pagas · 100% dos direitos corretos | 🔴 não iniciado |
| **G3** | dom 03/01 | 100 viagens pagas · alcance crescendo 3 meses | 🔴 não iniciado |

**Regra que atravessa tudo: código de produto proibido até o G1 (11/10).**

---

## 3 · Tudo que foi construído, em ordem

### Estratégia — `plano/` · 14 documentos
Decisões travadas, ICP detalhado, benchmark de concorrentes, escopo do MVP,
cronograma dia a dia, orçamento com fluxo de caixa, go-to-market, portões,
13 riscos, refinamento, a validação de demanda — e o **controle de recrutamento**,
que é o único arquivo do repositório feito para você preencher à mão.

### Identidade — `brand/IDENTIDADE.md`
Sistema visual **v2 "Painel"**, superfície impressa: papel greenbar `#EFEEE6`,
duas tintas (chumbo `#14170F` + carimbo violeta `#46356E`), fibra de papel,
desalinho de registro, furo de arquivo, marca de gráfica.
Tipos: **Archivo Narrow** (display), **Archivo** (texto), **Courier Prime** (dado).
Fontes versionadas em `brand/fonts/`.

> Duas armadilhas superadas e registradas no documento: creme+terracota (cluster
> de IA nº1) e preto chapado com neon (cluster nº2). O que resolveu foi
> **material**, não paleta.

### App — `mobile/`
| Módulo | O que faz | Testes |
|---|---|---|
| `domain/direitos.ts` | Motor da Resolução ANAC 400: limiares 1h/2h/4h, quatro saídas, compensação por preterição. Artigo citado em cada verbete | 38 |
| `domain/cascata.ts` | Recálculo da cadeia: dado um atraso, o que quebrou em cada reserva seguinte | 19 |
| `domain/legal.ts` | Fonte única dos avisos de proteção, com teste que barra promessa indevida | 17 |
| `screens/SocorroScreen.tsx` | A camada 3 na tela: direitos liberados, contagem do próximo, as quatro saídas, a cadeia quebrada | — |
| `screens/DelayFormScreen.tsx` | Registrar atraso na mão, aceitando `225`, `3h45` ou `3:45` | 17 |

**305 testes passando · 100% de cobertura no domínio · typecheck limpo ·
expo-doctor 21/21 · CI verde.**

### Web
| Arquivo | O quê |
|---|---|
| `index.html` | Landing institucional, sistema v2 |
| `captura/index.html` | **Landing de captura/venda**, foco em baixar o guia e entrar na lista |
| `prototipo/index.html` | Protótipo HTML original |
| `og-image.png` | Imagem de compartilhamento |

### Conteúdo
| Arquivo | O quê |
|---|---|
| `guia-direitos-do-passageiro.pdf` | **8 folhas**, formulário impresso, gerador versionado |
| `marketing/artes/` | **37 peças**: 4 carrosséis (30 folhas), 6 prints de loja, capa |
| `marketing/gerar-artes.py` | Gerador reproduzível de todas as artes |

### Marketing — `marketing/` · 6 documentos
Plano de 6 meses · calendário editorial de 26 semanas com banco de 40 pautas ·
ASO com ficha da Play Store pronta · **tráfego pago com CPM/CPC reais de 2026** ·
**campanha com criadores com tabela de preços real** · **vídeo com 6 roteiros
prontos**.

### Vendas — `vendas/` · 3 documentos
Playbook com funil, três momentos de venda e nove objeções · precificação com
economia unitária e projeção até fevereiro · plano de lançamento semana a semana.

### Jurídico — `juridico/` · 3 documentos
Mapa de exposição com as três frentes · minuta de termos de uso · minuta de
política de privacidade.

> 🔴 **São minutas. Não fui eu que dei parecer — eu não sou advogado.**
> Revisão por advogado está no cronograma (semana 8) e no orçamento (R$400).

---

## 4 · O que falta, em ordem de dependência

> **Esta lista, datada e em ordem de execução, está no índice geral** (ed. 02),
> na seção *O que fazer agora*: os nove passos até o G0, com os dois checkpoints
> de quarta e o que fazer se cada um falhar.
> https://claude.ai/code/artifact/520b947e-9703-40df-aea7-c2c228b2ff5b

### Feito em 13/09 — falta só você validar
1. ~~Trocar `SEU_ID` pelo endpoint do Formspree~~ — **ligado**: `mgaejzrr` na
   landing institucional, `mwlkdqad` na de captura, separados para medir qual
   converte. **Envie um teste real de cada página e confirme que o e-mail
   chega** antes de publicar carrossel

### Bloqueia o G0 — só conversa, zero código
2. **Montar a lista do círculo em `plano/controle-recrutamento.md`** — o tracker
   está pronto e vazio. ICP e critérios de triagem em `plano/02-icp.md`
3. Publicar os carrosséis 01 e 02 — artes prontas em `marketing/artes/`
4. **12 entrevistas** até 27/09 — roteiro em `plano/templates/entrevista-viajante.md`

### Bloqueia o G1
5. Gravar a demo de 90s com o protótipo
6. Abrir a pré-venda de R$19 e fechar 10 até 11/10

### Bloqueia o lançamento — depois do G1
7. **Backend. Não existe nada. É a maior lacuna do projeto**
8. **F1 · importar reserva por e-mail encaminhado** — parser de Latam, Gol, Azul, Booking, Decolar
9. Ligar a tela do agora ao servidor
10. Envio de aviso (push e e-mail)
11. **API de status de voo** — hoje o atraso é 100% manual, e isso é decisão de projeto até haver receita
12. **Política de privacidade em URL pública** — bloqueia o envio à Play
13. **Revisão jurídica** de `legal.ts`, termos e política — R$400
14. Aceite de termos no primeiro uso
15. Conta Google Play (US$25) e build assinado

### Depois do G2
16. Conta Apple (US$99/ano, paga com receita)
17. Blog e SEO
18. Programa de indicação

---

## 5 · Decisões travadas — não reabrir sem motivo novo

| Decisão | Onde está |
|---|---|
| **B2C**, o viajante paga. B2B2C arquivado | `plano/00-decisoes.md` D1 |
| **R$39 por viagem**, nunca assinatura | D2 · `vendas/01-precificacao.md` |
| **Android primeiro.** Play antes da Apple | D3 |
| **Centralizar é grátis.** Cobra-se o dia do problema | D4 |
| Motor de direitos entra no MVP | D5 |
| **Sem scraping, sem API não oficial** | D6 |
| MEI só depois do G2 | D7 |
| **Nunca gerar código de barras de embarque** | `brand/MARCA.md` |
| Sistema visual v2, papel impresso | `brand/IDENTIDADE.md` |

---

## 6 · Armadilhas registradas

| # | Armadilha |
|---|---|
| **R1** | **Construir em vez de vender.** O maior risco, e chega como razão técnica sensata pra ir mexer no código |
| **R2** | Aquisição sem verba. 830 ativações/mês só com orgânico |
| **R3** | Tripsy pode lançar Android. Existe lista de espera pública deles |
| **R5** | Informar direito errado. Acaba com o canal e com o produto |
| — | **Especialista em milhas é o anti-ICP.** Se aparecer na entrevista, encerre |
| — | **Mídia paga não fecha a R$39/viagem.** CAC ≈ R$188 contra contribuição de R$31,35 |
| — | Conteúdo sobre regulação envelhece. Reconferir a norma todo trimestre |

---

## 7 · Números de referência

| | |
|---|---|
| Contribuição por viagem paga | R$31,35 · margem 94% |
| Custo fixo mensal | R$424 |
| Equilíbrio | 14 viagens pagas/mês |
| Instalação → compra, categoria viagem | 2,42% |
| **Teste → pago, categoria viagem** | **48,7% mediana** — a melhor de todas as categorias |
| Reclamações de passageiro aéreo/ano | ~100 mil só no consumidor.gov.br |
| Voos cancelados/ano no Brasil | 112 mil · 11,6% |
| Android no Brasil | 81% |
| CPM Stories/Reels Brasil 2026 | R$8–18 |
| Publi micro (10k–100k) | Reels R$2.000–8.000 |

---

## 8 · O que eu NÃO fiz, por ordem sua

- ❌ Publicar na Play Store ou App Store
- ❌ Iniciar campanha ou disparar mensagem
- ❌ Qualquer coisa com custo
- ❌ Contratar criador, API ou ferramenta

## 9 · O que eu não consigo fazer

- **Trabalhar em background ou fora da sessão.** Não me auto-disparo
- **Dar parecer jurídico.** As minutas de `juridico/` precisam de advogado
- **Varrer Instagram, Threads e X por dentro.** A validação de demanda usou
  fontes públicas indexadas — e achou sinal mais duro que post

---

## 10 · Histórico da conversa que gerou tudo isto

1. Li o PDF do curso Zero ao Micro-SaaS e montei o plano inicial
2. Descobri que "Embarcafly" era **Embarcaly**, projeto já existente no disco
3. Montei dois caminhos (B2C e B2B2C) — **você escolheu B2C**
4. Pesquisei quem centraliza viagem: **Tripsy é brasileiro, ótimo, e iOS-only**
5. Escrevi ICP, recrutamento, roteiro de entrevista e plano de conteúdo
6. Gerei o guia de direitos em PDF
7. Criei a landing — **você apontou que estava com cara de IA, duas vezes**
8. Refiz a identidade: primeiro painel escuro, depois **formulário impresso com material**
9. Construí o motor de direitos, o recálculo da cadeia e as telas
10. Gerei 37 artes, 6 docs de marketing, 3 de vendas, 3 jurídicos
11. **Validação de demanda por pesquisa cortou o G0 de 20 para 12 entrevistas**
12. Publiquei tudo no GitHub em 18 commits, CI verde

---

**Comando para retomar:**

```
Leia CONTINUAR.md e plano/README.md, depois continue de onde parou.
```
