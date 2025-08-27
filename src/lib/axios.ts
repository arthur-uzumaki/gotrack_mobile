import { getToken, removeToken, saveToken } from '@/storage/token-storage'
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.1.34:3333',
})

api.interceptors.request.use(
  async request => {
    const tokens = await getToken()
    if (tokens?.accessToken) {
      request.headers.Authorization = ` ${tokens.accessToken}`
    }
    return request
  },
  error => Promise.reject(error)
)

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const tokens = await getToken()

        if (!tokens?.refreshToken) {
          await removeToken()
          return Promise.reject(error)
        }

        // 🚀 chama o refresh token no backend
        const { data } = await axios.post(
          'http://192.168.1.34:3333/refresh-token',
          {
            refreshToken: tokens.refreshToken,
          }
        )

        // salva novos tokens
        await saveToken({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        console.log('❌ Refresh token inválido, deslogando...')
        await removeToken()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
