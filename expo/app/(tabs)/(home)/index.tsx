import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '@/constants/colors';
import { getOverallScore } from '@/mocks/organData';
import BodySilhouette from '@/components/BodySilhouette';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const overallScore = getOverallScore();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleOrganPress = (organId: string) => {
    console.log('[HomeScreen] Navigating to organ:', organId);
    router.push({ pathname: '/organ/[id]' as any, params: { id: organId } });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={['#06060A', '#08080E', '#06060A']}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Clario OS</Text>
            <Text style={styles.subtitle}>Your biological dashboard</Text>
          </View>
          <View style={styles.overallBadge}>
            <Text style={styles.overallScore}>{overallScore}</Text>
            <Text style={styles.overallLabel}>Overall</Text>
          </View>
        </View>
      </Animated.View>

      <View style={styles.bodyContainer}>
        <BodySilhouette onOrganPress={handleOrganPress} />
      </View>

      <Animated.View style={[styles.hintContainer, { opacity: fadeAnim }]}>
        <View style={styles.hintPill}>
          <View style={styles.hintDot} />
          <Text style={styles.hintText}>Tap an organ to explore</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06060A',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },
  headerTop: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  greeting: {
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
    letterSpacing: 0.1,
  },
  overallBadge: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center' as const,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  overallScore: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  overallLabel: {
    fontSize: 10,
    color: colors.textTertiary,
    fontWeight: '500' as const,
    marginTop: 1,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginTop: -8,
  },
  hintContainer: {
    alignItems: 'center' as const,
    paddingBottom: 14,
  },
  hintPill: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: 'rgba(255,255,255,0.04)',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 7,
  },
  hintDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(96,165,250,0.6)',
  },
  hintText: {
    fontSize: 12,
    color: colors.textTertiary,
    fontWeight: '500' as const,
    letterSpacing: 0.2,
  },
});
