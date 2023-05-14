import 'express-async-errors'
import express from 'express'

import { errorHandler } from './errors'
import { userRouter } from './routes/users.routes'
import { loginRouter } from './routes/login.routes'

export const app = express()
app.use(express.json())

app.use('/login', loginRouter)
app.use('/users', userRouter)

app.use(errorHandler)
