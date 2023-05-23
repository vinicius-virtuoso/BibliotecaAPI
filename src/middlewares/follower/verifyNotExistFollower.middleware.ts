import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { Follower } from '../../entities'
import { AppError } from '../../errors'

export const verifyNotExistFollower = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: user_id } = req.auth
  const { follower_id } = req.params

  const followerRepo = AppDataSource.getRepository(Follower)
  const followerFind = await followerRepo.findOne({
    where: { id: follower_id, user: { id: user_id } },
  })

  if (!followerFind) {
    throw new AppError('Follower not found.', 404)
  }

  return next()
}
