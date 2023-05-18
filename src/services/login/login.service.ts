import { AppDataSource } from '../../data-source'
import { compare } from 'bcryptjs'
import { AppError } from '../../errors'
import { sign } from 'jsonwebtoken'
import { iUserLogin } from '../../interfaces'
import { User } from '../../entities'
import { returnLoginSchema } from '../../schemas'

export const loginService = async (payload: iUserLogin) => {
  const { username_or_email, password } = payload

  const userRepo = AppDataSource.getRepository(User)
  const userFind = await userRepo.findOne({
    where: [{ email: username_or_email }, { username: username_or_email }],
  })

  if (!userFind) {
    throw new AppError('Invalid credentials', 401)
  }

  const comparePassword = await compare(password, userFind.password)

  if (!comparePassword) {
    throw new AppError('Invalid credentials', 401)
  }

  const accessToken: string = sign(
    { username_or_email: username_or_email, is_staff: userFind.is_staff },
    String(process.env.SECRET_KEY),
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(userFind.id),
    }
  )

  return returnLoginSchema.parse({ accessToken })
}
