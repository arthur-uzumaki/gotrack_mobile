// app/Dashboard/_layout.tsx
import { ExpensesProvider } from '@/contexts/expenses-context'
import { Stack } from 'expo-router'

export default function DashboardLayout() {
  return (
    <ExpensesProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ExpensesProvider>
  )
}
