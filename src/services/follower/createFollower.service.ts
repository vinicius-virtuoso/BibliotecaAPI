import { AppDataSource } from '../../data-source'
import { Book, Follower, User } from '../../entities'

export const createFollowerOfBook = async (id: string, book_id: string) => {
  const userRepo = AppDataSource.getRepository(User)
  const bookRepo = AppDataSource.getRepository(Book)

  const user = await userRepo.findOne({ where: { id: id } })
  const book = await bookRepo.findOne({ where: { id: book_id } })

  if (book && user) {
    const followerRepo = AppDataSource.getRepository(Follower)
    const followerCreate = followerRepo.create({ book, user })
    const followerSave = await followerRepo.save(followerCreate)

    if (followerSave && followerSave.id) {
      return await followerRepo.findOne({
        where: { id: followerSave.id },
        relations: { book: true, user: true },
      })
    }
  }
}
