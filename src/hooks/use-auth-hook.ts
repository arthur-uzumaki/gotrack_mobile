import {
  AuthContext,
  type AuthContextProviderData,
} from '@/contexts/auth-provider-context'
import { useContext } from 'react'

export function useAuth(): AuthContextProviderData {
  const context = useContext(AuthContext)
  return context
}
