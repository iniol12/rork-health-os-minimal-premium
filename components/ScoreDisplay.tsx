import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { OrganStatus, getStatusColor, getStatusMuted } from '@/constants/colors';
import colors from '@/constants/colors';

interface ScoreDisplayProps {
  score: number;
  status: OrganStatus;
  size?: number;
  strokeWidth?: number;
}

export default function ScoreDisplay({ score, status, size = 120, strokeWidth = 6 }: ScoreDisplayProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const color = getStatusColor(status);
  const mutedColor = getStatusMuted(status);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const offset = circumference - progress;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Svg width={size} height={size} style={styles.svg}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={mutedColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={[styles.scoreContainer, { width: size, height: size }]}>
        <Animated.Text style={[styles.score, { color, fontSize: size * 0.3 }]}>
          {score}
        </Animated.Text>
        <Animated.Text style={[styles.label, { fontSize: size * 0.1 }]}>
          / 100
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  svg: {
    position: 'absolute' as const,
  },
  scoreContainer: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  score: {
    fontWeight: '700' as const,
    letterSpacing: -1,
  },
  label: {
    color: colors.textTertiary,
    fontWeight: '500' as const,
    marginTop: -2,
  },
});
