import { Request, Response } from 'express'
import { createFollowerOfBook } from '../../services/follower/createFollower.service'

export class FollowerController {
  async create(req: Request, res: Response) {
    const { id: user_id } = req.auth
    const { book_id } = req.params

    await createFollowerOfBook(user_id, book_id)

    return res.status(200).json()
  }
}

export const followerController = new FollowerController()
