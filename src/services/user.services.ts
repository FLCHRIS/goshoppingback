import prisma from '../database'
import { EditUserDto } from '../dto/user.dto'
import { encryptPassword } from '../utils/encryption'

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
