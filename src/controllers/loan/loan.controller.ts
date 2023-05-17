import { Request, Response } from 'express'
import { loanListService } from '../../services/loan/loanList.service'
import { deleteLoanService } from '../../services/loan/deleteLoan.service'

export class LoanController {
  async list(req: Request, res: Response) {
    const { id: user_id } = req.auth

    const loans = await loanListService(user_id)

    return res.status(200).json(loans)
  }

  async delete(req: Request, res: Response) {
    const { id: user_id } = req.auth
    const { book_id } = req.params

    await deleteLoanService(user_id, book_id)

    return res.status(204).json()
  }
}

export const loanController = new LoanController()
