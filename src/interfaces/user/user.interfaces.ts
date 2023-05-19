import { z } from 'zod'
import { createUserSchema, loginSchema } from '../../schemas'
import { DeepPartial, Repository } from 'typeorm'
import { User } from '../../entities'

type iCreateUser = z.infer<typeof createUserSchema>
type iUserLogin = z.infer<typeof loginSchema>
type iUpdateUser = DeepPartial<
  Omit<User, 'id' | 'is_staff' | 'is_blocked_loans' | 'date_unlock'>
>
type iUserRepo = Repository<User>

export { iCreateUser, iUpdateUser, iUserRepo, iUserLogin }
