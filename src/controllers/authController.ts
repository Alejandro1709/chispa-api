import type { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import { createUserSchema } from '../schemas/userSchema'
import User from '../models/User'
import AppError from '../utils/AppError'

export const login = catchAsync(
  async (re: Request, res: Response, next: NextFunction) => {}
)

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = createUserSchema.parse(req.body)

    const userExists = await User.findOne({ email: body.email })

    if (userExists) {
      return next(new AppError('This email is already taken', 409))
    }

    await User.create(body)

    res.status(201).json({ message: 'User created!' })
  }
)
