import { getGoTrackApi } from '@/http/server'
import { saveToken } from '@/storage/token-storage'
import { useRouter } from 'expo-router'
import { type ReactNode, createContext, useEffect, useState } from 'react'

const api = getGoTrackApi()

interface UserProps {
  name: string
  email: string
  avatarUrl: string
}

interface SigninProps {
  email: string
  password: string
}

interface SignupProps {
  name: string
  email: string
  password: string
  avatarUrl: string
}

export interface AuthContextProviderData {
  user: UserProps | null
  signin: ({ email, password }: SigninProps) => Promise<void>
  signup: ({ email, name, password }: SignupProps) => Promise<void>
  logout: () => Promise<void>
}

interface AuthProvider {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProviderData)

export function AuthContextProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<UserProps | null>(null)
  const router = useRouter()

  async function signin({ email, password }: SigninProps) {
    try {
      const response = await api.postSessions({
        email,
        password,
      })

      const { accessToken, refreshToken } = response

      await saveToken({ accessToken, refreshToken })
    } catch (error) {
      throw error
    }
  }

  async function signup({ name, email, password, avatarUrl }: SignupProps) {
    try {
      await api.postRegisters({
        email,
        name,
        password,
        avatarUrl,
      })
    } catch (error) {
      throw error
    }
  }

  async function logout() {
    setUser(null)
    router.replace('/Login')
  }

  return (
    <AuthContext.Provider value={{ user, logout, signin, signup }}>
      {children}
    </AuthContext.Provider>
  )
}
