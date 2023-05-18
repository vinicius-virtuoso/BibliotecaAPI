import { AppDataSource } from '../../data-source'
import { User } from '../../entities'

export const deleteUserService = async (user_id: string) => {
  const userRepo = AppDataSource.getRepository(User)

  return await userRepo.delete({ id: user_id })
}
