const colors = {
  bg: '#08080A',
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
};

export type OrganStatus = 'strong' | 'watch' | 'attention';

export function getStatusColor(status: OrganStatus): string {
  switch (status) {
    case 'strong': return colors.green;
    case 'watch': return colors.yellow;
    case 'attention': return colors.red;
  }
}

export function getStatusMuted(status: OrganStatus): string {
  switch (status) {
    case 'strong': return colors.greenMuted;
    case 'watch': return colors.yellowMuted;
    case 'attention': return colors.redMuted;
  }
}

export function getStatusSoft(status: OrganStatus): string {
  switch (status) {
    case 'strong': return colors.greenSoft;
    case 'watch': return colors.yellowSoft;
    case 'attention': return colors.redSoft;
  }
}

export default colors;
