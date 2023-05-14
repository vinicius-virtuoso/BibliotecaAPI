import { AppDataSource } from '../../data-source'
import { Book } from '../../entities'

export const bookListService = async () => {
  const booksRepo = AppDataSource.getRepository(Book)
  const books = await booksRepo.find()

  return books
}
