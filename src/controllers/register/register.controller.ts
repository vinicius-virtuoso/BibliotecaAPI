import { Request, Response } from 'express'
import { iCreateUser } from '../../interfaces'
import { createUserService } from '../../services/user/createUser.service'

export class RegisterController {
  async create(req: Request, res: Response) {
    const body: iCreateUser = req.body

    const user = await createUserService(body)

    return res.status(201).json(user)
  }
}

export const registerController = new RegisterController()
