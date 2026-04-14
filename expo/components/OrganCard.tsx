import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getStatusColor, getStatusMuted } from '@/constants/colors';
import { OrganData } from '@/mocks/organData';

interface OrganCardProps {
  organ: OrganData;
  onPress: () => void;
}

export default function OrganCard({ organ, onPress }: OrganCardProps) {
  const { colors } = useTheme();
  const statusColor = getStatusColor(organ.status, colors);
  const statusBg = getStatusMuted(organ.status, colors);
  const trendPositive = organ.trend > 0;
  const trendNeutral = organ.trend === 0;

  return (
    <TouchableOpacity
      testID={`organ-card-${organ.id}`}
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.borderSubtle }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.topRow}>
        <View style={[styles.scoreBadge, { backgroundColor: statusBg }]}>
          <Text style={[styles.scoreText, { color: statusColor }]}>{organ.score}</Text>
        </View>
        <View style={styles.trendRow}>
          {trendNeutral ? (
            <Minus size={12} color={colors.textTertiary} />
          ) : trendPositive ? (
            <TrendingUp size={12} color={colors.green} />
          ) : (
            <TrendingDown size={12} color={colors.red} />
          )}
          <Text style={[styles.trendText, {
            color: trendNeutral ? colors.textTertiary : trendPositive ? colors.green : colors.red,
          }]}>
            {trendNeutral ? '0' : trendPositive ? `+${organ.trend}` : `${organ.trend}`}
          </Text>
        </View>
      </View>
      <Text style={[styles.name, { color: colors.textPrimary }]}>{organ.name}</Text>
      <Text style={[styles.statusLabel, { color: colors.textTertiary }]}>
        {organ.status === 'strong' ? 'Strong' : organ.status === 'watch' ? 'Watch' : 'Needs attention'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    flex: 1,
    minHeight: 110,
  },
  topRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 10,
  },
  scoreBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  trendRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 3,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  name: {
    fontSize: 15,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '500' as const,
  },
});
