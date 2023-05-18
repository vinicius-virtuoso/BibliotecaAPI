import { AppDataSource } from '../../data-source'
import { Book, Copy, Loan, User } from '../../entities'
import { AppError } from '../../errors'

export const devolutionLoanService = async (
  user_id: string,
  book_id: string
) => {
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
      relations: {
        user: true,
      },
    })
    if (loanFind) {
      // verifica se a devolução é atrasada
      const currentDate = new Date()
      if (new Date(loanFind.devolution_at).getTime() < currentDate.getTime()) {
        const userRepo = AppDataSource.getRepository(User)
        const userFind = await userRepo.findOneBy({ id: loanFind.user.id })

        const userCreateDateUnlocked = userRepo.create({
          ...userFind,
          is_blocked_loans: false,
          date_unlock: new Date(currentDate.setDate(currentDate.getDate() + 2)),
        })

        await userRepo.save(userCreateDateUnlocked)
      }

      await loanRepo.delete({ id: loanFind.id })
      await copyRepo.save({
        ...copyFind,
        quantity: copyFind.quantity + 1,
      })

      const bookRepo = AppDataSource.getRepository(Book)
      const findBook = await bookRepo.findOneBy({ id: copyFind.book.id })

      await bookRepo.save({
        ...findBook,
        availability: true,
      })
    } else {
      throw new AppError('loan not found.', 404)
    }
  }
}
