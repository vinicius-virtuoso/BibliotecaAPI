import { NextFunction, Request, Response } from 'express'
import { AppError } from '../../errors'

export const verifyOwnerOrStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.params
  const { is_staff, id: token_id } = req.auth

  if (user_id !== token_id) {
    if (!is_staff) {
      throw new AppError('Insufficient permission.', 403)
    }
  }

  return next()
}
