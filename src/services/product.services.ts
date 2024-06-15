import { deleteImage, uploadImage } from '../cloudinary'
import prisma from '../database'
import { CreateProductDto, EditProductDto } from '../dto/product.dto'
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
