# MVP — 5 funcionalidades, 45 dias

Regra do curso: **máximo 3–5 funcionalidades, entregue em até 45 dias.**
Aqui são 5. Janela: Semanas 4 a 10 do [cronograma](cronograma.md).

---

## As 5 funcionalidades

### F1 — O agente cadastra uma viagem em menos de 3 minutos
Nome do cliente, telefone, e as reservas (voo, hotel, transfer, passeio).
Entrada manual, ou colando o texto do e-mail de confirmação.
**Por que é a primeira:** se cadastrar dói, nada mais acontece. Cronometre.

### F2 — O viajante recebe um link e vê "o que fazer agora"
Página web aberta por link — **sem instalar app, sem criar conta, sem senha**.
Mostra a ação de agora, o próximo passo, e o documento daquele momento.
Reaproveita a tela "Agora" que já existe no protótipo.
**Por que assim:** exigir instalação mata a adoção do lado do viajante, e é o
lado que não paga. Link é atrito zero.

### F3 — Aviso de mudança, com a marca do agente
Quando algo muda, o viajante recebe a mensagem — **em nome do agente**, não do
Embarcaly. E o agente recebe uma cópia.
**É esta a funcionalidade que se vende.** As outras quatro existem para ela
funcionar.

### F4 — Recálculo da cadeia
O voo atrasou 2h → o trem das 19h não dá mais, o transfer precisa remarcar, o
hotel precisa ser avisado do check-in tardio. O produto diz **o que virou o quê**,
não só que houve atraso.
**É o único diferencial que nenhum concorrente do [benchmark](../../03-benchmark.md)
tem.** Flighty recalcula conexão aérea; ninguém recalcula a viagem inteira.

### F5 — Painel do agente
Uma tela: todas as viagens, ordenadas pelo que precisa de atenção primeiro.
Quem está voando agora, quem embarca hoje, o que quebrou.

---

## O que fica de fora — e a razão

| Fora | Por quê |
|---|---|
| Login e senha do viajante | Link com token basta. Senha é atrito e é suporte |
| App na loja para o viajante | Fase 3. O link web resolve o MVP inteiro |
| Integração com API de status de voo | **Depois do G2.** Custa dinheiro que ainda não existe ([D4](../README.md)) |
| Leitura automática da caixa de e-mail | Exige OAuth verificado pelo Google. Pesado demais para 45 dias |
| OCR de PDF de reserva | Colar texto resolve 80% com 5% do esforço |
| Pagamento no produto | Pix na mão nos 20 primeiros ([D6](../README.md)) |
| Multiusuário, permissões, equipe | O ICP é solo |
| Relatório, financeiro, comissão | É ERP. É o Monde. Não é aqui |
| Cobertura de testes acima do que já existe | Congelada. Ver a armadilha em [01-preparacao.md](../../01-preparacao.md) |

---

## Manual antes de automático

O curso manda fazer tudo na mão no começo. Traduzindo para este produto — e isto
**não é gambiarra, é a estratégia**:

| Etapa | Como funciona nos primeiros 45 dias |
|---|---|
| Descobrir que o voo mudou | **Você**, olhando os voos do dia toda manhã e à noite |
| Decidir o que a mudança quebra | **Você**, na mão, para os 20 primeiros casos |
| Enviar o aviso | Botão no painel que dispara a mensagem já escrita |
| Suporte | Seu WhatsApp pessoal. Responda em minutos |
| Onboarding | Chamada de vídeo de 20 minutos, cliente por cliente |

**Por que fazer na mão é a decisão certa aqui:** as primeiras 50 mudanças de voo
tratadas manualmente são o dataset que ensina qual regra de recálculo importa.
Automatizar antes disso é escrever regras para casos que você inventou.

E tem o efeito colateral que decide o negócio: fazendo na mão, você descobre em
duas semanas se a promessa **"seu cliente sabe antes de te ligar"** é verdadeira
— sem ter gasto um real com API de voo.

## Aceite bugs

Vai ter fuso horário errado, notificação duplicada e reserva mal formatada.
Tudo bem. O que **não** pode acontecer: aviso que não chega, ou aviso errado
sobre um voo. Nesses dois, o produto perde a única coisa que vende.

Escolha de QE aplicada com critério: teste blindado só na cadeia
`mudança → cálculo → envio`. O resto pode quebrar.
