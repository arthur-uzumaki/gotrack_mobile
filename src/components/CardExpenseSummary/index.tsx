import React from 'react'
import { Text, View } from 'react-native'

import { formateCurrency } from '@/utils/formate-currency'
import { styles } from './styles'

export type GetExpensesSummary200SummaryItem = {
  total: number
  count: number
}

interface CardExpenseSummaryProps {
  data: GetExpensesSummary200SummaryItem
  label?: string
}
export function CardExpenseSummary({
  data,
  label = 'Resumo',
}: CardExpenseSummaryProps) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardValue}>{formateCurrency(data.total)}</Text>
      <Text style={styles.cardSubtext}>🚗 {data.count} corridas</Text>
    </View>
  )
}
