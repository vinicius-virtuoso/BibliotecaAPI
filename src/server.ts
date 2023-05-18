import { AppDataSource } from './data-source'
import { app } from './app'
import { availabilityBook, blockedUserLoan, unlockUser } from './utils'
import cron from 'node-cron'

AppDataSource.initialize().then(() => {
  console.log('Database connected')
  const PORT = Number(process.env.PORT) || 3000

  app.listen(PORT, () => {
    cron.schedule('0 0 * * *', async () => {
      // Executar a cada 24 horas as 00:00:00h
      Promise.all([unlockUser(), blockedUserLoan(), availabilityBook()])
    })
    console.log('Listening on port ' + PORT)
  })
})
