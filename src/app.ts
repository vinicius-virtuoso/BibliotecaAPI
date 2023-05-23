import 'express-async-errors'
import express from 'express'

import { errorHandler } from './errors'
import { userRouter } from './routes/users.routes'
import { loginRouter } from './routes/login.routes'
import { bookRouter } from './routes/books.routes'
import { loanRouter } from './routes/loans.routes'
import { registerRouter } from './routes/register.routes'
import { followerRouter } from './routes/followers.routes'

export const app = express()
app.use(express.json())

app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/users', userRouter)
app.use('/books', bookRouter)
app.use('/loans', loanRouter)
app.use('/followers', followerRouter)

app.use(errorHandler)
