import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { Book } from '../../entities'
import { AppError } from '../../errors'

export const verifyNotExistBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { book_id } = req.params

  const bookRepo = AppDataSource.getRepository(Book)
  const findBook = await bookRepo.exist({ where: { id: book_id } })

  if (!findBook) {
    throw new AppError('Book not found.', 404)
  }

  return next()
}
