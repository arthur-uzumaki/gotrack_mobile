import { Text, View } from 'react-native'

import { styles } from './styles'
interface AppBadgeProps {
  badge: string
}

export function AppBadge({ badge }: AppBadgeProps) {
  function getBadgeStyle(badgeText: string) {
    const lowerBadge = badgeText.toLowerCase()

    if (lowerBadge.includes('uber')) {
      return styles.uberBadge
    }
    if (lowerBadge.includes('99')) {
      return styles.badge99
    }
    return {}
  }

  function getTextStyle(badgeText: string) {
    const lowerBadge = badgeText.toLowerCase()
    if (lowerBadge.includes('uber')) {
      return styles.uberText
    }
    if (lowerBadge.includes('99')) {
      return styles.text99
    }
    return {}
  }
  return (
    <View style={[styles.badge, getBadgeStyle(badge)]}>
      <Text style={[styles.badgeText, getTextStyle(badge)]}>{badge}</Text>
    </View>
  )
}
