/**
 * Textos de proteção — fonte única.
 *
 * Todo aviso legal do produto sai daqui: aplicativo, guia em PDF, landing,
 * ficha da loja e peça de campanha. Um texto só, num lugar só, para nunca
 * existirem duas versões dizendo coisas diferentes.
 *
 * Três exposições estão cobertas, e elas são distintas:
 *
 *   1. CONTEÚDO — informar um direito que não existe, ou informar errado.
 *   2. ATIVIDADE — parecer escritório de advocacia ou agência de viagens.
 *   3. PRODUTO — a pessoa perder algo confiando num cálculo do aplicativo.
 *
 * A terceira é a mais subestimada e a mais provável. O produto calcula em cima
 * do que o usuário digitou, sem fonte oficial de status de voo, e diz "perdido"
 * ou "inviável" sobre reservas reais. Quem age com base nisso e erra vai
 * procurar um culpado.
 *
 * Estes textos são MINUTA. Precisam de revisão por advogado antes do
 * lançamento — está no cronograma e no orçamento.
 */

/** Curto, para rodapé de tela e de peça. */
export const AVISO_CURTO =
  'Conteúdo informativo. Não é consultoria jurídica.';

/** Conteúdo: de onde vem a informação e o que ela não é. */
export const AVISO_CONTEUDO =
  'Orientação informativa baseada na Resolução ANAC nº 400/2016 e no Código de ' +
  'Defesa do Consumidor. Não constitui consultoria jurídica nem parecer. ' +
  'Normas mudam e cada caso tem particularidades. Confira a versão vigente em ' +
  'anac.gov.br e, em caso de dúvida, procure o Procon, a ANAC ou um advogado.';

/** Atividade: o que o Embarcaly não é, dito sem rodeio. */
export const AVISO_ATIVIDADE =
  'O Embarcaly é um aplicativo de organização de viagem. Não é escritório de ' +
  'advocacia, não presta serviço jurídico e não representa você perante ' +
  'companhia aérea, órgão público ou tribunal. Também não é agência de viagens: ' +
  'não vende passagem, hospedagem ou pacote, e não intermedeia reserva. ' +
  'Nenhuma relação de consumo existe entre você e os fornecedores da sua viagem ' +
  'por causa deste aplicativo.';

/** Produto: o cálculo é auxílio, não garantia. É a exposição mais provável. */
export const AVISO_CALCULO =
  'Os horários, prazos e situações mostrados aqui são calculados a partir dos ' +
  'dados que você cadastrou, e servem como apoio à sua decisão. O aplicativo ' +
  'não consulta fonte oficial de status de voo e não garante exatidão, ' +
  'atualização ou disponibilidade. Confirme sempre com a companhia aérea, o ' +
  'hotel ou o fornecedor antes de remarcar, cancelar ou deixar de comparecer. ' +
  'A decisão é sua.';

/** Resultado: nada aqui promete dinheiro de volta. */
export const AVISO_RESULTADO =
  'Conhecer o direito não garante o atendimento dele. O Embarcaly não promete, ' +
  'não intermedeia e não garante reembolso, compensação, indenização ou ' +
  'qualquer resultado junto à companhia aérea.';

/** Dado de terceiro: o usuário cadastra gente que não é usuária. */
export const AVISO_DADOS =
  'Ao cadastrar acompanhantes, você declara ter autorização para informar os ' +
  'dados dessas pessoas. Os dados da viagem ficam no seu aparelho e são ' +
  'excluídos com a viagem.';

/** O parágrafo completo, para termos de uso e rodapé de documento longo. */
export const AVISO_COMPLETO = [
  AVISO_ATIVIDADE,
  AVISO_CONTEUDO,
  AVISO_CALCULO,
  AVISO_RESULTADO,
].join(' ');

/** Onde cada aviso precisa aparecer. Usado pelo teste que impede esquecimento. */
export const SUPERFICIES = {
  telaDireitos: [AVISO_CONTEUDO, AVISO_RESULTADO],
  telaCascata: [AVISO_CALCULO],
  guiaPdf: [AVISO_CONTEUDO, AVISO_ATIVIDADE],
  landing: [AVISO_CONTEUDO, AVISO_ATIVIDADE],
  fichaLoja: [AVISO_CONTEUDO, AVISO_ATIVIDADE, AVISO_CALCULO],
  pecaCampanha: [AVISO_CURTO],
  termos: [AVISO_COMPLETO, AVISO_DADOS],
} as const;

/** Palavras que nunca podem sair do produto. O teste falha se aparecerem. */
export const PROIBIDAS = [
  'garantimos',
  'asseguramos',
  'você receberá',
  'nós recuperamos',
  'entramos com a ação',
  'processamos a companhia',
] as const;
