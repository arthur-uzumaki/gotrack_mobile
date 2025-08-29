import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { SafeAreaView, Text, View } from 'react-native'
import { CurrentMonthExpenses } from './_component/CurrentMonthExpenses'
import { GetExpenseSummary } from './_component/GetExpenseSummary'
import { LastMonthExpenses } from './_component/LastMonthExpenses'
import { styles } from './styles'

const { Navigator, Screen } = createMaterialTopTabNavigator()

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GetExpenseSummary />
      </View>

      <SafeAreaView style={styles.container}>
        <View style={styles.headerNavigation}>
          <Text style={styles.headerNavigationTitle}>Gastos com Corridas</Text>
        </View>

        <Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
            tabBarStyle: { backgroundColor: '#f1f5f9' },
            tabBarActiveTintColor: '#1e293b',
            tabBarInactiveTintColor: '#64748b',
            tabBarIndicatorStyle: { backgroundColor: '#1e293b' },
          }}
        >
          <Screen name="Este mês" component={CurrentMonthExpenses} />

          <Screen name="Mês passado" component={LastMonthExpenses} />
        </Navigator>
      </SafeAreaView>
    </View>
  )
}
