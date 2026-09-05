import React from 'react';
import Svg, { Rect } from 'react-native-svg';
import { useTheme } from '../theme/useTheme';

/**
 * Marca Embarcaly — conceito Três Tempos.
 *
 * Um E cujas três barras são agora, depois e mais tarde. A do topo, em tinta
 * de carimbo, é a ação atual; a de baixo desbota porque o futuro é menos
 * definido.
 *
 * NÃO ENCURTE O BRAÇO DE BAIXO. Proporção de E pede braços de cima e de baixo
 * iguais — encurtar faz a marca ser lida como F. Ver brand/MARCA.md.
 */
export function Mark({ size = 24, inverted = false }: { size?: number; inverted?: boolean }) {
  const t = useTheme();
  const ink = inverted ? t.paper : t.ink;
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Rect x={7} y={9} width={6.5} height={30} rx={1} fill={ink} />
      <Rect x={15} y={9} width={26} height={6.5} rx={1} fill={t.stamp} />
      <Rect x={15} y={20.75} width={19} height={6.5} rx={1} fill={ink} />
      <Rect x={15} y={32.5} width={26} height={6.5} rx={1} fill={ink} opacity={0.55} />
    </Svg>
  );
}
