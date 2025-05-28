import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAppState } from '@/hooks/useAppState';

export default function Index() {
  const { sounds } = useAppState();
  
  // If the user has already created sounds, redirect to home
  // Otherwise, redirect to welcome screen
  return sounds.length > 0 ? <Redirect href="/(tabs)" /> : <Redirect href="/welcome" />;
}