import { deleteImage, uploadImage } from '../cloudinary'
import prisma from '../database'
import { EditUserDto } from '../dto/user.dto'
import { encryptPassword } from '../utils/encryption'
import { deleteTempFile } from '../utils/tempFiles'

export const editUser = async (user: EditUserDto, id: number) => {
  try {
    const userFound = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!userFound) {
      return { message: 'User not found', status: 404, error: true }
    }

    if (user.password) {
      user.password = await encryptPassword(user.password)
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        updatedAt: new Date(),
        ...user,
      },
    })

    return {
      message: 'User edited successfully',
      status: 200,
      error: false,
      data: updatedUser,
    }
  } catch (error) {
    console.error(error)
    return { message: 'Error editing user', status: 500, error: true }
  }
}

export const editPhoto = async (id: number, imageUrl: string) => {
  try {
    const userFound = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        image: true,
      },
    })

    if (!userFound) {
      return { message: 'User not found', status: 404, error: true }
    }

    const { public_id, secure_url } = await uploadImage(imageUrl, 'users')

    await deleteTempFile(imageUrl)

    if (userFound.image !== null && userFound.image.publicId) {
      await deleteImage(userFound.image.publicId)
    }

    await prisma.image.update({
      where: {
        id: userFound.imageId,
      },
      data: {
        publicId: public_id,
        url: secure_url,
      },
    })

    const updatedUser = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        image: true,
      },
    })

    return {
      message: 'User photo edited successfully',
      status: 200,
      error: false,
      data: updatedUser,
    }
  } catch (error) {
    console.error(error)
    return { message: 'Error editing user photo', status: 500, error: true }
  }
}
