import express from 'express'
import handleGenerateContent, { upload } from '../controller/generateKeyword.controller'
import handleGenerateTopic from '../controller/generateTopic.controller'
import handleGenerateBlueprint from '../controller/generateBlueprint.controller'
import handleGenerateContentGen from '../controller/generateContent.controller'

const router = express.Router()

router.post('/v1/api/generate-keyword', upload.single('uploadedFile'), handleGenerateContent)
router.post('/v1/api/generate-topic', handleGenerateTopic)
router.post('/v1/api/generate-blueprint', handleGenerateBlueprint)
router.post('/v1/api/generate-content', handleGenerateContentGen)

export default router
