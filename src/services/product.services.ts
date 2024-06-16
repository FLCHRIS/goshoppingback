import { deleteImage, uploadImage } from '../cloudinary'
import prisma from '../database'
import { CreateProductDto, EditProductDto } from '../dto/product.dto'
import { IFilters } from '../interfaces/types'
import { deleteTempFile } from '../utils/tempFiles'

export const getProducts = async (
  filters: IFilters,
  page: number,
  size: number,
) => {
  try {
    const skip = (page - 1) * size
    const take = size

    const products = await prisma.product.findMany({
      skip,
      take,
      where: filters,
      include: {
        image: true,
      }
    })

    const totalProducts = await prisma.product.count({
      where: filters,
    })

    return {
      message: 'Products obtained successfully',
      status: 200,
      error: false,
      data: {
        products,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / size),
      },
    }
  } catch (error) {
    console.error(error)
    return { message: 'Error obtaining products', status: 500, error: true }
  }
}

export const getProduct = async (id: number) => {
  try {
    const productFound = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        image: true,
      },
    })

    if (!productFound) {
      return {
        message: 'Product not found',
        status: 404,
        error: true,
        data: { product: null },
      }
    }

    return {
      message: 'Product obtained successfully',
      status: 200,
      error: false,
      data: {
        product: productFound,
      },
    }
  } catch (error) {
    console.error(error)
    return { message: 'Error obtening product', status: 500, error: true }
  }
}

export const createProduct = async (
  product: CreateProductDto,
  imageUrl: string,
) => {
  try {
    const userFound = await prisma.user.findUnique({
      where: {
        id: Number(product.userId),
      },
      include: {
        image: true,
      },
    })

    if (!userFound) {
      return { message: 'User not found', status: 404, error: true }
    }

    const { public_id, secure_url } = await uploadImage(imageUrl, 'products')

    await deleteTempFile(imageUrl)

    const savedProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: Number(product.stock),
        image: {
          create: {
            url: secure_url,
            publicId: public_id,
          },
        },
        user: {
          connect: {
            id: Number(product.userId),
          },
        },
        category: {
          connect: {
            id: Number(product.categoryId),
          },
        },
      },
      include: {
        image: true,
      },
    })

    return {
      message: 'Product created successfully',
      status: 200,
      error: false,
      data: {
        product: savedProduct,
      },
    }
  } catch (error) {
    console.error(error)
    return { message: 'Error creating product', status: 500, error: true }
  }
}

export const editProduct = async (product: EditProductDto, id: number) => {
  try {
    const productFound = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        image: true,
      },
    })

    if (!productFound) {
      return { message: 'Product not found', status: 404, error: true }
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        updatedAt: new Date(),
        ...product,
      },
      include: {
        image: true,
      },
    })

    return {
      message: 'Product edited successfully',
      status: 200,
      error: false,
      data: {
        product: updatedProduct,
      },
    }
  } catch (error) {
    console.error(error)
    return { message: 'Error editing product', status: 500, error: true }
  }
}

export const editPhoto = async (id: number, imageUrl: string) => {
  try {
    const productFound = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        image: true,
      },
    })

    if (!productFound) {
      return { message: 'Product not found', status: 404, error: true }
    }

    const { public_id, secure_url } = await uploadImage(imageUrl, 'products')

    await deleteTempFile(imageUrl)

    if (productFound.image !== null && productFound.image.publicId) {
      await deleteImage(productFound.image.publicId)
    }

    await prisma.imageProduct.update({
      where: {
        id: productFound.image?.id,
      },
      data: {
        publicId: public_id,
        url: secure_url,
        updatedAt: new Date(),
      },
    })

    const updatedProduct = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        image: true,
      },
    })

    return {
      message: 'Product edited successfully',
      status: 200,
      error: false,
      data: {
        product: updatedProduct,
      },
    }
  } catch (error) {
    console.error(error)
    return { message: 'Error editing product photo', status: 500, error: true }
  }
}

export const deleteProduct = async (id: number) => {
  try {
    const productFound = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        image: true,
      },
    })

    if (!productFound) {
      return { message: 'Product not found', status: 404, error: true }
    }

    await prisma.product.delete({
      where: {
        id,
      },
    })

    if (productFound.image !== null && productFound.image.publicId) {
      await deleteImage(productFound.image.publicId)
    }

    return {
      message: 'Product deleted successfully',
      status: 200,
      error: false,
    }
  } catch (error) {
    console.error(error)
    return { message: 'Error deleting product', status: 500, error: true }
  }
}
