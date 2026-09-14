/**
 * Tokens da marca Embarcaly — sistema visual v3.
 *
 * Azul estrutura, laranja aponta. E laranja tem um significado só:
 * o tempo está contando. Fora disso a tela é azul e branca.
 * Ver brand/IDENTIDADE.md.
 */

export type Scheme = 'light' | 'dark';

export const palette = {
  light: {
    desk: '#E4E3DF',
    paper: '#FFFFFF',
    paper2: '#F2F1EF',
    ink: '#33366A',
    ink2: '#5A5D80',
    ink3: '#8A8A96',
    rule: '#DEDDD9',
    hair: '#EDECE8',
    /** Laranja de TEXTO. Escurecido para passar em contraste sobre claro. */
    stamp: '#C96A16',
    /** Laranja de PREENCHIMENTO. É o da marca, e só recebe texto em `onStamp`. */
    stampFill: '#ED8426',
    /** Única cor de texto permitida sobre `stampFill`. Branco reprova em contraste. */
    onStamp: '#33366A',
    ok: '#1E9E5A',
    warn: '#C96A16',
    crit: '#C0392F',
    /**
     * No v2 cada tipo de reserva tinha papel tintado próprio. No v3 o tipo é
     * comunicado pelo ícone, não pela cor — as cinco chaves existem só enquanto
     * as telas antigas não forem migradas, e apontam todas para a mesma superfície.
     */
    stock: {
      air: '#F2F1EF',
      bed: '#F2F1EF',
      rail: '#F2F1EF',
      act: '#F2F1EF',
      car: '#F2F1EF',
    },
    edge: {
      air: '#DEDDD9',
      bed: '#DEDDD9',
      rail: '#DEDDD9',
      act: '#DEDDD9',
      car: '#DEDDD9',
    },
  },
  dark: {
    desk: '#161831',
    paper: '#1C1E3C',
    paper2: '#262A54',
    ink: '#FFFFFF',
    ink2: '#C9CBE4',
    ink3: '#7C80AE',
    rule: '#414682',
    hair: '#2C3060',
    stamp: '#ED8426',
    stampFill: '#ED8426',
    onStamp: '#33366A',
    ok: '#2FBF87',
    warn: '#ED8426',
    crit: '#FF7A6E',
    stock: {
      air: '#262A54',
      bed: '#262A54',
      rail: '#262A54',
      act: '#262A54',
      car: '#262A54',
    },
    edge: {
      air: '#414682',
      bed: '#414682',
      rail: '#414682',
      act: '#414682',
      car: '#414682',
    },
  },
} as const;

export type Palette = (typeof palette)['light'];

/** Escala de 4. Nada fora dela. */
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

/** Ou é reto, ou é pílula. Não existe canto intermediário no v3. */
export const radius = { card: 0, pill: 999, control: 0 } as const;

export const font = {
  ui: 'Poppins_400Regular',
  uiMedium: 'Poppins_500Medium',
  uiBold: 'Poppins_600SemiBold',
  uiHeavy: 'Poppins_700Bold',
  mono: 'IBMPlexMono_400Regular',
  monoMedium: 'IBMPlexMono_500Medium',
  monoBold: 'IBMPlexMono_600SemiBold',
} as const;

/** Rótulo em caixa alta com entreletra larga — assinatura tipográfica do produto. */
export const label = {
  fontFamily: font.monoMedium,
  fontSize: 10,
  letterSpacing: 1.4,
  textTransform: 'uppercase' as const,
};

/** Todo dado numérico usa fonte monoespaçada. Dígito alinhado com dígito. */
export const data = {
  fontFamily: font.monoMedium,
  fontVariant: ['tabular-nums'] as const,
};

/** Altura mínima de área de toque. Nada abaixo disso. */
export const touch = 44;
