import { Request, Response } from 'express'
import { userCreateService } from '../../services/user/userCreate.service'

class UserController {
  async create(req: Request, res: Response) {
    const user = await userCreateService(req.body)

    return res.status(201).json(user)
  }
}

export const userController = new UserController()
