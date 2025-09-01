import { useAuth } from '@/hooks/use-auth-hook'
import { MaterialIcons } from '@expo/vector-icons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Link } from 'expo-router'
import { useState } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { CreateExpense } from './_component/CreateExpense'
import { CurrentMonthExpenses } from './_component/CurrentMonthExpenses'
import { GetExpenseSummary } from './_component/GetExpenseSummary'
import { LastMonthExpenses } from './_component/LastMonthExpenses'
import { styles } from './styles'

const { Navigator, Screen } = createMaterialTopTabNavigator()

export default function Dashboard() {
  const { user } = useAuth()
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <View style={styles.container}>
      <View style={styles.headerAvatar}>
        <Link href={'/Profile'}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: user?.avatarUrl }}
              style={styles.avatar}
              alt="Avatar do usuário"
            />
            <View style={styles.greeting}>
              <Text style={styles.greetingText}>Olá,</Text>
              <Text style={styles.userName}>{user?.name}</Text>
            </View>
          </View>
        </Link>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>
            <MaterialIcons name="add" size={24} />
          </Text>
        </TouchableOpacity>
      </View>
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
      <CreateExpense
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  )
}
