import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import postRoutes from './routes/postRoutes'
import authRoutes from './routes/authRoutes'
import connectDB from './config/db'
import { globalErrorHandler } from './middlewares/error'

dotenv.config()

const app = express()

connectDB(process.env.MONGO_URI as string)

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/posts', postRoutes)

app.use((req, res, next) => {
  res.status(404).json({ message: 'This route does not exists' })
})

app.use(globalErrorHandler)

const PORT = process.env.PORT || 2027
const ENV = process.env.NODE_ENV

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT} in ${ENV} mode.`)
})
