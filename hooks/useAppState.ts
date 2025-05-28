import { create } from 'zustand';
import { Sound, Playlist, User, OnboardingState, PlayerState } from '@/types';

interface AppState {
  // User data
  user: User;
  updateUser: (user: Partial<User>) => void;
  
  // Onboarding
  onboarding: OnboardingState;
  setOnboardingStep: (step: number) => void;
  updateOnboarding: (data: Partial<OnboardingState>) => void;
  resetOnboarding: () => void;
  
  // Sounds & playlists
  sounds: Sound[];
  playlists: Playlist[];
  addSound: (sound: Sound) => void;
  removeSound: (soundId: string) => void;
  createPlaylist: (name: string, description?: string) => void;
  addToPlaylist: (playlistId: string, soundId: string) => void;
  removeFromPlaylist: (playlistId: string, soundId: string) => void;
  deletePlaylist: (playlistId: string) => void;
  
  // Player state
  player: PlayerState;
  playSound: (sound: Sound) => void;
  pauseSound: () => void;
  updatePlayerProgress: (position: number, duration: number) => void;
  setPlayerRate: (rate: number) => void;
  setPlayerVolume: (volume: number) => void;
}

const initialOnboardingState: OnboardingState = {
  step: 0,
  selectedPreferences: [],
  forSomeoneElse: false,
};

const initialPlayerState: PlayerState = {
  isPlaying: false,
  duration: 0,
  position: 0,
  rate: 1.0,
  volume: 1.0,
};

export const useAppState = create<AppState>((set) => ({
  // User data
  user: {
    isPremium: false,
  },
  updateUser: (userData) => 
    set((state) => ({
      user: { ...state.user, ...userData },
    })),
  
  // Onboarding
  onboarding: initialOnboardingState,
  setOnboardingStep: (step) => 
    set((state) => ({
      onboarding: { ...state.onboarding, step },
    })),
  updateOnboarding: (data) => 
    set((state) => ({
      onboarding: { ...state.onboarding, ...data },
    })),
  resetOnboarding: () => 
    set({
      onboarding: initialOnboardingState,
    }),
  
  // Sounds & playlists
  sounds: [],
  playlists: [],
  addSound: (sound) => 
    set((state) => ({
      sounds: [sound, ...state.sounds],
    })),
  removeSound: (soundId) => 
    set((state) => ({
      sounds: state.sounds.filter((s) => s.id !== soundId),
      playlists: state.playlists.map((playlist) => ({
        ...playlist,
        sounds: playlist.sounds.filter((s) => s.id !== soundId),
      })),
    })),
  createPlaylist: (name, description) => 
    set((state) => ({
      playlists: [
        ...state.playlists,
        {
          id: Date.now().toString(),
          name,
          description,
          sounds: [],
          createdAt: new Date(),
        },
      ],
    })),
  addToPlaylist: (playlistId, soundId) => 
    set((state) => ({
      playlists: state.playlists.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              sounds: [
                ...playlist.sounds,
                state.sounds.find((s) => s.id === soundId)!,
              ],
            }
          : playlist
      ),
    })),
  removeFromPlaylist: (playlistId, soundId) => 
    set((state) => ({
      playlists: state.playlists.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              sounds: playlist.sounds.filter((s) => s.id !== soundId),
            }
          : playlist
      ),
    })),
  deletePlaylist: (playlistId) => 
    set((state) => ({
      playlists: state.playlists.filter((p) => p.id !== playlistId),
    })),
  
  // Player state
  player: initialPlayerState,
  playSound: (sound) => 
    set((state) => ({
      player: {
        ...state.player,
        currentSound: sound,
        isPlaying: true,
      },
    })),
  pauseSound: () => 
    set((state) => ({
      player: {
        ...state.player,
        isPlaying: false,
      },
    })),
  updatePlayerProgress: (position, duration) => 
    set((state) => ({
      player: {
        ...state.player,
        position,
        duration,
      },
    })),
  setPlayerRate: (rate) => 
    set((state) => ({
      player: {
        ...state.player,
        rate,
      },
    })),
  setPlayerVolume: (volume) => 
    set((state) => ({
      player: {
        ...state.player,
        volume,
      },
    })),
}));