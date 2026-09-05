# Embarcaly

**Copiloto operacional de viagem.** Transforma reservas, documentos e horários em
uma sequência de próximas ações: o que fazer agora, o que vem depois, e qual
documento você precisa ter em mãos naquele momento.

> 🧭 **[Abrir o protótipo](https://bianchinibruno.github.io/embarcaly/)**

---

## O problema

Depois que a viagem é comprada, a informação fica espalhada entre e-mails, PDFs,
aplicativos e a memória do viajante. Durante a viagem, descobrir o próximo passo
exige consultar quatro fontes diferentes — normalmente cansado, num país
desconhecido, sem internet boa.

O produto não organiza reservas. **Organiza decisões.**

## O que tem aqui

Este repositório guarda a fase de concepção: protótipo navegável, identidade
visual e o documento de conceito. Ainda não há aplicação real — a construção só
começa depois da validação com viajantes.

```
index.html              protótipo navegável (abre direto, sem build)
brand/                  identidade visual completa
  MARCA.md              manual de marca
  gen_brand.py          gerador dos assets
  *.svg                 marca, lockup e ícone — claro, escuro e mono
  png/                  ícones de loja, favicons e .ico
docs/
  Embarcaly-Concept-Brief-v1.pdf
```

## O protótipo

Abre em qualquer navegador, sem instalar nada. É uma viagem ao Japão com 8
reservas — voos, trem, hotel, carro e passeio.

**Use o controle de tempo à direita.** O produto inteiro depende do momento da
viagem, então o protótipo permite mover o relógio entre oito situações:

| Momento | O que ele mostra |
|---|---|
| Faltam 12 dias | Contagem regressiva e o envio dos PDFs |
| Noite anterior | Check-in abrindo |
| Manhã do voo | A linha do tempo dos sete horários |
| **Voo atrasado** | Recalcula a cadeia inteira e diz o que a conexão virou |
| No aeroporto | Cartão de embarque emitido, código real |
| **Portão alterado** | O aviso, o portão antigo e o tempo de caminhada |
| Chegando em Tóquio | A tela "Agora" no melhor caso de uso |
| Meio da viagem | Trem, hotel e carro em sequência |

Coisas para tocar: **Adicionar reservas → Enviar 3 PDFs** simula a leitura dos
documentos e monta o itinerário; qualquer **(i)** vira o bilhete e mostra a
explicação no verso; e a aba **Cartões** mostra os três estados do código de
barras.

## Uma regra do produto

O app **nunca gera código de barras**. O código de um cartão de embarque carrega
o número de sequência do check-in, atribuído pelo sistema da companhia — só ela
emite. O Embarcaly guarda, exibe e leva até a Carteira do celular.

Daí os três estados: **emitido**, **ainda não emitido** (com contagem até o
check-in abrir) e **fora daqui** (leva ao app de quem emite). Um código inventado
não leria no portão, e mataria o produto na primeira viagem real.

## Design

Direção de arte tirada do próprio universo do problema: **bilhete impresso**.
Papel tintado por tipo de reserva, picote, código monoespaçado e carimbo.

Cada tipo tem seu papel — azul para voo, areia para hotel, verde para trem, rosa
para passeio, lilás para carro. Você reconhece o tipo antes de ler a palavra.
Cor não decora, classifica.

## Status

🟡 **Concepção concluída · aguardando validação.**

O próximo passo não é programar. É descobrir se a dor é forte e frequente o
bastante para alguém pagar — e a pergunta que decide não é sobre dor, é sobre
frequência: *quantas viagens com mais de três reservas você fez nos últimos 12
meses?*

---

Dados do protótipo são fictícios. Nenhum código de barras aqui é válido para
embarque.
