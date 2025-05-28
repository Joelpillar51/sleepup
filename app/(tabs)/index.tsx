import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Plus, Play } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAppState } from '@/hooks/useAppState';
import Container from '@/components/common/Container';
import Text from '@/components/common/Text';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import SoundCard from '@/components/audio/SoundCard';
import AudioPlayer from '@/components/audio/AudioPlayer';
import { Spacing } from '@/constants/Spacing';
import { Colors } from '@/constants/Colors';
import { sampleSounds } from '@/data/mockData';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { player, sounds, addSound } = useAppState();
  
  // Add sample sounds for demo purposes
  useEffect(() => {
    if (sounds.length === 0) {
      sampleSounds.forEach((sound) => {
        addSound(sound);
      });
    }
  }, []);
  
  // Get recent sounds (latest first)
  const recentSounds = [...sounds].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
  
  // Get sounds with progress (continue listening)
  const inProgressSounds = sounds.filter((sound) => sound.progress !== undefined);
  
  return (
    <Container safeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text variant="h2">Good Evening</Text>
          <Text variant="body" color={theme.secondaryText}>
            Your personal sound sanctuary
          </Text>
        </View>
        
        <Card style={styles.createCard}>
          <Text variant="h3" style={styles.createCardTitle}>
            Create New Sound
          </Text>
          <Text variant="body" color={theme.secondaryText} style={styles.createCardSubtitle}>
            Generate a personalized audio experience based on your mood and preferences.
          </Text>
          <Button
            title="New Sound"
            leftIcon={<Plus size={20} color="#FFFFFF" />}
            onPress={() => router.push('/onboarding')}
          />
        </Card>
        
        {inProgressSounds.length > 0 && (
          <View style={styles.section}>
            <Text variant="h3" style={styles.sectionTitle}>
              Continue Listening
            </Text>
            {inProgressSounds.map((sound) => (
              <SoundCard key={sound.id} sound={sound} />
            ))}
          </View>
        )}
        
        <View style={styles.section}>
          <Text variant="h3" style={styles.sectionTitle}>
            Quick Generation
          </Text>
          <View style={styles.quickButtons}>
            <TouchableOpacity
              style={[styles.quickButton, { backgroundColor: Colors.primary[600] }]}
              onPress={() => router.push('/onboarding')}
            >
              <Text variant="body" weight="semibold" color="#FFFFFF">
                Sleep
              </Text>
              <Text variant="caption" color="#FFFFFF">
                15 min
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickButton, { backgroundColor: Colors.accent[600] }]}
              onPress={() => router.push('/onboarding')}
            >
              <Text variant="body" weight="semibold" color="#FFFFFF">
                Focus
              </Text>
              <Text variant="caption" color="#FFFFFF">
                30 min
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickButton, { backgroundColor: Colors.secondary[600] }]}
              onPress={() => router.push('/onboarding')}
            >
              <Text variant="body" weight="semibold" color="#FFFFFF">
                Calm
              </Text>
              <Text variant="caption" color="#FFFFFF">
                10 min
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {recentSounds.length > 0 && (
          <View style={styles.section}>
            <Text variant="h3" style={styles.sectionTitle}>
              Recent Sounds
            </Text>
            {recentSounds.slice(0, 3).map((sound) => (
              <SoundCard key={sound.id} sound={sound} />
            ))}
          </View>
        )}
      </ScrollView>
      
      {player.currentSound && <AudioPlayer mini />}
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: Spacing.xl,
  },
  createCard: {
    marginBottom: Spacing.xl,
    padding: Spacing.lg,
  },
  createCardTitle: {
    marginBottom: Spacing.xs,
  },
  createCardSubtitle: {
    marginBottom: Spacing.md,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  quickButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 12,
    marginHorizontal: Spacing.xs,
    alignItems: 'center',
  },
});