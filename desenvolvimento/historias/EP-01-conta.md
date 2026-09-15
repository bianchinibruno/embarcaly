# EP-01 · Conta e identidade

**Semanas 5 e 9** · 4 histórias · Habilitador de backend e **bloqueador de loja**

---

## O problema

Hoje o aplicativo não sabe quem está usando. Isso basta enquanto tudo mora no
aparelho, e deixa de bastar no minuto em que três coisas do MVP entram:

1. **F1** precisa ligar um e-mail encaminhado a uma pessoa.
2. **F3** precisa saber para qual aparelho mandar o aviso.
3. **F5** precisa saber quem pode revogar um link.

E há um bloqueio de calendário: a Play Store **exige caminho de exclusão de
conta dentro do aplicativo** para qualquer app que tenha conta. Sem a tela
`Conta`, a publicação da semana 9 não acontece — não por qualidade, por política.

## A hipótese

> Se a entrada for e-mail + código, sem senha, o organizador entra na primeira
> tentativa e nunca mais é barrado — e a política de privacidade que já está
> publicada continua verdadeira.

A política diz, no ar, hoje: *"não guardamos senha porque o aplicativo não tem
senha"*. **A decisão DT3 não é preferência técnica; é a consequência de um texto
já publicado.** Mudar para senha exige republicar a política.

## A métrica

| Mede | Alvo | Onde |
|---|---|---|
| Entrar na primeira tentativa | ≥ 90% | Evento `entrar_sucesso` ÷ `entrar_codigo_pedido` |
| Tempo do pedido ao código na caixa | ≤ 60 s p95 | Log do provedor |
| Exclusão de conta conclui em uma sessão | 100% | Manual, no aceite da loja |

## As histórias

| ID | Título | Tela | Semana |
|---|---|---|---|
| [US.001](US-001-entrar-pedir-codigo.md) | Pedir o código de entrada | Entrar | 5 |
| [US.002](US-002-entrar-validar-codigo.md) | Validar o código e abrir o app | Entrar | 5 |
| [US.003](US-003-conta-sair.md) | Sair, avisos e links legais | Conta | 9 |
| [US.004](US-004-conta-excluir.md) | Excluir a conta | Conta | 9 |

## Riscos deste épico

| Risco | Mitigação |
|---|---|
| **A política publicada diz que os dados ficam no aparelho.** Conta e servidor tornam isso parcialmente falso | Revisar `privacidade/index.html` e a minuta **antes** de o backend subir. É item da semana 8, com o advogado |
| Resposta diferente para e-mail conhecido e desconhecido vaza quem tem conta | Resposta **idêntica** nos dois casos. Está em `RN.001.04` |
| Código de 6 dígitos é força bruta viável sem limite | TTL 10 min, uso único, 5 tentativas, limite por e-mail e por IP |
| Supabase é dependência de plataforma — risco [R9](../../plano/10-riscos.md) | O domínio não importa SDK. Trocar de backend é trocar `src/db/` |

## Fora de escopo

**Perfil.** Nome, foto, preferências, fuso — nada disso entra. A tela `Conta` tem
cinco linhas e nenhum campo editável. Login social e "passaporte" estão
explicitamente fora do MVP em [`plano/05-mvp.md`](../../plano/05-mvp.md).
