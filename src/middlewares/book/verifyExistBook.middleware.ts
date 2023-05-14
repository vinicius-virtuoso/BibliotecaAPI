import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { Book } from '../../entities'
import { AppError } from '../../errors'

export const verifyExistBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title } = req.body

  const bookRepo = AppDataSource.getRepository(Book)
  const findBook = await bookRepo.exist({ where: { title: title } })

  if (findBook) {
    throw new AppError('Book already exists', 409)
  }

  return next()
}
