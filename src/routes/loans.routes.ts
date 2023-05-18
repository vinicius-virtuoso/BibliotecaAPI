import { Router } from 'express'
import { validateToken } from '../middlewares'
import { loanController } from '../controllers/loan/loan.controller'

export const loanRouter = Router()

loanRouter.get('/my-loans', validateToken, loanController.list)
loanRouter.delete(
  '/my-loans/:book_id',
  validateToken,
  loanController.devolution
)
