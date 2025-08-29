import { useState } from 'react'
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width } = Dimensions.get('window')

// Dados simulados
const currentMonthData = {
  total: 245.8,
  rides: 18,
  averageRide: 13.66,
  mostUsedApp: 'Uber',
  rides_list: [
    {
      id: 1,
      app: 'Uber',
      date: '15/01/2024',
      time: '14:30',
      from: 'Casa',
      to: 'Shopping Center',
      price: 18.5,
      duration: '25 min',
    },
    {
      id: 2,
      app: '99',
      date: '14/01/2024',
      time: '09:15',
      from: 'Trabalho',
      to: 'Aeroporto',
      price: 45.2,
      duration: '40 min',
    },
    {
      id: 3,
      app: 'Uber',
      date: '13/01/2024',
      time: '19:45',
      from: 'Restaurante',
      to: 'Casa',
      price: 12.3,
      duration: '18 min',
    },
    {
      id: 4,
      app: '99',
      date: '12/01/2024',
      time: '08:00',
      from: 'Casa',
      to: 'Trabalho',
      price: 15.8,
      duration: '22 min',
    },
    {
      id: 5,
      app: 'Uber',
      date: '11/01/2024',
      time: '22:30',
      from: 'Cinema',
      to: 'Casa',
      price: 16.9,
      duration: '20 min',
    },
  ],
}

const previousMonthData = {
  total: 198.45,
  rides: 15,
  averageRide: 13.23,
  mostUsedApp: '99',
  rides_list: [
    {
      id: 6,
      app: '99',
      date: '28/12/2023',
      time: '16:20',
      from: 'Shopping',
      to: 'Casa',
      price: 14.7,
      duration: '19 min',
    },
    {
      id: 7,
      app: 'Uber',
      date: '27/12/2023',
      time: '11:45',
      from: 'Casa',
      to: 'Hospital',
      price: 22.4,
      duration: '28 min',
    },
    {
      id: 8,
      app: '99',
      date: '26/12/2023',
      time: '20:15',
      from: 'Festa',
      to: 'Casa',
      price: 19.8,
      duration: '25 min',
    },
    {
      id: 9,
      app: 'Uber',
      date: '25/12/2023',
      time: '15:30',
      from: 'Casa',
      to: 'Família',
      price: 28.9,
      duration: '35 min',
    },
    {
      id: 10,
      app: '99',
      date: '24/12/2023',
      time: '18:00',
      from: 'Trabalho',
      to: 'Casa',
      price: 13.2,
      duration: '17 min',
    },
  ],
}

const App = () => {
  const [selectedTab, setSelectedTab] = useState('current')
  const [selectedPeriod, setSelectedPeriod] = useState('Janeiro 2024')

  const difference = currentMonthData.total - previousMonthData.total
  const percentageChange = (
    (difference / previousMonthData.total) *
    100
  ).toFixed(1)
  const isIncrease = difference > 0

  const budgetLimit = 300
  const budgetProgress = (currentMonthData.total / budgetLimit) * 100

  const AppBadge = ({ app }: { app: string }) => (
    <View
      style={[styles.badge, app === 'Uber' ? styles.uberBadge : styles.badge99]}
    >
      <Text
        style={[
          styles.badgeText,
          app === 'Uber' ? styles.uberText : styles.text99,
        ]}
      >
        {app}
      </Text>
    </View>
  )

  const RideItem = ({ ride }: { ride: any }) => (
    <View style={styles.rideItem}>
      <AppBadge app={ride.app} />
      <View style={styles.rideDetails}>
        <View style={styles.rideRoute}>
          <Text style={styles.routeText}>
            📍 {ride.from} → {ride.to}
          </Text>
        </View>
        <Text style={styles.rideInfo}>
          {ride.date} • {ride.time} • {ride.duration}
        </Text>
      </View>
      <View style={styles.ridePrice}>
        <Text style={styles.priceText}>R$ {ride.price.toFixed(2)}</Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gastos com Corridas</Text>
        <TouchableOpacity style={styles.periodButton}>
          <Text style={styles.periodText}>📅 {selectedPeriod}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Resumo Mensal */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.cardLabel}>Este Mês</Text>
            <Text style={styles.cardValue}>
              R$ {currentMonthData.total.toFixed(2)}
            </Text>
            <Text style={styles.cardSubtext}>
              🚗 {currentMonthData.rides} corridas
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.cardLabel}>Mês Passado</Text>
            <Text style={styles.cardValue}>
              R$ {previousMonthData.total.toFixed(2)}
            </Text>
            <Text style={styles.cardSubtext}>
              🚗 {previousMonthData.rides} corridas
            </Text>
          </View>
        </View>

        {/* Histórico */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Histórico de Corridas</Text>
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'current' && styles.activeTab,
              ]}
              onPress={() => setSelectedTab('current')}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'current' && styles.activeTabText,
                ]}
              >
                Este Mês
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'previous' && styles.activeTab,
              ]}
              onPress={() => setSelectedTab('previous')}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'previous' && styles.activeTabText,
                ]}
              >
                Mês Passado
              </Text>
            </TouchableOpacity>
          </View>

          {/* Lista de Corridas */}
          <View style={styles.ridesContainer}>
            {(selectedTab === 'current'
              ? currentMonthData.rides_list
              : previousMonthData.rides_list
            ).map(ride => (
              <RideItem key={ride.id} ride={ride} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  periodText: {
    fontSize: 14,
    color: '#64748b',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  cardSubtext: {
    fontSize: 12,
    color: '#64748b',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
    padding: 16,
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  comparisonContent: {
    gap: 12,
  },
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  comparisonLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  comparisonValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  budgetContent: {
    gap: 8,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  budgetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  budgetText: {
    fontSize: 12,
    color: '#64748b',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#ffffff',
  },
  tabText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#1e293b',
  },
  ridesContainer: {
    gap: 12,
  },
  rideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    gap: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 40,
    alignItems: 'center',
  },
  uberBadge: {
    backgroundColor: '#000000',
  },
  badge99: {
    backgroundColor: '#fbbf24',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  uberText: {
    color: '#ffffff',
  },
  text99: {
    color: '#000000',
  },
  rideDetails: {
    flex: 1,
  },
  rideRoute: {
    marginBottom: 4,
  },
  routeText: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
  },
  rideInfo: {
    fontSize: 12,
    color: '#64748b',
  },
  ridePrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
})

export default App
