import { AppDataSource } from '../../data-source'
import { Book, Copy } from '../../entities'
import { iBookCreate } from '../../interfaces/book/book.interfaces'

export const bookCreateService = async (payload: iBookCreate) => {
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
    return { ...book, copys: { quantity: copy.quantity } }
  }
}
