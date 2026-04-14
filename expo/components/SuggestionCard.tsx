import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import { Zap, ArrowUpRight } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Suggestion } from '@/mocks/organData';

interface SuggestionCardProps {
  suggestion: Suggestion;
  index: number;
}

export default function SuggestionCard({ suggestion, index }: SuggestionCardProps) {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(12)).current;

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
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.borderSubtle, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
    >
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: colors.blueMuted }]}>
          <Zap size={14} color={colors.accent} />
        </View>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{suggestion.title}</Text>
      </View>
      <Text style={[styles.description, { color: colors.textSecondary }]}>{suggestion.description}</Text>
      <View style={styles.footer}>
        <View style={styles.impactRow}>
          <ArrowUpRight size={12} color={colors.green} />
          <Text style={[styles.impactText, { color: colors.green }]}>{suggestion.impact}</Text>
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
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
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
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  title: {
    fontSize: 15,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
    flex: 1,
  },
  description: {
    fontSize: 13,
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
