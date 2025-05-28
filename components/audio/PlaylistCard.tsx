import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Play, MoveVertical as MoreVertical } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import Card from '../common/Card';
import Text from '../common/Text';
import { Playlist } from '@/types';
import { Colors } from '@/constants/Colors';
import { BorderRadius, Spacing } from '@/constants/Spacing';

interface PlaylistCardProps {
  playlist: Playlist;
  onPress?: () => void;
  onPlayPress?: () => void;
  onMorePress?: () => void;
}

export default function PlaylistCard({
  playlist,
  onPress,
  onPlayPress,
  onMorePress,
}: PlaylistCardProps) {
  const { theme } = useTheme();
  
  // Calculate total duration of the playlist
  const totalDuration = playlist.sounds.reduce((total, sound) => total + sound.duration, 0);
  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);
  
  // Format duration
  const formattedDuration = hours > 0
    ? `${hours} hr ${minutes} min`
    : `${minutes} min`;
  
  return (
    <Card
      style={styles.container}
      touchable
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text variant="h4" numberOfLines={1}>
            {playlist.name}
          </Text>
          <Text variant="body-sm" color={theme.secondaryText}>
            {playlist.sounds.length} sounds • {formattedDuration}
          </Text>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: Colors.primary[600] }]}
            onPress={onPlayPress}
          >
            <Play size={20} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.moreButton]}
            onPress={onMorePress}
          >
            <MoreVertical size={20} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      {playlist.description && (
        <Text
          variant="body-sm"
          color={theme.secondaryText}
          numberOfLines={2}
          style={styles.description}
        >
          {playlist.description}
        </Text>
      )}
      
      <View style={styles.tracksContainer}>
        {playlist.sounds.slice(0, 2).map((sound, index) => (
          <View key={sound.id} style={styles.trackItem}>
            <View style={styles.trackNumber}>
              <Text variant="caption" color={theme.secondaryText}>
                {index + 1}
              </Text>
            </View>
            <Text variant="body-sm" numberOfLines={1} style={styles.trackTitle}>
              {sound.title}
            </Text>
          </View>
        ))}
        
        {playlist.sounds.length > 2 && (
          <Text variant="body-sm" color={theme.secondaryText} style={styles.moreText}>
            +{playlist.sounds.length - 2} more
          </Text>
        )}
      </View>
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
  },
  textContainer: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.xs,
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  tracksContainer: {
    marginTop: Spacing.sm,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  trackNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.xs,
  },
  trackTitle: {
    flex: 1,
  },
  moreText: {
    marginTop: Spacing.xs,
  },
});