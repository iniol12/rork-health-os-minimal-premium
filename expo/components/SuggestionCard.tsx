import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import { Zap, ArrowUpRight } from 'lucide-react-native';
import colors from '@/constants/colors';
import { Suggestion } from '@/mocks/organData';

interface SuggestionCardProps {
  suggestion: Suggestion;
  index: number;
}

function getDifficultyColor(difficulty: Suggestion['difficulty']): string {
  switch (difficulty) {
    case 'easy': return colors.green;
    case 'medium': return colors.yellow;
    case 'hard': return colors.red;
  }
}

function getDifficultyBg(difficulty: Suggestion['difficulty']): string {
  switch (difficulty) {
    case 'easy': return colors.greenMuted;
    case 'medium': return colors.yellowMuted;
    case 'hard': return colors.redMuted;
  }
}

export default function SuggestionCard({ suggestion, index }: SuggestionCardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(12)).current;
  const diffColor = getDifficultyColor(suggestion.difficulty);
  const diffBg = getDifficultyBg(suggestion.difficulty);

  useEffect(() => {
    const delay = index * 120;
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, index]);

  return (
    <Animated.View
      testID={`suggestion-${suggestion.id}`}
      style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
    >
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Zap size={14} color={colors.accent} />
        </View>
        <Text style={styles.title}>{suggestion.title}</Text>
      </View>
      <Text style={styles.description}>{suggestion.description}</Text>
      <View style={styles.footer}>
        <View style={styles.impactRow}>
          <ArrowUpRight size={12} color={colors.green} />
          <Text style={styles.impactText}>{suggestion.impact}</Text>
        </View>
        <View style={[styles.diffBadge, { backgroundColor: diffBg }]}>
          <Text style={[styles.diffText, { color: diffColor }]}>{suggestion.difficulty}</Text>
        </View>
      </View>
    </Animated.View>
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
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    marginBottom: 6,
  },
  iconWrap: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: colors.blueMuted,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  title: {
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
    flex: 1,
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginLeft: 34,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    marginLeft: 34,
  },
  impactRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 4,
  },
  impactText: {
    fontSize: 12,
    color: colors.green,
    fontWeight: '500' as const,
  },
  diffBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  diffText: {
    fontSize: 11,
    fontWeight: '600' as const,
    textTransform: 'capitalize' as const,
  },
});
