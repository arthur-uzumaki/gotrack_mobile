import type React from 'react'
import type { ReactNode } from 'react'
import {
  ActivityIndicator,
  type GestureResponderEvent,
  type StyleProp,
  Text,
  type TextStyle,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
  type ViewStyle,
} from 'react-native'
import { styles } from './styles'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline'
type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps extends TouchableOpacityProps {
  title?: string
  onPress: (event: GestureResponderEvent) => void
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  icon?: ReactNode
  children?: ReactNode
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  children,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const buttonStyle: StyleProp<ViewStyle> = [
    styles.button,
    styles[`${variant}Button`],
    styles[`${size}Button`],
    (loading || disabled) && styles.disabledButton,
    style,
  ]

  const buttonTextStyle: StyleProp<TextStyle> = [
    styles.buttonText,
    styles[`${variant}ButtonText`],
    styles[`${size}ButtonText`],
    textStyle,
  ]

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={loading || disabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#ffffff" />
          <Text style={[buttonTextStyle, styles.loadingText]}>
            Carregando...
          </Text>
        </View>
      ) : (
        <View style={styles.buttonContent}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          {children || <Text style={buttonTextStyle}>{title}</Text>}
        </View>
      )}
    </TouchableOpacity>
  )
}
