import React from 'react';
import { View, StyleSheet, useWindowDimensions, Image } from 'react-native';
import { organs } from '@/mocks/organData';
import OrganPointer from './OrganPointer';

interface BodySilhouetteProps {
  onOrganPress: (organId: string) => void;
}

const BODY_IMAGE_URI = 'https://r2-pub.rork.com/generated-images/0d759d70-e78c-45a9-b420-ff4a6021ca35.png';

export default function BodySilhouette({ onOrganPress }: BodySilhouetteProps) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const bodyWidth = Math.min(screenWidth * 0.82, 340);
  const bodyHeight = bodyWidth * 1.5;

  return (
    <View style={[styles.container, { width: bodyWidth, height: bodyHeight }]}>
      <Image
        source={{ uri: BODY_IMAGE_URI }}
        style={[styles.bodyImage, { width: bodyWidth, height: bodyHeight }]}
        resizeMode="contain"
      />

      {organs.map((organ) => (
        <OrganPointer
          key={organ.id}
          x={organ.position.x}
          y={organ.position.y}
          status={organ.status}
          name={organ.id}
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
  bodyImage: {
    opacity: 0.95,
  },
});
