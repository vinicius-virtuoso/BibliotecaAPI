import { z } from 'zod'
import { createUserSchema } from '../../schemas'
import { DeepPartial, Repository } from 'typeorm'
import { User } from '../../entities'

type iCreateUser = z.infer<typeof createUserSchema>
type iUserLogin = Pick<User, 'email' | 'password'>
type iUpdateUser = DeepPartial<User>
type iUserRepo = Repository<User>

export { iCreateUser, iUpdateUser, iUserRepo, iUserLogin }
