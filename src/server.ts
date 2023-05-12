import { AppDataSource } from './data-source'
import { app } from './app'

AppDataSource.initialize().then(() => {
  console.log('Database connected')
  const PORT = Number(process.env.PORT) || 3000

  app.listen(PORT, () => {
    console.log('Listening on port ' + PORT)
  })
})
