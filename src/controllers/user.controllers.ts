import { Request, Response } from 'express'
import { EditUserDto } from '../dto/user.dto'
import { isNumber } from '../utils/validations'
import * as userService from '../services/user.services'

export const editUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = req.body as EditUserDto

  if (!isNumber(id)) return res.status(400).json({ message: 'Id is not valid' })

  const { error, message, status, data } = await userService.editUser(
    user,
    Number(id),
  )

  if (error) return res.status(status).json({ message })

  return res.status(status).json({ message, data })
}
