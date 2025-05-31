import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express'

import * as z from 'zod'

const handleCastError = (res: Response, err: any) => {
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

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.name)

  if (err.name === 'CastError') {
    handleCastError(res, err)
    return
  }

  if (err.name === 'ZodError') {
    handleZodError(res, err)
    return
  }

  res.status(500).json({ message: 'Internal Server Error' })
}
