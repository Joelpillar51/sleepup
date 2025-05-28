import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Text from './Text';
import { BorderRadius, Spacing } from '@/constants/Spacing';
import { Colors } from '@/constants/Colors';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  disabled,
  ...props
}: ButtonProps) {
  const { theme, colorScheme } = useTheme();
  
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: BorderRadius.md,
    };
    
    // Size styles
    const sizeStyles = {
      sm: {
        paddingVertical: Spacing.xs,
        paddingHorizontal: Spacing.sm,
      },
      md: {
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
      },
      lg: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
      },
    };
    
    // Variant styles
    const variantStyles = {
      primary: {
        backgroundColor: Colors.primary[600],
      },
      secondary: {
        backgroundColor: Colors.secondary[600],
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.primary[600],
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    };
    
    const disabledStyle = {
      opacity: 0.6,
    };
    
    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(fullWidth && { width: '100%' }),
      ...(disabled && disabledStyle),
    };
  };
  
  const getTextStyle = (): TextStyle => {
    const variantTextStyles = {
      primary: {
        color: '#FFFFFF',
      },
      secondary: {
        color: '#FFFFFF',
      },
      outline: {
        color: Colors.primary[600],
      },
      ghost: {
        color: Colors.primary[600],
      },
    };
    
    return variantTextStyles[variant];
  };
  
  const buttonSize = {
    sm: 16,
    md: 18,
    lg: 20,
  };
  
  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? Colors.primary[600] : '#FFFFFF'}
        />
      ) : (
        <>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <Text
            variant="button"
            style={[getTextStyle()]}
          >
            {title}
          </Text>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconLeft: {
    marginRight: Spacing.xs,
  },
  iconRight: {
    marginLeft: Spacing.xs,
  },
});