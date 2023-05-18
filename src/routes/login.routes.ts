import { Router } from 'express'
import { validateBody } from '../middlewares'
import { loginSchema } from '../schemas'
import { loginController } from '../controllers/login/login.controller'

export const loginRouter = Router()

loginRouter.post('/', validateBody(loginSchema), loginController.login)
