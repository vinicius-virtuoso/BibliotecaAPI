import { z } from 'zod'

export const createUserSchema = z.object({
  username: z.string(),
  email: z.string().email().max(170).nonempty(),
  password: z.string().max(50).min(4).nonempty(),
  is_staff: z.boolean().default(false),
})

export const updateUserSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().max(170).nonempty().optional(),
  password: z.string().max(50).min(4).nonempty().optional(),
})

export const returnUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  is_staff: z.boolean(),
  is_blocked_loans: z.boolean(),
  date_unlock: z.string().nullable(),
})

export const returnUsersListSchema = z.array(
  z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    is_staff: z.boolean(),
    is_blocked_loans: z.boolean(),
    date_unlock: z.string().nullable(),
  })
)
