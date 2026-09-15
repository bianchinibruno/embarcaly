# Critérios de pronto

O que precisa ser verdade para uma tela sair de "funciona na minha máquina" e
entrar no produto.

> **Pronto não é "o caminho feliz funciona".** É o caminho feliz, mais os três
> caminhos que ninguém lembra, mais o checklist visual, mais a prova de que
> nenhuma regra ficou escrita fora do lugar.

---

## 1 · O checklist universal

Vale para **toda** tela. Não se repete dentro de cada história.

### Os quatro estados

| Estado | A pergunta |
|---|---|
| **Vazio** | Ainda não tem dado. A tela ensina o que fazer? |
| **Carregando** | Está buscando. A tela diz isso sem piscar? |
| **Erro** | Deu errado. A mensagem diz **o que fazer**, não só o que falhou? |
| **Offline** | Sem rede. A tela funciona, ou explica o que exige rede? |

**Estado vazio não é ausência de tela.** "Nada quebrado" no Socorro e "o resto da
viagem continua de pé" no Aviso são as respostas mais tranquilizadoras que o
produto dá — e sumiriam se estado vazio fosse tratado como caso sem interesse.

**Offline é requisito, não cortesia.** O produto promete funcionar quando o
roaming acaba na imigração. As únicas operações que podem exigir rede são as
irreversíveis: entrar, excluir a conta, gerar e revogar link.

### O visual — checklist do v3

| Item | Como conferir |
|---|---|
| **Cada laranja conta alguma coisa** | Aponte para cada uso e responda *"o que está contando aqui"*. Sem resposta, é decoração |
| **Nenhum texto branco sobre laranja** | Branco sobre `#ED8426` dá 2,6:1 e reprova. Texto laranja é `#C96A16`; preenchimento laranja só recebe `onStamp` |
| **Número em Plex Mono tabular** | Horário, contagem, DES, quantidade |
| **Alvo de toque ≥ 44px** | A pessoa está em pé, com pressa |
| **375px e 1280px** | Sem rolagem lateral em nenhum dos dois |
| **Fonte de campo ≥ 16px** | Abaixo disso o iPhone dá zoom ao focar |
| **Área segura** | Nada sob a barra de gestos |
| **Fonte do sistema aumentada** | Nada corta, nada sobrepõe |

### O código

| Item | Como conferir |
|---|---|
| **Nenhuma regra na tela** | A guarda de domínio passa |
| **Nenhum botão sem ação** | `<Button>` sem `onPress` reprova |
| **Nenhum valor padrão silencioso** | Desconhecido é pergunta ou ausência, nunca suposição |
| **Ausência some** | Sem dado, a linha não aparece. Nunca `0`, `—` ou placeholder |
| **Cálculo nosso está marcado** | `estimated`, como `TimelineStep` já faz |
| **Domínio a 100%** | `npm run test:coverage -- --ci` verde |
| **Paridade web** | Se tocou `db/`, as duas implementações mudaram |
| **Migração espelhada** | Se tocou schema, `repo.web.ts` também |

### O legal

| Item | Como conferir |
|---|---|
| **Aviso sai de `legal.ts`** | Nenhuma tela reescreve. Palavra por palavra |
| **Superfície registrada** | Superfície nova entra em `SUPERFICIES`, e `legal.test.ts` passa |
| **Nenhuma palavra proibida** | `PROIBIDAS` — o teste reprova o CI |
| **Citou direito? Artigo na tela** | Com inciso e alínea quando houver |

---

## 2 · O critério de pronto de cada tela

O específico, além do universal.

### Semana 5

| Tela | Pronto quando |
|---|---|
| **Export web** | Abre em Android e iPhone; recarregar em `/app/Passes` não dá 404; nenhum 404 sob `_expo/`; `app.json` sem nenhum valor do v2 |
| **Entrar · pedir** | Código chega em ≤ 60 s; e-mail inválido não faz chamada de rede; offline preserva o digitado; resposta **idêntica** para conhecido e desconhecido |
| **Entrar · validar** | Colar os seis dígitos funciona nas três plataformas; o código sugerido pelo iPhone preenche de uma vez; **nenhum campo com `maxlength="1"`**; sessão sobrevive a fechar o app |

### Semana 6

| Tela | Pronto quando |
|---|---|
| **Importar · endereço** | Estado vazio do itinerário oferece importar **acima** do cadastro manual; copiar dá retorno visível; a lista de companhias é lida de constante, não escrita na tela |
| **Importar · fila** | E-mail aparece em ≤ 60 s como "Recebido"; item travado em "Lendo" por 30 min vira erro sozinho; encaminhar duas vezes não duplica; a consulta **para** quando a tela perde o foco |
| **Revisar · confirmar** | Proposta sem pendência confirma em **um toque**; campo extraído e campo calculado se distinguem; horário internacional mostra o local de cada ponta; confirmar funciona offline |
| **Revisar · completar** | Só `type`, `title` e `start` bloqueiam; o campo começa **vazio** e a sugestão é tocada; sair e voltar preserva o preenchido; nenhum valor padrão atribuído |

### Semana 7 — **a semana que não pode dar errado**

| Tela | Pronto quando |
|---|---|
| **Registrar problema** | Os três gatilhos registráveis; cancelamento e preterição **não pedem** minutos; atraso é informado pela **nova previsão**; `originalStart` grava o `start` da reserva; nenhum gatilho pré-selecionado |
| **Socorro · gatilhos** | Cancelamento e preterição dão as 4 alternativas **imediatamente**; atraso de 30 min não dá; atraso de 4 h dá; item após voo cancelado fica **em risco**, sem horário deslocado |
| **Socorro · trecho** | `GRU→LIS` deriva internacional; `GRU→POA` deriva doméstico; código fora da lista deriva **`'desconhecido'`**; desconhecido vira pergunta; a assistência material **não espera** a resposta |
| **Socorro · compensação** | 250 no doméstico, 500 no internacional, com o inciso; **nenhum valor em reais**; trecho desconhecido mostra a pergunta no lugar do valor |

> **A semana 7 só fecha com as dez combinações do roteiro de conferência
> conferidas contra o texto da Resolução 400.**
> Seis obrigatórias e quatro de fronteira, em
> [`06-anac-completo.md`](06-anac-completo.md#9--o-roteiro-de-conferência).
> É o único item deste documento que exige ler a norma, e não só rodar o teste.

### Semana 8

| Tela | Pronto quando |
|---|---|
| **Aviso · tela** | Renderiza do **registro**, e o teste prova isso — registro com um valor, payload com outro, e se verifica qual apareceu; mudança sem consequência diz que o resto está de pé; a rota aceita `{ id }` e nada mais |
| **Aviso · push** | Mesma mudança processada duas vezes entrega **uma** notificação; aviso não crítico às 3h sai às 7h; cancelamento às 3h sai na hora; nenhum texto de notificação contém localizador, assento ou sobrenome; token some no `Sair` |
| **Console** | Nada sai sem aprovação; recusar sem motivo é bloqueado; e-mail fora da allowlist recebe a **mesma** mensagem de código inválido; `noindex` e sem link a partir do site; **funciona em celular** |
| **Socorro · o que mudou** | Atraso de 3 h seguido de antecipação de 1 h dá acumulado de **2 h**; sem mudanças, o bloco não é renderizado |

### Semana 9

| Tela | Pronto quando |
|---|---|
| **Conta · sair** | `Sair` limpa os **três** depósitos — sessão, banco e anexos; funciona em modo avião; nenhum campo editável além do interruptor |
| **Conta · excluir** | Confirmação por digitação de `EXCLUIR`; sem rede, **nada é apagado**; erro do servidor deixa tudo intacto; links do F5 morrem junto; caminho web existe e está na ficha da loja |
| **Acompanhar** | Convite aparece em D-7 e **uma vez só**; nenhum preço em nenhum estado; teste afirma que a tela não contém `R$`, `preço`, `plano` nem `assinatura`; viagem já acompanhada não recebe oferta |
| **Compartilhar** | A prévia aparece **antes** de o link existir; teste afirma a **ausência** de cada campo sensível; token no fragmento; gerar novo revoga o anterior |
| **Página pública** | **≤ 30 kB comprimido**, com passo de CI que falha acima; conteúdo em ≤ 2 s em 3G lenta; token inválido, revogado e expirado dão a mesma tela e o mesmo 404 |

### Semanas 10 e 11

| Tela | Pronto quando |
|---|---|
| **Cartões** | O nome é o da viagem; sem passageiro, a linha **some**; "Adicionar à Carteira" **não existe mais no código**; nenhum botão sem ação |
| **Docs** | 5 reservas e 3 anexos mostram "3 arquivos"; "1 arquivo" no singular; "offline" só quando é verdade; a seção "Pessoais" **não existe mais** |
| **Reserva** | Sem dado de bagagem, a linha some; zero explícito diz "sem bagagem despachada"; reservas antigas ficam **nulas**, nunca com `1` |
| **Guarda de domínio** | Rodada contra o código **anterior**, encontra os seis literais conhecidos; contra o corrigido, passa limpa; roda em < 2 s |

---

## 3 · O critério de pronto do MVP

Tela pronta não é produto pronto. O MVP fecha quando:

| # | Critério | Verificação |
|---|---|---|
| 1 | **Os direitos estão certos** | As dez combinações conferidas contra a norma |
| 2 | **Ninguém digita a viagem** | ≥ 70% das reservas importadas sem correção |
| 3 | **O aviso chega antes** | ≥ 80% enviados antes de a pessoa abrir o app |
| 4 | **Zero avisos errados** | Nos primeiros 50, revisados à mão |
| 5 | **Nada sensível no link** | Teste de ausência verde, e uma inspeção manual do HTML publicado |
| 6 | **A conta pode ser excluída** | Dentro do app e pela web |
| 7 | **Nenhum dado inventado** | Guarda de domínio verde |
| 8 | **Funciona sem rede** | Viagem inteira consultável em modo avião |
| 9 | **Gente real usou numa viagem real** | O único critério que não se verifica sozinho |

O critério 9 é o que decide o G2. Os outros oito são pré-requisito dele.

---

## 4 · O que reprova, sempre

Três coisas. Qualquer uma delas, sozinha, reprova a tela independentemente do
resto do checklist.

> **1 · Direito informado errado.**
> Faz a pessoa passar vergonha no balcão e destrói a única coisa que o produto
> vende. É o único bug classificado como inaceitável.

> **2 · Dado inventado se passando por dado do usuário.**
> Nome no bilhete, bagagem que não existe, documento que ninguém anexou. Numa
> demonstração chama-se protótipo; com usuário real, chama-se mentira.

> **3 · Campo sensível no que é publicado.**
> Localizador, assento e sobrenome juntos são credencial de reserva. Não é dado
> embaraçoso — é acesso.

Tudo o mais é bug, e bug se corrige na semana seguinte.
