import jwt, { JwtPayload } from 'jsonwebtoken'

export const generateJWTToken = (payload: JwtPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '90d',
  })
}
