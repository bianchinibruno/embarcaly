# US.004 · Excluir a conta

---

## 0 · PRD

**Problema.** A Play Store exige, para qualquer aplicativo que tenha conta, um
**caminho de exclusão de conta dentro do próprio aplicativo** — e também um
caminho acessível pela web, sem instalar. Sem isso, a publicação da semana 9 é
recusada.

E há a exigência legal, que é anterior à da loja: o **art. 18 da LGPD** dá ao
titular o direito à eliminação dos dados, e a política de privacidade já
publicada promete isso.

**Objetivo.** Duas ações, com pesos diferentes: apagar uma viagem, e apagar a
conta inteira. A segunda é irreversível e a tela precisa dizer isso antes.

**Por que é história separada do `Sair`.** Porque a confusão entre as duas é o
defeito mais provável desta tela. `Sair` é local e reversível; `Excluir` é
permanente e do servidor. Separadas, cada uma tem o próprio texto e o próprio
teste.

**Métrica de sucesso.** A exclusão conclui numa sessão, sem e-mail de suporte,
sem formulário externo. Aceite da loja na primeira submissão.

**Escopo.** Confirmação, execução, o que é apagado, o que é retido e por quê, e a
confirmação por e-mail.

**Fora de escopo.** Exportar os dados antes de excluir. É direito da LGPD
também, mas é outra história e não bloqueia a loja — fica para depois do G2, com
o advogado.

---

## 1 · Cabeçalho da História

| Atributo | Detalhe |
|---|---|
| **ID** | US.004 |
| **Título** | Excluir a conta |
| **User Story** | Eu, como **pessoa que decidiu não usar mais o Embarcaly**,<br><br>Quero **excluir minha conta e meus dados pelo próprio aplicativo**,<br><br>Para que **eu não precise pedir isso a ninguém nem confiar que alguém vai fazer**. |
| **Épico Relacionado** | [EP-01 · Conta e identidade](EP-01-conta.md) |

---

## 2 · Regras de Negócio (RN)

| ID | Título | Descrição | Cenário (Gherkin) |
|---|---|---|---|
| **RN.004.01** | Exclusão não se confunde com saída | São ações de peso diferente e precisam de tratamento visual diferente | **Dado que** a pessoa está em `Conta`,<br>**Quando** ela olha as ações,<br>**Então** "Sair" é ação comum e "Excluir minha conta" está separada, em bloco próprio, com a cor de situação crítica |
| **RN.004.02** | A confirmação lista o que será apagado | Confirmação genérica não é consentimento informado | **Dado que** a pessoa aciona "Excluir minha conta",<br>**Quando** a confirmação aparece,<br>**Então** ela lista viagens, reservas, anexos e o endereço de e-mail, e diz **"isto não pode ser desfeito"** |
| **RN.004.03** | Confirmação por digitação | Um toque a mais é pouco para uma ação irreversível | **Dado que** a confirmação está aberta,<br>**Quando** a pessoa não digitou `EXCLUIR`,<br>**Então** o botão de confirmar permanece indisponível |
| **RN.004.04** | Exclusão exige rede | Apagar só no aparelho e deixar o servidor cheio é descumprir a promessa | **Dado que** o aparelho está sem conexão,<br>**Quando** a pessoa tenta excluir,<br>**Então** a tela avisa que é preciso estar conectado e **nada é apagado** |
| **RN.004.05** | Ordem: servidor primeiro, aparelho depois | Se o aparelho for limpo primeiro e o servidor falhar, a pessoa perde os dados e continua com a conta | **Dado que** a exclusão foi confirmada,<br>**Quando** o servidor responde sucesso,<br>**Então** e só então o aparelho é limpo e a tela `Entrar` aparece |
| **RN.004.06** | Falha no servidor não apaga nada | Falha parcial silenciosa é o pior resultado possível | **Dado que** o servidor responde erro,<br>**Quando** a tela recebe a resposta,<br>**Então** nada foi apagado, a mensagem explica e oferece tentar de novo |
| **RN.004.07** | Links compartilhados morrem junto | Um link público que sobrevive à conta é vazamento depois do fim da relação | **Dado que** a conta tinha links do F5 ativos,<br>**Quando** a exclusão conclui,<br>**Então** todos os tokens são revogados e as páginas respondem "link encerrado" |
| **RN.004.08** | O que é retido, e por quanto tempo | Retenção sem aviso é o que gera reclamação na ANPD | **Dado que** a conta foi excluída,<br>**Quando** a pessoa lê a confirmação,<br>**Então** ela informa que registros de cobrança são retidos pelo prazo legal, sem dados de viagem |
| **RN.004.09** | Confirmação por e-mail | A pessoa precisa de prova de que pediu e de que foi feito | **Dado que** a exclusão concluiu,<br>**Quando** o processo termina,<br>**Então** um e-mail de confirmação é enviado ao endereço excluído, com data e hora |
| **RN.004.10** | Caminho pela web também existe | A Play Store exige caminho acessível sem instalar o aplicativo | **Dado que** a pessoa não tem o app instalado,<br>**Quando** ela acessa a página de exclusão em `embarcaly.com`,<br>**Então** ela consegue pedir a exclusão informando o e-mail e o código |

---

## 3 · Critérios de Aceitação (AC)

- [ ] **AC.004.01** — "Excluir minha conta" está em bloco visualmente separado de "Sair".
- [ ] **AC.004.02** — A confirmação lista os quatro tipos de dado e contém a frase "não pode ser desfeito".
- [ ] **AC.004.03** — O botão de confirmar só habilita com `EXCLUIR` digitado; sensível a maiúsculas.
- [ ] **AC.004.04** — Sem conexão, a exclusão é bloqueada com mensagem clara e **nada local é apagado**.
- [ ] **AC.004.05** — Com erro do servidor, os dados locais continuam intactos e a viagem ainda abre.
- [ ] **AC.004.06** — Com sucesso, reabrir o aplicativo apresenta `Entrar`, e o mesmo e-mail entra como conta nova e vazia.
- [ ] **AC.004.07** — Links do F5 daquela conta respondem "link encerrado" após a exclusão.
- [ ] **AC.004.08** — O e-mail de confirmação chega e não contém dado de viagem.
- [ ] **AC.004.09** — A página web de exclusão existe, está linkada na ficha da loja e na política de privacidade.
- [ ] **AC.004.10** — A ficha da Play Store aponta para a página web de exclusão e para a seção de dados correspondente.
- [ ] **AC.004.11** — Nenhum texto branco sobre a cor crítica; contraste conferido.

---

## 4 · Tabelas de Decisão e Fronteira

| Cenário Lógico | Condição / Vigência | Origem (Fronteira) | Ação de Saída | Gatilho Técnico / Condição Exata |
|---|---|---|---|---|
| Pedido de exclusão | Sessão válida | Frontend | Abre confirmação por digitação | `texto === 'EXCLUIR'` habilita |
| Exclusão — sem rede | Offline | Frontend | Bloqueia, nada apaga | `netInfo.isConnected === false` |
| Exclusão — envio | Online | Servidor | Apaga em cascata | `DELETE /conta` → viagens → itens → anexos → tokens → usuário |
| Exclusão — sucesso | HTTP 200 | Cliente | Limpa local e navega | Só **após** 200. Nunca otimista |
| Exclusão — erro | HTTP ≠ 200 | Cliente | Mantém tudo, oferece repetir | Nenhuma limpeza local |
| Token do F5 | Conta excluída | Servidor | Revoga todos | `UPDATE tokens SET revogado = true WHERE user_id = ?` |
| Retenção fiscal | Houve cobrança | Servidor | Retém registro **sem** dado de viagem | Registro financeiro anonimizado, prazo legal |
| Caminho web | Sem app instalado | `embarcaly.com/excluir` | Mesmo código de 6 dígitos | Reaproveita o fluxo da [US.001](US-001-entrar-pedir-codigo.md) |

---

## 5 · Notas Técnicas e Dependências

**Integrações.** Função no servidor com privilégio de exclusão — não dá para
apagar o próprio usuário pelo cliente. Precisa rodar como serviço, com o
identificador vindo da sessão verificada, **nunca do corpo da requisição**.

**Segurança e Privacidade.**

- O identificador do usuário vem do token verificado no servidor. Aceitar
  `user_id` do corpo é permitir que alguém exclua a conta de outra pessoa.
- A exclusão é em cascata e inclui os anexos no armazenamento, não só as linhas.
- O e-mail de confirmação não carrega dado de viagem.
- Registro de cobrança retido é anonimizado: valor, data e forma de pagamento,
  sem itinerário.

**Conformidade com a loja.** Dois requisitos distintos, e os dois precisam ser
atendidos: caminho **dentro do aplicativo**, e caminho **na web sem instalar**.
A ficha da Play Store precisa da URL da página web. Este é o item que bloqueia a
publicação da semana 9 — não é desejável, é condição.

**Jurídico.** Prazo de conclusão, o que é retido e por quanto tempo precisam
bater **exatamente** com o texto de `privacidade/index.html`. Divergência entre
o que a política promete e o que o sistema faz é o achado mais fácil de provar
numa reclamação. Item da revisão do advogado, semana 8.

**Testes.** A cascata é testada no servidor. No cliente, o teste que importa é o
de falha: servidor responde 500, e o teste afirma que **nada local foi apagado**.

**Feature Flag.** Não se aplica. É requisito de publicação.

**Impacto em outras áreas.** Ficha da Play Store, política de privacidade e
termos. As três precisam ser atualizadas na mesma semana.

---

## 6 · Artefatos e Arquivos Relacionados

- **Base:** [US.003 · Sair, avisos e links legais](US-003-conta-sair.md)
- **Política publicada:** [`privacidade/index.html`](../../privacidade/index.html) — o que promete sobre eliminação
- **Termos:** [`termos/index.html`](../../termos/index.html)
- **Backend:** [`05-backend.md`](../05-backend.md) — cascata de exclusão e RLS
- **Tokens do F5:** [US.018 · Gerar, conferir e revogar o link](US-018-compartilhar.md)
