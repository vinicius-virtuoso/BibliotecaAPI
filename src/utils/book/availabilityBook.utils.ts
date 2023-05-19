import { AppDataSource } from '../../data-source'
import { Book, Follower, Loan, User } from '../../entities'
import { sendEmailBook } from './sendEmailBook.utils'

export const availabilityBook = async () => {
  const booksRepo = AppDataSource.getRepository(Book)
  const books = booksRepo.createQueryBuilder('book')

  const booksList = await books
    .leftJoin(Follower, 'follower', 'follower.bookId = book.id')
    .leftJoin(User, 'user', 'follower.userId = user.id')
    .addSelect(
      'string_agg("user".id::character varying|| \':\' || "user".username::character varying,\',\')',
      'users'
    )
    .where('book.id = book.id')
    .groupBy('book.id')
    .getRawMany()

  booksList.forEach((book) => {
    const followers = book.users
      ? book.users.split(',').map((userString: string) => {
          const [id, username] = userString.split(':')
          return { follower_id: id, follower_username: username }
        })
      : []

    followers.map(
      async (follower: { follower_id: string; follower_username: string }) => {
        const loanRepo = AppDataSource.getRepository(Loan)
        const loanFind = await loanRepo.findOne({
          where: {
            user: {
              id: follower.follower_id,
            },
            copy: { book: { id: book.id } },
          },
        })

        if (!loanFind) {
          const userRepo = AppDataSource.getRepository(User)
          const user = await userRepo.findOneBy({
            id: follower.follower_id,
          })
          if (
            user &&
            user.email &&
            user.is_blocked_loans === false &&
            user.date_unlock === null
          ) {
            await sendEmailBook({
              to: user.email,
              username: user.username,
              book: book.book_title,
            })
          }
        }
      }
    )
  })
}
