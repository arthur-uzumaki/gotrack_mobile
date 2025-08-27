import { api } from '@/lib/axios'
import type { AxiosRequestConfig } from 'axios'

export const customInstance = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  const response = await api.request<T>(config)
  return response.data
}
