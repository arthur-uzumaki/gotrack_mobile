import {
  getRefreshToken,
  getToken,
  saveRefreshToken,
  saveToken,
} from '@/storage/token-storage'
import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

type FailedRequest = {
  resolve: (token: string | null) => void
  reject: (error: unknown) => void
}

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
})

api.interceptors.request.use(
  async config => {
    const token = await getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

let isRefreshing = false
let failedQueue: FailedRequest[] = []

const processQueue = (error: unknown, token: string | null = null) => {
  // biome-ignore lint/complexity/noForEach: <explanation>
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(token => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return api(originalRequest)
          })
          .catch(err => Promise.reject(err))
      }
      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = await getRefreshToken()
        if (!refreshToken) {
          return Promise.reject(error)
        }

        const response = await axios.post<{
          accessToken: string
          newRefreshToken: string
        }>('http://localhost:3333/refresh-token', { refreshToken })

        const { accessToken: newAccessToken, newRefreshToken } = response.data
        await saveToken(newAccessToken)
        await saveRefreshToken(newRefreshToken)
        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`
        processQueue(null, newAccessToken)
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (error) {
        processQueue(error, null)
        return Promise.reject(error)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)
