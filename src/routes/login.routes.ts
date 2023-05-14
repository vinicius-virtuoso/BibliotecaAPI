import { Router } from 'express'
import { validateBody } from '../middlewares'
import { userController } from '../controllers/user/user.controller'
import { loginSchema } from '../schemas'

export const loginRouter = Router()

loginRouter.post('/', validateBody(loginSchema), userController.login)
