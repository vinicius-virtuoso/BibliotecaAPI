import 'express-async-errors'
import express from 'express'

import { errorHandler } from './errors'
import { userRouter } from './routes/users.routes'

export const app = express()
app.use(express.json())

app.use('/users', userRouter)

app.use(errorHandler)
