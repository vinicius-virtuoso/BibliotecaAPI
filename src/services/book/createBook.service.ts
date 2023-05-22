import { AppDataSource } from '../../data-source'
import { Book, Copy } from '../../entities'
import { iBookCreate } from '../../interfaces'
import { createBookSchema } from '../../schemas'

export const createBookService = async (payload: iBookCreate) => {
  const bookRepo = AppDataSource.getRepository(Book)
  const booCreate = bookRepo.create(payload)
  const book = await bookRepo.save(booCreate)

  if (book && book.id) {
    const copyRepo = AppDataSource.getRepository(Copy)
    const copyCreate = copyRepo.create({
      quantity: payload.quantity_copy,
      book: book,
    })
    const copy = await copyRepo.save(copyCreate)

    return {
      id: book.id,
      title: book.title,
      synopsis: book.synopsis,
      author: book.author,
      pages: book.pages,
      language: book.language,
      date_release: book.date_release,
      availability: book.availability,
      copy: { quantity: copy.quantity },
    }
  }
}
