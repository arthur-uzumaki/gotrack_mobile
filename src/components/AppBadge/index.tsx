import { Text, View } from 'react-native'

import { styles } from './styles'
interface AppBadgeProps {
  badge: string
}

export function AppBadge({ badge }: AppBadgeProps) {
  return (
    <View
      style={[
        styles.badge,
        badge === 'Uber' ? styles.uberBadge : styles.badge99,
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          badge === 'Uber' ? styles.uberText : styles.text99,
        ]}
      >
        {badge}
      </Text>
    </View>
  )
}
