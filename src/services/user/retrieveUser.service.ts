import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { returnUserSchema } from '../../schemas'

export const retrieveUserService = async (user_id: string) => {
  const userRepo = AppDataSource.getRepository(User)
  const user = await userRepo.findOneBy({ id: user_id })

  return returnUserSchema.parse(user)
}
