import type { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/AppError'
import jwt from 'jsonwebtoken'
import User, { IUserDocument } from '../models/User'

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument
    }
  }
}

const verifyToken = (token: string, secret: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err)
      resolve(decoded)
    })
  })
}

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return next(
        new AppError('You are not logged in! Please login to get access.', 401)
      )
    }

    const decoded = await verifyToken(token, process.env.JWT_SECRET as string)

    const user = await User.findById(decoded.id)

    if (!user) {
      return next(
        new AppError(
          'The token belonging to this user does not longer exist.',
          401
        )
      )
    }

    req.user = user

    next()
  }
)
