import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { returnUsersListSchema } from '../../schemas/user/user.schema'

export const listUserService = async () => {
  const userRepo = AppDataSource.getRepository(User)
  const listUser = await userRepo.find()

  return returnUsersListSchema.parse(listUser)
}
