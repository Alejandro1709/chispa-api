import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express'

import * as z from 'zod'
import AppError from '../utils/AppError'
import { MongooseError } from 'mongoose'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'

const handleMongoCastError = (res: Response, err: any) => {
  const message = `Invalid ${err.path}: ${err.value}`
  return res.status(400).json({ message })
}

const handleZodError = (res: Response, err: z.ZodError) => {
  const errors = err.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }))

  return res.status(400).json({ errors })
}

const handleAppError = (res: Response, err: AppError) => {
  return res.status(err.statusCode).json({ message: err.message })
}

const handleMongoDuplicateFieldsError = (res: Response, err: MongooseError) => {
  const value = err.message.match(/\{([^}]+)\}/)
  const message = `Duplicate field value: ${value}. Please use another value`

  return res.status(400).json({ message })
}

const handleJWTTokenError = (res: Response, err: JsonWebTokenError) => {
  return res.status(401).json({ message: 'Invalid Token. Please log in again' })
}

const handleJWTTokenExpiredError = (res: Response, err: TokenExpiredError) => {
  return res
    .status(401)
    .json({ message: 'Your token has expired! Please log in again' })
}

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.name)

  if (err.name === 'CastError') {
    handleMongoCastError(res, err)
    return
  }

  if (err.name === 'ZodError') {
    handleZodError(res, err)
    return
  }

  if (err instanceof AppError) {
    handleAppError(res, err)
    return
  }

  if (err.code === 11000) {
    handleMongoDuplicateFieldsError(res, err)
    return
  }

  if (err.name === 'JsonWebTokenError') {
    handleJWTTokenError(res, err)
    return
  }

  if (err.name === 'TokenExpiredError') {
    handleJWTTokenExpiredError(res, err)
    return
  }

  res.status(500).json({ message: 'Internal Server Error' })
}
