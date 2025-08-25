import type {
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { api } from './axios'

export const customInstance = async <T>(
  config:
    | InternalAxiosRequestConfig
    | (Omit<InternalAxiosRequestConfig, 'headers'> & {
        headers?: Record<string, string>
      })
): Promise<T> => {
  const response: AxiosResponse<T> = await api(
    config as InternalAxiosRequestConfig
  )
  return response.data
}
