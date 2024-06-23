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
        images: true,
      },
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
        images: true,
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
  imageUrls: string[],
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

    const savedImages = await Promise.all(
      imageUrls.map(async (imageUrl) => {
        const { public_id, secure_url } = await uploadImage(
          imageUrl,
          'products',
        )

        await deleteTempFile(imageUrl)

        return {
          url: secure_url,
          publicId: public_id,
        }
      }),
    )

    const savedProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: Number(product.stock),
        categoryId: Number(product.categoryId),
        userId: Number(product.userId),
        images: {
          createMany: {
            data: savedImages.map(({ publicId, url }) => ({
              publicId,
              url,
            })),
          },
        },
      },
      include: {
        images: true,
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
        images: true,
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
        images: true,
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

export const deleteProduct = async (id: number) => {
  try {
    const productFound = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
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

    if (productFound.images !== null && productFound.images.length > 0) {
      await Promise.all(
        productFound.images.map(async (image) => {
          if (image.publicId) {
            await deleteImage(image.publicId)
          }
        })
      )
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
