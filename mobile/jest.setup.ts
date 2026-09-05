import { configure } from '@testing-library/react-native';

/**
 * O limite padrão de 1s do `findBy*` mede a máquina, não o app.
 *
 * Com o cache do Jest frio e os 16 arquivos rodando em paralelo, um
 * re-render que leva milissegundos na prática estourava esse prazo e
 * derrubava um teste diferente a cada execução. Teste que falha por carga da
 * máquina não avisa nada sobre o produto — só ensina a ignorar o vermelho.
 *
 * O prazo maior não esconde lentidão real: o que trava de verdade nunca
 * termina, e continua falhando.
 */
configure({ asyncUtilTimeout: 10_000 });
