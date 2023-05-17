import { AppDataSource } from '../../data-source'
import { Loan } from '../../entities'
import { returnLoanListSchema } from '../../schemas/loan/loan.schema'

export const loanListService = async (user_id: string) => {
  const loanRepo = AppDataSource.getRepository(Loan)
  const findLoans = await loanRepo.find({
    where: {
      user: {
        id: user_id,
      },
    },
    relations: {
      user: true,
      copy: {
        book: true,
      },
    },
  })

  return returnLoanListSchema.parse(findLoans)
}
