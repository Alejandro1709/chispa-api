import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const PORT = process.env.PORT || 2027
const ENV = process.env.NODE_ENV

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT} in ${ENV} mode.`)
})
