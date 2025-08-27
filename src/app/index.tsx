import { useAuth } from '@/hooks/use-auth-hook'
import { Redirect } from 'expo-router'

export default function Index() {
  const { user } = useAuth()

  if (user) {
    console.log(user)

    return <Redirect href={'/Dashboard'} />
  }

  return <Redirect href={'/Login'} />
}
