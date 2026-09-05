/**
 * Tokens da marca Embarcaly.
 *
 * Direção de arte: bilhete impresso. Cor não decora, classifica —
 * cada tipo de reserva tem seu papel tintado, e o carimbo é reservado
 * ao que exige ação. Ver brand/MARCA.md.
 */

export type Scheme = 'light' | 'dark';

export const palette = {
  light: {
    desk: '#D5D9D8',
    paper: '#FBFAF7',
    paper2: '#F4F2EC',
    ink: '#171C20',
    ink2: '#3E474D',
    ink3: '#7A848A',
    rule: '#C9CDCB',
    hair: '#E2E1DA',
    stamp: '#B0432B',
    stock: {
      air: '#DBE7F0',
      bed: '#F0E6D5',
      rail: '#DDE8DD',
      act: '#F1DFE0',
      car: '#E6E2EF',
    },
    edge: {
      air: '#7FA0BA',
      bed: '#BFA274',
      rail: '#82A382',
      act: '#C08E92',
      car: '#9B92B6',
    },
  },
  dark: {
    desk: '#0E1215',
    paper: '#1A2025',
    paper2: '#151A1E',
    ink: '#E9EDEE',
    ink2: '#B2BCC1',
    ink3: '#79858B',
    rule: '#2C3439',
    hair: '#242B30',
    stamp: '#D4715A',
    stock: {
      air: '#182833',
      bed: '#2A2418',
      rail: '#182619',
      act: '#2B1D20',
      car: '#211E2C',
    },
    edge: {
      air: '#4E7893',
      bed: '#8A7346',
      rail: '#4E7752',
      act: '#8E5F66',
      car: '#6B6390',
    },
  },
} as const;

export type Palette = (typeof palette)['light'];

/** Escala de 4. Nada fora dela. */
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

export const radius = { card: 0, pill: 999, control: 8 } as const;

export const font = {
  ui: 'FamiljenGrotesk_400Regular',
  uiMedium: 'FamiljenGrotesk_500Medium',
  uiBold: 'FamiljenGrotesk_700Bold',
  mono: 'AzeretMono_400Regular',
  monoMedium: 'AzeretMono_500Medium',
  monoBold: 'AzeretMono_600SemiBold',
} as const;

/** Rótulo em caixa alta com entreletra larga — assinatura tipográfica do produto. */
export const label = {
  fontFamily: font.mono,
  fontSize: 10,
  letterSpacing: 1.6,
  textTransform: 'uppercase' as const,
};

/** Todo dado numérico usa fonte monoespaçada. Dígito alinhado com dígito. */
export const data = {
  fontFamily: font.monoMedium,
  fontVariant: ['tabular-nums'] as const,
};
