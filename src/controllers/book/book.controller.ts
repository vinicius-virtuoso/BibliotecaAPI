import { Request, Response } from 'express'
import { listBookService } from '../../services/book/listBook.service'
import { createBookService } from '../../services/book/createBook.service'
import { retrieveBookService } from '../../services/book/retrieveBook.service'
import { deleteBookService } from '../../services/book/deleteBook.service'
import { iBookCreate, iBookUpdate } from '../../interfaces'
import { updateBookService } from '../../services/book/updateBook.service'

export class BookController {
  async list(req: Request, res: Response) {
    const books = await listBookService()

    return res.status(200).json(books)
  }

  async create(req: Request, res: Response) {
    const body: iBookCreate = req.body

    const book = await createBookService(body)

    return res.status(201).json(book)
  }

  async getBook(req: Request, res: Response) {
    const { book_id } = req.params

    const book = await retrieveBookService(book_id)
    return res.status(200).json(book)
  }

  async delete(req: Request, res: Response) {
    const { book_id } = req.params

    await deleteBookService(book_id)

    return res.status(204).json()
  }

  async update(req: Request, res: Response) {
    const { book_id } = req.params
    const payload: iBookUpdate = req.body

    const book = await updateBookService(payload, book_id)

    return res.status(200).json(book)
  }
}

export const bookController = new BookController()
