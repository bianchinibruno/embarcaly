# Backend — contrato, acesso, e o que nunca sai do aparelho

> O servidor é **cópia**, não fonte
> ([DT5](00-decisoes-tecnicas.md#dt5--o-aparelho-é-a-fonte-da-verdade)). A tela lê
> do aparelho, sempre. Tudo o que está abaixo existe para as quatro coisas que
> **não cabem** num aparelho só: identidade, entrada de e-mail, push, e um link
> que outra pessoa abre.

Supabase — Postgres, Auth e Row Level Security
([DT4](00-decisoes-tecnicas.md#dt4--supabase-como-backend)).

---

## 1 · O que mora onde

| No servidor | Por quê |
|---|---|
| Hash do código de entrada | Nunca o código |
| Token de aparelho para push | Removido no `Sair` e na exclusão |
| Tokens de compartilhamento | Revogação precisa ser central para valer |
| Fila de importação | O e-mail chega lá |
| Fila de avisos pendentes | O console lê dela |
| Estado de cobrança | O app só lê um booleano |
| Cópia de viagens e reservas | Para trocar de aparelho |

| **Nunca sai do aparelho** | Por quê |
|---|---|
| **Anexos** | São os documentos da pessoa. Ficam no sistema de arquivos ou no IndexedDB |
| **Rascunho de importação não confirmado** | Ainda não é dado, é proposta |
| **Preferência de exibição** | Não tem por que sair |

E uma coisa que sai, mas com cuidado: **localizador, assento e sequência**
sincronizam (são da reserva), mas **nunca entram no snapshot público** nem no
payload de push. Juntos com o sobrenome, são o suficiente para alguém alterar a
reserva de outra pessoa no site da companhia.

---

## 2 · Autenticação

### O fluxo, em cinco linhas

Código de 6 dígitos · TTL 10 minutos · uso único · 5 tentativas · limite por
e-mail e por IP. O servidor guarda o **hash**, nunca o código.

### As duas regras que não são negociáveis

**Resposta idêntica para e-mail conhecido e desconhecido** — incluindo o **tempo
de resposta**. Resposta diferente revela quem tem conta no Embarcaly, e isso é
vazamento de base.

**Mensagem única para código errado e código expirado.** Distinguir entrega
informação a quem está adivinhando.

### Limites

| Limite | Janela | Ação ao estourar |
|---|---|---|
| 5 pedidos por e-mail | 15 min | Responde sucesso, **não envia** |
| 20 pedidos por IP | 15 min | Responde sucesso, **não envia** |
| 5 tentativas por código | vida do código | Invalida o código |

Responder sucesso sem enviar é deliberado: uma mensagem de "limite atingido"
confirmaria ao atacante que o endereço existe.

### O funil que cai de graça

E-mail encaminhado de remetente **sem conta** → o servidor cria conta pendente e
responde com o link de entrada. **O F1 vira o funil de cadastro e ninguém
preenche formulário.**

---

## 3 · Endpoints

Contrato, não implementação. O Supabase resolve boa parte via cliente e RLS; o
que precisa de função própria está marcado.

### Conta

| Método | Caminho | O quê |
|---|---|---|
| `POST` | `/auth/codigo` | Pede o código. Resposta sempre 200 |
| `POST` | `/auth/validar` | Valida. 200 com sessão, ou 401 genérico |
| `POST` | `/aparelhos` | Registra token de push |
| `DELETE` | `/aparelhos/:token` | Remove no `Sair` |
| `DELETE` | `/conta` | **Função própria.** Exclusão em cascata |

> **`DELETE /conta` é o endpoint mais perigoso do sistema.** O identificador do
> usuário vem **do token verificado no servidor**, nunca do corpo da requisição.
> Aceitar `user_id` do corpo é permitir que alguém exclua a conta de outra pessoa.

### Sincronização

| Método | Caminho | O quê |
|---|---|---|
| `GET` | `/viagens?desde=<ms>` | O que mudou desde o último |
| `PUT` | `/viagens/:id` | Envia local |
| `PUT` | `/reservas/:id` | Idem |
| `DELETE` | `/viagens/:id`, `/reservas/:id` | Marca removido |

Último a escrever vence, por `updated_at`. Serve porque o dado é de uma pessoa,
num aparelho por vez, no MVP.

### Importação

| Método | Caminho | O quê |
|---|---|---|
| — | *entrada de e-mail* | **Nem Supabase, nem construído ainda.** Cloudflare Email Routing ou *inbound* do Postmark |
| `GET` | `/importacoes` | A fila |
| `POST` | `/importacoes/:id/confirmar` | Vira reserva |
| `POST` | `/importacoes/:id/descartar` | Sai da fila; e-mail retido 7 dias |
| `POST` | `/importacao/lembrete` | Envia o endereço por e-mail |

### Avisos

| Método | Caminho | O quê |
|---|---|---|
| `GET` | `/avisos/:id` | O registro. **A tela lê daqui, nunca do payload** |
| `POST` | `/avisos/:id/lido` | Métrica de abertura |
| `GET` | `/admin/avisos` | Fila pendente. Allowlist |
| `POST` | `/admin/avisos/:id/aprovar` | Envia. Aceita texto editado |
| `POST` | `/admin/avisos/:id/recusar` | Motivo obrigatório |

### Compartilhamento

| Método | Caminho | O quê |
|---|---|---|
| `POST` | `/viagens/:id/link` | Gera. Revoga o anterior |
| `DELETE` | `/viagens/:id/link` | Revoga |
| `GET` | `/publico/:token` | **Sem autenticação.** Devolve o snapshot |

---

## 4 · Row Level Security

O RLS **é** a regra de acesso. Não é complemento de uma verificação feita no
aplicativo — é a verificação.

| Tabela | Quem lê | Quem escreve |
|---|---|---|
| `trips`, `items`, `attachments` | Dono | Dono |
| `aparelhos` | Dono | Dono |
| `importacoes` | Dono | Serviço, e o dono confirma |
| `mudancas` | Dono | Serviço |
| `share_tokens` | Dono | Dono |
| `admin_fila` | **Allowlist de um e-mail** | Allowlist |
| *snapshot público* | **Qualquer um com token válido** | Ninguém |

### As duas políticas que merecem atenção

**A do console.** A allowlist é verificada **na política da tabela**, no
servidor. Verificação no cliente é decoração: qualquer pessoa com sessão válida
chamaria a API diretamente.

**A do link público.** É a única leitura sem autenticação do sistema, e a razão
pela qual o Supabase foi escolhido — *"esta linha só pode ser lida por quem
apresenta este token"* é literalmente uma política de acesso.

Ela verifica três coisas, **todas no servidor**:

```
token existe  E  revogado = false  E  agora <= trip.end + 48h
```

No cliente, seriam sugestão.

---

## 5 · Erro

Formato único. Código legível por máquina, mensagem legível por pessoa.

```json
{ "erro": "codigo_invalido", "mensagem": "Código inválido ou expirado. Peça outro." }
```

| Código | HTTP | Mensagem ao usuário |
|---|---|---|
| `codigo_invalido` | 401 | "Código inválido ou expirado. Peça outro." |
| `nao_autorizado` | 401 | "Entre de novo." |
| `nao_encontrado` | 404 | Varia por tela |
| `limite` | 429 | "Muitas tentativas. Espere alguns minutos." |
| `indisponivel` | 503 | "Não consegui agora. Tente de novo." |

### Três regras

**`codigo_invalido` é o mesmo para errado e expirado.** Sempre.

**O 404 do link público é o mesmo para revogado, expirado e inexistente** —
inclusive no tempo de resposta.

**A mensagem nunca vaza detalhe técnico.** Nome de tabela, coluna ou consulta em
mensagem de erro é mapa do banco entregue de graça.

---

## 6 · Push

| | |
|---|---|
| **Payload** | `{ avisoId }` + título genérico. **Nada mais** |
| **Deduplicação** | `hash(avisoId + token)`, único |
| **Silêncio** | 23h–7h **no fuso do usuário**, exceto crítico |
| **Crítico** | Cancelamento, preterição, atraso ≥ 60 min |
| **Aparelho novo** | Só mudanças posteriores ao registro |
| **Token** | Some no `Sair` e na exclusão |

**O fuso é o do usuário, não o do servidor.** Usar o do servidor manda aviso às
3h para quem está na Europa — exatamente o perfil 1 do ICP.

**O payload é mínimo porque a notificação aparece na tela bloqueada**, à vista de
quem estiver perto. `tituloNotificacao()` mora em `src/domain/mudanca.ts` para
que exista um teste afirmando que ela nunca inclui `pnr`, `seat` ou sobrenome.

---

## 7 · Retenção

| Dado | Prazo | Por quê |
|---|---|---|
| Corpo do e-mail importado | Até confirmar, ou 7 dias no descarte | Guardar e-mail de terceiro sem necessidade é exposição sem contrapartida |
| Registro de aviso | Enquanto a viagem existir | É o que a tela renderiza |
| Token revogado | 30 dias | Para responder 404 consistente |
| Registro de auditoria do console | 12 meses | Auditar um aviso errado que saiu |
| Registro de cobrança | Prazo legal, **anonimizado** | Valor, data e forma. Sem itinerário |

**Cada prazo desta tabela precisa bater com `privacidade/index.html`.**
Divergência entre o que a política promete e o que o sistema faz é o achado mais
fácil de provar numa reclamação.

---

## 8 · O que ainda não está decidido

| Aberto | Quando |
|---|---|
| **Provedor da entrada de e-mail** — Cloudflare ou Postmark | **Semana 5.** Maior risco de prazo do [EP-02](historias/EP-02-importacao.md) |
| **API de status de voo** — qual, a que custo | Semana 7 |
| **Provedor de cobrança** | Semana 9 |

E um item que não é técnico e bloqueia: **a política de privacidade publicada
diz que os dados ficam no aparelho.** Conta e servidor tornam isso parcialmente
falso. Revisar `privacidade/index.html` **antes** de o backend subir — semana 8,
com o advogado.
