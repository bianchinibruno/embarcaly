# MVP — 5 funcionalidades, 45 dias

Janela: **semanas 5 a 11**, de 12/10 a 29/11 ([cronograma](06-cronograma.md)).

**A regra que organiza o escopo:** as camadas 1 e 2 da [tese](04-tese.md) são
gratuitas e servem 100% das viagens; a camada 3 é o que se cobra. O MVP precisa
das três — sem a 1 não há dado, sem a 2 não há diferença, sem a 3 não há
receita.

---

## As 5 funcionalidades

### F1 — Importar a viagem encaminhando o e-mail
O usuário encaminha a confirmação para `viagem@embarcaly.com.br` e a reserva
aparece no app. Cobrir os cinco remetentes que dão 80% do volume brasileiro:
**Latam, Gol, Azul, Booking e Decolar**.
**Por que é a primeira:** o consumidor não digita. Se a entrada exigir
digitação, o funil morre antes da tela que você levou meses construindo.
*Fallback:* o CRUD manual que já existe — e nas primeiras semanas **você** digita
pelo usuário, que nem fica sabendo.

**Cobrir passeio e carro desde o dia 1.** É o que o [ICP](02-icp.md) tem na
viagem e o que os concorrentes tratam como acessório. Voo e hotel qualquer um
faz.

### F2 — Agora · depois · mais tarde
A tela principal do protótipo, já desenhada e já construída. Entra praticamente
como está — e é a única coisa desta lista que **nenhum concorrente tem**
([benchmark](03-benchmark.md)). Tripsy, Wanderlog, TripIt e Google mostram o
itinerário. Nenhum mostra o minuto.

### F3 — Aviso de mudança
Push quando o voo muda, com a informação que o painel do aeroporto não dá: o que
isso significa para o **resto** da sua viagem.

### F4 — Motor de direitos ⭐
Dado o tipo do problema e o tempo decorrido, o produto diz o que a companhia
deve **agora** e o que muda a cada limiar. Inclui o texto pronto para mostrar no
balcão e um cronômetro contando para o próximo direito.

É a funcionalidade que diferencia o Embarcaly de todo o resto do mercado
mundial. Se sobrar tempo para uma só, é esta.

Regras da versão 1 (Resolução ANAC 400, voo doméstico):

| Gatilho | O que o produto diz |
|---|---|
| Atraso ≥ 1h | Direito a comunicação. E: eles são obrigados a te atualizar a cada 30 min |
| Atraso ≥ 2h | Vá ao balcão pedir o voucher de alimentação |
| Atraso ≥ 4h | Hospedagem e traslado. Ou escolha: reacomodação, reembolso integral com taxa de embarque, outra modalidade, ou remarcação |
| Cancelamento | Mesmas quatro escolhas, imediatamente |
| Preterição (*overbooking*) | Mesmas escolhas + compensação financeira |
| Trecho internacional | Convenção de Montreal — v1 informa o limite e manda guardar comprovante |

**Sempre com a mesma ressalva na tela:** *orientação informativa, não é
consultoria jurídica.* Ver [R11 nos riscos](10-riscos.md).

### F5 — Link para quem ficou em casa
A pessoa manda um link e quem ficou acompanha a viagem — sem app e sem conta.
Barato de construir, e é o mecanismo de aquisição embutido: **quem recebe o link
é exatamente o próximo cliente**, porque também viaja.

---

## O que fica de fora

| Fora | Por quê |
|---|---|
| **iOS antes do Android** | Inverte a única vantagem estrutural que você tem. Play Store primeiro, sempre |
| Planejamento de roteiro, mapa, sugestão de passeio | É Wanderlog, e é de graça. Outro produto, outro momento |
| Busca de passagem e alerta de preço | É Voopter e Melhores Destinos. Pré-compra não é aqui |
| Controle de gastos e divisão de conta | Ninguém pagou R$39 por isso |
| Login social, perfil, gamificação, "passaporte" | Flighty tem, e não é o que se vende |
| Assinatura anual | Só aparece depois da **segunda** compra avulsa |
| OCR de PDF | E-mail encaminhado cobre 80% com uma fração do esforço |
| Integração com Apple Wallet | Fase 3, e é iOS. Bonito, não decide compra |
| Colaboração em tempo real durante a viagem | É o forte do Wanderlog. Não brigue por ele agora |

---

## Manual antes de automático

| Etapa | Como funciona nos primeiros 45 dias |
|---|---|
| Ler o e-mail encaminhado | Parser cobre os 5 remetentes. O resto **você** cadastra na mão, em minutos, sem o usuário saber |
| Detectar mudança de voo | API oficial já desde o começo — **aqui ela é o produto**, não dá para adiar como no caminho B |
| Decidir o que a mudança quebra | Você, para os primeiros 50 casos |
| Motor de direitos | Regras escritas à mão. Não é IA, é uma tabela — e a tabela é curta |
| Suporte | WhatsApp seu, no link do app |

**A API de voo é o produto, e por isso não dá para adiá-la.** Sem ela o motor de
direitos não dispara e não há o que cobrar. Entra na semana 7, com receita ainda
perto de zero — o que antecipa custo e risco. A conta está em
[07-orcamento.md](07-orcamento.md).

## Aceite bugs

Parser que erra formato, fuso trocado, push duplicado: tudo bem.

O que não pode: **direito informado errado**. Mandar alguém exigir hotel com 2h
de atraso faz a pessoa passar vergonha no balcão e destrói a única coisa que o
produto vende. A tabela do F4 é o único código deste MVP que merece teste
exaustivo — e é onde a sua formação em qualidade rende de verdade.
