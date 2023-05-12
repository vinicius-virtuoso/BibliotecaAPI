import { z } from 'zod'
import { returnUserSchema, returnCopySchema } from '..'

export const createLoanSchema = z.object({
  user: z.string().nonempty(),
  copy: z.string().nonempty(),
})

export const returnLoanSchema = z.object({
  id: z.string(),
  date_loan_at: z.string(),
  devolution_at: z.string(),
  user: returnUserSchema,
  copy: returnCopySchema,
})
