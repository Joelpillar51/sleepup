export interface SoundGoal {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export interface Mood {
  id: string;
  name: string;
  value: number;
}

export interface AgeRange {
  id: string;
  name: string;
  range: string;
}

export interface SoundPreference {
  id: string;
  name: string;
  selected: boolean;
}

export interface SoundPreset {
  id: string;
  name: string;
  preferences: string[];
}

export interface Sound {
  id: string;
  title: string;
  createdAt: Date;
  duration: number;
  goalId: string;
  moodId: string;
  ageRangeId: string;
  preferences: string[];
  uri: string;
  progress?: number;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  sounds: Sound[];
  createdAt: Date;
}

export interface User {
  name?: string;
  avatar?: string;
  reminderTime?: string;
  isPremium: boolean;
}

export type OnboardingState = {
  step: number;
  selectedGoal?: SoundGoal;
  selectedMood?: Mood;
  selectedAgeRange?: AgeRange;
  selectedPreferences: string[];
  forSomeoneElse: boolean;
  generatedSound?: Sound;
};

export type PlayerState = {
  currentSound?: Sound;
  isPlaying: boolean;
  duration: number;
  position: number;
  rate: number;
  volume: number;
};