import { z } from 'zod'

export const createLoanSchema = z.object({
  user: z.string().nonempty(),
  copy: z.string().nonempty(),
})

export const returnLoanSchema = z.object({
  id: z.string(),
  created_at: z.string().or(z.date()),
  devolution_at: z.string().or(z.date()),
  user: z.object({
    id: z.string(),
    username: z.string(),
  }),
  copy: z.object({
    id: z.string(),
    quantity: z.number(),
    book: z.object({
      id: z.string(),
      title: z.string(),
    }),
  }),
})

export const returnLoanListSchema = z.array(
  z.object({
    id: z.string(),
    created_at: z.string(),
    devolution_at: z.string(),
    user: z.object({
      id: z.string(),
      username: z.string(),
    }),
    copy: z.object({
      id: z.string(),
      quantity: z.number(),
      book: z.object({
        id: z.string(),
        title: z.string(),
      }),
    }),
  })
)
