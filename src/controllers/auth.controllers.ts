import { Request, Response } from 'express'
import { CreateUserDto, LoginUserDto } from '../dto/auth.dto'
import { isEmptyString, isValidEmail } from '../utils/validations'
import * as authServices from '../services/auth.services'

export const register = async (req: Request, res: Response) => {
  const user = req.body as CreateUserDto

  if (isEmptyString(user.email)) {
    return res.status(400).json({ message: 'Email is required' })
  }
  if (isEmptyString(user.userName)) {
    return res.status(400).json({ message: 'UserName is required' })
  }
  if (isEmptyString(user.password)) {
    return res.status(400).json({ message: 'Password is required' })
  }
  if (!isValidEmail(user.email)) {
    return res.status(400).json({ message: 'Email is not valid' })
  }

  const userCreated = await authServices.register(user)

  return res.status(userCreated.status).json({ message: userCreated.message })
}

export const logIn = async (req: Request, res: Response) => {
  const user = req.body as LoginUserDto

  if (isEmptyString(user.email)) {
    return res.status(400).json({ message: 'Email is required' })
  }
  if (isEmptyString(user.password)) {
    return res.status(400).json({ message: 'Password is required' })
  }
  if (!isValidEmail(user.email)) {
    return res.status(400).json({ message: 'Email is not valid' })
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
