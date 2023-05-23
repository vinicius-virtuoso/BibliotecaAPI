import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../../data-source'
import { Loan } from '../../entities'
import { AppError } from '../../errors'

export const verifyNotExistLoan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loanRepo = AppDataSource.getRepository(Loan)
  const loan = await loanRepo.findOne({
    where: {
      id: req.params.loan_id,
      user: {
        id: req.auth.id,
      },
    },
  })

  if (!loan) {
    throw new AppError('Loan not found.', 404)
  }

  return next()
}
