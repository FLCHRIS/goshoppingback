import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/environments'

export const generateToken = (id: number) => {
  const token = jwt.sign({ id }, JWT_SECRET as jwt.Secret, {
    expiresIn: 86400,
  })

  return token
}

export const validateToken = (token: string) => {
  try {
    jwt.verify(token, JWT_SECRET as jwt.Secret) as JwtPayload

    return { error: false }
  } catch (error) {
    return { message: 'Token inválido.', error: true }
  }
}
