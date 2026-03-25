import React, { useRef, useEffect, useCallback } from 'react';
import { Animated, ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X, TrendingUp, TrendingDown, Minus } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import colors, { getStatusColor, getStatusMuted } from '@/constants/colors';
import { getOrganById } from '@/mocks/organData';
import ScoreDisplay from '@/components/ScoreDisplay';
import MetricFlashcard from '@/components/MetricFlashcard';
import ContributorCard from '@/components/ContributorCard';
import SuggestionCard from '@/components/SuggestionCard';

export default function OrganDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const organ = getOrganById(id ?? '');

  useEffect(() => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 12,
        tension: 60,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleClose = useCallback(() => {
    console.log('[OrganDetail] Closing modal');
    router.back();
  }, [router]);

  if (!organ) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.errorText}>Organ not found</Text>
      </View>
    );
  }

  const statusColor = getStatusColor(organ.status);
  const statusBg = getStatusMuted(organ.status);
  const trendPositive = organ.trend > 0;
  const trendNeutral = organ.trend === 0;
  const statusLabel = organ.status === 'strong' ? 'Strong' : organ.status === 'watch' ? 'Needs watching' : 'Needs attention';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.handleBar}>
        <View style={styles.handle} />
      </View>

      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>{organ.name}</Text>
        <TouchableOpacity
          testID="close-button"
          onPress={handleClose}
          style={styles.closeButton}
          activeOpacity={0.7}
        >
          <X size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={styles.heroSection}>
            <ScoreDisplay score={organ.score} status={organ.status} size={130} strokeWidth={7} />
            <View style={styles.heroInfo}>
              <View style={[styles.statusPill, { backgroundColor: statusBg }]}>
                <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
              </View>
              <View style={styles.trendRow}>
                {trendNeutral ? (
                  <Minus size={14} color={colors.textTertiary} />
                ) : trendPositive ? (
                  <TrendingUp size={14} color={colors.green} />
                ) : (
                  <TrendingDown size={14} color={colors.red} />
                )}
                <Text style={[styles.trendText, {
                  color: trendNeutral ? colors.textTertiary : trendPositive ? colors.green : colors.red,
                }]}>
                  {trendNeutral ? 'No change' : trendPositive ? `+${organ.trend}` : `${organ.trend}`} in {organ.trendPeriod}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Results</Text>
            {organ.metrics.map((metric) => (
              <MetricFlashcard key={metric.id} metric={metric} />
            ))}
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Contributors</Text>
            <Text style={styles.sectionSubtitle}>What's driving your score</Text>
            {organ.contributors.map((contributor) => (
              <ContributorCard key={contributor.id} contributor={contributor} />
            ))}
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Suggestions</Text>
            <Text style={styles.sectionSubtitle}>Actions to improve</Text>
            {organ.suggestions.map((suggestion, index) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} index={index} />
            ))}
          </View>

          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Summary</Text>
            <Text style={styles.summaryText}>{organ.summary}</Text>
          </View>

          <View style={{ height: 40 }} />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  handleBar: {
    alignItems: 'center' as const,
    paddingVertical: 8,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  topBar: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.card,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  heroSection: {
    alignItems: 'center' as const,
    paddingVertical: 24,
    gap: 16,
  },
  heroInfo: {
    alignItems: 'center' as const,
    gap: 8,
  },
  statusPill: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600' as const,
    letterSpacing: 0.1,
  },
  trendRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 5,
  },
  trendText: {
    fontSize: 13,
    fontWeight: '500' as const,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.textPrimary,
    letterSpacing: -0.2,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: 10,
  },
  summarySection: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: colors.textPrimary,
    letterSpacing: -0.2,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    letterSpacing: 0.1,
  },
  errorText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center' as const,
    marginTop: 100,
  },
});
