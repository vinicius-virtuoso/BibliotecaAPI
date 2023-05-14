import { NextFunction, Request, Response } from 'express'
import { AppError } from '../../errors'

export const verifyUpdateIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const { is_staff, id: token_id } = req.auth

  if (id !== token_id) {
    if (is_staff) {
      throw new AppError('Insufficient permission', 403)
    }
  }

  return next()
}
