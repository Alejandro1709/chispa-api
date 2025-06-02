import { NextFunction, Request, Response } from 'express'
import Post from '../models/Post'
import { createPostSchema } from '../schemas/postSchema'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/AppError'
import User from '../models/User'

export const getPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.find().populate('user')

    res.status(200).json(posts)
  }
)

export const getPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await Post.findById(req.params.id).populate('user')

    if (!post) {
      return next(new AppError('This post does not exists', 404))
    }

    res.status(200).json(post)
  }
)

export const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = createPostSchema.parse(req.body)

    const post = await Post.create({ ...body, user: req.user?.id })

    const user = await User.findById(req.user?.id)

    if (!user) {
      return next(new AppError('This user does not exist', 404))
    }

    user.posts.push(post)

    await user.save()

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
      return next(new AppError('This post does not exists', 404))
    }

    if (post.user.toString() !== req.user?.id) {
      return next(
        new AppError('You dont have permission to update this resource', 403)
      )
    }

    res.status(200).json(post)
  }
)

export const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await Post.findByIdAndDelete(req.params.id)

    if (!post) {
      return next(new AppError('This post does not exists', 404))
    }

    const user = await User.findById(req.user?.id)

    if (!user) {
      return next(new AppError('This user does not exist', 404))
    }

    if (post.user.toString() !== req.user?.id) {
      return next(
        new AppError('You dont have permission to delete this resource', 403)
      )
    }

    if (user.posts.includes(post.id)) {
      const index = user.posts.indexOf(post.id)

      user.posts.splice(index, 1)

      await user.save()
    }

    res.status(204).json({ message: 'Post removed!' })
  }
)
