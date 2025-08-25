import React from 'react'
import {
  ActivityIndicator,
  type ActivityIndicatorProps,
  Text,
  View,
} from 'react-native'
import { styles } from './styles'

interface LoadingSpinnerProps {
  size?: ActivityIndicatorProps['size']
  color?: string
  text?: string
}

export function LoadingSpinner({
  size = 'small',
  color = '#3b82f6',
  text,
}: LoadingSpinnerProps) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.loadingText}>{text}</Text>}
    </View>
  )
}
