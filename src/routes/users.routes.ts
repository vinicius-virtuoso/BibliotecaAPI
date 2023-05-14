import { Router } from 'express'
import { validateBody, verifyUserExists } from '../middlewares'
import { userController } from '../controllers/user/user.controller'
import { createUserSchema } from '../schemas'

export const userRouter = Router()

userRouter.post(
  '/register',
  validateBody(createUserSchema),
  verifyUserExists,
  userController.create
)
