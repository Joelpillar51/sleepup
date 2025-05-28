import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import OnboardingHeader from '@/components/onboarding/OnboardingHeader';
import GoalSelection from '@/components/onboarding/GoalSelection';
import MoodSelection from '@/components/onboarding/MoodSelection';
import AgeSelection from '@/components/onboarding/AgeSelection';
import PreferenceSelection from '@/components/onboarding/PreferenceSelection';
import SoundGeneration from '@/components/onboarding/SoundGeneration';
import { useAppState } from '@/hooks/useAppState';
import { Spacing } from '@/constants/Spacing';
import { Sound } from '@/types';

export default function OnboardingScreen() {
  const {
    onboarding,
    setOnboardingStep,
    updateOnboarding,
    resetOnboarding,
    addSound,
    playSound,
  } = useAppState();
  
  const {
    step,
    selectedGoal,
    selectedMood,
    selectedAgeRange,
    selectedPreferences,
    forSomeoneElse,
    generatedSound,
  } = onboarding;
  
  // Reset onboarding when component mounts
  useEffect(() => {
    resetOnboarding();
  }, []);
  
  const getStepTitle = () => {
    switch (step) {
      case 0:
        return 'Select Your Goal';
      case 1:
        return 'How Are You Feeling?';
      case 2:
        return 'Age Range';
      case 3:
        return 'Sound Preferences';
      case 4:
        return 'Generating Your Sound';
      default:
        return 'Onboarding';
    }
  };
  
  const getStepSubtitle = () => {
    switch (step) {
      case 0:
        return 'What would you like to achieve with your sound experience?';
      case 1:
        return 'Select your current mood to personalize your sound.';
      case 2:
        return 'Help us tailor the experience to your age group.';
      case 3:
        return 'Choose the elements you would like to include in your sound.';
      case 4:
        return '';
      default:
        return '';
    }
  };
  
  const canProceed = () => {
    switch (step) {
      case 0:
        return !!selectedGoal;
      case 1:
        return !!selectedMood;
      case 2:
        return !!selectedAgeRange;
      case 3:
        return true; // Preferences are optional
      case 4:
        return !!generatedSound;
      default:
        return false;
    }
  };
  
  const handleNext = () => {
    if (step < 4) {
      setOnboardingStep(step + 1);
    } else {
      // Add the generated sound to the user's sounds
      if (generatedSound) {
        addSound(generatedSound);
        // Navigate to the home screen
        router.push('/(tabs)');
      }
    }
  };
  
  const handleBack = () => {
    if (step > 0) {
      setOnboardingStep(step - 1);
    } else {
      router.back();
    }
  };
  
  const handleSoundGenerated = (sound: Sound) => {
    updateOnboarding({ generatedSound: sound });
    playSound(sound);
  };
  
  const handleRegenerate = () => {
    updateOnboarding({ generatedSound: undefined });
    // We stay on the same step but reset the generation
  };
  
  const handleSaveSound = (sound: Sound) => {
    addSound(sound);
    router.push('/(tabs)');
  };
  
  return (
    <Container safeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <OnboardingHeader
          title={getStepTitle()}
          subtitle={getStepSubtitle()}
          step={step + 1}
          totalSteps={5}
        />
        
        {step === 0 && (
          <GoalSelection
            selectedGoal={selectedGoal}
            onSelectGoal={(goal) => updateOnboarding({ selectedGoal: goal })}
          />
        )}
        
        {step === 1 && (
          <MoodSelection
            selectedMood={selectedMood}
            onSelectMood={(mood) => updateOnboarding({ selectedMood: mood })}
          />
        )}
        
        {step === 2 && (
          <AgeSelection
            selectedAgeRange={selectedAgeRange}
            forSomeoneElse={forSomeoneElse}
            onSelectAgeRange={(ageRange) => updateOnboarding({ selectedAgeRange: ageRange })}
            onToggleForSomeoneElse={(value) => updateOnboarding({ forSomeoneElse: value })}
          />
        )}
        
        {step === 3 && (
          <PreferenceSelection
            selectedPreferences={selectedPreferences}
            onSelectPreference={(preferenceId) => {
              const newPreferences = [...selectedPreferences];
              const index = newPreferences.indexOf(preferenceId);
              
              if (index === -1) {
                newPreferences.push(preferenceId);
              } else {
                newPreferences.splice(index, 1);
              }
              
              updateOnboarding({ selectedPreferences: newPreferences });
            }}
            onSelectPreset={(presetIds) => {
              updateOnboarding({ selectedPreferences: presetIds });
            }}
          />
        )}
        
        {step === 4 && (
          <SoundGeneration
            isGenerating={!generatedSound}
            onComplete={handleSoundGenerated}
            onRegenerate={handleRegenerate}
            onSave={handleSaveSound}
            goalId={selectedGoal?.id}
            moodId={selectedMood?.id}
            ageRangeId={selectedAgeRange?.id}
            preferences={selectedPreferences}
            generatedSound={generatedSound}
          />
        )}
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        {step < 4 && (
          <>
            <Button
              title="Back"
              variant="outline"
              style={styles.button}
              onPress={handleBack}
            />
            <Button
              title="Next"
              style={styles.button}
              disabled={!canProceed()}
              onPress={handleNext}
            />
          </>
        )}
        
        {step === 4 && generatedSound && (
          <Button
            title="Go to Home"
            style={styles.finishButton}
            onPress={handleNext}
          />
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.lg,
  },
  button: {
    flex: 1,
    marginHorizontal: Spacing.xs,
  },
  finishButton: {
    flex: 1,
  },
});