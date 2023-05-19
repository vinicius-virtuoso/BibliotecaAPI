import 'express-async-errors'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './docs/swaggerFile.json'

import { errorHandler } from './errors'
import { userRouter } from './routes/users.routes'
import { loginRouter } from './routes/login.routes'
import { bookRouter } from './routes/books.routes'
import { loanRouter } from './routes/loans.routes'
import { registerRouter } from './routes/register.routes'

export const app = express()
app.use(express.json())

app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/users', userRouter)
app.use('/books', bookRouter)
app.use('/loans', loanRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(errorHandler)
