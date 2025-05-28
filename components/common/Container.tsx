import React from 'react';
import { SafeAreaView, View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/constants/Spacing';

interface ContainerProps extends ViewProps {
  padding?: keyof typeof Spacing | number;
  safeArea?: boolean;
  center?: boolean;
}

export default function Container({
  children,
  style,
  padding = 'md',
  safeArea = true,
  center = false,
  ...props
}: ContainerProps) {
  const { theme } = useTheme();
  
  const paddingValue = typeof padding === 'string' ? Spacing[padding] : padding;
  
  const containerStyle = {
    flex: 1,
    backgroundColor: theme.background,
    padding: paddingValue,
    ...(center && {
      justifyContent: 'center',
      alignItems: 'center',
    }),
  };
  
  if (safeArea) {
    return (
      <SafeAreaView style={[{ flex: 1, backgroundColor: theme.background }]}>
        <View style={[containerStyle, style]} {...props}>
          {children}
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <View style={[containerStyle, style]} {...props}>
      {children}
    </View>
  );
}