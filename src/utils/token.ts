import jwt, { JwtPayload } from 'jsonwebtoken'

export const generateToken = (id: number) => {
  const JWT_SECRET = process.env.JWT_SECRET
  const token = jwt.sign({ id }, JWT_SECRET as jwt.Secret, {
    expiresIn: 86400,
  })

  return token
}

export const validateToken = (token: string) => {
  const JWT_SECRET = process.env.JWT_SECRET
  try {
    jwt.verify(token, JWT_SECRET as jwt.Secret) as JwtPayload

    return { error: false }
  } catch (error) {
    return { message: 'Token inválido.', error: true }
  }
}
