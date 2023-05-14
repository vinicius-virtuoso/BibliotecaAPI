import 'express-async-errors'
import express from 'express'

import { errorHandler } from './errors'
import { userRouter } from './routes/users.routes'
import { loginRouter } from './routes/login.routes'
import { bookRouter } from './routes/books.routes'

export const app = express()
app.use(express.json())

app.use('/login', loginRouter)
app.use('/users', userRouter)
app.use('/books', bookRouter)

app.use(errorHandler)
