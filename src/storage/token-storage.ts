import AsyncStorage from '@react-native-async-storage/async-storage'

const TOKEN_STORAGE = 'authTokens'
const REFRESH_TOKEN_KEY = 'refresh-token'

async function saveToken(tokens: {
  accessToken: string
  refreshToken: string
}) {
  try {
    await AsyncStorage.setItem(TOKEN_STORAGE, JSON.stringify(tokens))
  } catch (error) {
    throw error
  }
}

async function getToken(): Promise<{
  accessToken: string
  refreshToken: string
} | null> {
  try {
    const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE)
    if (!tokenStorage) {
      return null
    }
    return JSON.parse(tokenStorage)
  } catch (error) {
    throw error
  }
}

async function removeToken() {
  try {
    await AsyncStorage.removeItem(TOKEN_STORAGE)
  } catch (error) {
    throw error
  }
}

export { saveToken, getToken, removeToken }
