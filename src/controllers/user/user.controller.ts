import { Request, Response } from 'express'
import { createUserService } from '../../services/user/createUser.service'
import { iCreateUser, iUpdateUser } from '../../interfaces'
import { updateUserService } from '../../services/user/updateUser.service'
import { listUserService } from '../../services/user/listUsers.service'
import { deleteUserService } from '../../services/user/deleteUser.service'

class UserController {
  async list(req: Request, res: Response) {
    const users = await listUserService()

    return res.status(200).json(users)
  }

  async create(req: Request, res: Response) {
    const body: iCreateUser = req.body

    const user = await createUserService(body)

    return res.status(201).json(user)
  }

  async update(req: Request, res: Response) {
    const { user_id } = req.params
    const payload: iUpdateUser = req.body

    const user = await updateUserService(user_id, payload)

    return res.status(200).json(user)
  }

  async delete(req: Request, res: Response) {
    const { user_id } = req.params

    await deleteUserService(user_id)

    return res.status(204).json()
  }
}

export const userController = new UserController()
