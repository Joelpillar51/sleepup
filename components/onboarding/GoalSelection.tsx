import React from 'react';
import { View, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Text from '../common/Text';
import { SoundGoal } from '@/types';
import { BorderRadius, Spacing } from '@/constants/Spacing';
import { soundGoals } from '@/data/mockData';

interface GoalSelectionProps {
  selectedGoal?: SoundGoal;
  onSelectGoal: (goal: SoundGoal) => void;
}

export default function GoalSelection({ selectedGoal, onSelectGoal }: GoalSelectionProps) {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  
  // Calculate how many buttons per row based on screen width
  const buttonsPerRow = width > 600 ? 3 : 2;
  
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {soundGoals.map((goal) => {
          const isSelected = selectedGoal?.id === goal.id;
          
          return (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.goalButton,
                {
                  backgroundColor: isSelected ? `${goal.color}20` : theme.card,
                  borderColor: isSelected ? goal.color : theme.border,
                  width: `${100 / buttonsPerRow - 4}%`,
                },
              ]}
              onPress={() => onSelectGoal(goal)}
            >
              <Text variant="h2" style={styles.emoji}>
                {goal.emoji}
              </Text>
              <Text
                variant="body"
                weight={isSelected ? 'semibold' : 'normal'}
                color={isSelected ? goal.color : theme.text}
              >
                {goal.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  goalButton: {
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  emoji: {
    fontSize: 36,
    marginBottom: Spacing.sm,
  },
});