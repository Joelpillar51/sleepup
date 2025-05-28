import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

export function useTheme() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  
  return {
    colorScheme,
    theme,
  };
}