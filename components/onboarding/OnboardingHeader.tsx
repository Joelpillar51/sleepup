import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Text from '../common/Text';
import { Spacing } from '@/constants/Spacing';

interface OnboardingHeaderProps {
  title: string;
  subtitle?: string;
  step?: number;
  totalSteps?: number;
}

export default function OnboardingHeader({
  title,
  subtitle,
  step,
  totalSteps,
}: OnboardingHeaderProps) {
  const { theme } = useTheme();
  
  return (
    <View style={styles.container}>
      {step !== undefined && totalSteps !== undefined && (
        <View style={styles.stepContainer}>
          <Text variant="body-sm" color={theme.secondaryText} style={styles.stepText}>
            Step {step} of {totalSteps}
          </Text>
          <View style={styles.progressContainer}>
            {Array.from({ length: totalSteps }, (_, i) => (
              <View
                key={i}
                style={[
                  styles.progressStep,
                  {
                    backgroundColor: i < step ? theme.tint : theme.border,
                    width: `${100 / totalSteps - 2}%`,
                  },
                ]}
              />
            ))}
          </View>
        </View>
      )}
      
      <Text variant="h2" style={styles.title}>
        {title}
      </Text>
      
      {subtitle && (
        <Text
          variant="body"
          color={theme.secondaryText}
          style={styles.subtitle}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  stepContainer: {
    marginBottom: Spacing.md,
  },
  stepText: {
    marginBottom: Spacing.xs,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressStep: {
    height: 4,
    borderRadius: 2,
  },
  title: {
    marginBottom: Spacing.xs,
  },
  subtitle: {
    marginTop: Spacing.xs,
  },
});