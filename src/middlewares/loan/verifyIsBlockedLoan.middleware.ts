import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { AppError } from '../../errors'

export const verifyIsBlockedLoan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: user_id } = req.auth

  const userRepo = AppDataSource.getRepository(User)
  const userFind = await userRepo.findOneBy({ id: user_id })

  if (userFind && userFind.date_unlock) {
    const date = new Date(userFind.date_unlock).toISOString().slice(0, 10)
    throw new AppError(
      `You are blocked from ordering books, if you have already returned them but passed the return date, you must wait until ${date} to apply for new loans.`,
      401
    )
  }

  if (userFind && userFind.is_blocked_loans) {
    throw new AppError(
      `You are blocked from ordering new books. You need to return the books that you have.`,
      401
    )
  }

  return next()
}
