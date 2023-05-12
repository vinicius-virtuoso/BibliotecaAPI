import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { iCreateUser } from '../../interfaces'
import { returnUserSchema } from '../../schemas'

export const userCreateService = async (payload: iCreateUser) => {
  const userRepo = AppDataSource.getRepository(User)
  const userCreate = userRepo.create(payload)
  const savedUser = await userRepo.save(userCreate)

  return returnUserSchema.parse(savedUser)
}
