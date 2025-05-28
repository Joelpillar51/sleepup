import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { BorderRadius, Shadows, Spacing } from '@/constants/Spacing';

interface CardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof Spacing | number;
  shadow?: keyof typeof Shadows;
  touchable?: boolean;
}

export default function Card({
  children,
  style,
  padding = 'md',
  shadow = 'md',
  touchable = false,
  ...props
}: CardProps) {
  const { theme } = useTheme();
  
  const cardStyle = {
    backgroundColor: theme.card,
    borderRadius: BorderRadius.lg,
    padding: typeof padding === 'string' ? Spacing[padding] : padding,
    ...Shadows[shadow],
  };
  
  if (touchable) {
    return (
      <TouchableOpacity
        style={[cardStyle, style]}
        activeOpacity={0.7}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }
  
  return <View style={[cardStyle, style]}>{children}</View>;
}