import React, { type ReactNode } from 'react'
import {
  type StyleProp,
  View,
  type ViewProps,
  type ViewStyle,
} from 'react-native'
import { styles } from './styles'

type CardVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger'
type CardPadding = 'small' | 'medium' | 'large'

interface CardProps extends ViewProps {
  children?: ReactNode
  variant?: CardVariant
  padding?: CardPadding
  shadow?: boolean
  style?: StyleProp<ViewStyle>
}

export function Card({
  children,
  variant = 'default',
  padding = 'medium',
  shadow = true,
  style,
  ...props
}: CardProps) {
  const cardStyle: StyleProp<ViewStyle> = [
    styles.card,
    styles[`${variant}Card`],
    styles[`${padding}Padding`],
    shadow && styles.cardShadow,
    style,
  ]

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  )
}
