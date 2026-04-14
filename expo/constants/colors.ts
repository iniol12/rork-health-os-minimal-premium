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

  green: '#34D399',
  greenMuted: 'rgba(52, 211, 153, 0.12)',
  greenSoft: 'rgba(52, 211, 153, 0.25)',

  yellow: '#FBBF24',
  yellowMuted: 'rgba(251, 191, 36, 0.12)',
  yellowSoft: 'rgba(251, 191, 36, 0.25)',

  red: '#F87171',
  redMuted: 'rgba(248, 113, 113, 0.12)',
  redSoft: 'rgba(248, 113, 113, 0.25)',

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
  bg: '#F6F6F8',
  bgGradient1: '#F0F0F4',
  bgGradient2: '#F6F6F8',
  bgGradient3: '#F0F0F4',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  cardHover: '#F0F0F4',
  border: '#E0E0E6',
  borderSubtle: '#EAEAEF',

  textPrimary: '#111118',
  textSecondary: '#5C5C68',
  textTertiary: '#8E8E9A',

  green: '#059669',
  greenMuted: 'rgba(5, 150, 105, 0.1)',
  greenSoft: 'rgba(5, 150, 105, 0.18)',

  yellow: '#D97706',
  yellowMuted: 'rgba(217, 119, 6, 0.1)',
  yellowSoft: 'rgba(217, 119, 6, 0.18)',

  red: '#DC2626',
  redMuted: 'rgba(220, 38, 38, 0.08)',
  redSoft: 'rgba(220, 38, 38, 0.15)',

  blue: '#2563EB',
  blueMuted: 'rgba(37, 99, 235, 0.08)',
  blueSoft: 'rgba(37, 99, 235, 0.15)',

  accent: '#2563EB',

  bodyFill: '#E8E8EE',
  bodyStroke: '#D4D4DC',
  bodyHighlight: '#DCDCE4',

  overlayLight: 'rgba(0,0,0,0.03)',
  overlayMedium: 'rgba(0,0,0,0.05)',
  overlayStrong: 'rgba(0,0,0,0.07)',

  inputBg: '#FFFFFF',
  inputBorder: '#E0E0E6',

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
