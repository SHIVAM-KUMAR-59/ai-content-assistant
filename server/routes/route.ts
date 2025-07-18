import express from 'express'
import handleGenerateContent from '../controller/generateContent.controller'

const router = express.Router()

router.post('/api/generate-content', handleGenerateContent)

export default router
