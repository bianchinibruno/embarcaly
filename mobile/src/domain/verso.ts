/**
 * O verso do bilhete.
 *
 * Bilhete de verdade tem as letras miúdas impressas no verso — então a
 * explicação não é um balão flutuante, é virar o papel.
 *
 * A linguagem é deliberadamente de quem nunca viajou. Cada verbete responde
 * três coisas: o que é, por que importa, e o que fazer.
 */

export interface Verso {
  title: string;
  headline: string;
  body: string;
  extraTitle?: string;
  extraBody?: string;
}

export const VERSO: Record<string, Verso> = {
  checkinOpen: {
    title: 'Abre o check-in',
    headline: 'O momento de garantir seu assento.',
    body: 'A companhia libera a emissão do cartão de embarque. Fazer cedo aumenta a chance de escolher assento sem pagar a mais.',
    extraTitle: 'Dica',
    extraBody: 'Leva dois minutos no celular e elimina o risco do prazo seguinte.',
  },
  arriveBy: {
    title: 'Chegue ao aeroporto',
    headline: 'Este horário não está no seu bilhete.',
    body: 'Fomos nós que calculamos: 2h antes para voo doméstico, 3h para internacional. Se você despacha mala ou viaja com criança, some 30 minutos.',
  },
  checkinClose: {
    title: 'Fecha o check-in',
    headline: 'O prazo mais perigoso da sua viagem.',
    body: 'Depois desse horário a companhia não aceita mais quem não fez check-in — mesmo com a passagem paga e você dentro do aeroporto.',
    extraTitle: 'Como evitar',
    extraBody: 'Faça o check-in assim que abrir, dois dias antes.',
  },
  boarding: {
    title: 'Começa o embarque',
    headline: 'Está impresso no seu cartão.',
    body: 'Horário em que a fila começa a andar. Não é a hora de sair da sala VIP — é a hora de já estar perto do portão.',
  },
  gateClose: {
    title: 'Fecha o portão',
    headline: 'Estimativa nossa, e a mais cruel.',
    body: 'Costuma ser 15 minutos antes da partida. Depois disso o portão fecha mesmo que você esteja correndo no corredor.',
  },
  gate: {
    title: 'Portão de embarque',
    headline: 'Por que está vazio?',
    body: 'O portão só é definido algumas horas antes e muda com frequência. Preferimos deixar em branco a te dar um número errado na hora que importa.',
  },
  pnr: {
    title: 'Localizador',
    headline: 'Seis caracteres que valem sua reserva.',
    body: 'É o código que identifica sua compra. Você informa no balcão, no totém do aeroporto ou no site da companhia.',
  },
  pass: {
    title: 'Código de barras',
    headline: 'Só a companhia pode emitir.',
    body: 'O código carrega o número de sequência do seu check-in, gerado pelo sistema da companhia. Guardamos e exibimos o original — nunca criamos um.',
    extraTitle: 'Por isso existem três estados',
    extraBody: 'Emitido, ainda não emitido e fora daqui. Um código inventado não leria no portão.',
  },
  connection: {
    title: 'Conexão',
    headline: 'Tempo entre um voo e outro.',
    body: 'Abaixo de 1h30 em aeroporto grande é apertado. Se os voos forem de companhias diferentes, pode ser preciso retirar e despachar a bagagem de novo.',
  },
  delay: {
    title: 'Voo atrasado',
    headline: 'O que recalculamos sozinhos.',
    body: 'Embarque, fechamento do portão, pouso e todos os intervalos seguintes. Se alguma reserva depois deixar de ser alcançável, avisamos aqui antes de você descobrir no aeroporto.',
    extraTitle: 'O que não fazemos',
    extraBody: 'Não remarcamos nada por você. Reacomodação é sempre com a companhia — nós só garantimos que você saiba primeiro.',
  },
  gateChange: {
    title: 'Portão alterado',
    headline: 'Mudou depois do cartão emitido.',
    body: 'Portão muda com frequência, às vezes minutos antes. Mostramos o novo, o antigo e quanto tempo de caminhada isso costuma custar dentro do terminal.',
    extraTitle: 'Confira sempre',
    extraBody: 'O painel do aeroporto é a fonte final. Somos o aviso rápido, não a autoridade.',
  },
};
