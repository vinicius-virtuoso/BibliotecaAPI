import { AppDataSource } from '../../data-source'
import { Copy, Loan, User } from '../../entities'
import { returnLoanSchema } from '../../schemas'

export const createLoanService = async (user_id: string, book_id: string) => {
  const copyRepo = AppDataSource.getRepository(Copy)
  const copyFind = await copyRepo.findOne({
    where: { book: { id: book_id } },
    relations: {
      book: true,
    },
  })

  const userRepo = AppDataSource.getRepository(User)
  const userFind = await userRepo.findOneBy({ id: user_id })

  if (userFind && copyFind && copyFind.quantity > 0) {
    const loanRepo = AppDataSource.getRepository(Loan)
    const loanCreate = loanRepo.create({ user: userFind, copy: copyFind })

    const loan = await loanRepo.save(loanCreate)

    return returnLoanSchema.parse(loan)
  }
}
