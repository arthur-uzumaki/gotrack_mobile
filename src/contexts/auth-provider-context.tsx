import { getGoTrackApi } from '@/http/server'
import { getToken, removeToken, saveToken } from '@/storage/token-storage'
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
      await removeToken()
      const response = await api.postSessions({
        email,
        password,
      })

      const { accessToken, refreshToken } = response

      await saveToken({ accessToken, refreshToken })
      const userResponse = await api.getMe()
      setUser(userResponse.user)
      router.replace('/Dashboard')
    } catch (error) {
      throw error
    }
  }

  async function signup({ name, email, password, avatarUrl }: SignupProps) {
    try {
      const response = await api.postRegisters({
        email,
        name,
        password,
        avatarUrl,
      })

      console.log(response.userId)
    } catch (error) {
      throw error
    }
  }

  async function logout() {
    router.replace('/Login')
  }

  useEffect(() => {
    async function fetchProfile() {
      try {
        const tokens = await getToken()

        if (tokens?.accessToken) {
          const response = await getGoTrackApi().getMe()
          setUser(response.user)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfile()
  }, [])

  return (
    <AuthContext.Provider value={{ user, logout, signin, signup }}>
      {children}
    </AuthContext.Provider>
  )
}
