import { AppDataSource } from '../../data-source'
import { Copy, Loan } from '../../entities'
import { AppError } from '../../errors'

export const deleteLoanService = async (user_id: string, book_id: string) => {
  const copyRepo = AppDataSource.getRepository(Copy)
  const copyFind = await copyRepo.findOne({
    where: { book: { id: book_id } },
    relations: {
      book: true,
    },
  })

  if (copyFind) {
    const loanRepo = AppDataSource.getRepository(Loan)
    const loanFind = await loanRepo.findOne({
      where: {
        copy: {
          id: copyFind.id,
        },
        user: {
          id: user_id,
        },
      },
    })
    if (loanFind) {
      await loanRepo.delete({ id: loanFind.id })
    } else {
      throw new AppError('loan not found.', 404)
    }
  }
}
