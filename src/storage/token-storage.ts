import { env } from '@/env/env'
import AsyncStorage from '@react-native-async-storage/async-storage'

const TOKEN_STORAGE = env.EXPO_PUBLIC_ACCESS_TOKEN
const REFRESH_TOKEN_KEY = env.EXPO_PUBLIC_REFRESH_TOKEN

async function saveToken(token: string) {
  try {
    await AsyncStorage.setItem(TOKEN_STORAGE, token)
  } catch (error) {
    throw error
  }
}

async function getToken() {
  try {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE)
    return token
  } catch (error) {
    throw error
  }
}

async function saveRefreshToken(token: string) {
  try {
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token)
  } catch (error) {
    throw error
  }
}

async function getRefreshToken() {
  try {
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY)
  } catch (error) {
    throw error
  }
}

export { saveToken, getToken, saveRefreshToken, getRefreshToken }
