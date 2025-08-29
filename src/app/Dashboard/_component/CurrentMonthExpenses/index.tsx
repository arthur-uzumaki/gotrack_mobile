import { ExpenseList } from '@/components/ExpenseList'
import { useExpenses } from '@/hooks/use-expenses'
export function CurrentMonthExpenses() {
  const { data, hasMore, isLoading, isLoadingMore, loadMore } =
    useExpenses('current')
  return (
    <ExpenseList
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      data={data}
      onLoadMore={loadMore}
      hasMore={hasMore}
      emptyText="Nenhuma corrida registrada neste mês"
    />
  )
}
