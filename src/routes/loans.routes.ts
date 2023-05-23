import { Router } from 'express'
import {
  validateToken,
  verifyExistLoan,
  verifyIsBlockedLoan,
  verifyNotExistBook,
  verifyNotExistLoan,
} from '../middlewares'
import { loanController } from '../controllers/loan/loan.controller'

export const loanRouter = Router()

loanRouter.get('/my-loans', validateToken, loanController.list)

loanRouter.get(
  '/my-loans/:loan_id',
  validateToken,
  verifyNotExistLoan,
  loanController.retrieve
)

loanRouter.post(
  '/:book_id',
  validateToken,
  verifyNotExistBook,
  verifyIsBlockedLoan,
  verifyExistLoan,
  loanController.create
)

loanRouter.delete(
  '/my-loans/:loan_id',
  validateToken,
  verifyNotExistLoan,
  loanController.devolution
)
