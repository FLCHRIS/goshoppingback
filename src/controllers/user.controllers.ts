import { Request, Response } from 'express'
import fileUpload from 'express-fileupload'

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

export const editPhoto = async (req: Request, res: Response) => {
  const { id } = req.params
  const image = req.files?.image as fileUpload.UploadedFile

  if (!isNumber(id)) return res.status(400).json({ message: 'Id is not valid' })
  if (!image) return res.status(400).json({ message: 'Image is required' })

  const { error, message, status, data } = await userService.editPhoto(
    Number(id),
    image.tempFilePath,
  )

  if (error) return res.status(status).json({ message })

  return res.status(status).json({ message, data })
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!isNumber(id)) return res.status(400).json({ message: 'Id is not valid' })

  const { message, status } = await userService.deleteUser(Number(id))

  return res.status(status).json({ message })
}
