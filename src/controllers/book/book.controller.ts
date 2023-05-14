import { Request, Response } from 'express'
import { bookListService } from '../../services/book/bookList.service'
import { bookCreateService } from '../../services/book/createBook.service'

export class BookController {
  async list(req: Request, res: Response) {
    const books = await bookListService()

    return res.status(200).json(books)
  }

  async create(req: Request, res: Response) {
    const book = await bookCreateService(req.body)

    return res.status(201).json(book)
  }
}

export const bookController = new BookController()
