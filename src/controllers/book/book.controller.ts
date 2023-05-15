import { Request, Response } from 'express'
import { bookListService } from '../../services/book/bookList.service'
import { bookCreateService } from '../../services/book/createBook.service'
import { bookDetailService } from '../../services/book/bookDetail.service'
import { createFollowerOfBook } from '../../services/follower/createFollower.service'
import { bookDeleteService } from '../../services/book/deleteBook.service'

export class BookController {
  async list(req: Request, res: Response) {
    const books = await bookListService()

    return res.status(200).json(books)
  }

  async create(req: Request, res: Response) {
    const book = await bookCreateService(req.body)

    return res.status(201).json(book)
  }

  async getBook(req: Request, res: Response) {
    const { book_id } = req.params

    const book = await bookDetailService(book_id)
    return res.status(200).json(book)
  }

  async follower(req: Request, res: Response) {
    const { id } = req.auth
    const { book_id } = req.params

    await createFollowerOfBook(id, book_id)

    return res.status(200).json()
  }

  async delete(req: Request, res: Response) {
    const { book_id } = req.params

    await bookDeleteService(book_id)

    return res.status(204).json()
  }
}

export const bookController = new BookController()