import express from 'express'
import handleGenerateContent from '../controller/generateKeyword.controller'
import handleGenerateTopic from '../controller/generateTopic.controller'

const router = express.Router()

router.post('/api/generate-keyword', handleGenerateContent)
router.post('/api/generate-topic', handleGenerateTopic)

export default router
