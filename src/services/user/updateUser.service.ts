import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { iUpdateUser } from '../../interfaces'

export const updateUserService = async (
  user_id: string,
  payload: iUpdateUser
) => {
  const userRepo = AppDataSource.getRepository(User)
  const userFind = await userRepo.findOneBy({ id: user_id })
  const updatedUser = userRepo.create({
    ...userFind,
    ...payload,
  })
  const savedUpdatedUser = await userRepo.save(updatedUser)

  return savedUpdatedUser
}
