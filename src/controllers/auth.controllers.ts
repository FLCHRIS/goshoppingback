import { Request, Response } from 'express'
import { CreateUserDto, LoginUserDto } from '../dto/auth.dto'
import { isValidEmail } from '../utils/validations'
import * as authServices from '../services/auth.services'

export const register = async (req: Request, res: Response) => {
  const user = req.body as CreateUserDto

  if (user.email === undefined || user.email === null) {
    return res.status(400).json({ message: 'Email is required' })
  }
  if (!isValidEmail(user.email)) {
    return res.status(400).json({ message: 'Email is not valid' })
  }
  if (user.password === undefined || user.password === null || user.password.trim() === '') {
    return res.status(400).json({ message: 'Password is required' })
  }
  if (user.userName === undefined || user.userName === null || user.userName.trim() === '') {
    return res.status(400).json({ message: 'UserName is required' })
  }

  const userCreated = await authServices.register(user)

  return res.status(userCreated.status).json({ message: userCreated.message })
}

export const logIn = async (req: Request, res: Response) => {
  const user = req.body as LoginUserDto

  if (user.email === undefined || user.email === null) {
    return res.status(400).json({ message: 'Email is required' })
  }
  if (!isValidEmail(user.email)) {
    return res.status(400).json({ message: 'Email is not valid' })
  }
  if (user.password === undefined || user.password === null || user.password.trim() === '') {
    return res.status(400).json({ message: 'Password is required' })
  }

  const { error, message, status, token, data } = await authServices.logIn(user)

  if (error) return res.status(status).json({ message })

  return res
    .status(status)
    .cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 86400000,
    })
    .json({ message, data })
}

export const logOut = async (req: Request, res: Response) => {
  return res
    .status(200)
    .clearCookie('token')
    .json({ message: 'Logged out successfully' })
}
