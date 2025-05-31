import { NextFunction, Request, Response } from 'express'
import Post from '../models/Post'

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find()

    res.status(200).json(posts)
  } catch (error) {
    next(error)
  }
}
