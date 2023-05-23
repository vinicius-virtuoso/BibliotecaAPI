import { Request, Response } from 'express'
import { listLoanService } from '../../services/loan/listLoan.service'
import { devolutionLoanService } from '../../services/loan/devolutionLoan.service'
import { createLoanService } from '../../services/loan/createLoan.service'
import { retrieveLoanService } from '../../services/loan/retrieveLoan.service'

export class LoanController {
  async list(req: Request, res: Response) {
    const { id: user_id } = req.auth

    const loans = await listLoanService(user_id)

    return res.status(200).json(loans)
  }

  async create(req: Request, res: Response) {
    const { id: user_id } = req.auth
    const { book_id } = req.params

    const loan = await createLoanService(user_id, book_id)

    return res.status(201).json(loan)
  }

  async retrieve(req: Request, res: Response) {
    const { id: user_id } = req.auth
    const { loan_id } = req.params

    const loan = await retrieveLoanService(loan_id, user_id)

    return res.status(201).json(loan)
  }

  async devolution(req: Request, res: Response) {
    const { loan_id } = req.params

    await devolutionLoanService(loan_id)

    return res.status(204).json()
  }
}

export const loanController = new LoanController()
