import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Animated, StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Sun, Moon, TrendingUp, Eye, EyeOff } from 'lucide-react-native';
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
  const [showPointers, setShowPointers] = useState<boolean>(false);

  const togglePointers = useCallback(() => {
    setShowPointers((prev) => !prev);
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleOrganPress = useCallback((organId: string) => {
    console.log('[HomeScreen] Navigating to organ:', organId);
    router.push({ pathname: '/organ/[id]' as any, params: { id: organId } });
  }, [router]);

  const atmosphereTop = isDark ? 'rgba(94, 190, 154, 0.06)' : 'rgba(59, 143, 115, 0.05)';
  const atmosphereBottom = isDark ? 'rgba(96, 165, 250, 0.04)' : 'rgba(37, 99, 235, 0.03)';

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.bg }]}>
      <LinearGradient
        colors={[colors.bgGradient1, colors.bgGradient2, colors.bgGradient3] as any}
        style={StyleSheet.absoluteFill}
      />

      {/* soft atmospheric glows */}
      <View pointerEvents="none" style={[styles.glowTop, { backgroundColor: atmosphereTop }]} />
      <View pointerEvents="none" style={[styles.glowBottom, { backgroundColor: atmosphereBottom }]} />

      <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.headerTop}>
          <View style={styles.titleBlock}>
            <View style={styles.eyebrowRow}>
              <View style={[styles.eyebrowDot, { backgroundColor: colors.green }]} />
              <Text style={[styles.eyebrow, { color: colors.textTertiary }]}>SYNCED · TODAY</Text>
            </View>
            <Text style={[styles.greeting, { color: colors.textPrimary }]}>Clariohealth</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Your biological dashboard</Text>
          </View>

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
        </View>

        {/* Overall score card */}
        <View
          style={[
            styles.overallCard,
            {
              backgroundColor: colors.overlayLight,
              borderColor: colors.borderSubtle,
              shadowColor: colors.shadowColor,
            },
          ]}
        >
          <View style={styles.overallLeft}>
            <Text style={[styles.overallEyebrow, { color: colors.textTertiary }]}>OVERALL VITALITY</Text>
            <View style={styles.scoreRow}>
              <Text style={[styles.overallScore, { color: colors.textPrimary }]}>{overallScore}</Text>
              <Text style={[styles.overallSlash, { color: colors.textTertiary }]}>/100</Text>
            </View>
            <View style={styles.trendRow}>
              <TrendingUp size={11} color={colors.green} />
              <Text style={[styles.trendText, { color: colors.green }]}>+2 this week</Text>
            </View>
          </View>
          <View style={styles.overallRight}>
            <View style={[styles.barTrack, { backgroundColor: colors.overlayMedium }]}>
              <View style={[styles.barFill, { width: `${overallScore}%`, backgroundColor: colors.green }]} />
            </View>
            <Text style={[styles.barCaption, { color: colors.textTertiary }]}>5 systems tracked</Text>
          </View>
        </View>
      </Animated.View>

      <View style={styles.bodyContainer}>
        <BodySilhouette onOrganPress={handleOrganPress} showPointers={showPointers} />
      </View>

      <Animated.View style={[styles.hintContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity
          onPress={togglePointers}
          activeOpacity={0.8}
          testID="toggle-pointers"
          style={[
            styles.hintPill,
            {
              backgroundColor: showPointers ? colors.green + '15' : colors.overlayLight,
              borderColor: showPointers ? colors.green + '40' : colors.borderSubtle,
            },
          ]}
        >
          {showPointers ? (
            <EyeOff size={13} color={colors.textSecondary} />
          ) : (
            <Eye size={13} color={colors.textSecondary} />
          )}
          <Text style={[styles.hintText, { color: colors.textSecondary }]}>
            {showPointers ? 'Hide system markers' : 'Show system markers'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glowTop: {
    position: 'absolute' as const,
    top: -180,
    left: -120,
    width: 420,
    height: 420,
    borderRadius: 210,
    opacity: 1,
  },
  glowBottom: {
    position: 'absolute' as const,
    bottom: -200,
    right: -140,
    width: 460,
    height: 460,
    borderRadius: 230,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerTop: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    justifyContent: 'space-between' as const,
  },
  titleBlock: { flex: 1 },
  eyebrowRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    marginBottom: 6,
  },
  eyebrowDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '600' as const,
    letterSpacing: 1.2,
  },
  themeToggle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 1,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '700' as const,
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '500' as const,
    marginTop: 3,
    letterSpacing: 0.1,
  },
  overallCard: {
    marginTop: 16,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    borderWidth: 1,
    gap: 16,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: { elevation: 1 },
      default: {},
    }),
  },
  overallLeft: { flexShrink: 0 },
  overallEyebrow: {
    fontSize: 10,
    fontWeight: '600' as const,
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  scoreRow: {
    flexDirection: 'row' as const,
    alignItems: 'baseline' as const,
    gap: 3,
  },
  overallScore: {
    fontSize: 34,
    fontWeight: '700' as const,
    letterSpacing: -1.2,
    lineHeight: 38,
  },
  overallSlash: {
    fontSize: 13,
    fontWeight: '500' as const,
  },
  trendRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 4,
    marginTop: 2,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 0.1,
  },
  overallRight: {
    flex: 1,
    alignItems: 'flex-end' as const,
    gap: 6,
  },
  barTrack: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden' as const,
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  barCaption: {
    fontSize: 10,
    fontWeight: '500' as const,
    letterSpacing: 0.4,
    textTransform: 'uppercase' as const,
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginTop: -4,
  },
  hintContainer: {
    alignItems: 'center' as const,
    paddingBottom: 14,
  },
  hintPill: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 7,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  hintText: {
    fontSize: 12,
    fontWeight: '500' as const,
    letterSpacing: 0.2,
  },
});
