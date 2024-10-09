import express from 'express'
import dotenv from 'dotenv'
import connect from './db/connect.js'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoutes.js'
import AdminRouter from './routes/AdminRoutes.js'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
//routes
app.use('/home', (req, res) => {
  res.status(200).send('homeeeee')
})
app.use('/api', userRouter)
app.use('/api', AdminRouter)

const startServer = async () => {
  try {
    await connect()
    app.listen(3000, () => {
      console.log('Server is running on port 3000')
    })
  } catch (e) {
    console.log(`Not connected: ${e}`)
  }
}

startServer()
