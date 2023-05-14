import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { AppError } from '../../errors'

export const verifyUserNotExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username } = req.body

  const userRepo = AppDataSource.getRepository(User)
  const findUser = await userRepo.exist({
    where: [{ email }, { username }],
  })

  if (!findUser) {
    throw new AppError('User not found', 404)
  }

  return next()
}
