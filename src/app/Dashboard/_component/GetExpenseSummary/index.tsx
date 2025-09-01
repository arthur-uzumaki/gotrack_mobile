import {
  CardExpenseSummary,
  type GetExpensesSummary200SummaryItem,
} from '@/components/CardExpenseSummary'
import { useExpensesContext } from '@/contexts/expenses-context'
import { Text, View } from 'react-native'
import { styles } from './styles'

export function GetExpenseSummary() {
  const { currentSummary, lastSummary, isLoadingCurrent, isLoadingLast } =
    useExpensesContext()

  function getMonthName(monthOffset = 0) {
    const now = new Date()
    const month = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)
    return month.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  }

  return (
    <>
      {currentSummary ? (
        <CardExpenseSummary
          isLoading={isLoadingCurrent}
          label={`${getMonthName(0)}`}
          data={currentSummary}
        />
      ) : (
        <View style={styles.noDataCard}>
          <Text style={styles.noDataText}>Sem dados para este mês</Text>
        </View>
      )}

      {lastSummary ? (
        <CardExpenseSummary
          isLoading={isLoadingLast}
          label={`${getMonthName(-1)}`}
          data={lastSummary}
        />
      ) : (
        <View style={styles.noDataCard}>
          <Text style={styles.noDataText}>Sem dados para o mês passado</Text>
        </View>
      )}
    </>
  )
}
