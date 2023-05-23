import { Router } from 'express'
import {
  validateToken,
  verifyIsFollower,
  verifyNotExistBook,
  verifyNotExistFollower,
  verifyOwnerOrStaff,
} from '../middlewares'
import { followerController } from '../controllers/follower/follower.controller'

export const followerRouter = Router()

followerRouter.post(
  '/:book_id',
  validateToken,
  verifyNotExistBook,
  verifyIsFollower,
  followerController.create
)

followerRouter.get('/my-followers', validateToken, followerController.list)

followerRouter.delete(
  '/my-followers/:follower_id',
  validateToken,
  verifyNotExistFollower,
  followerController.delete
)
