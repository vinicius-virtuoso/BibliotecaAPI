import { LessThanOrEqual } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'

export const unlockUser = async () => {
  const currentDate = new Date()
  const userRepo = AppDataSource.getRepository(User)
  const usersFind = await userRepo.find({
    where: {
      date_unlock: LessThanOrEqual(currentDate.toLocaleString('en-US')),
    },
  })

  if (usersFind.length > 0) {
    usersFind.forEach(async (user: User) => {
      const userFind = await userRepo.findOneBy({ id: user.id })

      const userUnlock = userRepo.create({
        ...userFind,
        date_unlock: null,
      })
      await userRepo.save(userUnlock)
    })
  }
}
