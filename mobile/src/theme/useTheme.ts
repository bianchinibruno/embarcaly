import { useColorScheme } from 'react-native';
import { palette, type Palette } from './tokens';

/** Paleta do esquema atual do sistema. O app segue o aparelho, sem toggle próprio. */
export function useTheme(): Palette {
  const scheme = useColorScheme();
  return scheme === 'dark' ? (palette.dark as unknown as Palette) : palette.light;
}
