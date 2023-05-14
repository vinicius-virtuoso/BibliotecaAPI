import { Router } from 'express'
import {
  validateToken,
  validateBody,
  verifyIsAdmin,
  verifyExistBook,
} from '../middlewares'
import { bookController } from '../controllers/book/book.controller'
import { createBookSchema } from '../schemas'

export const bookRouter = Router()

bookRouter.get('/', validateToken, bookController.list)

bookRouter.post(
  '/',
  validateBody(createBookSchema),
  validateToken,
  verifyIsAdmin,
  verifyExistBook,
  bookController.create
)
