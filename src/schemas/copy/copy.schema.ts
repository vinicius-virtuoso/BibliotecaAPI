import { z } from 'zod'
import { returnBookOneSchema } from '..'

export const createCopySchema = z.object({
  quantity: z.number().min(1),
  book: z.string(),
})

export const returnCopySchema = z.object({
  id: z.string(),
  quantity: z.number().min(1),
  created_at: z.string(),
  book: returnBookOneSchema,
})
