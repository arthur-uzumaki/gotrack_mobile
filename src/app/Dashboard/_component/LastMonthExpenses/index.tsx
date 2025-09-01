import { ExpenseList } from '@/components/ExpenseList'
import { useExpensesContext } from '@/contexts/expenses-context'
export function LastMonthExpenses() {
  const {
    lastMonth,
    loadMoreLast,
    isLoadingLast,
    isLoadingMoreLast,
    hasMoreLast,
  } = useExpensesContext()

  return (
    <ExpenseList
      isLoading={isLoadingLast}
      isLoadingMore={isLoadingMoreLast}
      data={lastMonth}
      onLoadMore={loadMoreLast}
      hasMore={hasMoreLast}
      emptyText="Nenhuma corrida registrada no mês passado"
    />
  )
}
