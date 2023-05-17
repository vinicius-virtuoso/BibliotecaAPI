import { AppDataSource } from '../../data-source'
import { Loan, User } from '../../entities'

export const validateLoansDate = async (user_id: string) => {
  const loanRepo = AppDataSource.getRepository(Loan)
  const findLoans = await loanRepo.find({
    where: {
      user: {
        id: user_id,
      },
    },
  })

  const userRepo = AppDataSource.getRepository(User)
  const userFind = await userRepo.findOneBy({ id: user_id })

  if (findLoans.length > 0) {
    const exceededDevolution = findLoans.filter((loan: Loan) => {
      if (new Date(loan.devolution_at).getTime() < Date.now()) {
        return loan
      }
    })

    if (exceededDevolution.length > 0) {
      const date = new Date()

      const user = userRepo.create({
        ...userFind,
        is_blocked_loans: true,
        date_unlock: new Date(date.setDate(date.getDate() + 2)),
      })
      await userRepo.save(user)
    }
  }

  if (
    userFind?.is_blocked_loans &&
    userFind.date_unlock &&
    new Date(userFind.date_unlock).getTime() < Date.now()
  ) {
    const user = userRepo.create({
      ...userFind,
      is_blocked_loans: false,
      date_unlock: null,
    })
    await userRepo.save(user)
  }
}
