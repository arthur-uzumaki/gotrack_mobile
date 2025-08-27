import { useAuth } from '@/hooks/use-auth-hook'
import type { GetMe200, GetMe200User } from '@/http/schemas'
import { getGoTrackApi } from '@/http/server'
import { getToken } from '@/storage/token-storage'
import { useEffect, useState } from 'react'

import { Text, View } from 'react-native'

export default function Dashboard() {
  const [user, setUser] = useState<GetMe200User | null>(null)
  useEffect(() => {
    async function fetchProfile() {
      try {
        const tokens = await getToken()
        console.log(tokens?.accessToken)

        if (tokens?.accessToken) {
          const response = await getGoTrackApi().getMe()
          setUser(response.user)
          console.log(response.user)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfile()
  }, [])
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Oi: {user?.name}</Text>
    </View>
  )
}
