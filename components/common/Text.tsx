import React from 'react';
import { Text as RNText, StyleSheet, TextProps as RNTextProps } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { FontSizes, FontWeights, LineHeights } from '@/constants/Fonts';

interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body-sm' | 'caption' | 'button';
  weight?: keyof typeof FontWeights;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export default function Text({
  children,
  style,
  variant = 'body',
  weight,
  color,
  align,
  ...props
}: TextProps) {
  const { theme } = useTheme();
  
  const getVariantStyle = () => {
    switch (variant) {
      case 'h1':
        return {
          fontSize: FontSizes['3xl'],
          fontWeight: FontWeights.bold,
          lineHeight: LineHeights.tight * FontSizes['3xl'],
        };
      case 'h2':
        return {
          fontSize: FontSizes['2xl'],
          fontWeight: FontWeights.bold,
          lineHeight: LineHeights.tight * FontSizes['2xl'],
        };
      case 'h3':
        return {
          fontSize: FontSizes.xl,
          fontWeight: FontWeights.semibold,
          lineHeight: LineHeights.tight * FontSizes.xl,
        };
      case 'h4':
        return {
          fontSize: FontSizes.lg,
          fontWeight: FontWeights.semibold,
          lineHeight: LineHeights.tight * FontSizes.lg,
        };
      case 'body':
        return {
          fontSize: FontSizes.md,
          lineHeight: LineHeights.normal * FontSizes.md,
        };
      case 'body-sm':
        return {
          fontSize: FontSizes.sm,
          lineHeight: LineHeights.normal * FontSizes.sm,
        };
      case 'caption':
        return {
          fontSize: FontSizes.xs,
          lineHeight: LineHeights.normal * FontSizes.xs,
        };
      case 'button':
        return {
          fontSize: FontSizes.md,
          fontWeight: FontWeights.medium,
          lineHeight: LineHeights.tight * FontSizes.md,
        };
      default:
        return {
          fontSize: FontSizes.md,
          lineHeight: LineHeights.normal * FontSizes.md,
        };
    }
  };
  
  return (
    <RNText
      style={[
        getVariantStyle(),
        {
          color: color || theme.text,
          textAlign: align,
          ...(weight && { fontWeight: FontWeights[weight] }),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}