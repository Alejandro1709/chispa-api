import { NextFunction, Request, Response } from 'express'

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ message: 'Ok' })
}
