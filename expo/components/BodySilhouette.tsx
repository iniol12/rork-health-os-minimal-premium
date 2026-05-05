import React from 'react';
import { View, StyleSheet, useWindowDimensions, Image } from 'react-native';
import { organs } from '@/mocks/organData';
import { useTheme } from '@/contexts/ThemeContext';
import OrganPointer from './OrganPointer';

interface BodySilhouetteProps {
  onOrganPress: (organId: string) => void;
  showPointers?: boolean;
}

const BODY_IMAGE_URI = 'https://r2-pub.rork.com/generated-images/a4a69afc-6344-4b89-8f6c-c6b66a7c40a1.png';

export default function BodySilhouette({ onOrganPress, showPointers = true }: BodySilhouetteProps) {
  const { width: screenWidth } = useWindowDimensions();
  const { isDark } = useTheme();
  const bodyWidth = Math.min(screenWidth * 0.82, 340);
  const bodyHeight = bodyWidth * 1.5;

  return (
    <View style={[styles.container, { width: bodyWidth, height: bodyHeight }]}>
      <View style={[
        styles.imageWrap,
        !isDark && styles.lightImageWrap,
      ]}>
        <Image
          source={{ uri: BODY_IMAGE_URI }}
          style={[
            styles.bodyImage,
            { width: bodyWidth, height: bodyHeight },
            !isDark && styles.lightBodyImage,
          ]}
          resizeMode="contain"
        />
      </View>

      {organs.map((organ) => (
        <OrganPointer
          key={organ.id}
          x={organ.position.x}
          y={organ.position.y}
          status={organ.status}
          name={organ.id}
          label={organ.name}
          score={organ.score}
          visible={showPointers}
          onPress={() => onOrganPress(organ.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center' as const,
    position: 'relative' as const,
  },
  imageWrap: {
    borderRadius: 20,
    overflow: 'hidden' as const,
  },
  lightImageWrap: {
    backgroundColor: 'transparent',
    borderRadius: 24,
  },
  bodyImage: {
    opacity: 0.95,
  },
  lightBodyImage: {
    opacity: 0.85,
  },
});
