import { z } from 'zod'
import { returnBookSchema } from '..'

export const createCopySchema = z.object({
  quantity: z.number().min(1),
  book: z.string(),
})

export const returnCopySchema = z.object({
  id: z.string(),
  book: returnBookSchema,
  quantity: z.number().min(1),
  created_at: z.string(),
})
