import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { Copy, Loan } from '../../entities'
import { AppError } from '../../errors'

export const verifyExistLoan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: user_id } = req.auth
  const { book_id } = req.params

  const copyRepo = AppDataSource.getRepository(Copy)
  const copyFind = await copyRepo.findOne({
    where: {
      book: {
        id: book_id,
      },
    },
  })

  if (copyFind) {
    const loanRepo = AppDataSource.getRepository(Loan)
    const findLoan = await loanRepo.findOne({
      where: {
        user: {
          id: user_id,
        },
        copy: {
          id: copyFind.id,
        },
      },
    })

    if (findLoan) {
      throw new AppError(
        'You have already ordered this book, you need to return it to order it again.',
        409
      )
    }

    return next()
  }
}
