import { z } from 'zod'
import { Book } from '../../entities'
import { DeepPartial, Repository } from 'typeorm'
import { createBookSchema } from '../../schemas'

type iBookCreate = z.infer<typeof createBookSchema>
type iBookUpdate = z.infer<typeof createBookSchema>
type iBookRepo = Repository<Book>

export { iBookCreate, iBookUpdate, iBookRepo }
