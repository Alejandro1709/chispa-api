import type { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import { createUserSchema, loginUserSchema } from '../schemas/userSchema'
import User from '../models/User'
import AppError from '../utils/AppError'
import { generateJWTToken } from '../utils/auth'

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = loginUserSchema.parse(req.body)

    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.comparePasswords(password, user.password))) {
      return next(new AppError('Invalid Credentials', 401))
    }

    const token = generateJWTToken({ id: user._id })

    res.status(200).json({ token })
  }
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
