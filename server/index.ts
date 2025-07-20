import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/route'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080
app.use(cors())
app.use(express.json())
app.use(router)

app.get('/v1/api/health', (req: Request, res: Response) => {
  console.log('API is healthy and working')
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
