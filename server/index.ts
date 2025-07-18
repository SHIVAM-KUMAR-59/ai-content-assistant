import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/route'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080
app.use(cors())
app.use(express.json())
app.use(router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
