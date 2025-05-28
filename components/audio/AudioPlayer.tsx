import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Play, Pause, SkipBack, SkipForward, Volume1, Volume2, VolumeX } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAppState } from '@/hooks/useAppState';
import Text from '../common/Text';
import Card from '../common/Card';
import { Sound } from '@/types';
import { formatTime } from '@/utils/formatTime';
import { BorderRadius, Spacing } from '@/constants/Spacing';
import { Colors } from '@/constants/Colors';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

interface AudioPlayerProps {
  sound?: Sound;
  mini?: boolean;
}

export default function AudioPlayer({ sound, mini = false }: AudioPlayerProps) {
  const { theme } = useTheme();
  const { player, playSound, pauseSound, updatePlayerProgress, setPlayerVolume } = useAppState();
  const [waveformAnimation] = useState(new Animated.Value(0));
  
  // Use either the passed sound or the current sound from the player state
  const currentSound = sound || player.currentSound;
  
  // Animate the waveform when playing
  useEffect(() => {
    if (player.isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(waveformAnimation, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(waveformAnimation, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      waveformAnimation.stopAnimation();
    }
  }, [player.isPlaying]);
  
  const handlePlayPause = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    if (player.isPlaying) {
      pauseSound();
    } else if (currentSound) {
      playSound(currentSound);
    }
  };
  
  const handleVolumeChange = (newVolume: number) => {
    setPlayerVolume(newVolume);
  };
  
  // Generate waveform bars
  const renderWaveform = () => {
    const bars = [];
    const barCount = mini ? 5 : 30;
    
    for (let i = 0; i < barCount; i++) {
      const randomHeight = 0.3 + Math.random() * 0.7; // Random height between 0.3 and 1
      
      const animatedHeight = waveformAnimation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [
          randomHeight * 40,
          randomHeight * 80,
          randomHeight * 40,
        ],
      });
      
      bars.push(
        <Animated.View
          key={i}
          style={[
            styles.waveformBar,
            {
              backgroundColor: player.isPlaying ? Colors.primary[500] : Colors.neutral[400],
              height: animatedHeight,
            },
          ]}
        />
      );
    }
    
    return bars;
  };
  
  if (!currentSound) {
    return null;
  }
  
  if (mini) {
    return (
      <Card style={styles.miniContainer}>
        <View style={styles.miniContent}>
          <View style={styles.miniTextContainer}>
            <Text variant="body" weight="medium" numberOfLines={1}>
              {currentSound.title}
            </Text>
          </View>
          
          <View style={styles.miniControls}>
            <View style={styles.miniWaveform}>{renderWaveform()}</View>
            
            <TouchableOpacity onPress={handlePlayPause}>
              {player.isPlaying ? (
                <Pause size={24} color={theme.text} />
              ) : (
                <Play size={24} color={theme.text} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  }
  
  return (
    <Card style={styles.container}>
      <View style={styles.titleContainer}>
        <Text variant="h3">{currentSound.title}</Text>
      </View>
      
      <View style={styles.waveformContainer}>{renderWaveform()}</View>
      
      <View style={styles.timeContainer}>
        <Text variant="body-sm" color={theme.secondaryText}>
          {formatTime(player.position)}
        </Text>
        <Text variant="body-sm" color={theme.secondaryText}>
          {formatTime(player.duration || currentSound.duration)}
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${(player.position / (player.duration || currentSound.duration)) * 100}%`,
              backgroundColor: Colors.primary[500],
            },
          ]}
        />
      </View>
      
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={() => {}}>
          <SkipBack size={28} color={theme.text} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          {player.isPlaying ? (
            <Pause size={32} color="#FFFFFF" />
          ) : (
            <Play size={32} color="#FFFFFF" />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={() => {}}>
          <SkipForward size={28} color={theme.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.volumeContainer}>
        <TouchableOpacity onPress={() => handleVolumeChange(0)}>
          {player.volume === 0 ? (
            <VolumeX size={20} color={theme.text} />
          ) : player.volume < 0.5 ? (
            <Volume1 size={20} color={theme.text} />
          ) : (
            <Volume2 size={20} color={theme.text} />
          )}
        </TouchableOpacity>
        
        <View style={styles.volumeSlider}>
          <View
            style={[
              styles.volumeSliderFill,
              { width: `${player.volume * 100}%`, backgroundColor: Colors.primary[500] },
            ]}
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: Spacing.lg,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  waveformContainer: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  waveformBar: {
    width: 4,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  progressContainer: {
    height: 4,
    backgroundColor: Colors.neutral[200],
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  controlButton: {
    padding: Spacing.sm,
  },
  playButton: {
    backgroundColor: Colors.primary[600],
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeSlider: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.neutral[200],
    borderRadius: BorderRadius.full,
    marginLeft: Spacing.sm,
    overflow: 'hidden',
  },
  volumeSliderFill: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
  miniContainer: {
    width: '100%',
    padding: Spacing.sm,
  },
  miniContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  miniTextContainer: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  miniControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniWaveform: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    marginRight: Spacing.sm,
  },
});