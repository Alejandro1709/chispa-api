import { NextFunction, Request, Response } from 'express'
import Post from '../models/Post'
import { createPostSchema } from '../schemas/postSchema'

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

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return next(new Error('This post does not exists'))
    }

    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = createPostSchema.parse(req.body)

    const post = await Post.create(body)

    res.status(201).json(post)
  } catch (error) {
    next(error)
  }
}

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = createPostSchema.parse(req.body)

    const post = await Post.findByIdAndUpdate(req.params.id, body, {
      runValidators: true,
      new: true,
    })

    if (!post) {
      return next(new Error('This post does not exists'))
    }

    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id)

    if (!post) {
      return next(new Error('This post does not exists'))
    }

    res.status(204).json({ message: 'Post removed!' })
  } catch (error) {
    next(error)
  }
}
