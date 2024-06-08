import prisma from "../database";
import { encryptPassword } from "../utils/encryption";
import { CreateUserDto } from "../dto/auth.dto";

export const register = async (user: CreateUserDto) => {
  try {
    const encryptedPassword = await encryptPassword(user.password);

    await prisma.user.create({
      data: {
        userName: user.userName,
        email: user.email,
        password: encryptedPassword,
      },
    });

    return {
      message: "User registered successfully",
      status: 201,
      error: false,
    };
  } catch (error) {
    console.error(error);
    return { message: "Error registering user", status: 500, error: true };
  }
};

export const emailExists = async (email: string) => {
  try {
    const userFound = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userFound)
      return { message: "Email already exists", status: 409, error: true };

    return { message: "Email available", status: 200, error: false };
  } catch (error) {
    console.error(error);
    return { message: "Error validating user", status: 500, error: true };
  }
};
