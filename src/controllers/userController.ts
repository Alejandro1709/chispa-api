import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export const getAuthUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(req.user)
  }
)
