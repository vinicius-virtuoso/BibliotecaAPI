import { Router } from 'express'
import {
  validateToken,
  validateBody,
  verifyIsStaff,
  verifyExistBook,
  verifyNotExistBook,
} from '../middlewares'
import { bookController } from '../controllers/book/book.controller'
import { createBookSchema, updateBookSchema } from '../schemas'

export const bookRouter = Router()

bookRouter.get('/', bookController.list)
bookRouter.get('/:book_id', verifyNotExistBook, bookController.getBook)

bookRouter.post(
  '/',
  validateBody(createBookSchema),
  validateToken,
  verifyIsStaff,
  verifyExistBook,
  bookController.create
)

bookRouter.patch(
  '/:book_id',
  validateBody(updateBookSchema),
  validateToken,
  verifyIsStaff,
  verifyNotExistBook,
  verifyExistBook,
  bookController.update
)

bookRouter.delete(
  '/:book_id',
  validateToken,
  verifyIsStaff,
  verifyNotExistBook,
  bookController.delete
)
