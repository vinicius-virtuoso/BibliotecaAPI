import { AppDataSource } from '../../data-source'
import { Book, Follower, User } from '../../entities'
import { returnBookListSchema } from '../../schemas'

export const listBookService = async () => {
  const booksRepo = AppDataSource.getRepository(Book)
  const books = booksRepo.createQueryBuilder('book')

  const booksList = await books
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
    .where('book.id = book.id')
    .groupBy('book.id, copy.id')
    .getRawMany()

  const booksFormattedList = booksList.map((book) => {
    const copy = book.copy
      ? book.copy.split(',').map((copyString: string) => {
          const [id, quantity, created_at] = copyString.split(':')
          return {
            id: id,
            quantity: Number(quantity),
            created_at: created_at,
          }
        })[0]
      : {}
    const followers = book.users
      ? book.users.split(',').map((userString: string) => {
          const [id, username] = userString.split(':')
          return { id: id, username: username }
        })
      : []

    const followersCount = followers.length

    return {
      id: book.book_id,
      title: book.book_title,
      synopsis: book.book_synopsis,
      author: book.book_author,
      pages: book.book_pages,
      language: book.book_language,
      date_release: book.book_date_release,
      availability: book.book_availability,
      copy: { ...copy },
      count_followers: followersCount,
      followers: [...followers],
    }
  })

  return returnBookListSchema.parse(booksFormattedList)
}
