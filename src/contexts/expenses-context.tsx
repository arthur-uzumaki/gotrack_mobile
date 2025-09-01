import type { GetExpensesSummary200SummaryItem } from '@/components/CardExpenseSummary'
import type { GetExpenses200ExpensesItem } from '@/http/schemas'
import { getGoTrackApi } from '@/http/server'
import { getCurrentMonthDates, getLastMonthDates } from '@/utils/date'
import { createContext, useContext, useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'

type ExpensePeriod = 'current' | 'last'

export interface ExpensesContextType {
  currentMonth: GetExpenses200ExpensesItem[]
  lastMonth: GetExpenses200ExpensesItem[]
  currentSummary: GetExpensesSummary200SummaryItem | null
  lastSummary: GetExpensesSummary200SummaryItem | null
  isLoadingCurrent: boolean
  isLoadingLast: boolean
  isLoadingMoreCurrent: boolean
  isLoadingMoreLast: boolean
  hasMoreCurrent: boolean
  hasMoreLast: boolean
  loadMoreCurrent: () => Promise<void>
  loadMoreLast: () => Promise<void>
  refetchCurrent: () => Promise<void>
  refetchLast: () => Promise<void>
  refetchSummary: (period?: ExpensePeriod) => Promise<void>
}

const ExpensesContext = createContext<ExpensesContextType>(
  {} as ExpensesContextType
)

export function ExpensesProvider({ children }: { children: React.ReactNode }) {
  const [currentMonth, setCurrentMonth] = useState<
    GetExpenses200ExpensesItem[]
  >([])
  const [lastMonth, setLastMonth] = useState<GetExpenses200ExpensesItem[]>([])
  const [currentSummary, setCurrentSummary] =
    useState<GetExpensesSummary200SummaryItem | null>(null)
  const [lastSummary, setLastSummary] =
    useState<GetExpensesSummary200SummaryItem | null>(null)
  const [isLoadingCurrent, setIsLoadingCurrent] = useState(true)
  const [isLoadingLast, setIsLoadingLast] = useState(true)
  const [isLoadingMoreCurrent, setIsLoadingMoreCurrent] = useState(false)
  const [isLoadingMoreLast, setIsLoadingMoreLast] = useState(false)
  const [pageCurrent, setPageCurrent] = useState(1)
  const [pageLast, setPageLast] = useState(1)
  const [hasMoreCurrent, setHasMoreCurrent] = useState(true)
  const [hasMoreLast, setHasMoreLast] = useState(true)

  function getDates(period: ExpensePeriod) {
    return period === 'current' ? getCurrentMonthDates() : getLastMonthDates()
  }

  async function fetchExpensesFromApi(period: ExpensePeriod, page = 1) {
    const { month, year } = getDates(period)
    const res = await getGoTrackApi().getExpenses({ month, year, page })
    return res.expenses || []
  }

  async function fetchSummaryFromApi(period: ExpensePeriod) {
    const { month, year } = getDates(period)
    const res = await getGoTrackApi().getExpensesSummary({ month, year })
    return res.summary?.[0] || null
  }

  async function fetchExpenses(
    period: ExpensePeriod,
    page = 1,
    isLoadMore = false
  ) {
    try {
      if (!isLoadMore) {
        period === 'current'
          ? setIsLoadingCurrent(true)
          : setIsLoadingLast(true)
      }

      const [expensesData, summaryData] = await Promise.all([
        fetchExpensesFromApi(period, page),
        fetchSummaryFromApi(period),
      ])

      if (period === 'current') {
        setCurrentMonth(
          isLoadMore ? prev => [...prev, ...expensesData] : expensesData
        )
        setCurrentSummary(summaryData)
        setHasMoreCurrent(expensesData.length > 0)
        setPageCurrent(page)
      } else {
        setLastMonth(
          isLoadMore ? prev => [...prev, ...expensesData] : expensesData
        )
        setLastSummary(summaryData)
        setHasMoreLast(expensesData.length > 0)
        setPageLast(page)
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao carregar despesas',
        text2: 'Tente novamente mais tarde',
      })
    } finally {
      if (!isLoadMore) {
        period === 'current'
          ? setIsLoadingCurrent(false)
          : setIsLoadingLast(false)
      }
    }
  }

  async function loadMoreCurrent() {
    if (!hasMoreCurrent || isLoadingMoreCurrent) return
    setIsLoadingMoreCurrent(true)
    await fetchExpenses('current', pageCurrent + 1, true)
    setIsLoadingMoreCurrent(false)
  }

  async function loadMoreLast() {
    if (!hasMoreLast || isLoadingMoreLast) return
    setIsLoadingMoreLast(true)
    await fetchExpenses('last', pageLast + 1, true)
    setIsLoadingMoreLast(false)
  }

  async function refetchCurrent() {
    await fetchExpenses('current', 1)
  }

  async function refetchLast() {
    await fetchExpenses('last', 1)
  }

  async function refetchSummary(period?: ExpensePeriod) {
    if (!period || period === 'current')
      setCurrentSummary(await fetchSummaryFromApi('current'))
    if (!period || period === 'last')
      setLastSummary(await fetchSummaryFromApi('last'))
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    refetchCurrent()
    refetchLast()
  }, [])

  return (
    <ExpensesContext.Provider
      value={{
        currentMonth,
        lastMonth,
        currentSummary,
        lastSummary,
        isLoadingCurrent,
        isLoadingLast,
        isLoadingMoreCurrent,
        isLoadingMoreLast,
        hasMoreCurrent,
        hasMoreLast,
        loadMoreCurrent,
        loadMoreLast,
        refetchCurrent,
        refetchLast,
        refetchSummary,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  )
}

export function useExpensesContext() {
  return useContext(ExpensesContext)
}
