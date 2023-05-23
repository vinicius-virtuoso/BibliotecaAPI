import { AppDataSource } from '../../data-source'
import { Follower } from '../../entities'

export const deleteFollowerService = async (follower_id: string) => {
  const followerRepo = AppDataSource.getRepository(Follower)
  await followerRepo.delete({ id: follower_id })
}
