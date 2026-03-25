import React, { useRef, useEffect } from 'react';
import { Animated, ScrollView, StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors, { getStatusColor } from '@/constants/colors';
import { organs, getOverallScore } from '@/mocks/organData';
import OrganCard from '@/components/OrganCard';

export default function InsightsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const overallScore = getOverallScore();

  const attentionOrgans = organs.filter(o => o.status === 'attention');
  const watchOrgans = organs.filter(o => o.status === 'watch');
  const strongOrgans = organs.filter(o => o.status === 'strong');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleOrganPress = (organId: string) => {
    console.log('[InsightsScreen] Navigating to organ:', organId);
    router.push({ pathname: '/organ/[id]' as any, params: { id: organId } });
  };

  const renderOrganPairs = (organList: typeof organs) => {
    const pairs: (typeof organs)[] = [];
    for (let i = 0; i < organList.length; i += 2) {
      pairs.push(organList.slice(i, i + 2));
    }
    return pairs.map((pair, idx) => (
      <View key={idx} style={styles.row}>
        {pair.map((organ) => (
          <OrganCard key={organ.id} organ={organ} onPress={() => handleOrganPress(organ.id)} />
        ))}
        {pair.length === 1 && <View style={styles.emptyCard} />}
      </View>
    ));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Insights</Text>
          <Text style={styles.subtitle}>All organ systems</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.overallCard}>
            <View style={styles.overallLeft}>
              <Text style={styles.overallLabel}>Overall Health Score</Text>
              <Text style={styles.overallDesc}>
                Across {organs.length} organ systems
              </Text>
            </View>
            <View style={styles.overallRight}>
              <Text style={styles.overallScore}>{overallScore}</Text>
              <Text style={styles.overallMax}>/100</Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <View style={[styles.summaryPill, { backgroundColor: colors.redMuted }]}>
              <View style={[styles.summaryDot, { backgroundColor: colors.red }]} />
              <Text style={[styles.summaryText, { color: colors.red }]}>
                {attentionOrgans.length} need attention
              </Text>
            </View>
            <View style={[styles.summaryPill, { backgroundColor: colors.yellowMuted }]}>
              <View style={[styles.summaryDot, { backgroundColor: colors.yellow }]} />
              <Text style={[styles.summaryText, { color: colors.yellow }]}>
                {watchOrgans.length} to watch
              </Text>
            </View>
            <View style={[styles.summaryPill, { backgroundColor: colors.greenMuted }]}>
              <View style={[styles.summaryDot, { backgroundColor: colors.green }]} />
              <Text style={[styles.summaryText, { color: colors.green }]}>
                {strongOrgans.length} strong
              </Text>
            </View>
          </View>

          {attentionOrgans.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.red }]}>Needs Attention</Text>
              {renderOrganPairs(attentionOrgans)}
            </View>
          )}

          {watchOrgans.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.yellow }]}>Watch</Text>
              {renderOrganPairs(watchOrgans)}
            </View>
          )}

          {strongOrgans.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.green }]}>Strong</Text>
              {renderOrganPairs(strongOrgans)}
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textTertiary,
    fontWeight: '500' as const,
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  overallCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginBottom: 14,
  },
  overallLeft: {
    flex: 1,
  },
  overallLabel: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  overallDesc: {
    fontSize: 12,
    color: colors.textTertiary,
    marginTop: 2,
  },
  overallRight: {
    flexDirection: 'row' as const,
    alignItems: 'baseline' as const,
  },
  overallScore: {
    fontSize: 36,
    fontWeight: '700' as const,
    color: colors.textPrimary,
    letterSpacing: -1,
  },
  overallMax: {
    fontSize: 14,
    color: colors.textTertiary,
    fontWeight: '500' as const,
    marginLeft: 2,
  },
  summaryRow: {
    flexDirection: 'row' as const,
    gap: 8,
    marginBottom: 20,
    flexWrap: 'wrap' as const,
  },
  summaryPill: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  summaryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  summaryText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600' as const,
    letterSpacing: 0.3,
    textTransform: 'uppercase' as const,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row' as const,
    gap: 10,
    marginBottom: 10,
  },
  emptyCard: {
    flex: 1,
  },
});
