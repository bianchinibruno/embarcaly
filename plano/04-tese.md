# Tese

> **Ser o organizador de viagem que o Tripsy não é: no Android, com fornecedor
> brasileiro, e que não te abandona no dia em que o voo atrasa.**

---

## O problema

A viagem é comprada em quatro lugares diferentes, com quatro meses de
antecedência. Voo na Latam, hotel no Booking, carro na Localiza, passeio numa
operadora local que respondeu por WhatsApp. Cada um manda um e-mail. Cada um tem
um app. Nenhum sabe da existência do outro.

Aí você monta uma planilha. Ou uma pasta no e-mail. Ou tira print de tudo e
manda no grupo da família. **Todo mundo que organiza viagem grande faz isso, e
faz na mão, porque nenhuma ferramenta resolveu.**

E no dia em que o voo atrasa três horas, a planilha não te ajuda. Ela te diz o
que *era* para acontecer.

## As três camadas do produto

O produto tem três camadas, e é importante não confundi-las — cada uma tem um
papel econômico diferente.

### Camada 1 · Centralizar — **a fundação, e é de graça**
Voo, hotel, carro, passeio, restaurante, num lugar só, offline, em português,
**no Android e no iPhone**. É o que faz a pessoa instalar e abrir todo dia da
viagem. É o que você já construiu.

**Não é o que se cobra.** Wanderlog centraliza de graça nas duas lojas e em
português; TripIt centraliza de graça; o Google Travel centraliza sozinho.
Competir com três zeros é perder.

### Camada 2 · Conduzir — **a diferença**
A tela do **agora / depois / mais tarde**. Não a lista do que você reservou — a
próxima ação, e o documento daquele momento. Nenhum dos concorrentes tem isso:
todos mostram o itinerário, nenhum mostra o minuto.

Já está desenhada e construída no seu protótipo. **É o seu ativo mais
subestimado.**

### Camada 3 · Socorrer — **o que se cobra**
O voo atrasou. E agora? O carro fecha às 22h, o hotel precisa saber do check-in
tardio, o passeio de amanhã cedo virou impossível. **Recalcular a cadeia inteira**
é uma coisa que ninguém no mundo faz — e é impossível de fazer sem ter a cadeia
inteira, que é o que a camada 1 produz.

> É por isso que a centralização não é commodity aqui: no TripIt ela é o produto
> final e por isso é grátis. No Embarcaly ela é a **barreira de entrada** do que
> você cobra. Ninguém recalcula uma cadeia que não tem.

## Por que agora, e por que você

Três fatos que se encaixam e não vão ficar abertos para sempre:

1. **O melhor organizador brasileiro não roda no Android**, num país que é 81%
   Android — e mantém uma lista de espera pública admitindo a demanda
2. **Seu app é Expo / React Native** e publica nas duas lojas com a mesma base de
   código. A vantagem já existe, e não foi planejada
3. **A dor é sua.** Você organiza viagem exatamente assim. Isso não substitui as
   20 entrevistas, mas resolve o problema que mata a maioria dos micro-SaaS:
   saber onde dói de verdade

## ICP

Resumo. O detalhamento — perfis, critérios de triagem, onde encontrar e quem
ignorar — está em **[02-icp.md](02-icp.md)**, que é o arquivo para ler antes de
começar as entrevistas.

> **O Organizador.** Quem assume sozinho a tarefa de montar a viagem e conduzir o
> grupo por ela. Fez ao menos uma viagem com 4+ reservas nos últimos 18 meses,
> viajou com outras pessoas, e usa planilha, print ou pasta de e-mail para se
> virar.

**Não é:** o especialista em milhas, o viajante a trabalho, quem só embarca, quem
compra pacote pronto, ou o mochileiro que improvisa.

## Proposta de valor

> **Sua viagem inteira num lugar só — e alguém do seu lado quando ela sai do
> plano.**

Variações para testar em anúncio e landing:

- *"Voo, hotel, carro e passeio no mesmo lugar. Finalmente no Android."*
- *"A planilha não te ajuda quando o voo atrasa."*
- *"Você organizou tudo. Agora deixa que eu conduzo."*

## Modelo de negócio

| Camada | Preço | O que dá |
|---|---|---|
| **Grátis, para sempre** | R$0 | Centralizar tudo, tela do agora, documentos, offline, compartilhar |
| **Viagem acompanhada** | **R$39 por viagem** | Monitoramento, aviso de mudança, recálculo da cadeia, direitos do passageiro. Vale de D-7 até o retorno +3 |
| Quem viaja muito | R$99/ano | Ilimitado. Só aparece depois da **segunda** compra avulsa |

**Por que por viagem, e não assinatura.** O brasileiro faz 1 a 2 viagens grandes
por ano. Assinatura mensal contra uso anual não é problema de retenção a
administrar — é vazamento: assina em dezembro, viaja, cancela em janeiro. Cobrar
por viagem elimina o churn em vez de combatê-lo, põe o pagamento no momento exato
do valor, e vira a âncora a seu favor: o Tripsy Pro custa US$59/ano ≈ R$325 e o
TripIt US$49/ano ≈ R$270. **Quem viaja uma vez por ano paga R$270 por uma
viagem. Você cobra R$39.**

A loja leva 15% (Small Business Program da Apple e do Google, válido enquanto
você faturar menos de US$1M/ano). R$39 viram R$33,15, e a margem ainda é ~94%.

## Canal

**Conteúdo.** Dois assuntos que carregam o funil inteiro:

1. **"Finalmente no Android"** — os fóruns, grupos e comentários onde gente
   procura alternativa ao Tripsy. É um público que já sabe que quer o produto
2. **Direitos do passageiro** — quem busca "meu voo atrasou o que fazer" está no
   momento exato da dor, e a resposta honesta **é** o produto

Detalhe em [08-gtm.md](08-gtm.md). O ponto crítico: o conteúdo começa na
**semana 0**, não depois do G2. Canal orgânico é lento e precisa de pista.

## O que já está pronto e entra na tese

| Ativo | Papel |
|---|---|
| App Expo com CRUD + SQLite offline | **A camada 1 e a vantagem no Android.** Praticamente pronto |
| Tela agora / depois / mais tarde | **A camada 2.** Já desenhada, já construída |
| Motor de recálculo da cadeia | **A camada 3.** É o que se cobra |
| Protótipo HTML no GitHub Pages | Demo que roda no navegador de qualquer entrevistado |
| Marca, ícones, manual | Congelado até o G3 |
| Regra de nunca gerar código de barras | Mantida — vira argumento de confiança |
| Testes e CI | Congelados. Nenhuma cobertura nova antes do G1 |
