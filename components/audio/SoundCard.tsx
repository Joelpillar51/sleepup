import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Play, Plus } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAppState } from '@/hooks/useAppState';
import Card from '../common/Card';
import Text from '../common/Text';
import { Sound } from '@/types';
import { Colors } from '@/constants/Colors';
import { BorderRadius, Spacing } from '@/constants/Spacing';
import { formatDuration } from '@/utils/formatTime';
import { soundGoals } from '@/data/mockData';

interface SoundCardProps {
  sound: Sound;
  onPlayPress?: () => void;
  onSavePress?: () => void;
}

export default function SoundCard({ sound, onPlayPress, onSavePress }: SoundCardProps) {
  const { theme } = useTheme();
  const { playSound } = useAppState();
  
  const goal = soundGoals.find((g) => g.id === sound.goalId);
  const goalColor = goal?.color || Colors.primary[500];
  
  const handlePlay = () => {
    playSound(sound);
    if (onPlayPress) onPlayPress();
  };
  
  return (
    <Card style={styles.container} touchable>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text variant="h4" numberOfLines={1}>
            {sound.title}
          </Text>
          <Text variant="body-sm" color={theme.secondaryText}>
            {formatDuration(sound.duration)}
          </Text>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: Colors.primary[50] }]}
            onPress={onSavePress}
          >
            <Plus size={20} color={Colors.primary[600]} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.playButton, { backgroundColor: goalColor }]}
            onPress={handlePlay}
          >
            <Play size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.tagsContainer}>
        {goal && (
          <View style={[styles.tag, { backgroundColor: `${goalColor}30` }]}>
            <Text variant="caption" color={goalColor}>
              {goal.emoji} {goal.name}
            </Text>
          </View>
        )}
        
        {sound.preferences.slice(0, 2).map((prefId) => (
          <View
            key={prefId}
            style={[styles.tag, { backgroundColor: `${Colors.secondary[500]}30` }]}
          >
            <Text variant="caption" color={Colors.secondary[600]}>
              {prefId}
            </Text>
          </View>
        ))}
        
        {sound.preferences.length > 2 && (
          <View style={[styles.tag, { backgroundColor: `${Colors.neutral[500]}20` }]}>
            <Text variant="caption" color={Colors.neutral[600]}>
              +{sound.preferences.length - 2}
            </Text>
          </View>
        )}
      </View>
      
      {sound.progress !== undefined && (
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${sound.progress * 100}%`, backgroundColor: goalColor },
            ]}
          />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  titleContainer: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.xs,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  progressContainer: {
    height: 3,
    backgroundColor: Colors.neutral[200],
    borderRadius: BorderRadius.full,
    marginTop: Spacing.sm,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
});