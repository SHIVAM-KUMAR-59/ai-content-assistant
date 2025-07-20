import express from 'express'
import handleGenerateContent, { upload } from '../controller/generateKeyword.controller'
import handleGenerateTopic from '../controller/generateTopic.controller'
import handleGenerateBlueprint from '../controller/generateBlueprint.controller'
import handleGenerateContentGen from '../controller/generateContent.controller'

const router = express.Router()

router.post('/api/generate-keyword', upload.single('uploadedFile'), handleGenerateContent)
router.post('/api/generate-topic', handleGenerateTopic)
router.post('/api/generate-blueprint', handleGenerateBlueprint)
router.post('/api/generate-content', handleGenerateContentGen)

export default router
