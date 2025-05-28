import React from 'react';
import { View, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Container from '@/components/common/Container';
import Text from '@/components/common/Text';
import Button from '@/components/common/Button';
import { Spacing } from '@/constants/Spacing';
import { Colors } from '@/constants/Colors';

export default function WelcomeScreen() {
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  
  return (
    <LinearGradient
      colors={[Colors.primary[800], Colors.secondary[900]]}
      style={styles.gradient}
    >
      <Container
        style={styles.container}
        safeArea
        padding={0}
      >
        <View style={[styles.content, isPortrait ? styles.contentPortrait : styles.contentLandscape]}>
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg' }}
              style={styles.logoBackground}
            />
            <View style={styles.logoTextContainer}>
              <Text
                variant="h1"
                weight="bold"
                color="#FFFFFF"
                style={styles.logo}
              >
                Realmode
              </Text>
              <Text
                variant="h4"
                color="#FFFFFF"
                style={styles.tagline}
              >
                Your Personal Sound Sanctuary
              </Text>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <Button
              title="Try Free"
              size="lg"
              style={[styles.button, styles.secondaryButton]}
              onPress={() => router.push('/(tabs)')}
            />
            <Button
              title="Generate First Sound"
              size="lg"
              style={styles.button}
              onPress={() => router.push('/onboarding')}
            />
          </View>
        </View>
      </Container>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    padding: Spacing.xl,
  },
  contentPortrait: {
    justifyContent: 'space-between',
    flex: 1,
  },
  contentLandscape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing['3xl'],
  },
  logoBackground: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: Spacing.lg,
    opacity: 0.9,
  },
  logoTextContainer: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    marginBottom: Spacing.xs,
  },
  tagline: {
    opacity: 0.9,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    marginBottom: Spacing.md,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});