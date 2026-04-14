import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Contributor } from '@/mocks/organData';

interface ContributorCardProps {
  contributor: Contributor;
}

export default function ContributorCard({ contributor }: ContributorCardProps) {
  const { colors } = useTheme();
  const isHurting = contributor.direction === 'hurting';
  const directionColor = isHurting ? colors.red : colors.green;
  const directionBg = isHurting ? colors.redMuted : colors.greenMuted;

  function getImpactColor(impact: Contributor['impact']): string {
    switch (impact) {
      case 'high': return colors.red;
      case 'medium': return colors.yellow;
      case 'low': return colors.textTertiary;
    }
  }

  const impactColor = getImpactColor(contributor.impact);

  return (
    <View testID={`contributor-${contributor.id}`} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.borderSubtle }]}>
      <View style={styles.topRow}>
        <View style={styles.labelRow}>
          <View style={[styles.directionBadge, { backgroundColor: directionBg }]}>
            {isHurting ? (
              <TrendingDown size={12} color={directionColor} />
            ) : (
              <TrendingUp size={12} color={directionColor} />
            )}
          </View>
          <Text style={[styles.label, { color: colors.textPrimary }]}>{contributor.label}</Text>
        </View>
        <View style={styles.rightCol}>
          <Text style={[styles.value, { color: colors.textSecondary }]}>{contributor.value}</Text>
          <View style={styles.impactDot}>
            <View style={[styles.dot, { backgroundColor: impactColor }]} />
            <Text style={[styles.impactText, { color: impactColor }]}>{contributor.impact}</Text>
          </View>
        </View>
      </View>
      <Text style={[styles.source, { color: colors.textTertiary }]}>{contributor.source}</Text>
      <Text style={[styles.reason, { color: colors.textSecondary }]}>{contributor.reason}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
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
    fontWeight: '600' as const,
    letterSpacing: -0.2,
  },
  rightCol: {
    alignItems: 'flex-end' as const,
  },
  value: {
    fontSize: 13,
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
    marginBottom: 6,
    marginLeft: 32,
  },
  reason: {
    fontSize: 13,
    lineHeight: 18,
    marginLeft: 32,
  },
});
