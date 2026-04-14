import React, { useRef, useEffect, useCallback } from 'react';
import { Animated, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Sun, Moon } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getOverallScore } from '@/mocks/organData';
import BodySilhouette from '@/components/BodySilhouette';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, isDark, toggleTheme } = useTheme();
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

  const handleOrganPress = useCallback((organId: string) => {
    console.log('[HomeScreen] Navigating to organ:', organId);
    router.push({ pathname: '/organ/[id]' as any, params: { id: organId } });
  }, [router]);

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.bg }]}>
      <LinearGradient
        colors={[colors.bgGradient1, colors.bgGradient2, colors.bgGradient3] as any}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.greeting, { color: colors.textPrimary }]}>Clariohealth</Text>
            <Text style={[styles.subtitle, { color: colors.textTertiary }]}>Your biological dashboard</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={toggleTheme}
              style={[styles.themeToggle, { backgroundColor: colors.overlayLight, borderColor: colors.overlayMedium }]}
              activeOpacity={0.7}
              testID="theme-toggle"
            >
              {isDark ? (
                <Sun size={16} color={colors.textSecondary} />
              ) : (
                <Moon size={16} color={colors.textSecondary} />
              )}
            </TouchableOpacity>
            <View style={[styles.overallBadge, { backgroundColor: colors.overlayLight, borderColor: colors.overlayMedium }]}>
              <Text style={[styles.overallScore, { color: colors.textPrimary }]}>{overallScore}</Text>
              <Text style={[styles.overallLabel, { color: colors.textTertiary }]}>Overall</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      <View style={styles.bodyContainer}>
        <BodySilhouette onOrganPress={handleOrganPress} />
      </View>

      <Animated.View style={[styles.hintContainer, { opacity: fadeAnim }]}>
        <View style={[styles.hintPill, { backgroundColor: colors.overlayLight }]}>
          <View style={[styles.hintDot, { backgroundColor: colors.accent + '99' }]} />
          <Text style={[styles.hintText, { color: colors.textTertiary }]}>Tap an organ to explore</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  headerRight: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  themeToggle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 1,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '500' as const,
    marginTop: 2,
    letterSpacing: 0.1,
  },
  overallBadge: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center' as const,
    borderWidth: 1,
  },
  overallScore: {
    fontSize: 20,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  overallLabel: {
    fontSize: 10,
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
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 7,
  },
  hintDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  hintText: {
    fontSize: 12,
    fontWeight: '500' as const,
    letterSpacing: 0.2,
  },
});
