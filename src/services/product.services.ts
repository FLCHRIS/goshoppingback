import { deleteImage, uploadImage } from '../cloudinary'
import prisma from '../database'
import { CreateProductDto } from '../dto/product.dto'
import { deleteTempFile } from '../utils/tempFiles'

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
      data: savedProduct,
    }
  } catch (error) {
    console.error(error)
    return { message: 'Error creating product', status: 500, error: true }
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
