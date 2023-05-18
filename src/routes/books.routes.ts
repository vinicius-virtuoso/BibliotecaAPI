import { Router } from 'express'
import {
  validateToken,
  validateBody,
  verifyIsStaff,
  verifyExistBook,
  verifyNotExistBook,
  verifyIsFollower,
  verifyIsBlockedLoan,
  verifyExistLoan,
} from '../middlewares'
import { bookController } from '../controllers/book/book.controller'
import { createBookSchema } from '../schemas'

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

bookRouter.post(
  '/:book_id/follower',
  validateToken,
  verifyNotExistBook,
  verifyIsFollower,
  bookController.follower
)

bookRouter.delete(
  '/:book_id',
  validateToken,
  verifyIsStaff,
  verifyNotExistBook,
  bookController.delete
)

bookRouter.post(
  '/:book_id/loan',
  validateToken,
  verifyNotExistBook,
  verifyIsBlockedLoan,
  verifyExistLoan,
  bookController.loan
)

bookRouter.patch(
  '/:book_id',
  validateToken,
  verifyIsStaff,
  verifyNotExistBook,
  verifyExistBook,
  bookController.update
)
