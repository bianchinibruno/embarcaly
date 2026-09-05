/**
 * Nome de exibição de um anexo.
 *
 * O nome é só rótulo: no aparelho o arquivo em disco chama-se `att_<id>.<ext>`
 * e é por ele que o sistema abre o documento. Renomear, portanto, nunca quebra
 * o anexo — mas um rótulo ruim atrapalha na hora que mais importa, com a fila
 * andando e alguém procurando o comprovante certo.
 *
 * Por isso duas garantias aqui: a extensão original é sempre preservada, e o
 * rótulo não pode mentir sobre o tipo do arquivo. Quem renomear um PDF para
 * «relatorio.docx» recebe de volta «relatorio.pdf».
 */

/** Sufixo curto que começa com letra — «.pdf», «.docx». Não pega «2.0». */
const EXTENSAO = /\.([A-Za-z][A-Za-z0-9]{0,4})$/;

const MAX = 120;

/** Extensão do arquivo, minúscula e sem o ponto. Vazio quando não houver. */
export function extensionOf(name: string): string {
  const m = EXTENSAO.exec(name.trim());
  return m ? m[1].toLowerCase() : '';
}

/**
 * Arruma o que a pessoa digitou. Devolve null quando não sobra nome nenhum —
 * aí o certo é não salvar, e não gravar um anexo sem rótulo.
 */
export function cleanAttachmentName(input: string, original: string): string | null {
  let base = input
    // Barra vira caminho na cabeça de quem lê, e não é caminho nenhum.
    .replace(/[\/]+/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
  if (!base) return null;

  const ext = extensionOf(original);
  if (ext) base = base.replace(EXTENSAO, '').trim();
  if (!base) return null;

  if (base.length > MAX) base = base.slice(0, MAX).trim();
  return ext ? `${base}.${ext}` : base;
}
