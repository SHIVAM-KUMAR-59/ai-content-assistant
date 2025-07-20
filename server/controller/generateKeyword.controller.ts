import { Request, Response } from 'express'
import { ContentRequest } from '../types/content.types'
import multer from 'multer';

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

const mockKeywords = [
  { id: '1', keyword: 'digital marketing', volume: 12000, difficulty: 65, score: 85, relatedTopics: ['10 Digital Marketing Trends for 2025'] },
  { id: '2', keyword: 'content strategy', volume: 8500, difficulty: 45, score: 90, relatedTopics: ['Why Your Content Strategy Needs a Refresh'] },
  { id: '3', keyword: 'SEO optimization', volume: 15000, difficulty: 70, score: 80, relatedTopics: ['Quick SEO wins for small businesses'] },
  { id: '4', keyword: 'social media marketing', volume: 20000, difficulty: 60, score: 88, relatedTopics: ['Social media myths debunked 🧵'] },
  { id: '5', keyword: 'brand awareness', volume: 9500, difficulty: 55, score: 82, relatedTopics: ['Building brand awareness on a budget'] }
];

const handleGenerateContent = async (req: Request, res: Response) => {
  // If using multer, file will be in req.file
  const uploadedFile = (req as any).file;
  if (!req.body) {
    return res
      .status(400)
      .json({ message: 'No request body provided', success: false })
  }

  // Parse competitorUrls and contentTypes from multipart/form-data
  let competitorUrls: string[] = [];
  let contentTypes: string[] = [];
  if (req.body.competitorUrls) {
    if (Array.isArray(req.body.competitorUrls)) {
      competitorUrls = req.body.competitorUrls as string[];
    } else if (typeof req.body.competitorUrls === 'string') {
      competitorUrls = Object.values(req.body)
        .filter((_, k) => String(k).startsWith('competitorUrls'))
        .map(v => v as string);
    }
  }
  if (req.body.contentTypes) {
    if (Array.isArray(req.body.contentTypes)) {
      contentTypes = req.body.contentTypes as string[];
    } else if (typeof req.body.contentTypes === 'string') {
      contentTypes = Object.values(req.body)
        .filter((_, k) => String(k).startsWith('contentTypes'))
        .map(v => v as string);
    }
  }

  const {
    businessName,
    websiteUrl,
    language,
  } = req.body

  if (!businessName || !competitorUrls || !language || !contentTypes) {
    console.error('Missing required fields:', {
      businessName,
      websiteUrl,
      competitorUrls,
      language,
      contentTypes,
    })
    return res
      .status(400)
      .json({ message: 'Missing required fields', success: false })
  }

  try {
    res.status(200).json({
      message: 'Content generated successfully',
      success: true,
      keywords: mockKeywords,
      uploadedFile: uploadedFile ? uploadedFile.originalname : null
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error', success: false })
  }
}

export { upload };
export default handleGenerateContent
