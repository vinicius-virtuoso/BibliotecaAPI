import { Express } from 'express'

declare global {
  namespace Express {
    interface Request {
      auth: {
        id: string
        is_staff: boolean
      }
    }
  }
}
