/**
 * Design tokens extraídos diretamente do protótipo feito no Figma Make.
 * Cores e fontes copiadas fielmente do que já foi validado no design.
 */

export const colors = {
  background: '#FDF6EC',
  surface: '#FFFFFF',
  surfaceAlt: '#F5E6D0',
  border: '#E5D0B8',

  crust: '#9A4500', // cor de marca / ação principal
  textPrimary: '#1C1209',
  textSecondary: '#7A5535',
  textOnCrust: '#FFFFFF',

  green: '#2D7A3A',
  greenBg: '#DCFCE7',
  greenBgBorder: '#BBF7D0',
  greenDark: '#14532D',
  greenMid: '#15803D',

  yellowBg: '#FEF9C3',
  yellowBgBorder: '#FDE68A',
  amber: '#B45309',
  amberDark: '#92400E',

  redBg: '#FEE2E2',
  red: '#C0392B',
  redDark: '#B91C1C',

  blue: '#1D4ED8',
  purple: '#6B21A8',
} as const;

// Cores por categoria de ingrediente/despesa, copiadas do protótipo.
export const categoryColors: Record<string, string> = {
  Farináceos: '#9A4500',
  Fermentos: '#B45309',
  Gorduras: '#7A5535',
  Proteínas: '#C0392B',
  Laticínios: '#2D7A3A',
  Temperos: '#1D4ED8',
  Utilidades: '#9A4500',
  Imóvel: '#7A5535',
  Comunicação: '#1D4ED8',
  Materiais: '#B45309',
  Equipamentos: '#6B21A8',
  Regulatório: '#C0392B',
};

/**
 * Fontes do protótipo: Outfit (corpo), Fraunces (títulos/serif), DM Mono
 * (números). Precisam ser carregadas via @expo-google-fonts — ver
 * src/app/_layout.tsx. Os nomes abaixo batem com as chaves usadas no
 * useFonts() do layout raiz.
 */
export const fonts = {
  display: 'Fraunces_700Bold',
  body: 'Outfit_400Regular',
  bodyMedium: 'Outfit_500Medium',
  bodySemibold: 'Outfit_600SemiBold',
  bodyBold: 'Outfit_700Bold',
  mono: 'DMMono_500Medium',
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 32,
};
