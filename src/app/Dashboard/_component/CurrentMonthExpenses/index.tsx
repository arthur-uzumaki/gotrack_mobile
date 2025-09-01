import { ExpenseList } from '@/components/ExpenseList'
import { useExpensesContext } from '@/contexts/expenses-context'
export function CurrentMonthExpenses() {
  const {
    currentMonth,
    isLoadingCurrent,
    isLoadingMoreCurrent,
    loadMoreCurrent,
    hasMoreCurrent,
  } = useExpensesContext()
  return (
    <ExpenseList
      data={currentMonth}
      isLoading={isLoadingCurrent}
      isLoadingMore={isLoadingMoreCurrent}
      onLoadMore={loadMoreCurrent}
      hasMore={hasMoreCurrent}
      emptyText="Nenhuma corrida registrada neste mês"
    />
  )
}
