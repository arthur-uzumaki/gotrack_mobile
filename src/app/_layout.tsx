import Toast from 'react-native-toast-message'

import { AuthContextProvider } from '@/contexts/auth-provider-context'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
export default function RootLayout() {
  return (
    <AuthContextProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast position="top" />
      <StatusBar style="dark" backgroundColor="transparent" translucent />
    </AuthContextProvider>
  )
}
