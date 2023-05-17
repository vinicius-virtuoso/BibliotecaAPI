import { NextFunction, Request, Response } from 'express'
import { AppError } from '../../errors'

export const verifyIsStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { is_staff } = req.auth

  if (!is_staff) {
    throw new AppError('Insufficient permission.', 403)
  }

  return next()
}
