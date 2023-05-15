import { AppDataSource } from '../../data-source'
import { Book, Follower, User } from '../../entities'

export const bookDetailService = async (book_id: string) => {
  const booksRepo = AppDataSource.getRepository(Book)
  const booksQueryBuilder = booksRepo.createQueryBuilder('book')

  const bookData = await booksQueryBuilder
    .leftJoinAndSelect('book.copy', 'copy')
    .leftJoin(Follower, 'follower', 'follower.bookId = book.id')
    .leftJoin(User, 'user', 'follower.userId = user.id')
    .addSelect(
      'string_agg("copy".id::character varying|| \':\' || "copy".quantity::integer || \':\' || "copy".created_at::date,\',\')',
      'copy'
    )
    .addSelect(
      'string_agg("user".id::character varying|| \':\' || "user".username::character varying,\',\')',
      'users'
    )
    .where('book.id = :book_id', { book_id })
    .groupBy('book.id, copy.id')
    .getRawOne()

  const copy = bookData.copy
    ? bookData.copy.split(',').map((copyString: string) => {
        const [id, quantity, created_at] = copyString.split(':')
        return {
          copy_id: id,
          copy_quantity: quantity,
          copy_created_at: created_at,
        }
      })[0]
    : {}

  const followers = bookData.users
    ? bookData.users.split(',').map((userString: string) => {
        const [id, username] = userString.split(':')
        return { id, username }
      })
    : []

  const followersCount = followers.length
  delete bookData.users
  delete bookData.copy_id
  delete bookData.copy_created_at
  delete bookData.copy_quantity
  delete bookData.copy_bookId

  return {
    ...bookData,
    copy: { ...copy },
    count_followers: followersCount,
    followers: [...followers],
  }
}
