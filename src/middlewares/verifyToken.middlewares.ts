import { Request, Response, NextFunction } from 'express'
import { validateToken } from '../utils/token'

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token

    if (!token)
      return res.status(403).json({ message: 'Access not authorized' })

    const { error, message } = validateToken(token as string)

    if (error) return res.status(401).json({ message })

    return next()
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'An error occurred during token verification' })
  }
}
