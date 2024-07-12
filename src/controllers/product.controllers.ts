import { Request, Response } from 'express'
import fileUpload from 'express-fileupload'

import { CreateProductDto, EditProductDto } from '../dto/product.dto'
import * as productService from '../services/product.services'
import { IFilters } from '../interfaces/types'

export const getProducts = async (req: Request, res: Response) => {
  const { categoryId, userId, name, page = 1, size = 10 } = req.query

  const filters: IFilters = {}

  if (categoryId !== undefined) filters['categoryId'] = Number(categoryId)
  if (userId !== undefined) filters['userId'] = Number(userId)
  if (name !== undefined) filters['name'] = { contains: String(name) }

  const { error, message, status, data } = await productService.getProducts(
    filters,
    Number(page),
    Number(size),
  )

  if (error) return res.status(status).json({ message })

  return res.status(status).json({ message, data })
}

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!Number.isInteger(Number(id)) || Number(id) < 1) return res.status(400).json({ message: 'Id is not valid' })

  const { error, message, status, data } = await productService.getProduct(
    Number(id),
  )

  if (error) return res.status(status).json({ message })

  return res.status(status).json({ message, data })
}

export const createProduct = async (req: Request, res: Response) => {
  const images = req.files?.images as fileUpload.UploadedFile[]
  const product = req.body as CreateProductDto

  if (product.name === undefined || product.name === null || product.name.trim() === '') {
    return res.status(400).json({ message: 'Name is required' })
  }
  if (product.description === undefined || product.description === null || product.description.trim() === '') {
    return res.status(400).json({ message: 'Description is required' })
  }
  if (product.price === undefined || product.price === null) {
    return res.status(400).json({ message: 'Price is required' })
  }
  if (Number(product.price) <= 0) {
    return res
      .status(400)
      .json({ message: 'Price is not valid. It must be greater than 0' })
  }
  if (!Number.isInteger(Number(product.categoryId))) {
    return res.status(400).json({ message: 'CategoryId is required' })
  }
  if (Number(product.categoryId) < 1) {
    return res.status(400).json({ message: 'CategoryId is not valid' })
  }
  if (!Number.isInteger(Number(product.userId))) {
    return res.status(400).json({ message: 'UserId is required' })
  }
  if (Number(product.userId) < 1) {
    return res.status(400).json({ message: 'UserId is not valid' })
  }
  if (product.stock === undefined || product.stock === null) {
    return res.status(400).json({ message: 'Stock is required' })
  }
  if (Number(product.stock) <= 0) {
    return res
      .status(400)
      .json({ message: 'Stock is not valid. It must be greater than 0' })
  }
  if (!images || images.length === 0) {
    return res.status(400).json({ message: 'Image is required' })
  }

  const imagesPath: string[] = images.map((image) => image.tempFilePath)

  const { error, message, status, data } = await productService.createProduct(
    product,
    imagesPath,
  )

  if (error) return res.status(status).json({ message })

  return res.status(status).json({ message, data })
}

export const editProduct = async (req: Request, res: Response) => {
  const product = req.body as EditProductDto
  const { id } = req.params

  if (!Number.isInteger(Number(id)) || Number(id) < 1) return res.status(400).json({ message: 'Id is not valid' })

  const { error, message, status, data } = await productService.editProduct(
    product,
    Number(id),
  )

  if (error) return res.status(status).json({ message })

  return res.status(status).json({ message, data })
}

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!Number.isInteger(Number(id)) || Number(id) < 1) return res.status(400).json({ message: 'Id is not valid' })

  const { message, status } = await productService.deleteProduct(Number(id))

  return res.status(status).json({ message })
}
