import { Router } from 'express'
import {
  validateToken,
  verifyExistLoan,
  verifyIsBlockedLoan,
  verifyNotExistBook,
} from '../middlewares'
import { loanController } from '../controllers/loan/loan.controller'

export const loanRouter = Router()

loanRouter.get('/my-loans', validateToken, loanController.list)

loanRouter.post(
  '/:book_id',
  validateToken,
  verifyNotExistBook,
  verifyIsBlockedLoan,
  verifyExistLoan,
  loanController.create
)

loanRouter.delete(
  '/my-loans/:book_id',
  validateToken,
  loanController.devolution
)
