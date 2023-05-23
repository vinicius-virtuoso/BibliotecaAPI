import { AppDataSource } from '../../data-source'
import { Book, Copy, Loan, User } from '../../entities'

export const devolutionLoanService = async (loan_id: string) => {
  const loanRepo = AppDataSource.getRepository(Loan)
  const loanFind = await loanRepo.findOne({
    where: { id: loan_id },
    relations: { copy: true, user: true },
  })

  if (loanFind) {
    // verifica se a devolução é atrasada
    const currentDate = new Date()

    if (new Date(loanFind.devolution_at).getTime() < currentDate.getTime()) {
      const userRepo = AppDataSource.getRepository(User)
      const userFind = await userRepo.findOneBy({ id: loanFind.user.id })

      console.log(userFind)

      const userCreateDateUnlocked = userRepo.create({
        ...userFind,
        is_blocked_loans: false,
        date_unlock: new Date(currentDate.setDate(currentDate.getDate() + 2)),
      })

      await userRepo.save(userCreateDateUnlocked)
    }

    const copyRepo = AppDataSource.getRepository(Copy)
    const copyFind = await copyRepo.findOne({
      where: { id: loanFind.copy.id },
      relations: { book: true },
    })

    if (copyFind && copyFind.id) {
      await copyRepo.save({
        ...copyFind,
        quantity: copyFind.quantity + 1,
      })
      const bookRepo = AppDataSource.getRepository(Book)
      console.log(copyFind)
      const findBook = await bookRepo.findOneBy({ id: copyFind.book.id })

      await loanRepo.delete({ id: loanFind.id })

      await bookRepo.save({
        ...findBook,
        availability: true,
      })
    }
  }
}
