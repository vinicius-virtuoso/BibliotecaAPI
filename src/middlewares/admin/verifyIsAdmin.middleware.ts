import { NextFunction, Request, Response } from 'express'
import { AppError } from '../../errors'

export const verifyIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { is_staff } = req.auth

  console.log(is_staff)

  if (!is_staff) {
    throw new AppError('Insufficient permission', 403)
  }

  return next()
}
