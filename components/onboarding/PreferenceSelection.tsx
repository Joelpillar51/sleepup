import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Text from '../common/Text';
import { SoundPreference, SoundPreset } from '@/types';
import { BorderRadius, Spacing } from '@/constants/Spacing';
import { Colors } from '@/constants/Colors';
import { soundPreferences, soundPresets } from '@/data/mockData';

interface PreferenceSelectionProps {
  selectedPreferences: string[];
  onSelectPreference: (preferenceId: string) => void;
  onSelectPreset: (presetIds: string[]) => void;
}

export default function PreferenceSelection({
  selectedPreferences,
  onSelectPreference,
  onSelectPreset,
}: PreferenceSelectionProps) {
  const { theme } = useTheme();
  
  return (
    <View style={styles.container}>
      <Text variant="h4" style={styles.sectionTitle}>
        Sound Elements
      </Text>
      
      <View style={styles.preferencesContainer}>
        {soundPreferences.map((preference) => {
          const isSelected = selectedPreferences.includes(preference.id);
          
          return (
            <TouchableOpacity
              key={preference.id}
              style={[
                styles.preferenceChip,
                {
                  backgroundColor: isSelected ? Colors.primary[600] : theme.card,
                  borderColor: isSelected ? Colors.primary[600] : theme.border,
                },
              ]}
              onPress={() => onSelectPreference(preference.id)}
            >
              <Text
                variant="body"
                color={isSelected ? '#FFFFFF' : theme.text}
              >
                {preference.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      <Text variant="h4" style={styles.sectionTitle}>
        Presets
      </Text>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.presetsContainer}
      >
        {soundPresets.map((preset) => (
          <TouchableOpacity
            key={preset.id}
            style={[
              styles.presetCard,
              { backgroundColor: Colors.secondary[50], borderColor: Colors.secondary[200] },
            ]}
            onPress={() => onSelectPreset(preset.preferences)}
          >
            <Text variant="body" weight="semibold" color={Colors.secondary[800]}>
              {preset.name}
            </Text>
            <View style={styles.presetPreferences}>
              {preset.preferences.map((prefId) => {
                const preference = soundPreferences.find((p) => p.id === prefId);
                
                return (
                  <Text key={prefId} variant="caption" color={Colors.secondary[600]}>
                    {preference?.name}
                    {preset.preferences.indexOf(prefId) < preset.preferences.length - 1 ? ', ' : ''}
                  </Text>
                );
              })}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  preferencesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.xl,
  },
  preferenceChip: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  presetsContainer: {
    paddingBottom: Spacing.md,
  },
  presetCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginRight: Spacing.md,
    width: 150,
  },
  presetPreferences: {
    marginTop: Spacing.xs,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});