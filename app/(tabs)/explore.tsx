import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Filter } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAppState } from '@/hooks/useAppState';
import Container from '@/components/common/Container';
import Text from '@/components/common/Text';
import Button from '@/components/common/Button';
import SoundCard from '@/components/audio/SoundCard';
import AudioPlayer from '@/components/audio/AudioPlayer';
import { BorderRadius, Spacing } from '@/constants/Spacing';
import { Colors } from '@/constants/Colors';
import { soundGoals, moodOptions, ageRanges } from '@/data/mockData';

export default function ExploreScreen() {
  const { theme } = useTheme();
  const { sounds, player } = useAppState();
  
  const [activeFilters, setActiveFilters] = useState({
    goal: '',
    mood: '',
    ageRange: '',
  });
  
  // Filter sounds
  const filteredSounds = sounds.filter((sound) => {
    if (activeFilters.goal && sound.goalId !== activeFilters.goal) return false;
    if (activeFilters.mood && sound.moodId !== activeFilters.mood) return false;
    if (activeFilters.ageRange && sound.ageRangeId !== activeFilters.ageRange) return false;
    return true;
  });
  
  const toggleFilter = (type: 'goal' | 'mood' | 'ageRange', value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? '' : value,
    }));
  };
  
  return (
    <Container safeArea>
      <View style={styles.header}>
        <Text variant="h2">Explore</Text>
        <Text variant="body" color={theme.secondaryText}>
          Discover and filter sounds
        </Text>
      </View>
      
      <View style={styles.filterSection}>
        <View style={styles.filterHeader}>
          <Text variant="h4">Filters</Text>
          <TouchableOpacity
            onPress={() => setActiveFilters({ goal: '', mood: '', ageRange: '' })}
          >
            <Text variant="body-sm" color={Colors.primary[600]}>
              Clear all
            </Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          <View style={styles.filterGroup}>
            <Text variant="body-sm" color={theme.secondaryText} style={styles.filterLabel}>
              Goal
            </Text>
            <View style={styles.filterOptions}>
              {soundGoals.map((goal) => (
                <TouchableOpacity
                  key={goal.id}
                  style={[
                    styles.filterChip,
                    {
                      backgroundColor:
                        activeFilters.goal === goal.id
                          ? `${goal.color}20`
                          : Colors.neutral[100],
                      borderColor:
                        activeFilters.goal === goal.id ? goal.color : Colors.neutral[100],
                    },
                  ]}
                  onPress={() => toggleFilter('goal', goal.id)}
                >
                  <Text
                    variant="body-sm"
                    color={activeFilters.goal === goal.id ? goal.color : theme.secondaryText}
                  >
                    {goal.emoji} {goal.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.filterGroup}>
            <Text variant="body-sm" color={theme.secondaryText} style={styles.filterLabel}>
              Mood
            </Text>
            <View style={styles.filterOptions}>
              {moodOptions.map((mood) => (
                <TouchableOpacity
                  key={mood.id}
                  style={[
                    styles.filterChip,
                    {
                      backgroundColor:
                        activeFilters.mood === mood.id
                          ? `${Colors.secondary[500]}20`
                          : Colors.neutral[100],
                      borderColor:
                        activeFilters.mood === mood.id
                          ? Colors.secondary[500]
                          : Colors.neutral[100],
                    },
                  ]}
                  onPress={() => toggleFilter('mood', mood.id)}
                >
                  <Text
                    variant="body-sm"
                    color={
                      activeFilters.mood === mood.id
                        ? Colors.secondary[500]
                        : theme.secondaryText
                    }
                  >
                    {mood.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.filterGroup}>
            <Text variant="body-sm" color={theme.secondaryText} style={styles.filterLabel}>
              Age
            </Text>
            <View style={styles.filterOptions}>
              {ageRanges.map((age) => (
                <TouchableOpacity
                  key={age.id}
                  style={[
                    styles.filterChip,
                    {
                      backgroundColor:
                        activeFilters.ageRange === age.id
                          ? `${Colors.accent[500]}20`
                          : Colors.neutral[100],
                      borderColor:
                        activeFilters.ageRange === age.id
                          ? Colors.accent[500]
                          : Colors.neutral[100],
                    },
                  ]}
                  onPress={() => toggleFilter('ageRange', age.id)}
                >
                  <Text
                    variant="body-sm"
                    color={
                      activeFilters.ageRange === age.id
                        ? Colors.accent[500]
                        : theme.secondaryText
                    }
                  >
                    {age.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.resultsSection}>
          <View style={styles.resultsHeader}>
            <Text variant="h4">
              {filteredSounds.length === 0
                ? 'No sounds found'
                : `${filteredSounds.length} Sound${filteredSounds.length !== 1 ? 's' : ''}`}
            </Text>
            <Button
              title="Create New"
              size="sm"
              leftIcon={<Filter size={16} color="#FFFFFF" />}
              onPress={() => router.push('/onboarding')}
            />
          </View>
          
          {filteredSounds.map((sound) => (
            <SoundCard key={sound.id} sound={sound} />
          ))}
          
          {filteredSounds.length === 0 && (
            <View style={styles.emptyState}>
              <Text
                variant="body"
                color={theme.secondaryText}
                align="center"
                style={styles.emptyStateText}
              >
                No sounds match your current filters. Try adjusting your filters or create a new sound.
              </Text>
              <Button
                title="Create New Sound"
                onPress={() => router.push('/onboarding')}
                style={styles.createButton}
              />
            </View>
          )}
        </View>
      </ScrollView>
      
      {player.currentSound && <AudioPlayer mini />}
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: Spacing.lg,
  },
  filterSection: {
    marginBottom: Spacing.lg,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  filtersContainer: {
    paddingRight: Spacing.lg,
  },
  filterGroup: {
    marginRight: Spacing.lg,
    minWidth: 150,
  },
  filterLabel: {
    marginBottom: Spacing.xs,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs,
    borderWidth: 1,
  },
  resultsSection: {
    flex: 1,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  emptyState: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  emptyStateText: {
    marginBottom: Spacing.lg,
  },
  createButton: {
    minWidth: 200,
  },
});