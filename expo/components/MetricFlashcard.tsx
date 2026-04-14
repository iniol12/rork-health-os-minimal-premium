import React, { useRef, useState, useCallback } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, Text, Platform, LayoutAnimation } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ChevronDown } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { OrganMetric } from '@/mocks/organData';
import { ThemeColors } from '@/constants/colors';

interface MetricFlashcardProps {
  metric: OrganMetric;
}

function getMetricStatusColor(status: OrganMetric['status'], colors: ThemeColors): string {
  switch (status) {
    case 'optimal': return colors.green;
    case 'normal': return colors.green;
    case 'elevated': return colors.yellow;
    case 'high': return colors.red;
    case 'low': return colors.red;
  }
}

function getMetricStatusBg(status: OrganMetric['status'], colors: ThemeColors): string {
  switch (status) {
    case 'optimal': return colors.greenMuted;
    case 'normal': return colors.greenMuted;
    case 'elevated': return colors.yellowMuted;
    case 'high': return colors.redMuted;
    case 'low': return colors.redMuted;
  }
}

export default function MetricFlashcard({ metric }: MetricFlashcardProps) {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState<boolean>(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const statusColor = getMetricStatusColor(metric.status, colors);
  const statusBg = getMetricStatusBg(metric.status, colors);

  const toggle = useCallback(() => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    LayoutAnimation.configureNext({
      duration: 200,
      create: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
      update: { type: LayoutAnimation.Types.easeInEaseOut },
    });

    Animated.spring(rotateAnim, {
      toValue: expanded ? 0 : 1,
      useNativeDriver: true,
      friction: 8,
    }).start();

    setExpanded(!expanded);
  }, [expanded, rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <TouchableOpacity
      testID={`metric-${metric.id}`}
      onPress={toggle}
      activeOpacity={0.8}
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.borderSubtle },
        expanded && { backgroundColor: colors.cardHover, borderColor: colors.border },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.metricName, { color: colors.textSecondary }]}>{metric.name}</Text>
          <View style={styles.valueRow}>
            <Text style={[styles.metricValue, { color: colors.textPrimary }]}>{metric.value}</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
              <Text style={[styles.statusText, { color: statusColor }]}>{metric.statusLabel}</Text>
            </View>
          </View>
        </View>
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <ChevronDown size={18} color={colors.textTertiary} />
        </Animated.View>
      </View>

      {expanded && (
        <View style={[styles.content, { borderTopColor: colors.border }]}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>What is this?</Text>
            <Text style={[styles.sectionBody, { color: colors.textSecondary }]}>{metric.whatIsThis}</Text>
          </View>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>What yours means</Text>
            <Text style={[styles.sectionBody, { color: colors.textSecondary }]}>{metric.whatYoursMeans}</Text>
          </View>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>Why it matters</Text>
            <Text style={[styles.sectionBody, { color: colors.textSecondary }]}>{metric.whyItMatters}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 8,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  headerLeft: {
    flex: 1,
    marginRight: 12,
  },
  metricName: {
    fontSize: 13,
    fontWeight: '500' as const,
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  valueRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  metricValue: {
    fontSize: 17,
    fontWeight: '600' as const,
    letterSpacing: -0.3,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 0.2,
  },
  content: {
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  sectionBody: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
});
