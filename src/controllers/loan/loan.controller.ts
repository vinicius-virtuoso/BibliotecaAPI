import { Request, Response } from 'express'
import { listLoanService } from '../../services/loan/listLoan.service'
import { devolutionLoanService } from '../../services/loan/devolutionLoan.service'

export class LoanController {
  async list(req: Request, res: Response) {
    const { id: user_id } = req.auth

    const loans = await listLoanService(user_id)

    return res.status(200).json(loans)
  }

  async devolution(req: Request, res: Response) {
    const { id: user_id } = req.auth
    const { book_id } = req.params

    await devolutionLoanService(user_id, book_id)

    return res.status(204).json()
  }
}

export const loanController = new LoanController()
