import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import colors from '@/constants/colors';
import { Contributor } from '@/mocks/organData';

interface ContributorCardProps {
  contributor: Contributor;
}

function getImpactColor(impact: Contributor['impact']): string {
  switch (impact) {
    case 'high': return colors.red;
    case 'medium': return colors.yellow;
    case 'low': return colors.textTertiary;
  }
}

export default function ContributorCard({ contributor }: ContributorCardProps) {
  const isHurting = contributor.direction === 'hurting';
  const directionColor = isHurting ? colors.red : colors.green;
  const directionBg = isHurting ? colors.redMuted : colors.greenMuted;
  const impactColor = getImpactColor(contributor.impact);

  return (
    <View testID={`contributor-${contributor.id}`} style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.labelRow}>
          <View style={[styles.directionBadge, { backgroundColor: directionBg }]}>
            {isHurting ? (
              <TrendingDown size={12} color={directionColor} />
            ) : (
              <TrendingUp size={12} color={directionColor} />
            )}
          </View>
          <Text style={styles.label}>{contributor.label}</Text>
        </View>
        <View style={styles.rightCol}>
          <Text style={styles.value}>{contributor.value}</Text>
          <View style={styles.impactDot}>
            <View style={[styles.dot, { backgroundColor: impactColor }]} />
            <Text style={[styles.impactText, { color: impactColor }]}>{contributor.impact}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.source}>{contributor.source}</Text>
      <Text style={styles.reason}>{contributor.reason}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  topRow: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 6,
  },
  labelRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    flex: 1,
  },
  directionBadge: {
    width: 24,
    height: 24,
    borderRadius: 6,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  label: {
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
  },
  rightCol: {
    alignItems: 'flex-end' as const,
  },
  value: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500' as const,
  },
  impactDot: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 4,
    marginTop: 2,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  impactText: {
    fontSize: 11,
    fontWeight: '500' as const,
    textTransform: 'capitalize' as const,
  },
  source: {
    fontSize: 11,
    color: colors.textTertiary,
    marginBottom: 6,
    marginLeft: 32,
  },
  reason: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginLeft: 32,
  },
});
