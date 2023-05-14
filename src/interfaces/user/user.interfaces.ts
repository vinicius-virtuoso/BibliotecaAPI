import { z } from 'zod'
import { createUserSchema, loginSchema } from '../../schemas'
import { DeepPartial, Repository } from 'typeorm'
import { User } from '../../entities'

type iCreateUser = z.infer<typeof createUserSchema>
type iUserLogin = z.infer<typeof loginSchema>
type iUpdateUser = DeepPartial<User>
type iUserRepo = Repository<User>

export { iCreateUser, iUpdateUser, iUserRepo, iUserLogin }
