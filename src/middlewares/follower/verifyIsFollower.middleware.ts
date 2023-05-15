import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { Follower } from '../../entities'
import { AppError } from '../../errors'

export const verifyIsFollower = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.auth
  const { book_id } = req.params

  const followerRepo = AppDataSource.getRepository(Follower)
  const followerFind = await followerRepo.findOne({
    where: { user: { id: id }, book: { id: book_id } },
  })

  if (followerFind) {
    throw new AppError('You are already following this book', 409)
  }

  return next()
}
