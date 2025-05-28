import { SoundGoal, Mood, AgeRange, SoundPreference, SoundPreset, Sound, Playlist } from '@/types';
import { Colors } from '@/constants/Colors';

export const soundGoals: SoundGoal[] = [
  {
    id: 'sleep',
    name: 'Sleep',
    emoji: '😴',
    color: Colors.primary[500],
  },
  {
    id: 'focus',
    name: 'Focus',
    emoji: '🧠',
    color: Colors.accent[500],
  },
  {
    id: 'meditation',
    name: 'Meditation',
    emoji: '🧘',
    color: Colors.secondary[500],
  },
  {
    id: 'calm',
    name: 'Calm',
    emoji: '😌',
    color: Colors.success[500],
  },
  {
    id: 'stress-relief',
    name: 'Stress Relief',
    emoji: '🌿',
    color: Colors.warning[500],
  },
];

export const moodOptions: Mood[] = [
  { id: 'calm', name: 'Calm', value: 0 },
  { id: 'energetic', name: 'Energetic', value: 1 },
  { id: 'reflective', name: 'Reflective', value: 2 },
  { id: 'sleepy', name: 'Sleepy', value: 3 },
];

export const ageRanges: AgeRange[] = [
  { id: 'teen', name: 'Teen', range: '13-19' },
  { id: 'adult', name: 'Adult', range: '20-40' },
  { id: 'elder', name: 'Elder', range: '40+' },
];

export const soundPreferences: SoundPreference[] = [
  { id: 'nature', name: 'Nature', selected: false },
  { id: 'rain', name: 'Rain', selected: false },
  { id: 'ocean', name: 'Ocean', selected: false },
  { id: 'white-noise', name: 'White Noise', selected: false },
  { id: 'piano', name: 'Piano', selected: false },
  { id: 'wind', name: 'Wind', selected: false },
  { id: 'chimes', name: 'Chimes', selected: false },
  { id: 'forest', name: 'Forest', selected: false },
  { id: 'birds', name: 'Birds', selected: false },
  { id: 'thunder', name: 'Thunder', selected: false },
];

export const soundPresets: SoundPreset[] = [
  {
    id: 'deep-sleep',
    name: 'Deep Sleep',
    preferences: ['ocean', 'white-noise', 'rain'],
  },
  {
    id: 'teen-zen',
    name: 'Teen Zen',
    preferences: ['piano', 'nature', 'birds'],
  },
  {
    id: 'focus-flow',
    name: 'Focus Flow',
    preferences: ['white-noise', 'piano', 'wind'],
  },
  {
    id: 'nature-calm',
    name: 'Nature Calm',
    preferences: ['forest', 'birds', 'wind'],
  },
];

// Mock sound URIs - in a real app, these would be proper audio files
const MOCK_AUDIO_URIS = [
  'https://example.com/audio/calm-ocean.mp3',
  'https://example.com/audio/gentle-rain.mp3',
  'https://example.com/audio/forest-ambience.mp3',
  'https://example.com/audio/meditation-bells.mp3',
  'https://example.com/audio/white-noise.mp3',
];

// Sample sounds
export const sampleSounds: Sound[] = [
  {
    id: '1',
    title: 'Evening Fog',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    duration: 600, // 10 minutes
    goalId: 'sleep',
    moodId: 'calm',
    ageRangeId: 'adult',
    preferences: ['rain', 'white-noise'],
    uri: MOCK_AUDIO_URIS[0],
    progress: 0.3,
  },
  {
    id: '2',
    title: 'Focus Stream',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    duration: 1800, // 30 minutes
    goalId: 'focus',
    moodId: 'energetic',
    ageRangeId: 'adult',
    preferences: ['white-noise', 'piano'],
    uri: MOCK_AUDIO_URIS[1],
    progress: 0.7,
  },
  {
    id: '3',
    title: 'Morning Clarity',
    createdAt: new Date(),
    duration: 1200, // 20 minutes
    goalId: 'meditation',
    moodId: 'reflective',
    ageRangeId: 'adult',
    preferences: ['chimes', 'birds'],
    uri: MOCK_AUDIO_URIS[2],
  },
  {
    id: '4',
    title: 'Deep Sleep Journey',
    createdAt: new Date(),
    duration: 2700, // 45 minutes
    goalId: 'sleep',
    moodId: 'sleepy',
    ageRangeId: 'adult',
    preferences: ['ocean', 'white-noise'],
    uri: MOCK_AUDIO_URIS[3],
  },
];

// Sample playlists
export const samplePlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Bedtime Favorites',
    description: 'Sounds to help me fall asleep',
    sounds: [sampleSounds[0], sampleSounds[3]],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
  },
  {
    id: '2',
    name: 'Productive Mornings',
    description: 'Start the day right',
    sounds: [sampleSounds[1], sampleSounds[2]],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
];

// Generate a random sound based on parameters
export const generateRandomSound = (
  goalId: string,
  moodId: string,
  ageRangeId: string,
  preferences: string[]
): Sound => {
  const titles = [
    'Tranquil Waters',
    'Forest Echo',
    'Midnight Rain',
    'Dawn Chorus',
    'Evening Breeze',
    'Urban Calm',
    'Distant Thunder',
    'Mountain Stream',
    'Ocean Waves',
    'Night Garden',
  ];
  
  const durations = [600, 900, 1200, 1800, 2700, 3600]; // 10, 15, 20, 30, 45, 60 minutes
  
  return {
    id: Date.now().toString(),
    title: titles[Math.floor(Math.random() * titles.length)],
    createdAt: new Date(),
    duration: durations[Math.floor(Math.random() * durations.length)],
    goalId,
    moodId,
    ageRangeId,
    preferences: preferences.length > 0 ? preferences : ['nature'],
    uri: MOCK_AUDIO_URIS[Math.floor(Math.random() * MOCK_AUDIO_URIS.length)],
  };
};