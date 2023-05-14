import { Request, Response } from 'express'
import { userCreateService } from '../../services/user/userCreate.service'
import { loginService } from '../../services/login/login.service'

class UserController {
  async login(req: Request, res: Response) {
    const { username_or_email, password } = req.body
    const token = await loginService({ username_or_email, password })

    return res.status(200).json(token)
  }

  async create(req: Request, res: Response) {
    const user = await userCreateService(req.body)

    return res.status(201).json(user)
  }
}

export const userController = new UserController()
