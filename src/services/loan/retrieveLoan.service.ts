import { AppDataSource } from '../../data-source'
import { Loan } from '../../entities'

export const retrieveLoanService = async (loan_id: string, user_id: string) => {
  const loanRepo = AppDataSource.getRepository(Loan)
  const loan = await loanRepo.findOne({
    where: {
      id: loan_id,
      user: {
        id: user_id,
      },
    },
    relations: {
      copy: {
        book: true,
      },
    },
  })

  return loan
}
