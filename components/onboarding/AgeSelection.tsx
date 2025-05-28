import React from 'react';
import { View, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Text from '../common/Text';
import { AgeRange } from '@/types';
import { BorderRadius, Spacing } from '@/constants/Spacing';
import { Colors } from '@/constants/Colors';
import { ageRanges } from '@/data/mockData';

interface AgeSelectionProps {
  selectedAgeRange?: AgeRange;
  forSomeoneElse: boolean;
  onSelectAgeRange: (ageRange: AgeRange) => void;
  onToggleForSomeoneElse: (value: boolean) => void;
}

export default function AgeSelection({
  selectedAgeRange,
  forSomeoneElse,
  onSelectAgeRange,
  onToggleForSomeoneElse,
}: AgeSelectionProps) {
  const { theme } = useTheme();
  
  return (
    <View style={styles.container}>
      <View style={styles.ageChips}>
        {ageRanges.map((ageRange) => {
          const isSelected = selectedAgeRange?.id === ageRange.id;
          
          return (
            <TouchableOpacity
              key={ageRange.id}
              style={[
                styles.ageChip,
                {
                  backgroundColor: isSelected ? Colors.primary[600] : theme.card,
                  borderColor: isSelected ? Colors.primary[600] : theme.border,
                },
              ]}
              onPress={() => onSelectAgeRange(ageRange)}
            >
              <Text
                variant="body"
                weight="medium"
                color={isSelected ? '#FFFFFF' : theme.text}
              >
                {ageRange.name} ({ageRange.range})
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      <View style={styles.toggleContainer}>
        <Text variant="body">I'm creating for someone else</Text>
        <Switch
          value={forSomeoneElse}
          onValueChange={onToggleForSomeoneElse}
          trackColor={{ false: theme.border, true: Colors.primary[600] }}
          thumbColor="#FFFFFF"
        />
      </View>
      
      {forSomeoneElse && (
        <View style={styles.infoBox}>
          <Text variant="body-sm" color={theme.secondaryText}>
            We'll optimize sound generation for the selected age range while considering that you're creating for someone else.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  ageChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.lg,
  },
  ageChip: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  infoBox: {
    padding: Spacing.md,
    backgroundColor: Colors.neutral[100],
    borderRadius: BorderRadius.md,
  },
});