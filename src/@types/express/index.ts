import { Express } from 'express'

declare global {
  namespace Express {
    interface Request {
      is_staff: boolean
    }
  }
}
