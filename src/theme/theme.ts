/**
 * Design tokens do LucraPão.
 *
 * Paleta pensada em torno de padaria/confeitaria: massa/trigo como base,
 * crosta de pão como cor de destaque principal, verde-oliva para lucro
 * e terracota-queimado para custo/alerta — evitando o clichê genérico
 * de laranja + creme.
 */

export const colors = {
  // Base
  background: '#FBF7EF', // creme de farinha, levemente amarelado
  surface: '#FFFFFF',
  surfaceAlt: '#F1E9D8', // trigo cru, usado em cards secundários

  // Marca
  crust: '#5C3A21', // casca de pão assado — cor de destaque/ação
  crustDark: '#3E2716',
  wheat: '#C9932E', // dourado trigo — usado com moderação, nunca como fundo grande

  // Semântica financeira
  profit: '#4B6B3C', // verde-oliva — lucro / positivo
  profitBg: '#E7EEDF',
  cost: '#A6432F', // terracota queimado — custo / alerta
  costBg: '#F5E2DC',
  neutralInfo: '#6B5B95',

  // Texto
  textPrimary: '#2A2018',
  textSecondary: '#6B5E4F',
  textOnCrust: '#FBF7EF',

  // Bordas e divisores
  border: '#E4D9C3',
} as const;

export const typography = {
  // Uma única família com pesos distintos — mais fácil de garantir com
  // expo-font (Manrope/Sora funcionam bem como fonte "de padaria moderna",
  // geométrica mas com um pouco de calor nas curvas).
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  size: {
    display: 32,
    h1: 24,
    h2: 19,
    body: 15,
    label: 13,
    caption: 11,
  },
  weight: {
    regular: '400' as const,
    medium: '600' as const,
    bold: '700' as const,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
};

export const shadow = {
  card: {
    shadowColor: '#3E2716',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
};

export const theme = { colors, typography, spacing, radius, shadow };
export type Theme = typeof theme;
