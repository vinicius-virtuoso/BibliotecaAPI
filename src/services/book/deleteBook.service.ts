import { AppDataSource } from '../../data-source'
import { Book } from '../../entities'

export const deleteBookService = async (book_id: string) => {
  const bookRepo = AppDataSource.getRepository(Book)

  return await bookRepo.delete({ id: book_id })
}
