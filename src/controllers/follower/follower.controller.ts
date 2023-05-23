import { Request, Response } from 'express'
import { createFollowerOfBookService } from '../../services/follower/createFollower.service'
import { listFollowerService } from '../../services/follower/listFollowers.service'
import { deleteFollowerService } from '../../services/follower/deleteFollower.service'

export class FollowerController {
  async list(req: Request, res: Response) {
    const { id: user_id } = req.auth

    const follower = await listFollowerService(user_id)

    return res.status(200).json(follower)
  }

  async create(req: Request, res: Response) {
    const { id: user_id } = req.auth
    const { book_id } = req.params

    const follower = await createFollowerOfBookService(user_id, book_id)

    return res.status(200).json(follower)
  }

  async delete(req: Request, res: Response) {
    const { follower_id } = req.params

    await deleteFollowerService(follower_id)

    return res.status(204).json()
  }
}

export const followerController = new FollowerController()
