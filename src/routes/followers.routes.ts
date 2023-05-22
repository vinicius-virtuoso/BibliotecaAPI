import { Router } from 'express'
import {
  validateToken,
  verifyIsFollower,
  verifyNotExistBook,
} from '../middlewares'
import { followerController } from '../controllers/follower/follower.controller'

export const followerRouter = Router()

followerRouter.post(
  'followers/:book_id',
  validateToken,
  verifyNotExistBook,
  verifyIsFollower,
  followerController.create
)
