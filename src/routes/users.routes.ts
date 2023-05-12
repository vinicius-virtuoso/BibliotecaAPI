import { Router } from 'express'
import { validateBody } from '../middlewares'
import { userController } from '../controllers/user/user.controller'
import { createUserSchema } from '../schemas'

export const userRouter = Router()

userRouter.post(
  '/register',
  validateBody(createUserSchema),
  userController.create
)
