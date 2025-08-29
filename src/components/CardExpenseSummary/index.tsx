import React from 'react'
import { Text, View } from 'react-native'

import { formateCurrency } from '@/utils/formate-currency'
import { LoadingSpinner } from '../Loading'
import { styles } from './styles'

export type GetExpensesSummary200SummaryItem = {
  total: number
  count: number
}

interface CardExpenseSummaryProps {
  data: GetExpensesSummary200SummaryItem
  label?: string
  isLoading: boolean
}
export function CardExpenseSummary({
  data,
  label = 'Resumo',
  isLoading = false,
}: CardExpenseSummaryProps) {
  return (
    <View style={styles.summaryCard}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Text style={styles.cardLabel}>{label}</Text>
          <Text style={styles.cardValue}>{formateCurrency(data.total)}</Text>
          <Text style={styles.cardSubtext}>
            🚗 {data.count} {data.count === 1 ? 'corrida' : 'corridas'}
          </Text>
        </>
      )}
    </View>
  )
}
