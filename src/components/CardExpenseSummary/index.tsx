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
  function getValueFontSize(value: string) {
    if (value.length <= 8) {
      return 24
    }
    if (value.length <= 10) {
      return 20
    }
    if (value.length <= 12) {
      return 18
    }

    return 16
  }

  const formattedValue = formateCurrency(data.total || 0)
  const dynamicFontSize = getValueFontSize(formattedValue)
  return (
    <View style={styles.summaryCard}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Text style={styles.cardLabel}>{label}</Text>
          <Text
            style={[styles.cardValue, { fontSize: dynamicFontSize }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.8}
          >
            {formattedValue}
          </Text>
          <Text style={styles.cardSubtext}>
            🚗 {data.count} {data.count === 1 ? 'corrida' : 'corridas'}
          </Text>
        </>
      )}
    </View>
  )
}
