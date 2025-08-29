import { ExpenseList } from '@/components/ExpenseList'
import { useExpenses } from '@/hooks/use-expenses'
export function LastMonthExpenses() {
  const { data, hasMore, isLoading, isLoadingMore, loadMore } =
    useExpenses('last')

  return (
    <ExpenseList
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      data={data}
      onLoadMore={loadMore}
      hasMore={hasMore}
      emptyText="Nenhuma corrida registrada no mês passado"
    />
  )
}
