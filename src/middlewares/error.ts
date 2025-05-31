import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express'

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err)

  res.status(500).json({ message: 'Internal Server Error' })
}
