import { Request, Response } from 'express'
import { iUserLogin } from '../../interfaces'
import { loginService } from '../../services/login/login.service'

class LoginController {
  async login(req: Request, res: Response) {
    const { username_or_email, password }: iUserLogin = req.body
    const token = await loginService({ username_or_email, password })

    return res.status(200).json(token)
  }
}

export const loginController = new LoginController()
