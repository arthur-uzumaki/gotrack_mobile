import {
  CardExpenseSummary,
  type GetExpensesSummary200SummaryItem,
} from '@/components/CardExpenseSummary'
import { getGoTrackApi } from '@/http/server'
import { getCurrentMonthDates, getLastMonthDates } from '@/utils/date'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { styles } from './styles'

interface SummaryData {
  currentMonth: GetExpensesSummary200SummaryItem | null
  lastMonth: GetExpensesSummary200SummaryItem | null
}

export function GetExpenseSummary() {
  const [summaryData, setSummaryData] = useState<SummaryData>({
    currentMonth: null,
    lastMonth: null,
  })

  const [isLoadingGetExpenseSummary, setIsLoadingGetExpenseSummary] =
    useState(true)

  function getMonthName(monthOffset = 0) {
    const now = new Date()
    const month = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)
    return month.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  }

  useEffect(() => {
    async function fetchSummaries() {
      try {
        setIsLoadingGetExpenseSummary(true)
        const currentMonthDates = getCurrentMonthDates()
        const lastMonthDates = getLastMonthDates()

        const [currentMonthResult, lastMonthResult] = await Promise.all([
          getGoTrackApi().getExpensesSummary({
            month: currentMonthDates.month,
            year: currentMonthDates.year,
          }),
          getGoTrackApi().getExpensesSummary({
            month: lastMonthDates.month,
            year: lastMonthDates.year,
          }),
        ])

        setSummaryData({
          currentMonth: currentMonthResult.summary?.[0] || null,
          lastMonth: lastMonthResult.summary?.[0] || null,
        })
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoadingGetExpenseSummary(false)
      }
    }

    fetchSummaries()
  }, [])

  return (
    <>
      {summaryData.currentMonth ? (
        <CardExpenseSummary
          isLoading={isLoadingGetExpenseSummary}
          label={`${getMonthName(0)}`}
          data={summaryData.currentMonth}
        />
      ) : (
        <View style={styles.noDataCard}>
          <Text style={styles.noDataText}>Sem dados para este mês</Text>
        </View>
      )}

      {summaryData.lastMonth ? (
        <CardExpenseSummary
          isLoading={isLoadingGetExpenseSummary}
          label={`${getMonthName(-1)}`}
          data={summaryData.lastMonth}
        />
      ) : (
        <View style={styles.noDataCard}>
          <Text style={styles.noDataText}>Sem dados para o mês passado</Text>
        </View>
      )}
    </>
  )
}
