import { Request, Response, NextFunction } from 'express'
import { validateToken } from '../utils/token'

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    const { error, message } = validateToken(token as string)

    if (error) return res.status(401).json({ message })

    return next()
  } catch (error) {
    return res.status(401).json({ message: 'Required token' })
  }
}
