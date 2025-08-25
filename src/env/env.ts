import { z } from 'zod/v4'

const envSchema = z.object({
  EXPO_PUBLIC_ACCESS_TOKEN: z.string().min(1),
  EXPO_PUBLIC_REFRESH_TOKEN: z.string().min(1),
})

export const env = envSchema.parse(process.env)
