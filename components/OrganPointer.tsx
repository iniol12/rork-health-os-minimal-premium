import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { OrganStatus, getStatusColor, getStatusSoft } from '@/constants/colors';

interface OrganPointerProps {
  x: number;
  y: number;
  status: OrganStatus;
  name: string;
  onPress: () => void;
}

export default function OrganPointer({ x, y, status, name, onPress }: OrganPointerProps) {
  const pulseAnim = useRef(new Animated.Value(0.6)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const color = getStatusColor(status);
  const softColor = getStatusSoft(status);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.3,
      useNativeDriver: true,
      friction: 6,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
    }).start();
  };

  return (
    <TouchableOpacity
      testID={`organ-pointer-${name}`}
      style={[styles.container, { left: `${x}%`, top: `${y}%` }]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View style={[styles.outerGlow, { opacity: pulseAnim, transform: [{ scale: scaleAnim }], backgroundColor: softColor }]} />
      <Animated.View style={[styles.middleGlow, { opacity: pulseAnim, transform: [{ scale: scaleAnim }], backgroundColor: color + '30' }]} />
      <Animated.View style={[styles.core, { transform: [{ scale: scaleAnim }], backgroundColor: color }]}>
        <View style={[styles.innerHighlight, { backgroundColor: color }]} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute' as const,
    width: 44,
    height: 44,
    marginLeft: -22,
    marginTop: -22,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    zIndex: 10,
  },
  outerGlow: {
    position: 'absolute' as const,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  middleGlow: {
    position: 'absolute' as const,
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  core: {
    width: 12,
    height: 12,
    borderRadius: 6,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  innerHighlight: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    opacity: 0.7,
  },
});
