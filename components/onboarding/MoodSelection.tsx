import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Text from '../common/Text';
import { Mood } from '@/types';
import { BorderRadius, Spacing } from '@/constants/Spacing';
import { Colors } from '@/constants/Colors';
import { moodOptions } from '@/data/mockData';

interface MoodSelectionProps {
  selectedMood?: Mood;
  onSelectMood: (mood: Mood) => void;
}

export default function MoodSelection({ selectedMood, onSelectMood }: MoodSelectionProps) {
  const { theme } = useTheme();
  
  const getMoodColor = (mood: Mood, isSelected: boolean) => {
    if (!isSelected) return theme.border;
    
    switch (mood.id) {
      case 'calm':
        return Colors.secondary[500];
      case 'energetic':
        return Colors.accent[500];
      case 'reflective':
        return Colors.primary[500];
      case 'sleepy':
        return Colors.warning[500];
      default:
        return Colors.primary[500];
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.segmentedControl}>
        {moodOptions.map((mood) => {
          const isSelected = selectedMood?.id === mood.id;
          const moodColor = getMoodColor(mood, isSelected);
          
          return (
            <View
              key={mood.id}
              style={[
                styles.moodSegment,
                {
                  backgroundColor: isSelected ? `${moodColor}20` : theme.card,
                  borderColor: moodColor,
                  width: `${100 / moodOptions.length - 2}%`,
                },
              ]}
              onTouchEnd={() => onSelectMood(mood)}
            >
              <Text
                variant="body"
                weight={isSelected ? 'semibold' : 'normal'}
                color={isSelected ? moodColor : theme.secondaryText}
                align="center"
              >
                {mood.name}
              </Text>
            </View>
          );
        })}
      </View>
      
      <View style={styles.moodDescription}>
        {selectedMood?.id === 'calm' && (
          <Text variant="body\" color={theme.secondaryText}>
            A peaceful state of mind, ideal for relaxation and unwinding.
          </Text>
        )}
        {selectedMood?.id === 'energetic' && (
          <Text variant="body" color={theme.secondaryText}>
            Full of energy and enthusiasm, ready to tackle tasks and stay motivated.
          </Text>
        )}
        {selectedMood?.id === 'reflective' && (
          <Text variant="body" color={theme.secondaryText}>
            Thoughtful and contemplative, perfect for introspection and mindfulness.
          </Text>
        )}
        {selectedMood?.id === 'sleepy' && (
          <Text variant="body" color={theme.secondaryText}>
            Ready for rest, winding down, and preparing for sleep.
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  segmentedControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  moodSegment: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodDescription: {
    padding: Spacing.md,
    backgroundColor: Colors.neutral[100],
    borderRadius: BorderRadius.md,
  },
});