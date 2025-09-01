import type { GetExpenses200ExpensesItem } from '@/http/schemas'
import { getGoTrackApi } from '@/http/server'
import { getCurrentMonthDates, getLastMonthDates } from '@/utils/date'
import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'

type ExpensePeriod = 'current' | 'last'

interface UseExpensesResult {
  data: GetExpenses200ExpensesItem[]
  isLoading: boolean
  isLoadingMore: boolean
  hasMore: boolean
  loadMore: () => Promise<void>
  refetch: () => Promise<void>
}

export function useExpenses(type: ExpensePeriod): UseExpensesResult {
  const [data, setData] = useState<GetExpenses200ExpensesItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const getDates = type === 'current' ? getCurrentMonthDates : getLastMonthDates

  async function fetchExpenses(
    month: number,
    year: number,
    page = 1,
    isLoadMore = false
  ) {
    try {
      if (!isLoadMore) setIsLoading(true)
      const response = await getGoTrackApi().getExpenses({ month, year, page })

      return {
        data: response.expenses,
        hasMore: response.expenses.length > 0,
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao carregar despesas',
        text2: 'Tente novamente mais tarde',
      })
      return { data: [], hasMore: false }
    } finally {
      if (!isLoadMore) setIsLoading(false)
    }
  }

  async function refetch() {
    setIsLoading(true)
    setPage(1)
    setHasMore(true)
    const { month, year } = getDates()
    const result = await fetchExpenses(month, year, 1)
    setData(result.data)
    setHasMore(result.hasMore)
    setPage(1)
    setIsLoading(false)
  }

  async function loadMore() {
    if (!hasMore || isLoadingMore) return
    try {
      setIsLoadingMore(true)
      const { month, year } = getDates()
      const nextPage = page + 1
      const result = await fetchExpenses(month, year, nextPage, true)

      setData(prev => {
        const ids = new Set(prev.map(e => e.id))
        const newItems = result.data.filter(e => !ids.has(e.id))
        return [...prev, ...newItems]
      })

      setPage(nextPage)
      setHasMore(result.hasMore)
    } finally {
      setIsLoadingMore(false)
    }
  }

  useEffect(() => {
    refetch()
  }, [type])

  return { data, isLoading, isLoadingMore, hasMore, loadMore, refetch }
}
