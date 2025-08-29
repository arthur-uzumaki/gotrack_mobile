import { Text, View } from 'react-native'

import type { GetExpenses200ExpensesItem } from '@/http/schemas'
import { formateCurrency } from '@/utils/formate-currency'
import { AppBadge } from '../AppBadge'
import { styles } from './styles'

interface ExpenseItemProps {
  expense: GetExpenses200ExpensesItem
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  const date = new Date(expense.createdAt)

  return (
    <View style={styles.rideItem}>
      <AppBadge badge={expense.service} />

      <View style={styles.rideDetails}>
        <Text style={styles.routeText}>📍 {expense.title}</Text>

        <Text style={styles.rideInfo}>
          {date.toLocaleDateString('pt-BR')} •{' '}
          {date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>

      <View style={styles.ridePrice}>
        <Text style={styles.priceText}>{formateCurrency(expense.value)}</Text>
      </View>
    </View>
  )
}
