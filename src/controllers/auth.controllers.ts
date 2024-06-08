import { Request, Response } from "express";
import { CreateUserDto } from "../dto/auth.dto";
import { isEmpty, isValidEmail } from "../utils/validations";
import * as authServices from "../services/auth.services";

export const register = async (req: Request, res: Response) => {
  const user = req.body as CreateUserDto;

  if (isEmpty(user.email)) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (isEmpty(user.userName)) {
    return res.status(400).json({ message: "UserName is required" });
  }
  if (isEmpty(user.password)) {
    return res.status(400).json({ message: "Password is required" });
  }
  if (!isValidEmail(user.email)) {
    return res.status(400).json({ message: "Email is not valid" });
  }

  const emailFound = await authServices.emailExists(user.email);

  if (emailFound.error) {
    return res.status(emailFound.status).json({ message: emailFound.message });
  }

  const userCreated = await authServices.register(user);

  if (userCreated.error) {
    return res
      .status(userCreated.status)
      .json({ message: userCreated.message });
  }

  return res.status(userCreated.status).json({ message: userCreated.message });
};
