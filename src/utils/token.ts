import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/environments";

export const generateToken = (id: number) => {
  const token = jwt.sign({ id }, JWT_SECRET as jwt.Secret, {
    expiresIn: 86400,
  });

  return token;
};
