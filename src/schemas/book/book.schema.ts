import { availabilityBook } from './../../utils/book/availabilityBook.utils'
import { z } from 'zod'

const LanguageEnum = z
  .nativeEnum({
    'en-US': 'en-US',
    'pt-BR': 'pt-BR',
    'pt-PT': 'pt-PT',
  })
  .default('en-US')

export const createBookSchema = z.object({
  title: z.string().max(180).nonempty(),
  synopsis: z.string().nonempty(),
  author: z.string().max(50).nonempty(),
  pages: z.number().min(1),
  language: LanguageEnum,
  date_release: z.string().nonempty(),
  quantity_copy: z.number().min(1),
})

export const updateBookSchema = z.object({
  title: z.string().max(180).nonempty().optional(),
  synopsis: z.string().nonempty().optional(),
  author: z.string().max(50).nonempty().optional(),
  pages: z.number().min(1).optional(),
  language: LanguageEnum.optional(),
  date_release: z.string().nonempty().optional(),
  quantity_copy: z.number().min(1).optional(),
})

export const returnBookOneSchema = z.object({
  id: z.string(),
  title: z.string(),
  synopsis: z.string(),
  author: z.string(),
  pages: z.number(),
  language: z.string(),
  date_release: z.string().or(z.date()),
  availability: z.boolean(),
  copy: z.object({
    id: z.string(),
    quantity: z.number(),
    created_at: z.string().or(z.date()),
  }),
  count_followers: z.number(),
  followers: z.array(
    z.object({
      id: z.string(),
      username: z.string(),
    })
  ),
})

export const returnBookListSchema = z.array(returnBookOneSchema)
