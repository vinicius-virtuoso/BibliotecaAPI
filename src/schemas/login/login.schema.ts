import { z } from 'zod'

export const loginSchema = z.object({
  username_or_email: z.string(),
  password: z.string(),
})

export const returnLoginSchema = z.object({
  accessToken: z.string(),
})
