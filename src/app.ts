import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.routes'

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes)

export default app
