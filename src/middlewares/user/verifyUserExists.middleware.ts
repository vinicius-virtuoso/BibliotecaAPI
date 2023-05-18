import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { AppError } from '../../errors'

export const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username } = req.body

  if (email || username) {
    const userRepo = AppDataSource.getRepository(User)
    const findUser = await userRepo.exist({
      where: [{ email: email }, { username }],
    })

    if (findUser) {
      throw new AppError('Email/Username already exists.', 409)
    }
  }

  return next()
}
