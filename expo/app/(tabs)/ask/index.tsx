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
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeColors } from '@/constants/colors';

const SNACK_IMAGE = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80';
const SALMON_IMAGE = 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80';

interface ChipProps {
  label: string;
  delay: number;
  colors: ThemeColors;
}

function SuggestionChip({ label, delay, colors }: ChipProps) {
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
      <TouchableOpacity style={[styles.chip, { backgroundColor: colors.chipBg, borderColor: colors.chipBorder }]} activeOpacity={0.7}>
        <Text style={[styles.chipText, { color: colors.chipText }]}>{label}</Text>
        <ChevronRight size={11} color={colors.chipIcon} />
      </TouchableOpacity>
    </Animated.View>
  );
}

interface BulletProps {
  label: string;
  value: string;
  sentiment: 'negative' | 'positive' | 'neutral';
  colors: ThemeColors;
}

function BulletRow({ label, value, sentiment, colors }: BulletProps) {
  const dotColor =
    sentiment === 'negative' ? colors.red : sentiment === 'positive' ? colors.green : colors.yellow;
  return (
    <View style={styles.bulletRow}>
      <View style={[styles.bulletDot, { backgroundColor: dotColor }]} />
      <Text style={[styles.bulletLabel, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.bulletValue, { color: dotColor }]}>{value}</Text>
    </View>
  );
}

interface MiniBodyProps {
  highlight: 'pancreas' | 'heart';
  colors: ThemeColors;
}

function MiniBody({ highlight, colors }: MiniBodyProps) {
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
        <View style={[styles.silHead, { backgroundColor: colors.textPrimary }]} />
        <View style={[styles.silNeck, { backgroundColor: colors.textPrimary }]} />
        <View style={[styles.silTorso, { backgroundColor: colors.textPrimary }]} />
        <View style={[styles.silLegs, { backgroundColor: colors.textPrimary }]} />
      </View>
      <Animated.View style={[styles.miniBodyGlow, pos1, { backgroundColor: glowColor, opacity: pulseAnim }]} />
      <Animated.View style={[styles.miniBodyGlow2, pos2, { backgroundColor: glowColor2, opacity: pulseAnim }]} />
    </View>
  );
}

export default function AskScreen() {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();
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
  const msg3Opacity = useRef(new Animated.Value(0)).current;
  const msg3Slide = useRef(new Animated.Value(16)).current;
  const resp3Opacity = useRef(new Animated.Value(0)).current;
  const resp3Slide = useRef(new Animated.Value(16)).current;
  const msg4Opacity = useRef(new Animated.Value(0)).current;
  const msg4Slide = useRef(new Animated.Value(16)).current;
  const resp4Opacity = useRef(new Animated.Value(0)).current;
  const resp4Slide = useRef(new Animated.Value(16)).current;
  const msg5Opacity = useRef(new Animated.Value(0)).current;
  const msg5Slide = useRef(new Animated.Value(16)).current;
  const resp5Opacity = useRef(new Animated.Value(0)).current;
  const resp5Slide = useRef(new Animated.Value(16)).current;

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
      anim(msg3Opacity, msg3Slide, 2900),
      anim(resp3Opacity, resp3Slide, 3400),
      anim(msg4Opacity, msg4Slide, 4200),
      anim(resp4Opacity, resp4Slide, 4700),
      anim(msg5Opacity, msg5Slide, 5500),
      anim(resp5Opacity, resp5Slide, 6000),
    ]).start();
  }, [fadeAnim, slideAnim, msg1Opacity, msg1Slide, resp1Opacity, resp1Slide, msg2Opacity, msg2Slide, resp2Opacity, resp2Slide, msg3Opacity, msg3Slide, resp3Opacity, resp3Slide, msg4Opacity, msg4Slide, resp4Opacity, resp4Slide, msg5Opacity, msg5Slide, resp5Opacity, resp5Slide]);

  const negativeContextBg = isDark ? 'rgba(251,191,36,0.06)' : 'rgba(217,119,6,0.06)';
  const negativeContextBorder = isDark ? 'rgba(251,191,36,0.15)' : 'rgba(217,119,6,0.15)';
  const negativeContextIconColor = isDark ? '#FBBF24' : '#D97706';
  const negativeContextTextColor = isDark ? 'rgba(251,191,36,0.85)' : 'rgba(217,119,6,0.9)';

  const positiveContextBg = isDark ? 'rgba(52,211,153,0.06)' : 'rgba(5,150,105,0.06)';
  const positiveContextBorder = isDark ? 'rgba(52,211,153,0.15)' : 'rgba(5,150,105,0.15)';
  const positiveContextIconColor = isDark ? '#34D399' : '#059669';
  const positiveContextTextColor = isDark ? 'rgba(52,211,153,0.85)' : 'rgba(5,150,105,0.9)';

  const positiveCardBorder = isDark ? 'rgba(52,211,153,0.1)' : 'rgba(5,150,105,0.1)';

  const neutralContextBg = isDark ? 'rgba(96,165,250,0.06)' : 'rgba(37,99,235,0.06)';
  const neutralContextBorder = isDark ? 'rgba(96,165,250,0.15)' : 'rgba(37,99,235,0.15)';
  const neutralContextIconColor = isDark ? '#60A5FA' : '#2563EB';
  const neutralContextTextColor = isDark ? 'rgba(96,165,250,0.88)' : 'rgba(37,99,235,0.9)';

  const inputFadeGradient = isDark
    ? ['transparent', 'rgba(6,6,10,0.96)', colors.bg]
    : ['transparent', 'rgba(246,246,248,0.96)', colors.bg];

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.bg }]}>
      <LinearGradient colors={[colors.bgGradient1, colors.bgGradient2, colors.bgGradient3] as any} style={StyleSheet.absoluteFill} />

      <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Ask</Text>
            <Text style={[styles.headerSub, { color: colors.textTertiary }]}>Food · Biomarkers · Body intelligence</Text>
          </View>
          <View style={[styles.liveBadge, { backgroundColor: colors.greenMuted, borderColor: colors.greenSoft }]}>
            <View style={[styles.liveDot, { backgroundColor: colors.green }]} />
            <Text style={[styles.liveText, { color: colors.green }]}>Live</Text>
          </View>
        </View>
      </Animated.View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.userRow, { opacity: msg1Opacity, transform: [{ translateY: msg1Slide }] }]}>
          <View style={styles.userStack}>
            <Image source={{ uri: SNACK_IMAGE }} style={styles.foodImage} resizeMode="cover" />
            <View style={[styles.userBubble, { backgroundColor: colors.userBubbleBg, borderColor: colors.userBubbleBorder }]}>
              <Text style={[styles.userText, { color: colors.textPrimary }]}>I want cookies and soda for breakfast — is this okay?</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.aiRow, { opacity: resp1Opacity, transform: [{ translateY: resp1Slide }] }]}>
          <View style={styles.aiModelTag}>
            <Text style={[styles.aiModelText, { color: colors.textTertiary }]}>Clariohealth · Metabolic Analysis</Text>
          </View>
          <View style={[styles.aiCard, { backgroundColor: colors.card, borderColor: colors.borderSubtle, shadowColor: colors.shadowColor }]}>
            <View style={styles.summaryRow}>
              <View style={[styles.summaryAccent, { backgroundColor: colors.red }]} />
              <Text style={[styles.summaryText, { color: colors.red }]}>
                Poor morning choice — cortisol + sugar crash is a rough combo.
              </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.borderSubtle }]} />

            <Text style={[styles.sectionLabel, { color: colors.textTertiary }]}>MORNING-SPECIFIC EFFECTS</Text>
            <BulletRow colors={colors} label="Cortisol interaction" value="Amplified crash (8–10am peak)" sentiment="negative" />
            <BulletRow colors={colors} label="Glucose spike" value="High (+40–55% on empty stomach)" sentiment="negative" />
            <BulletRow colors={colors} label="Insulin surge" value="Sharp — no protein/fat buffer" sentiment="negative" />
            <BulletRow colors={colors} label="Energy curve" value="30min spike → 90min crash" sentiment="negative" />

            <View style={[styles.divider, { backgroundColor: colors.borderSubtle }]} />

            <Text style={[styles.sectionLabel, { color: colors.textTertiary }]}>BLOOD MARKERS AFFECTED</Text>
            <BulletRow colors={colors} label="Blood glucose" value="Spike risk — currently trending high" sentiment="negative" />
            <BulletRow colors={colors} label="HbA1c" value="5.8% · Prediabetic threshold — this worsens it" sentiment="negative" />
            <BulletRow colors={colors} label="Triglycerides" value="Mild increase" sentiment="negative" />
            <BulletRow colors={colors} label="Insulin response" value="Sharp — no fiber/protein buffer" sentiment="negative" />
            <BulletRow colors={colors} label="Inflammation" value="Slight temporary rise" sentiment="neutral" />

            <View style={[styles.contextNote, { backgroundColor: negativeContextBg, borderColor: negativeContextBorder }]}>
              <Text style={[styles.contextIcon, { color: negativeContextIconColor }]}>◎</Text>
              <Text style={[styles.contextText, { color: negativeContextTextColor }]}>
                It's 8:42 AM — cortisol is naturally peaking. With your HbA1c at 5.8% (prediabetic range), this sugar load on an empty stomach is particularly risky for you right now.
              </Text>
            </View>

            <MiniBody highlight="pancreas" colors={colors} />

            <View style={styles.chipsWrap}>
              <SuggestionChip colors={colors} label="What if I add eggs first?" delay={900} />
              <SuggestionChip colors={colors} label="How long until glucose normalizes?" delay={1050} />
              <SuggestionChip colors={colors} label="Better breakfast swaps?" delay={1200} />
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.userRow, { opacity: msg2Opacity, transform: [{ translateY: msg2Slide }] }]}>
          <View style={styles.userStack}>
            <Image source={{ uri: SALMON_IMAGE }} style={styles.foodImage} resizeMode="cover" />
            <View style={[styles.userBubble, { backgroundColor: colors.userBubbleBg, borderColor: colors.userBubbleBorder }]}>
              <Text style={[styles.userText, { color: colors.textPrimary }]}>What about this meal?</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.aiRow, { opacity: resp2Opacity, transform: [{ translateY: resp2Slide }] }]}>
          <View style={styles.aiModelTag}>
            <Text style={[styles.aiModelText, { color: colors.textTertiary }]}>Clariohealth · Metabolic Analysis</Text>
          </View>
          <View style={[styles.aiCard, { backgroundColor: colors.card, borderColor: positiveCardBorder, shadowColor: colors.shadowColor }]}>
            <View style={styles.summaryRow}>
              <View style={[styles.summaryAccent, { backgroundColor: colors.green }]} />
              <Text style={[styles.summaryText, { color: colors.green }]}>
                Great choice — stable energy and metabolic support.
              </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.borderSubtle }]} />

            <Text style={[styles.sectionLabel, { color: colors.textTertiary }]}>METABOLIC IMPACT</Text>
            <BulletRow colors={colors} label="Glucose response" value="Stable" sentiment="positive" />
            <BulletRow colors={colors} label="Insulin load" value="Low" sentiment="positive" />
            <BulletRow colors={colors} label="Energy curve" value="Sustained release" sentiment="positive" />

            <View style={[styles.divider, { backgroundColor: colors.borderSubtle }]} />

            <Text style={[styles.sectionLabel, { color: colors.textTertiary }]}>BLOOD MARKERS SUPPORTED</Text>
            <BulletRow colors={colors} label="Blood glucose" value="Stable range" sentiment="positive" />
            <BulletRow colors={colors} label="Triglycerides" value="Neutral to positive" sentiment="positive" />
            <BulletRow colors={colors} label="HDL cholesterol" value="Supportive (salmon, avocado)" sentiment="positive" />
            <BulletRow colors={colors} label="Inflammation" value="Anti-inflammatory profile" sentiment="positive" />

            <View style={[styles.contextNote, { backgroundColor: positiveContextBg, borderColor: positiveContextBorder }]}>
              <Text style={[styles.contextIcon, { color: positiveContextIconColor }]}>◎</Text>
              <Text style={[styles.contextText, { color: positiveContextTextColor }]}>
                High omega-3 content supports cardiovascular and brain health.
              </Text>
            </View>

            <MiniBody highlight="heart" colors={colors} />

            <View style={styles.chipsWrap}>
              <SuggestionChip colors={colors} label="Best time to eat this?" delay={2200} />
              <SuggestionChip colors={colors} label="Will this help sleep?" delay={2350} />
              <SuggestionChip colors={colors} label="Ideal portion for my goals?" delay={2500} />
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.userRow, { opacity: msg3Opacity, transform: [{ translateY: msg3Slide }] }]}>
          <View style={styles.userStack}>
            <View style={[styles.userBubble, { backgroundColor: colors.userBubbleBg, borderColor: colors.userBubbleBorder }]}>
              <Text style={[styles.userText, { color: colors.textPrimary }]}>Why am I so tired in the afternoons even when I sleep 8 hours?</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.aiRow, { opacity: resp3Opacity, transform: [{ translateY: resp3Slide }] }]}>
          <View style={styles.aiModelTag}>
            <Text style={[styles.aiModelText, { color: colors.textTertiary }]}>Clariohealth · Recovery + Energy Analysis</Text>
          </View>
          <View style={[styles.aiCard, { backgroundColor: colors.card, borderColor: colors.borderSubtle, shadowColor: colors.shadowColor }]}>
            <View style={styles.summaryRow}>
              <View style={[styles.summaryAccent, { backgroundColor: colors.yellow }]} />
              <Text style={[styles.summaryText, { color: colors.textPrimary }]}>
                You're sleeping long — but not recovering. Deep sleep and iron are the bottleneck.
              </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.borderSubtle }]} />

            <Text style={[styles.sectionLabel, { color: colors.textTertiary }]}>WEARABLE DATA · LAST 7 NIGHTS</Text>
            <BulletRow colors={colors} label="Sleep duration" value="8h 12m avg — on target" sentiment="positive" />
            <BulletRow colors={colors} label="Deep sleep" value="42 min — 38% below your baseline" sentiment="negative" />
            <BulletRow colors={colors} label="REM sleep" value="1h 08m — slightly low" sentiment="neutral" />
            <BulletRow colors={colors} label="Overnight HRV" value="38 ms — down from 52 ms baseline" sentiment="negative" />
            <BulletRow colors={colors} label="Resting HR" value="68 bpm — +6 bpm vs. your norm" sentiment="negative" />

            <View style={[styles.divider, { backgroundColor: colors.borderSubtle }]} />

            <Text style={[styles.sectionLabel, { color: colors.textTertiary }]}>BLOODWORK CLUES</Text>
            <BulletRow colors={colors} label="Ferritin" value="28 ng/mL — low-normal (iron deficit)" sentiment="negative" />
            <BulletRow colors={colors} label="Vitamin D" value="24 ng/mL — deficient" sentiment="negative" />
            <BulletRow colors={colors} label="Fasting glucose" value="98 mg/dL — borderline" sentiment="neutral" />
            <BulletRow colors={colors} label="HbA1c" value="5.8% — post-lunch crash likely" sentiment="negative" />
            <BulletRow colors={colors} label="TSH" value="2.1 mIU/L — normal" sentiment="positive" />

            <View style={[styles.contextNote, { backgroundColor: neutralContextBg, borderColor: neutralContextBorder }]}>
              <Text style={[styles.contextIcon, { color: neutralContextIconColor }]}>◎</Text>
              <Text style={[styles.contextText, { color: neutralContextTextColor }]}>
                Your 2–4 PM slump aligns with three signals: low deep sleep (oxygen debt), low ferritin (reduced oxygen transport), and a post-lunch glucose dip from your HbA1c trajectory. Total sleep time is a poor proxy for recovery — your wearable shows the real story.
              </Text>
            </View>

            <View style={styles.chipsWrap}>
              <SuggestionChip colors={colors} label="How do I raise deep sleep?" delay={3500} />
              <SuggestionChip colors={colors} label="Should I supplement iron?" delay={3650} />
              <SuggestionChip colors={colors} label="Best afternoon snack for me?" delay={3800} />
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.userRow, { opacity: msg4Opacity, transform: [{ translateY: msg4Slide }] }]}>
          <View style={styles.userStack}>
            <View style={[styles.userBubble, { backgroundColor: colors.userBubbleBg, borderColor: colors.userBubbleBorder }]}>
              <Text style={[styles.userText, { color: colors.textPrimary }]}>How is my sleep quality affecting my HRV?</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.aiRow, { opacity: resp4Opacity, transform: [{ translateY: resp4Slide }] }]}>
          <View style={styles.aiModelTag}>
            <Text style={[styles.aiModelText, { color: colors.textTertiary }]}>Clariohealth · Autonomic Correlation</Text>
          </View>
          <View style={[styles.aiCard, { backgroundColor: colors.card, borderColor: colors.borderSubtle, shadowColor: colors.shadowColor }]}>
            <View style={styles.summaryRow}>
              <View style={[styles.summaryAccent, { backgroundColor: colors.red }]} />
              <Text style={[styles.summaryText, { color: colors.textPrimary }]}>
                Strong negative correlation — poor sleep drops your HRV by 28% the next day.
              </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.borderSubtle }]} />

            <Text style={[styles.sectionLabel, { color: colors.textTertiary }]}>14-DAY WEARABLE CORRELATION</Text>
            <BulletRow colors={colors} label="Baseline HRV" value="52 ms (30-day rolling)" sentiment="neutral" />
            <BulletRow colors={colors} label="Good sleep nights" value="HRV 54 ms · RHR 62 bpm" sentiment="positive" />
            <BulletRow colors={colors} label="Poor sleep nights" value="HRV 31 ms · RHR 68 bpm" sentiment="negative" />
            <BulletRow colors={colors} label={'Deep sleep <45 min'} value="HRV drops avg 18 ms next day" sentiment="negative" />
            <BulletRow colors={colors} label={'Late meals (>9pm)'} value="HRV –12 ms · resp rate +1.4" sentiment="negative" />

            <View style={[styles.divider, { backgroundColor: colors.borderSubtle }]} />

            <Text style={[styles.sectionLabel, { color: colors.textTertiary }]}>BLOODWORK REINFORCING THE PATTERN</Text>
            <BulletRow colors={colors} label="Morning cortisol" value="21 µg/dL — upper range" sentiment="negative" />
            <BulletRow colors={colors} label="hs-CRP" value="1.8 mg/L — mild inflammation" sentiment="negative" />
            <BulletRow colors={colors} label="Magnesium (RBC)" value="4.6 mg/dL — low-normal" sentiment="negative" />
            <BulletRow colors={colors} label="Testosterone" value="540 ng/dL — healthy" sentiment="positive" />

            <View style={[styles.contextNote, { backgroundColor: negativeContextBg, borderColor: negativeContextBorder }]}>
              <Text style={[styles.contextIcon, { color: negativeContextIconColor }]}>◎</Text>
              <Text style={[styles.contextText, { color: negativeContextTextColor }]}>
                Fragmented sleep is keeping your sympathetic system elevated overnight. High-normal cortisol, low magnesium, and short deep sleep are suppressing vagal tone — exactly what HRV measures. Fix deep sleep first; HRV follows within ~10 days.
              </Text>
            </View>

            <View style={styles.chipsWrap}>
              <SuggestionChip colors={colors} label="Show me my HRV trend" delay={4800} />
              <SuggestionChip colors={colors} label="Magnesium dose + timing?" delay={4950} />
              <SuggestionChip colors={colors} label="Ideal last-meal cutoff?" delay={5100} />
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.userRow, { opacity: msg5Opacity, transform: [{ translateY: msg5Slide }] }]}>
          <View style={styles.userStack}>
            <View style={[styles.userBubble, { backgroundColor: colors.userBubbleBg, borderColor: colors.userBubbleBorder }]}>
              <Text style={[styles.userText, { color: colors.textPrimary }]}>I want to have more energy by next month — what should I change?</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.aiRow, { opacity: resp5Opacity, transform: [{ translateY: resp5Slide }] }]}>
          <View style={styles.aiModelTag}>
            <Text style={[styles.aiModelText, { color: colors.textTertiary }]}>Clariohealth · 30-Day Protocol</Text>
          </View>
          <View style={[styles.aiCard, { backgroundColor: colors.card, borderColor: positiveCardBorder, shadowColor: colors.shadowColor }]}>
            <View style={styles.summaryRow}>
              <View style={[styles.summaryAccent, { backgroundColor: colors.green }]} />
              <Text style={[styles.summaryText, { color: colors.textPrimary }]}>
                Based on your labs + wearable data, 3 targeted shifts should lift energy 30–40% in 4 weeks.
              </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.borderSubtle }]} />

            <Text style={[styles.sectionLabel, { color: colors.textTertiary }]}>PRIORITY 1 · CORRECT DEFICIENCIES</Text>
            <BulletRow colors={colors} label="Vitamin D3" value="5,000 IU/day · retest in 6 weeks" sentiment="positive" />
            <BulletRow colors={colors} label="Iron bisglycinate" value="25 mg w/ vit C · target ferritin 70+" sentiment="positive" />
            <BulletRow colors={colors} label="Magnesium glycinate" value="300 mg · 1h before bed" sentiment="positive" />

            <View style={[styles.divider, { backgroundColor: colors.borderSubtle }]} />

            <Text style={[styles.sectionLabel, { color: colors.textTertiary }]}>PRIORITY 2 · FIX DEEP SLEEP</Text>
            <BulletRow colors={colors} label="Last meal" value="Finish by 7:30 PM — protects deep sleep" sentiment="positive" />
            <BulletRow colors={colors} label="Bedroom temp" value="65–67°F — confirmed by your HRV nights" sentiment="positive" />
            <BulletRow colors={colors} label="Alcohol" value="Cap at 2/week — –22% deep sleep per drink" sentiment="neutral" />

            <View style={[styles.divider, { backgroundColor: colors.borderSubtle }]} />

            <Text style={[styles.sectionLabel, { color: colors.textTertiary }]}>PRIORITY 3 · METABOLIC + AEROBIC BASE</Text>
            <BulletRow colors={colors} label="Zone 2 cardio" value="3×/week · 35 min — lifts HRV baseline" sentiment="positive" />
            <BulletRow colors={colors} label="Breakfast" value="30g protein — fixes afternoon crash" sentiment="positive" />
            <BulletRow colors={colors} label="Morning sunlight" value="10 min within 30 min of waking" sentiment="positive" />

            <View style={[styles.contextNote, { backgroundColor: positiveContextBg, borderColor: positiveContextBorder }]}>
              <Text style={[styles.contextIcon, { color: positiveContextIconColor }]}>◎</Text>
              <Text style={[styles.contextText, { color: positiveContextTextColor }]}>
                Projected in 30 days: HRV +8–12 ms · Deep sleep +25% · Afternoon fatigue –45% · Ferritin → 55 ng/mL · HbA1c trending to 5.5%. I'll re-check in 2 weeks and adjust.
              </Text>
            </View>

            <View style={styles.chipsWrap}>
              <SuggestionChip colors={colors} label="Add this to my daily plan" delay={6100} />
              <SuggestionChip colors={colors} label="Which labs to retest?" delay={6250} />
              <SuggestionChip colors={colors} label="Remind me at 7:30 PM daily" delay={6400} />
            </View>
          </View>
        </Animated.View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={[styles.inputWrapper, { paddingBottom: insets.bottom + 10 }]}>
        <LinearGradient
          colors={inputFadeGradient as any}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        <View style={[styles.inputBar, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, shadowColor: colors.shadowColor }]}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Camera size={18} color={colors.textTertiary} />
          </TouchableOpacity>
          <TextInput
            style={[styles.input, { color: colors.textPrimary }]}
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
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 12,
    fontWeight: '500' as const,
    marginTop: 2,
    letterSpacing: 0.1,
  },
  liveBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 5,
    borderWidth: 1,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '600' as const,
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
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
  },
  userText: {
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
    fontWeight: '500' as const,
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
  },
  aiCard: {
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    padding: 16,
    width: '96%',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 7,
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
    marginVertical: 12,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '600' as const,
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
    borderRadius: 10,
    padding: 10,
    gap: 8,
    marginTop: 12,
    borderWidth: 1,
  },
  contextIcon: {
    fontSize: 12,
    marginTop: 1,
  },
  contextText: {
    flex: 1,
    fontSize: 12,
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
  },
  silNeck: {
    width: 7,
    height: 6,
  },
  silTorso: {
    width: 28,
    height: 32,
    borderRadius: 4,
  },
  silLegs: {
    width: 20,
    height: 22,
    borderRadius: 3,
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
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignSelf: 'flex-start' as const,
    borderWidth: 1,
    gap: 4,
  },
  chipText: {
    fontSize: 12,
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
    borderRadius: 30,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderWidth: 1,
    gap: 2,
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
    paddingHorizontal: 6,
    paddingVertical: Platform.OS === 'web' ? 8 : 0,
    letterSpacing: 0.1,
  },
});
