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
  id: z.string().optional(),
  title: z.string().optional(),
  synopsis: z.string().optional(),
  author: z.string().optional(),
  pages: z.number().optional(),
  language: LanguageEnum,
  date_release: z.string().optional(),
})

export const returnBookSchema = z.object({
  id: z.string(),
  title: z.string(),
  synopsis: z.string(),
  author: z.string(),
  pages: z.number(),
  language: z.string(),
  date_release: z.string(),
  quantity_copy: z.number(),
  followers: z.number(),
})
