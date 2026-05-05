export type OrganStatus = 'strong' | 'watch' | 'attention';

export interface ThemeColors {
  bg: string;
  bgGradient1: string;
  bgGradient2: string;
  bgGradient3: string;
  surface: string;
  card: string;
  cardHover: string;
  border: string;
  borderSubtle: string;

  textPrimary: string;
  textSecondary: string;
  textTertiary: string;

  green: string;
  greenMuted: string;
  greenSoft: string;

  yellow: string;
  yellowMuted: string;
  yellowSoft: string;

  red: string;
  redMuted: string;
  redSoft: string;

  blue: string;
  blueMuted: string;
  blueSoft: string;

  accent: string;

  bodyFill: string;
  bodyStroke: string;
  bodyHighlight: string;

  overlayLight: string;
  overlayMedium: string;
  overlayStrong: string;

  inputBg: string;
  inputBorder: string;

  shadowColor: string;

  userBubbleBg: string;
  userBubbleBorder: string;
  chipBg: string;
  chipBorder: string;
  chipText: string;
  chipIcon: string;
}

export const darkColors: ThemeColors = {
  bg: '#08080A',
  bgGradient1: '#06060A',
  bgGradient2: '#08080E',
  bgGradient3: '#06060A',
  surface: '#111114',
  card: '#1A1A1F',
  cardHover: '#222228',
  border: '#2A2A32',
  borderSubtle: '#1E1E24',

  textPrimary: '#EEEEF0',
  textSecondary: '#8E8E9A',
  textTertiary: '#5C5C68',

  green: '#5EBE9A',
  greenMuted: 'rgba(94, 190, 154, 0.10)',
  greenSoft: 'rgba(94, 190, 154, 0.22)',

  yellow: '#D4A574',
  yellowMuted: 'rgba(212, 165, 116, 0.10)',
  yellowSoft: 'rgba(212, 165, 116, 0.22)',

  red: '#D88B82',
  redMuted: 'rgba(216, 139, 130, 0.10)',
  redSoft: 'rgba(216, 139, 130, 0.22)',

  blue: '#60A5FA',
  blueMuted: 'rgba(96, 165, 250, 0.12)',
  blueSoft: 'rgba(96, 165, 250, 0.25)',

  accent: '#60A5FA',

  bodyFill: '#1E1E26',
  bodyStroke: '#2E2E3A',
  bodyHighlight: '#2A2A36',

  overlayLight: 'rgba(255,255,255,0.04)',
  overlayMedium: 'rgba(255,255,255,0.06)',
  overlayStrong: 'rgba(255,255,255,0.08)',

  inputBg: '#1A1A1F',
  inputBorder: '#2A2A32',

  shadowColor: '#000',

  userBubbleBg: 'rgba(96,165,250,0.1)',
  userBubbleBorder: 'rgba(96,165,250,0.2)',
  chipBg: 'rgba(96,165,250,0.07)',
  chipBorder: 'rgba(96,165,250,0.15)',
  chipText: 'rgba(96,165,250,0.9)',
  chipIcon: 'rgba(96,165,250,0.6)',
};

export const lightColors: ThemeColors = {
  bg: '#FFFFFF',
  bgGradient1: '#FFFFFF',
  bgGradient2: '#FFFFFF',
  bgGradient3: '#FFFFFF',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  cardHover: '#FAFAFC',
  border: '#ECECF0',
  borderSubtle: '#F2F2F5',

  textPrimary: '#111118',
  textSecondary: '#5C5C68',
  textTertiary: '#8E8E9A',

  green: '#3B8F73',
  greenMuted: 'rgba(59, 143, 115, 0.08)',
  greenSoft: 'rgba(59, 143, 115, 0.16)',

  yellow: '#A67C4A',
  yellowMuted: 'rgba(166, 124, 74, 0.08)',
  yellowSoft: 'rgba(166, 124, 74, 0.16)',

  red: '#B85C5C',
  redMuted: 'rgba(184, 92, 92, 0.07)',
  redSoft: 'rgba(184, 92, 92, 0.14)',

  blue: '#2563EB',
  blueMuted: 'rgba(37, 99, 235, 0.08)',
  blueSoft: 'rgba(37, 99, 235, 0.15)',

  accent: '#2563EB',

  bodyFill: '#F4F4F7',
  bodyStroke: '#E4E4EA',
  bodyHighlight: '#EDEDF2',

  overlayLight: 'rgba(0,0,0,0.03)',
  overlayMedium: 'rgba(0,0,0,0.05)',
  overlayStrong: 'rgba(0,0,0,0.07)',

  inputBg: '#FFFFFF',
  inputBorder: '#ECECF0',

  shadowColor: 'rgba(0,0,0,0.08)',

  userBubbleBg: 'rgba(37,99,235,0.08)',
  userBubbleBorder: 'rgba(37,99,235,0.18)',
  chipBg: 'rgba(37,99,235,0.06)',
  chipBorder: 'rgba(37,99,235,0.14)',
  chipText: 'rgba(37,99,235,0.85)',
  chipIcon: 'rgba(37,99,235,0.5)',
};

const colors = darkColors;

export function getStatusColor(status: OrganStatus, theme: ThemeColors = colors): string {
  switch (status) {
    case 'strong': return theme.green;
    case 'watch': return theme.yellow;
    case 'attention': return theme.red;
  }
}

export function getStatusMuted(status: OrganStatus, theme: ThemeColors = colors): string {
  switch (status) {
    case 'strong': return theme.greenMuted;
    case 'watch': return theme.yellowMuted;
    case 'attention': return theme.redMuted;
  }
}

export function getStatusSoft(status: OrganStatus, theme: ThemeColors = colors): string {
  switch (status) {
    case 'strong': return theme.greenSoft;
    case 'watch': return theme.yellowSoft;
    case 'attention': return theme.redSoft;
  }
}

export default colors;
