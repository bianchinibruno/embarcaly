# Riscos e mitigações

Ordenados por dano esperado. Os quatro primeiros decidem o projeto.

---

### R1 — Você constrói em vez de vender
**Probabilidade: alta.** É o risco número um e é específico do seu perfil. Você
tem 16 commits de engenharia, zero conversas com cliente, e o último deles é
`test: cover every component and stop a flaky suite`.

Testar dá feedback imediato de uma máquina. Ouvir "não preciso disso" não dá.
As duas coisas parecem trabalho, e só uma responde a pergunta que decide o
projeto.

**Mitigação:** commit de código de produto **proibido até o G1 · 11/10**. As
semanas 0 a 4 não têm nenhuma tarefa de código. Se numa sexta o diário mostrar
mais horas de código que de conversa antes do G1, a semana falhou — mesmo com o
app melhor.

---

### R2 — Aquisição sem verba · **o risco que decide o negócio**
**Probabilidade: alta.** O equilíbrio exige ~830 ativações por mês, todo mês, só
com conteúdo orgânico. Margem de 94% não salva quem não tem topo de funil.

**Mitigação:** conteúdo desde a Semana 0, não depois do G2 — canal orgânico
precisa de pista. Dois assuntos em paralelo ([08-gtm.md](08-gtm.md)), com o de
Android servindo de atalho: alcança menos gente, mas gente que **já quer o
produto**. O G3 mede crescimento do alcance, não valor absoluto.

---

### R3 — O Tripsy lança o Android · **novo, e é o risco de tese**
**Probabilidade: média.** Toda a vantagem estrutural do plano depende de o melhor
organizador brasileiro não existir no Android. Eles mantêm uma **lista de espera
pública** em `tripsy.app/android` — ou seja, sabem da demanda e já sinalizaram
intenção.

**Mitigação, em ordem:**
1. **Velocidade.** A janela é agora. Play Store na semana 9, não depois
2. **Não competir por centralização.** Se a briga for "quem organiza melhor",
   eles ganham — têm 8 anos e 700 integrações. A briga é pelas camadas 2 e 3
   ([04-tese.md](04-tese.md)), que eles não têm em plataforma nenhuma
3. **Direitos do passageiro brasileiro.** É a única coisa que exige conhecimento
   local e trabalho contínuo, e a que menos interessa a quem já vende bem em dólar
4. **Aceite o cenário.** Se lançarem e você tiver as camadas 2 e 3, você tem
   produto. Se você só tiver centralização, não tem

> **Leia como relógio, não como ameaça.** O buraco não vai ficar aberto para
> sempre, e é isso que torna as 16 semanas urgentes em vez de arbitrárias.

---

### R4 — Aviso errado, ou que não chega
**Probabilidade: média. Dano: fatal.** É a única coisa que o produto vende. A
pessoa desinstala e avalia com uma estrela — e na Play Store isso é permanente.

**Mitigação:** os primeiros 50 avisos passam por você antes de sair — botão de
enviar, nunca automático. Teste blindado só na cadeia `mudança → cálculo → envio`.
O resto pode quebrar. Aviso correto = 100% no G2, sem tolerância.

---

### R5 — Errar um direito
O motor de direitos tem efeito no mundo real. Mandar alguém exigir hotel com 2h
de atraso faz a pessoa passar vergonha no balcão; errar para menos faz ela perder
o que tinha direito.

**Mitigação:**
- A tabela do F4 é o único código do MVP que merece teste exaustivo — e é onde a
  sua formação em qualidade rende de verdade
- Fonte citada em cada tela: Resolução ANAC nº 400/2016, com o artigo
- Ressalva permanente: *orientação informativa, não é consultoria jurídica*
- Revisão por advogado antes do G2 (R$300–600, já no orçamento)
- **Nunca prometa indenização.** Você informa direitos; quem advoga é o LiberFly

---

### R6 — A importação por e-mail não funciona bem o suficiente
**Probabilidade: média.** É o maior vazamento do funil: se cadastrar a viagem dói,
nada mais acontece. E fornecedor brasileiro tem formato de e-mail instável —
Latam, Gol, Azul, 123milhas, CVC, Hurb, operadora local de passeio que manda o
voucher em PDF por WhatsApp.

**Mitigação:** cinco remetentes cobrem 80% do volume. O resto **você digita pelo
usuário**, em minutos, sem ele saber. Cada e-mail que o parser não entende vira
um caso na sua lista — e a lista, ordenada por frequência, é o roteiro de
desenvolvimento do trimestre seguinte.

---

### R7 — As lojas
Apple e Google levam 15% (Small Business Program, enquanto você faturar menos de
US$1M/ano). A revisão da Apple é imprevisível e pode levar semanas.

**Mitigação:** os 15% já estão na conta de margem. **Play Store primeiro** — é
81% do mercado brasileiro, custa US$25 uma vez contra US$99/ano, e a revisão é
rápida. A Apple entra em seguida, sem segurar o cronograma.

---

### R8 — Não há retenção, há reconquista
Sem assinatura não existe churn — e também não existe receita recorrente. Todo
ano você reconquista o mesmo cliente.

**Mitigação:** é escolha consciente ([00-decisoes.md](00-decisoes.md), D2): o
alternativo é churn de 90% em janeiro. O G3 mede **recompra**, e o plano anual de
R$99 aparece exatamente para quem já comprou duas vezes.

---

### R9 — Risco de plataforma
| Prática | Decisão |
|---|---|
| Scraping de site de companhia aérea | Proibido |
| Login na conta da cia em nome do usuário | Proibido |
| API não oficial | Proibido |
| Gerar código de barras de embarque | Proibido — já é regra do produto |
| OAuth de Gmail | Só depois do G2 |

A promessa é "eu te aviso". Fonte que quebra em silêncio não gera erro no seu
log — gera uma pessoa sozinha num aeroporto.

---

### R10 — LGPD
Você guarda nome, telefone, itinerário e documento de viagem — inclusive de
acompanhantes que nunca instalaram o app.

**Mitigação:** dado mínimo, link com token expirável, sem senha, exclusão da
viagem 30 dias após o retorno. Política de privacidade no ar desde a Semana 0.
Leitura por advogado antes do G3, na mesma sessão da revisão do motor de direitos.

---

### R11 — Sazonalidade
Dezembro, janeiro e julho concentram viagem. **Aqui isso é a favor** — mais
viagens, mais compras — e o G3 cai logo depois do pico, que é o melhor momento
para medir.

**O contra:** são as semanas em que você tem menos horas. Já está no
[cronograma](06-cronograma.md) como meia força. **Não pare o canal nas festas:**
é quando o seu público está com o problema na mão.

---

### R12 — Refinar a marca em vez de vender
A marca está pronta e mexer nela é gostoso. Já rendeu um episódio registrado — o
braço do **E** que virava um **F**.

**Mitigação:** congelada até o G3. Uma exceção: busca no INPI nas classes de
software e de serviços de viagem na Semana 0, porque descobrir conflito depois de
mil usuários é caro. É verificação, não redesign.

---

### R13 — Conflito com o emprego
**Mitigação:** nada em horário, equipamento ou conta da Omnichat. Leia sua
cláusula de exclusividade antes do G2 — um app de viagem B2C não conflita com
conversational commerce, mas ler custa 10 minutos.
