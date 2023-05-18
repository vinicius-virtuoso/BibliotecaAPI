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

export const returnBookOneSchema = z.object({
  book_id: z.string(),
  book_title: z.string(),
  book_synopsis: z.string(),
  book_author: z.string(),
  book_pages: z.number(),
  book_language: z.string(),
  book_date_release: z.string().or(z.date()),
  copy: z.object({
    copy_id: z.string(),
    copy_quantity: z.number(),
    copy_created_at: z.string().or(z.date()),
  }),
  count_followers: z.number(),
  followers: z.array(
    z.object({
      follower_id: z.string(),
      follower_username: z.string(),
    })
  ),
})

export const returnBookListSchema = z.array(
  z.object({
    book_id: z.string(),
    book_title: z.string(),
    book_synopsis: z.string(),
    book_author: z.string(),
    book_pages: z.number(),
    book_language: z.string(),
    book_date_release: z.string().or(z.date()),
    copy: z.object({
      copy_id: z.string(),
      copy_quantity: z.number(),
      copy_created_at: z.string().or(z.date()),
    }),
    count_followers: z.number(),
    followers: z.array(
      z.object({
        follower_id: z.string(),
        follower_username: z.string(),
      })
    ),
  })
)
