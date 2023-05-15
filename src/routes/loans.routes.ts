import { Router } from 'express'
import { validateToken, verifyOwnerOrStaff } from '../middlewares'

export const loanRouter = Router()

loanRouter.get(
  '/:user_id',
  validateToken,
  verifyOwnerOrStaff,
  loanController.list
)

loanRouter.post('/:book_id', validateToken, loanController.create)
