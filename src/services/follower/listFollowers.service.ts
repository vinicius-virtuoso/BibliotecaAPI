import { AppDataSource } from '../../data-source'
import { Follower } from '../../entities'

export const listFollowerService = async (user_id: string) => {
  const followerRepo = AppDataSource.getRepository(Follower)
  return await followerRepo.find({
    where: { user: { id: user_id } },
    relations: { book: true },
  })
}
