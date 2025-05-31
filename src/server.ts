import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import postRoutes from './routes/postRoutes'
import connectDB from './config/db'

dotenv.config()

const app = express()

connectDB(process.env.MONGO_URI as string)

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/posts', postRoutes)

const PORT = process.env.PORT || 2027
const ENV = process.env.NODE_ENV

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT} in ${ENV} mode.`)
})
