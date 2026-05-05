import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, Text, Platform } from 'react-native';
import { OrganStatus, getStatusColor } from '@/constants/colors';
import { useTheme } from '@/contexts/ThemeContext';

interface OrganPointerProps {
  x: number;
  y: number;
  status: OrganStatus;
  name: string;
  label: string;
  score: number;
  onPress: () => void;
}

export default function OrganPointer({ x, y, status, name, label, score, onPress }: OrganPointerProps) {
  const { colors, isDark } = useTheme();
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const color = getStatusColor(status, colors);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 2200, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0, duration: 2200, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.94, useNativeDriver: true, friction: 6 }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 5 }).start();
  };

  const ringScale = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.55] });
  const ringOpacity = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0] });

  const chipBg = isDark ? 'rgba(20,20,24,0.78)' : 'rgba(255,255,255,0.92)';
  const chipBorder = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.06)';

  return (
    <TouchableOpacity
      testID={`organ-pointer-${name}`}
      style={[styles.container, { left: `${x}%`, top: `${y}%` }]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          styles.ring,
          {
            borderColor: color,
            opacity: ringOpacity,
            transform: [{ scale: ringScale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.chip,
          {
            backgroundColor: chipBg,
            borderColor: chipBorder,
            shadowColor: isDark ? '#000' : '#000',
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={[styles.statusDot, { backgroundColor: color }]} />
        <Text style={[styles.label, { color: colors.textPrimary }]} numberOfLines={1}>
          {label}
        </Text>
        <Text style={[styles.score, { color: colors.textTertiary }]}>{score}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    zIndex: 10,
    transform: [{ translateX: -1 }],
  },
  ring: {
    position: 'absolute' as const,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
  },
  chip: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    gap: 6,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
      default: {},
    }),
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 0.1,
  },
  score: {
    fontSize: 10,
    fontWeight: '500' as const,
    letterSpacing: 0.2,
  },
});
