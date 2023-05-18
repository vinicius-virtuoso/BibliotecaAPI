import { AppDataSource } from '../../data-source'
import { Book } from '../../entities'
import { iBookUpdate } from '../../interfaces'

export const updateBookService = async (
  payload: iBookUpdate,
  book_id: string
) => {
  const bookRepo = AppDataSource.getRepository(Book)
  const bookFind = await bookRepo.findOneBy({
    id: book_id,
  })

  if (bookFind) {
    const updatedBook = bookRepo.create({
      ...bookFind,
      ...payload,
    })

    const book = bookRepo.save(updatedBook)

    return book
  }
}
