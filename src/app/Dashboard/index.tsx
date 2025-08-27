import { CardExpenseSummary } from '@/components/CardExpenseSummary'
import { LoadingSpinner } from '@/components/Loading'
import type { GetExpensesSummary200SummaryItem } from '@/http/schemas'
import { getGoTrackApi } from '@/http/server'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { styles } from './styles'

interface SummaryData {
  currentMonth: GetExpensesSummary200SummaryItem | null
  lastMonth: GetExpensesSummary200SummaryItem | null
}

const { Navigator, Screen } = createMaterialTopTabNavigator()
export default function Dashboard() {
  const [summaryData, setSummaryData] = useState<SummaryData>({
    currentMonth: null,
    lastMonth: null,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBothMonthsData() {
      try {
        setLoading(true)
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

        console.log(currentMonthDates)

        setSummaryData({
          currentMonth: currentMonthResult.summary?.[0] || null,
          lastMonth: lastMonthResult.summary?.[0] || null,
        })
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchBothMonthsData()
  }, [])

  function getCurrentMonthDates() {
    const now = new Date()
    return {
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    }
  }
  function getLastMonthDates() {
    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    return {
      month: lastMonth.getMonth() + 1,
      year: lastMonth.getFullYear(),
    }
  }

  function getMonthName(monthOffset = 0) {
    const now = new Date()
    const month = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)
    return month.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {summaryData.currentMonth ? (
          <CardExpenseSummary
            label={`${getMonthName(0)} `}
            data={summaryData.currentMonth}
          />
        ) : (
          <View style={styles.noDataCard}>
            <Text style={styles.noDataText}>Sem dados para o mês passado</Text>
          </View>
        )}

        {summaryData.lastMonth ? (
          <CardExpenseSummary
            label={`${getMonthName(-1)} `}
            data={summaryData.lastMonth}
          />
        ) : (
          <View style={styles.noDataCard}>
            <Text style={styles.noDataText}>Sem dados para o mês passado</Text>
          </View>
        )}
      </View>

      <>
        <Navigator
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: 'bold',
              textTransform: 'capitalize',
            },
            tabBarStyle: {
              flexDirection: 'row',
              backgroundColor: '#f1f5f9',
              borderRadius: 12,
              padding: 4,
              marginHorizontal: 16,
              marginBottom: 16,
              elevation: 0,
              shadowOpacity: 0,
              height: 48,
            },
            tabBarIndicatorStyle: {
              backgroundColor: '#fff',
              height: 40,
              borderRadius: 10,
              top: 4,
            },

            tabBarContentContainerStyle: {
              justifyContent: 'center',
            },
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#8E8E93',
          }}
        >
          <Screen
            name="CurrentMonth"
            options={{
              tabBarLabel: 'Este Mês',
            }}
            component={() => (
              <View>
                <Text>Este mês</Text>
              </View>
            )}
          />

          <Screen
            name="LastMonth"
            options={{
              tabBarLabel: 'Mês Passado',
            }}
            component={() => (
              <View>
                <Text>Mês passado</Text>
              </View>
            )}
          />
        </Navigator>
      </>
    </View>
  )
}
