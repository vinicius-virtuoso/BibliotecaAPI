import { Router } from 'express'
import {
  validateBody,
  validateToken,
  verifyIsStaff,
  verifyOwnerOrStaff,
  verifyUserExists,
} from '../middlewares'
import { userController } from '../controllers/user/user.controller'
import { createUserSchema } from '../schemas'
import { updateUserSchema } from '../schemas/user/user.schema'
import { verifyUserNotExistsId } from '../middlewares/user/verifyUserNotExistsId.middleware'

export const userRouter = Router()

userRouter.get('/', validateToken, verifyIsStaff, userController.list)

userRouter.patch(
  '/:user_id',
  validateBody(updateUserSchema),
  validateToken,
  verifyOwnerOrStaff,
  verifyUserNotExistsId,
  verifyUserExists,
  userController.update
)

userRouter.delete(
  '/:user_id',
  validateToken,
  verifyOwnerOrStaff,
  verifyUserNotExistsId,
  userController.delete
)
