import { AppDataSource } from '../../data-source'
import { Book, Copy, Loan, User } from '../../entities'
import { AppError } from '../../errors'
import { returnLoanSchema } from '../../schemas'

export const createLoanService = async (user_id: string, book_id: string) => {
  const copyRepo = AppDataSource.getRepository(Copy)
  const copyFind = await copyRepo.findOne({
    where: { book: { id: book_id } },
    relations: {
      book: true,
    },
  })

  if (copyFind && copyFind?.quantity > 0) {
    const userRepo = AppDataSource.getRepository(User)
    const userFind = await userRepo.findOneBy({ id: user_id })

    if (userFind && copyFind && copyFind.quantity > 0) {
      const loanRepo = AppDataSource.getRepository(Loan)
      const loanCreate = loanRepo.create({ user: userFind, copy: copyFind })
      const loan = await loanRepo.save(loanCreate)

      await copyRepo.save({
        ...copyFind,
        quantity: copyFind.quantity - 1,
      })

      if (copyFind?.quantity - 1 === 0) {
        const bookRepo = AppDataSource.getRepository(Book)
        const findBook = await bookRepo.findOneBy({ id: copyFind.book.id })

        await bookRepo.save({
          ...findBook,
          availability: false,
        })
      }

      return returnLoanSchema.parse(loan)
    }
  } else {
    throw new AppError('This book is unavailable.', 403)
  }
}
