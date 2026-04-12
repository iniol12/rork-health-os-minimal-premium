import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, Mic, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '@/constants/colors';

const SNACK_IMAGE = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80';
const SALMON_IMAGE = 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80';

interface ChipProps {
  label: string;
  delay: number;
}

function SuggestionChip({ label, delay }: ChipProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 300, delay, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: 0, duration: 300, delay, useNativeDriver: true }),
    ]).start();
  }, [opacity, translateX, delay]);

  return (
    <Animated.View style={{ opacity, transform: [{ translateX }] }}>
      <TouchableOpacity style={styles.chip} activeOpacity={0.7}>
        <Text style={styles.chipText}>{label}</Text>
        <ChevronRight size={11} color="rgba(96,165,250,0.6)" />
      </TouchableOpacity>
    </Animated.View>
  );
}

interface BulletProps {
  label: string;
  value: string;
  sentiment: 'negative' | 'positive' | 'neutral';
}

function BulletRow({ label, value, sentiment }: BulletProps) {
  const dotColor =
    sentiment === 'negative' ? '#F87171' : sentiment === 'positive' ? '#34D399' : '#FBBF24';
  return (
    <View style={styles.bulletRow}>
      <View style={[styles.bulletDot, { backgroundColor: dotColor }]} />
      <Text style={styles.bulletLabel}>{label}</Text>
      <Text style={[styles.bulletValue, { color: dotColor }]}>{value}</Text>
    </View>
  );
}

interface MiniBodyProps {
  highlight: 'pancreas' | 'heart';
}

function MiniBody({ highlight }: MiniBodyProps) {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.4, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, [pulseAnim]);

  const isHeart = highlight === 'heart';
  const glowColor = isHeart ? 'rgba(52,211,153,0.4)' : 'rgba(251,191,36,0.35)';
  const glowColor2 = isHeart ? 'rgba(96,165,250,0.28)' : 'rgba(248,113,113,0.22)';
  const pos1 = isHeart ? { top: '28%' as const, left: '42%' as const } : { top: '52%' as const, left: '38%' as const };
  const pos2 = isHeart ? { top: '20%' as const, left: '47%' as const } : { top: '47%' as const, left: '44%' as const };

  return (
    <View style={styles.miniBodyContainer}>
      <View style={styles.miniBodySilhouette}>
        <View style={styles.silHead} />
        <View style={styles.silNeck} />
        <View style={styles.silTorso} />
        <View style={styles.silLegs} />
      </View>
      <Animated.View style={[styles.miniBodyGlow, pos1, { backgroundColor: glowColor, opacity: pulseAnim }]} />
      <Animated.View style={[styles.miniBodyGlow2, pos2, { backgroundColor: glowColor2, opacity: pulseAnim }]} />
    </View>
  );
}

export default function AskScreen() {
  const insets = useSafeAreaInsets();
  const [inputText, setInputText] = useState<string>('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;
  const msg1Opacity = useRef(new Animated.Value(0)).current;
  const msg1Slide = useRef(new Animated.Value(16)).current;
  const resp1Opacity = useRef(new Animated.Value(0)).current;
  const resp1Slide = useRef(new Animated.Value(16)).current;
  const msg2Opacity = useRef(new Animated.Value(0)).current;
  const msg2Slide = useRef(new Animated.Value(16)).current;
  const resp2Opacity = useRef(new Animated.Value(0)).current;
  const resp2Slide = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    const anim = (o: Animated.Value, s: Animated.Value, delay: number) =>
      Animated.parallel([
        Animated.timing(o, { toValue: 1, duration: 500, delay, useNativeDriver: true }),
        Animated.timing(s, { toValue: 0, duration: 500, delay, useNativeDriver: true }),
      ]);

    Animated.parallel([
      anim(fadeAnim, slideAnim, 0),
      anim(msg1Opacity, msg1Slide, 250),
      anim(resp1Opacity, resp1Slide, 800),
      anim(msg2Opacity, msg2Slide, 1600),
      anim(resp2Opacity, resp2Slide, 2100),
    ]).start();
  }, [fadeAnim, slideAnim, msg1Opacity, msg1Slide, resp1Opacity, resp1Slide, msg2Opacity, msg2Slide, resp2Opacity, resp2Slide]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={['#06060A', '#08080E', '#06060A']} style={StyleSheet.absoluteFill} />

      <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Ask</Text>
            <Text style={styles.headerSub}>Food · Biomarkers · Body intelligence</Text>
          </View>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live</Text>
          </View>
        </View>
      </Animated.View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* USER MSG 1 */}
        <Animated.View style={[styles.userRow, { opacity: msg1Opacity, transform: [{ translateY: msg1Slide }] }]}>
          <View style={styles.userStack}>
            <Image source={{ uri: SNACK_IMAGE }} style={styles.foodImage} resizeMode="cover" />
            <View style={styles.userBubble}>
              <Text style={styles.userText}>I want cookies and soda for breakfast — is this okay?</Text>
            </View>
          </View>
        </Animated.View>

        {/* AI RESPONSE 1 */}
        <Animated.View style={[styles.aiRow, { opacity: resp1Opacity, transform: [{ translateY: resp1Slide }] }]}>
          <View style={styles.aiModelTag}>
            <Text style={styles.aiModelText}>Clariohealth · Metabolic Analysis</Text>
          </View>
          <View style={styles.aiCard}>
            <View style={styles.summaryRow}>
              <View style={[styles.summaryAccent, { backgroundColor: '#F87171' }]} />
              <Text style={[styles.summaryText, { color: '#F87171' }]}>
                Poor morning choice — cortisol + sugar crash is a rough combo.
              </Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionLabel}>MORNING-SPECIFIC EFFECTS</Text>
            <BulletRow label="Cortisol interaction" value="Amplified crash (8–10am peak)" sentiment="negative" />
            <BulletRow label="Glucose spike" value="High (+40–55% on empty stomach)" sentiment="negative" />
            <BulletRow label="Insulin surge" value="Sharp — no protein/fat buffer" sentiment="negative" />
            <BulletRow label="Energy curve" value="30min spike → 90min crash" sentiment="negative" />

            <View style={styles.divider} />

            <Text style={styles.sectionLabel}>BLOOD MARKERS AFFECTED</Text>
            <BulletRow label="Blood glucose" value="Spike risk — currently trending high" sentiment="negative" />
            <BulletRow label="HbA1c" value="5.8% · Prediabetic threshold — this worsens it" sentiment="negative" />
            <BulletRow label="Triglycerides" value="Mild increase" sentiment="negative" />
            <BulletRow label="Insulin response" value="Sharp — no fiber/protein buffer" sentiment="negative" />
            <BulletRow label="Inflammation" value="Slight temporary rise" sentiment="neutral" />

            <View style={styles.contextNote}>
              <Text style={styles.contextIcon}>◎</Text>
              <Text style={styles.contextText}>
                It's 8:42 AM — cortisol is naturally peaking. With your HbA1c at 5.8% (prediabetic range), this sugar load on an empty stomach is particularly risky for you right now.
              </Text>
            </View>

            <MiniBody highlight="pancreas" />

            <View style={styles.chipsWrap}>
              <SuggestionChip label="What if I add eggs first?" delay={900} />
              <SuggestionChip label="How long until glucose normalizes?" delay={1050} />
              <SuggestionChip label="Better breakfast swaps?" delay={1200} />
            </View>
          </View>
        </Animated.View>

        {/* USER MSG 2 */}
        <Animated.View style={[styles.userRow, { opacity: msg2Opacity, transform: [{ translateY: msg2Slide }] }]}>
          <View style={styles.userStack}>
            <Image source={{ uri: SALMON_IMAGE }} style={styles.foodImage} resizeMode="cover" />
            <View style={styles.userBubble}>
              <Text style={styles.userText}>What about this meal?</Text>
            </View>
          </View>
        </Animated.View>

        {/* AI RESPONSE 2 */}
        <Animated.View style={[styles.aiRow, { opacity: resp2Opacity, transform: [{ translateY: resp2Slide }] }]}>
          <View style={styles.aiModelTag}>
            <Text style={styles.aiModelText}>Clariohealth · Metabolic Analysis</Text>
          </View>
          <View style={[styles.aiCard, styles.aiCardPositive]}>
            <View style={styles.summaryRow}>
              <View style={[styles.summaryAccent, { backgroundColor: '#34D399' }]} />
              <Text style={[styles.summaryText, { color: '#34D399' }]}>
                Great choice — stable energy and metabolic support.
              </Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionLabel}>METABOLIC IMPACT</Text>
            <BulletRow label="Glucose response" value="Stable" sentiment="positive" />
            <BulletRow label="Insulin load" value="Low" sentiment="positive" />
            <BulletRow label="Energy curve" value="Sustained release" sentiment="positive" />

            <View style={styles.divider} />

            <Text style={styles.sectionLabel}>BLOOD MARKERS SUPPORTED</Text>
            <BulletRow label="Blood glucose" value="Stable range" sentiment="positive" />
            <BulletRow label="Triglycerides" value="Neutral to positive" sentiment="positive" />
            <BulletRow label="HDL cholesterol" value="Supportive (salmon, avocado)" sentiment="positive" />
            <BulletRow label="Inflammation" value="Anti-inflammatory profile" sentiment="positive" />

            <View style={[styles.contextNote, { backgroundColor: 'rgba(52,211,153,0.06)', borderColor: 'rgba(52,211,153,0.15)' }]}>
              <Text style={[styles.contextIcon, { color: '#34D399' }]}>◎</Text>
              <Text style={[styles.contextText, { color: 'rgba(52,211,153,0.85)' }]}>
                High omega-3 content supports cardiovascular and brain health.
              </Text>
            </View>

            <MiniBody highlight="heart" />

            <View style={styles.chipsWrap}>
              <SuggestionChip label="Best time to eat this?" delay={2200} />
              <SuggestionChip label="Will this help sleep?" delay={2350} />
              <SuggestionChip label="Ideal portion for my goals?" delay={2500} />
            </View>
          </View>
        </Animated.View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* FLOATING INPUT */}
      <View style={[styles.inputWrapper, { paddingBottom: insets.bottom + 10 }]}>
        <LinearGradient
          colors={['transparent', 'rgba(6,6,10,0.96)', '#06060A']}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Camera size={18} color={colors.textTertiary} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Ask anything about your body…"
            placeholderTextColor={colors.textTertiary}
            value={inputText}
            onChangeText={setInputText}
            returnKeyType="send"
            multiline={false}
          />
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Mic size={18} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>
      </View>
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
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 12,
    color: colors.textTertiary,
    fontWeight: '500' as const,
    marginTop: 2,
    letterSpacing: 0.1,
  },
  liveBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: 'rgba(52,211,153,0.08)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 5,
    borderWidth: 1,
    borderColor: 'rgba(52,211,153,0.18)',
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#34D399',
  },
  liveText: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: '#34D399',
    letterSpacing: 0.3,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  userRow: {
    alignItems: 'flex-end' as const,
    marginBottom: 14,
  },
  userStack: {
    alignItems: 'flex-end' as const,
    gap: 8,
    maxWidth: '80%',
  },
  foodImage: {
    width: 168,
    height: 116,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: 'rgba(96,165,250,0.1)',
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(96,165,250,0.2)',
  },
  userText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500' as const,
    letterSpacing: 0.1,
  },
  aiRow: {
    alignItems: 'flex-start' as const,
    marginBottom: 24,
  },
  aiModelTag: {
    marginBottom: 6,
    marginLeft: 2,
  },
  aiModelText: {
    fontSize: 10,
    color: colors.textTertiary,
    fontWeight: '500' as const,
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
  },
  aiCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    padding: 16,
    width: '96%',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 7,
  },
  aiCardPositive: {
    borderColor: 'rgba(52,211,153,0.1)',
  },
  summaryRow: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    gap: 10,
  },
  summaryAccent: {
    width: 3,
    height: '100%',
    borderRadius: 2,
    minHeight: 20,
  },
  summaryText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
    marginVertical: 12,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '600' as const,
    color: colors.textTertiary,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 5,
    gap: 9,
  },
  bulletDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  bulletLabel: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '400' as const,
    letterSpacing: 0.1,
  },
  bulletValue: {
    fontSize: 12,
    fontWeight: '500' as const,
    letterSpacing: 0.1,
  },
  contextNote: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    backgroundColor: 'rgba(251,191,36,0.06)',
    borderRadius: 10,
    padding: 10,
    gap: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.15)',
  },
  contextIcon: {
    fontSize: 12,
    color: '#FBBF24',
    marginTop: 1,
  },
  contextText: {
    flex: 1,
    fontSize: 12,
    color: 'rgba(251,191,36,0.85)',
    fontWeight: '400' as const,
    lineHeight: 18,
    letterSpacing: 0.1,
  },
  miniBodyContainer: {
    alignItems: 'center' as const,
    marginTop: 16,
    marginBottom: 4,
    height: 80,
    position: 'relative' as const,
  },
  miniBodySilhouette: {
    alignItems: 'center' as const,
    opacity: 0.12,
  },
  silHead: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.textPrimary,
  },
  silNeck: {
    width: 7,
    height: 6,
    backgroundColor: colors.textPrimary,
  },
  silTorso: {
    width: 28,
    height: 32,
    borderRadius: 4,
    backgroundColor: colors.textPrimary,
  },
  silLegs: {
    width: 20,
    height: 22,
    borderRadius: 3,
    backgroundColor: colors.textPrimary,
  },
  miniBodyGlow: {
    position: 'absolute' as const,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  miniBodyGlow2: {
    position: 'absolute' as const,
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  chipsWrap: {
    marginTop: 12,
    gap: 6,
  },
  chip: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: 'rgba(96,165,250,0.07)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignSelf: 'flex-start' as const,
    borderWidth: 1,
    borderColor: 'rgba(96,165,250,0.15)',
    gap: 4,
  },
  chipText: {
    fontSize: 12,
    color: 'rgba(96,165,250,0.9)',
    fontWeight: '500' as const,
    letterSpacing: 0.1,
  },
  inputWrapper: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  inputBar: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: colors.card,
    borderRadius: 30,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 10,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    paddingHorizontal: 6,
    paddingVertical: Platform.OS === 'web' ? 8 : 0,
    letterSpacing: 0.1,
  },
});
