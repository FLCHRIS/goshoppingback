import { Request, Response } from 'express'
import fileUpload from 'express-fileupload'

import { CreateProductDto } from '../dto/product.dto'
import {
  isNumber,
  isEmptyString,
  isEmptyNumber,
  isPositiveNumber,
} from '../utils/validations'
import * as productService from '../services/product.services'

export const createProduct = async (req: Request, res: Response) => {
  const image = req.files?.image as fileUpload.UploadedFile
  const product = req.body as CreateProductDto

  if (isEmptyString(product.name)) {
    return res.status(400).json({ message: 'Name is required' })
  }
  if (isEmptyString(product.description)) {
    return res.status(400).json({ message: 'Description is required' })
  }
  if (isEmptyNumber(product.price)) {
    return res.status(400).json({ message: 'Price is required' })
  }
  if (!isPositiveNumber(product.price)) {
    return res
      .status(400)
      .json({ message: 'Price is not valid. It must be greater than 0' })
  }
  if (isEmptyNumber(product.categoryId)) {
    return res.status(400).json({ message: 'CategoryId is required' })
  }
  if (isEmptyNumber(product.userId)) {
    return res.status(400).json({ message: 'UserId is required' })
  }
  if (isEmptyNumber(product.stock)) {
    return res.status(400).json({ message: 'Stock is required' })
  }
  if (!isPositiveNumber(product.stock)) {
    return res
      .status(400)
      .json({ message: 'Stock is not valid. It must be greater than 0' })
  }
  if (!image) {
    return res.status(400).json({ message: 'Image is required' })
  }

  const { error, message, status, data } = await productService.createProduct(
    product,
    image.tempFilePath,
  )

  if (error) return res.status(status).json({ message })

  return res.status(status).json({ message, data })
}
