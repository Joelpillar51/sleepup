import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Text from '../common/Text';
import Card from '../common/Card';
import { Spacing } from '@/constants/Spacing';
import { Colors } from '@/constants/Colors';
import { formatDuration } from '@/utils/formatTime';
import AudioPlayer from '../audio/AudioPlayer';
import Button from '../common/Button';
import { useAppState } from '@/hooks/useAppState';
import { Sound } from '@/types';
import { generateRandomSound } from '@/data/mockData';

interface SoundGenerationProps {
  isGenerating: boolean;
  onComplete: (sound: Sound) => void;
  onRegenerate: () => void;
  onSave: (sound: Sound) => void;
  goalId?: string;
  moodId?: string;
  ageRangeId?: string;
  preferences: string[];
  generatedSound?: Sound;
}

export default function SoundGeneration({
  isGenerating,
  onComplete,
  onRegenerate,
  onSave,
  goalId,
  moodId,
  ageRangeId,
  preferences,
  generatedSound,
}: SoundGenerationProps) {
  const { theme } = useTheme();
  const { playSound } = useAppState();
  const [opacity] = useState(new Animated.Value(0));
  const [progress] = useState(new Animated.Value(0));
  const [animatedDots, setAnimatedDots] = useState('...');
  
  // Quotes for the loading state
  const quotes = [
    "Tuning frequencies to match your mood...",
    "Breathing space is coming...",
    "Crafting your sonic sanctuary...",
    "Harmonizing elements just for you...",
    "Capturing the perfect sound palette...",
  ];
  
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  useEffect(() => {
    let dotsInterval: NodeJS.Timeout;
    
    if (isGenerating) {
      // Animate progress bar
      Animated.timing(progress, {
        toValue: 1,
        duration: 4000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();
      
      // Animate dots
      dotsInterval = setInterval(() => {
        setAnimatedDots((dots) => {
          if (dots.length >= 3) return '.';
          return dots + '.';
        });
      }, 500);
      
      // Generate sound after a delay (simulating AI generation)
      const timeout = setTimeout(() => {
        if (goalId && moodId && ageRangeId) {
          const sound = generateRandomSound(goalId, moodId, ageRangeId, preferences);
          onComplete(sound);
        }
      }, 4000);
      
      return () => {
        clearTimeout(timeout);
        clearInterval(dotsInterval);
      };
    } else if (generatedSound) {
      // Fade in generated sound
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    
    return () => {
      if (dotsInterval) clearInterval(dotsInterval);
    };
  }, [isGenerating, generatedSound]);
  
  if (isGenerating) {
    return (
      <View style={styles.generatingContainer}>
        <Text variant="h3" style={styles.generatingTitle}>
          Generating Your Sound{animatedDots}
        </Text>
        
        <Text
          variant="body"
          color={theme.secondaryText}
          align="center"
          style={styles.quote}
        >
          "{randomQuote}"
        </Text>
        
        <View style={styles.progressContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                backgroundColor: Colors.primary[500],
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
      </View>
    );
  }
  
  if (generatedSound) {
    return (
      <Animated.View style={[styles.resultContainer, { opacity }]}>
        <Text variant="h3" style={styles.resultTitle}>
          Your Sound is Ready
        </Text>
        
        <Card style={styles.resultCard}>
          <Text variant="h4" align="center" style={styles.soundTitle}>
            {generatedSound.title}
          </Text>
          
          <Text
            variant="body-sm"
            color={theme.secondaryText}
            align="center"
            style={styles.soundDuration}
          >
            {formatDuration(generatedSound.duration)}
          </Text>
          
          <View style={styles.audioPlayerContainer}>
            <AudioPlayer sound={generatedSound} />
          </View>
          
          <View style={styles.actionButtons}>
            <Button
              title="Regenerate"
              variant="outline"
              style={styles.actionButton}
              onPress={onRegenerate}
            />
            <Button
              title="Save to Playlist"
              style={styles.actionButton}
              onPress={() => onSave(generatedSound)}
            />
          </View>
        </Card>
      </Animated.View>
    );
  }
  
  return null;
}

const styles = StyleSheet.create({
  generatingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  generatingTitle: {
    marginBottom: Spacing.lg,
  },
  quote: {
    marginBottom: Spacing.xl,
  },
  progressContainer: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.neutral[200],
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  resultContainer: {
    marginBottom: Spacing.xl,
  },
  resultTitle: {
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  resultCard: {
    padding: Spacing.lg,
  },
  soundTitle: {
    marginBottom: Spacing.xs,
  },
  soundDuration: {
    marginBottom: Spacing.lg,
  },
  audioPlayerContainer: {
    marginBottom: Spacing.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: Spacing.xs,
  },
});