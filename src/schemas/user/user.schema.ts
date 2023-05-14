import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email().max(170).nonempty(),
  password: z.string().max(50).min(4).nonempty(),
  is_staff: z.boolean().default(false),
  is_blocked_loans: z.boolean().default(false),
  date_unlock: z.string().nullable().default(null),
})

export const updateUserSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  is_staff: z.boolean().optional(),
  is_blocked_loans: z.boolean().optional(),
  date_unlock: z.string().nullable().optional(),
})

export const returnUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  is_staff: z.boolean(),
  is_blocked_loans: z.boolean(),
  date_unlock: z.string().nullable(),
})

export const loginSchema = z.object({
  username_or_email: z.string(),
  password: z.string(),
})

export const returnLoginSchema = z.object({
  accessToken: z.string(),
})
