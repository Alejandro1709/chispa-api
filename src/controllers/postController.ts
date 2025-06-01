import { NextFunction, Request, Response } from 'express'
import Post from '../models/Post'
import { createPostSchema } from '../schemas/postSchema'
import catchAsync from '../utils/catchAsync'

export const getPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.find()

    res.status(200).json(posts)
  }
)

export const getPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return next(new Error('This post does not exists'))
    }

    res.status(200).json(post)
  }
)

export const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = createPostSchema.parse(req.body)

    const post = await Post.create(body)

    res.status(201).json(post)
  }
)

export const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = createPostSchema.parse(req.body)

    const post = await Post.findByIdAndUpdate(req.params.id, body, {
      runValidators: true,
      new: true,
    })

    if (!post) {
      return next(new Error('This post does not exists'))
    }

    res.status(200).json(post)
  }
)

export const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await Post.findByIdAndUpdate(req.params.id)

    if (!post) {
      return next(new Error('This post does not exists'))
    }

    res.status(204).json({ message: 'Post removed!' })
  }
)
