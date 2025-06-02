import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import postRoutes from './routes/postRoutes'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import connectDB from './config/db'
import cors from 'cors'
import { globalErrorHandler } from './middlewares/error'
import AppError from './utils/AppError'

dotenv.config()

const app = express()

connectDB(process.env.MONGO_URI as string)

app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/posts', postRoutes)

app.use((req, res, next) => {
  return next(new AppError('This route does not exists', 404))
})

app.use(globalErrorHandler)

const PORT = process.env.PORT || 2027
const ENV = process.env.NODE_ENV

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT} in ${ENV} mode.`)
})
