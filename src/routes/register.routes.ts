import { Router } from 'express'
import { validateBody, verifyUserExists } from '../middlewares'
import { registerController } from '../controllers/register/register.controller'
import { createUserSchema } from '../schemas'

export const registerRouter = Router()

registerRouter.post(
  '/',
  validateBody(createUserSchema),
  verifyUserExists,
  registerController.create
)
