import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express'

import * as z from 'zod'
import AppError from '../utils/AppError'

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

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err)

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

  res.status(500).json({ message: 'Internal Server Error' })
}
