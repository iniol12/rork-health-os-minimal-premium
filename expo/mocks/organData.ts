import { OrganStatus } from '@/constants/colors';

export interface OrganMetric {
  id: string;
  name: string;
  value: string;
  status: 'optimal' | 'normal' | 'elevated' | 'high' | 'low';
  statusLabel: string;
  whatIsThis: string;
  whatYoursMeans: string;
  whyItMatters: string;
}

export interface Contributor {
  id: string;
  label: string;
  source: string;
  value: string;
  direction: 'helping' | 'hurting';
  impact: 'high' | 'medium' | 'low';
  reason: string;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  impact: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface OrganData {
  id: string;
  name: string;
  score: number;
  status: OrganStatus;
  trend: number;
  trendPeriod: string;
  position: { x: number; y: number };
  metrics: OrganMetric[];
  contributors: Contributor[];
  suggestions: Suggestion[];
  summary: string;
}

export const organs: OrganData[] = [
  {
    id: 'brain',
    name: 'Brain',
    score: 71,
    status: 'watch',
    trend: -3,
    trendPeriod: '30 days',
    position: { x: 50, y: 5 },
    metrics: [
      {
        id: 'sleep-duration',
        name: 'Sleep Duration',
        value: '5h 40m avg',
        status: 'low',
        statusLabel: 'Below target',
        whatIsThis: 'Average total sleep time per night over the past 14 days.',
        whatYoursMeans: 'You\'re averaging well below the recommended 7\u20139 hours, which impairs cognitive recovery.',
        whyItMatters: 'Chronic short sleep accelerates cognitive decline and increases dementia risk.',
      },
      {
        id: 'deep-sleep',
        name: 'Deep Sleep',
        value: '38 min',
        status: 'low',
        statusLabel: 'Low',
        whatIsThis: 'Time spent in slow-wave (N3) sleep, critical for memory consolidation.',
        whatYoursMeans: 'Your deep sleep is below the 60\u201390 minute target for optimal brain restoration.',
        whyItMatters: 'Deep sleep clears metabolic waste from the brain and strengthens neural pathways.',
      },
      {
        id: 'hrv-brain',
        name: 'HRV (Cognitive)',
        value: '32 ms',
        status: 'low',
        statusLabel: 'Low',
        whatIsThis: 'Heart rate variability as a proxy for autonomic nervous system balance.',
        whatYoursMeans: 'Low HRV suggests elevated stress load, which impacts focus and mental clarity.',
        whyItMatters: 'Higher HRV correlates with better cognitive flexibility and emotional regulation.',
      },
      {
        id: 'screen-time',
        name: 'Evening Screen Time',
        value: '3.2 hrs',
        status: 'high',
        statusLabel: 'Elevated',
        whatIsThis: 'Screen exposure within 3 hours of bedtime.',
        whatYoursMeans: 'High evening screen time suppresses melatonin and delays sleep onset.',
        whyItMatters: 'Blue light exposure before bed reduces sleep quality and next-day cognitive performance.',
      },
    ],
    contributors: [
      { id: 'c1', label: 'Late bedtime', source: 'Sleep Tracker', value: '1:20 AM avg', direction: 'hurting', impact: 'high', reason: 'Inconsistent late bedtimes fragment circadian rhythm and reduce deep sleep.' },
      { id: 'c2', label: 'Low deep sleep', source: 'Oura Ring', value: '38 min avg', direction: 'hurting', impact: 'high', reason: 'Insufficient deep sleep impairs memory consolidation and brain detoxification.' },
      { id: 'c3', label: 'Screen before bed', source: 'Screen Time', value: '3.2 hrs', direction: 'hurting', impact: 'medium', reason: 'Night screen exposure delays melatonin release by 30\u201360 minutes.' },
      { id: 'c4', label: 'Exercise frequency', source: 'Apple Watch', value: '2\u00d7/week', direction: 'helping', impact: 'low', reason: 'Regular exercise promotes BDNF production and neuroplasticity.' },
    ],
    suggestions: [
      { id: 's1', title: 'Set a fixed sleep window', description: 'Go to bed by 11:30 PM and wake at 7:00 AM consistently', impact: '+4 to +7 brain score', difficulty: 'medium' },
      { id: 's2', title: 'No screens 45 min before bed', description: 'Switch to reading, stretching, or journaling', impact: '+3 to +5 score', difficulty: 'easy' },
      { id: 's3', title: 'Morning sunlight exposure', description: '10\u201315 minutes of outdoor light within 1 hour of waking', impact: '+2 to +4 score', difficulty: 'easy' },
      { id: 's4', title: 'Increase exercise to 4\u00d7/week', description: 'Add 2 more sessions of moderate activity', impact: '+3 to +5 score', difficulty: 'medium' },
    ],
    summary: 'Your brain score is mainly affected by chronically short sleep, low deep sleep percentage, and high evening screen time. Setting a consistent sleep window and reducing pre-bed screen exposure should meaningfully improve cognitive recovery over the next 3\u20134 weeks.',
  },
  {
    id: 'heart',
    name: 'Heart',
    score: 62,
    status: 'attention',
    trend: -6,
    trendPeriod: '30 days',
    position: { x: 53, y: 29 },
    metrics: [
      {
        id: 'blood-pressure',
        name: 'Blood Pressure',
        value: '140/60',
        status: 'high',
        statusLabel: 'High',
        whatIsThis: 'Blood pressure is the force of blood pushing against artery walls.',
        whatYoursMeans: 'Your systolic value is elevated, which increases long-term cardiovascular risk.',
        whyItMatters: 'High blood pressure is one of the strongest predictors of heart disease.',
      },
      {
        id: 'resting-hr',
        name: 'Resting HR',
        value: '84 bpm',
        status: 'elevated',
        statusLabel: 'Elevated',
        whatIsThis: 'Your heart rate at complete rest, measured over sleep and sedentary periods.',
        whatYoursMeans: 'Resting HR above 75 suggests reduced cardiovascular efficiency.',
        whyItMatters: 'Lower resting HR is associated with better heart health and longer lifespan.',
      },
      {
        id: 'hrv',
        name: 'HRV',
        value: '28 ms',
        status: 'low',
        statusLabel: 'Low',
        whatIsThis: 'Heart rate variability measures the variation in time between heartbeats.',
        whatYoursMeans: 'Low HRV indicates elevated stress and reduced cardiovascular adaptability.',
        whyItMatters: 'Higher HRV is linked to better stress resilience and cardiovascular health.',
      },
      {
        id: 'vo2max',
        name: 'VO2 Max',
        value: '34 ml/kg/min',
        status: 'low',
        statusLabel: 'Below average',
        whatIsThis: 'Maximum oxygen consumption during exercise \u2014 a key marker of aerobic fitness.',
        whatYoursMeans: 'Your VO2 max is below average for your age group, indicating limited cardio conditioning.',
        whyItMatters: 'VO2 max is one of the strongest predictors of all-cause mortality.',
      },
    ],
    contributors: [
      { id: 'c1', label: 'Daily steps', source: 'Apple Watch', value: '1,200/day', direction: 'hurting', impact: 'medium', reason: 'Low daily movement reduces cardiovascular conditioning.' },
      { id: 'c2', label: 'Diet pattern', source: 'Self-reported', value: 'Frequent eating out', direction: 'hurting', impact: 'high', reason: 'High sodium restaurant meals increase blood pressure.' },
      { id: 'c3', label: 'Sleep duration', source: 'Oura Ring', value: '5h 40m avg', direction: 'hurting', impact: 'medium', reason: 'Short sleep increases resting heart rate and stress load.' },
      { id: 'c4', label: 'Alcohol intake', source: 'Self-reported', value: '8 drinks/week', direction: 'hurting', impact: 'medium', reason: 'Regular alcohol consumption raises blood pressure.' },
    ],
    suggestions: [
      { id: 's1', title: 'Reduce eating out frequency', description: 'Limit restaurant meals to 2\u00d7/week', impact: '+5 to +8 heart score', difficulty: 'medium' },
      { id: 's2', title: 'Increase daily steps', description: 'Move from 1,200 \u2192 6,000/day over 4 weeks', impact: '+4 to +6 score', difficulty: 'easy' },
      { id: 's3', title: 'Add zone 2 cardio', description: '30 min brisk walk or light jog, 3\u00d7 per week', impact: '+6 to +10 score', difficulty: 'medium' },
      { id: 's4', title: 'Reduce alcohol to 3 drinks/week', description: 'Gradual reduction over 2 weeks', impact: '+3 to +5 score', difficulty: 'hard' },
    ],
    summary: 'Your heart score is mainly affected by high blood pressure, low daily movement, and frequent high-sodium meals. Improving steps, reducing eating out, and adding light cardio will likely raise your score over the next 4\u20136 weeks.',
  },
  {
    id: 'lungs',
    name: 'Lungs',
    score: 78,
    status: 'watch',
    trend: 2,
    trendPeriod: '30 days',
    position: { x: 39, y: 26 },
    metrics: [
      { id: 'resp-rate', name: 'Respiratory Rate', value: '16 br/min', status: 'normal', statusLabel: 'Normal', whatIsThis: 'Breaths per minute at rest.', whatYoursMeans: 'Your respiratory rate is within healthy range.', whyItMatters: 'Elevated respiratory rate can indicate stress or respiratory compromise.' },
      { id: 'spo2', name: 'SpO2', value: '97%', status: 'optimal', statusLabel: 'Optimal', whatIsThis: 'Blood oxygen saturation level.', whatYoursMeans: 'Your oxygen levels are healthy and well-maintained.', whyItMatters: 'Consistent oxygen saturation supports cellular function across all organs.' },
      { id: 'vo2-lung', name: 'VO2 Max', value: '34 ml/kg/min', status: 'low', statusLabel: 'Below average', whatIsThis: 'Peak oxygen uptake during exercise.', whatYoursMeans: 'Limited aerobic capacity suggests room for improvement in lung conditioning.', whyItMatters: 'Higher VO2 max improves oxygen delivery efficiency.' },
    ],
    contributors: [
      { id: 'c1', label: 'Cardio frequency', source: 'Apple Watch', value: '1\u00d7/week', direction: 'hurting', impact: 'medium', reason: 'Low aerobic training limits lung capacity development.' },
      { id: 'c2', label: 'Air quality', source: 'Environment', value: 'AQI 42', direction: 'helping', impact: 'low', reason: 'Good air quality supports respiratory health.' },
    ],
    suggestions: [
      { id: 's1', title: 'Add breathing exercises', description: 'Box breathing 5 min daily', impact: '+2 to +3 score', difficulty: 'easy' },
      { id: 's2', title: 'Increase cardio sessions', description: 'Build to 3\u00d7 per week zone 2 training', impact: '+4 to +6 score', difficulty: 'medium' },
    ],
    summary: 'Your lung function is generally healthy with good oxygen saturation. Increasing aerobic exercise frequency would meaningfully improve your overall respiratory capacity and VO2 max.',
  },
  {
    id: 'liver',
    name: 'Liver',
    score: 68,
    status: 'watch',
    trend: -2,
    trendPeriod: '30 days',
    position: { x: 42, y: 37 },
    metrics: [
      { id: 'alt', name: 'ALT', value: '42 U/L', status: 'elevated', statusLabel: 'Slightly elevated', whatIsThis: 'Alanine aminotransferase, an enzyme indicating liver cell health.', whatYoursMeans: 'Mildly elevated ALT may suggest liver stress from diet or alcohol.', whyItMatters: 'Persistently elevated ALT can indicate fatty liver or inflammation.' },
      { id: 'ggt', name: 'GGT', value: '55 U/L', status: 'elevated', statusLabel: 'Elevated', whatIsThis: 'Gamma-glutamyl transferase, sensitive to alcohol and bile duct issues.', whatYoursMeans: 'Elevated GGT often reflects alcohol intake or metabolic stress.', whyItMatters: 'GGT is a strong predictor of metabolic syndrome and liver disease.' },
    ],
    contributors: [
      { id: 'c1', label: 'Alcohol intake', source: 'Self-reported', value: '8 drinks/week', direction: 'hurting', impact: 'high', reason: 'Regular alcohol stresses liver detoxification pathways.' },
      { id: 'c2', label: 'Processed food', source: 'Diet log', value: '5\u00d7/week', direction: 'hurting', impact: 'medium', reason: 'High processed food intake increases liver fat accumulation.' },
    ],
    suggestions: [
      { id: 's1', title: 'Reduce alcohol intake', description: 'Limit to 3 or fewer drinks per week', impact: '+5 to +8 score', difficulty: 'hard' },
      { id: 's2', title: 'Add liver-supporting foods', description: 'Cruciferous vegetables, garlic, green tea daily', impact: '+2 to +4 score', difficulty: 'easy' },
    ],
    summary: 'Your liver markers are mildly elevated, primarily driven by regular alcohol consumption and processed food intake. Reducing alcohol and improving diet quality should show improvement within 6\u20138 weeks.',
  },
  {
    id: 'gut',
    name: 'Gut',
    score: 58,
    status: 'attention',
    trend: -4,
    trendPeriod: '30 days',
    position: { x: 50, y: 46 },
    metrics: [
      { id: 'fiber', name: 'Fiber Intake', value: '12g/day', status: 'low', statusLabel: 'Low', whatIsThis: 'Daily dietary fiber from food sources.', whatYoursMeans: 'You\'re consuming less than half the recommended 25\u201330g daily.', whyItMatters: 'Fiber fuels beneficial gut bacteria and supports digestive regularity.' },
      { id: 'diversity', name: 'Diet Diversity', value: '14 foods/week', status: 'low', statusLabel: 'Below target', whatIsThis: 'Number of unique whole foods consumed weekly.', whatYoursMeans: 'Low food diversity limits microbiome variety.', whyItMatters: 'Greater dietary diversity correlates with a healthier, more resilient gut microbiome.' },
    ],
    contributors: [
      { id: 'c1', label: 'Processed food frequency', source: 'Diet log', value: '5\u00d7/week', direction: 'hurting', impact: 'high', reason: 'Processed foods disrupt gut bacteria balance and increase inflammation.' },
      { id: 'c2', label: 'Fiber intake', source: 'Diet log', value: '12g/day', direction: 'hurting', impact: 'high', reason: 'Low fiber starves beneficial gut bacteria.' },
      { id: 'c3', label: 'Stress levels', source: 'HRV data', value: 'Elevated', direction: 'hurting', impact: 'medium', reason: 'Chronic stress alters gut motility and microbiome composition.' },
    ],
    suggestions: [
      { id: 's1', title: 'Increase fiber to 25g/day', description: 'Add beans, lentils, vegetables, and whole grains gradually', impact: '+6 to +10 score', difficulty: 'medium' },
      { id: 's2', title: 'Eat 30 different plants/week', description: 'Include herbs, spices, nuts, seeds, and grains', impact: '+4 to +6 score', difficulty: 'medium' },
      { id: 's3', title: 'Reduce processed meals', description: 'Cook at home 5\u00d7/week minimum', impact: '+3 to +5 score', difficulty: 'medium' },
    ],
    summary: 'Your gut score is low due to insufficient fiber, limited dietary diversity, and frequent processed food intake. Gradually increasing fiber and plant variety should significantly improve gut health within 4\u20136 weeks.',
  },
];

export function getOrganById(id: string): OrganData | undefined {
  return organs.find(o => o.id === id);
}

export function getOverallScore(): number {
  const total = organs.reduce((sum, o) => sum + o.score, 0);
  return Math.round(total / organs.length);
}
