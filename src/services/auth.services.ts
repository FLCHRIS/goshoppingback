import prisma from '../database'
import { encryptPassword, decryptPassword } from '../utils/encryption'
import { CreateUserDto, LoginUserDto } from '../dto/auth.dto'
import { generateToken } from '../utils/token'

export const register = async (user: CreateUserDto) => {
  try {
    const emailExists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    })

    if (emailExists) {
      return {
        message: 'Email already exists',
        status: 400,
        error: true,
      }
    }

    const encryptedPassword = await encryptPassword(user.password)

    await prisma.user.create({
      data: {
        email: user.email,
        userName: user.userName,
        password: encryptedPassword,
        image: {
          create: {},
        },
      },
    })

    return {
      message: 'User registered successfully',
      status: 201,
      error: false,
    }
  } catch (error) {
    console.error(error)
    return { message: 'Error registering user', status: 500, error: true }
  }
}

export const logIn = async (user: LoginUserDto) => {
  try {
    const userFound = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
      include: {
        image: true,
      },
    })

    if (!userFound)
      return { message: 'User not found', status: 404, error: true }

    const passwordMatch = await decryptPassword(
      user.password,
      userFound.password,
    )

    if (!passwordMatch)
      return { message: 'Password incorrect', status: 401, error: true }
    
    const token = generateToken(userFound.id)

    return {
      message: 'User logged in successfully',
      status: 200,
      error: false,
      token,
      data: {
        user: userFound,
      },
    }
  } catch (error) {
    console.error(error)
    return { message: 'Error validating user', status: 500, error: true }
  }
}
