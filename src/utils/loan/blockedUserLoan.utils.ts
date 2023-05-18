import { AppDataSource } from '../../data-source'
import { Loan, User } from '../../entities'
import { LessThan } from 'typeorm'
import { sendEmailLoan } from './sendEmailLoan.utils'

export const blockedUserLoan = async () => {
  const currentDate = new Date()
  const loanRepo = AppDataSource.getRepository(Loan)
  const loanList = await loanRepo.find({
    where: {
      devolution_at: LessThan(currentDate.toLocaleString('en-US')),
    },
    select: ['user'],
    relations: {
      user: true,
    },
  })

  if (loanList.length > 0) {
    const userRepo = AppDataSource.getRepository(User)

    loanList.forEach(async (loan: Loan) => {
      const userFind = await userRepo.findOneBy({ id: loan.user.id })
      const userToBlock = userRepo.create({
        ...userFind,
        is_blocked_loans: true,
      })
      await userRepo.save(userToBlock)

      if (userFind) {
        const user = { name: userFind?.name, to: userFind?.email }
        await sendEmailLoan(user)
      }
    })
  }

  return loanList
}
