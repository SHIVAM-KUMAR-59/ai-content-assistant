import { Request, Response } from 'express'
import { ContentRequest } from '../types/content.types'

const mockKeywords = [
  { id: '1', keyword: 'digital marketing', volume: 12000, difficulty: 65, score: 85, relatedTopics: ['10 Digital Marketing Trends for 2025'] },
  { id: '2', keyword: 'content strategy', volume: 8500, difficulty: 45, score: 90, relatedTopics: ['Why Your Content Strategy Needs a Refresh'] },
  { id: '3', keyword: 'SEO optimization', volume: 15000, difficulty: 70, score: 80, relatedTopics: ['Quick SEO wins for small businesses'] },
  { id: '4', keyword: 'social media marketing', volume: 20000, difficulty: 60, score: 88, relatedTopics: ['Social media myths debunked 🧵'] },
  { id: '5', keyword: 'brand awareness', volume: 9500, difficulty: 55, score: 82, relatedTopics: ['Building brand awareness on a budget'] }
];

const handleGenerateContent = async (req: Request, res: Response) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: 'No request body provided', success: false })
  }

  const {
    businessName,
    websiteUrl,
    competitorUrls,
    language,
    contentTypes,
  }: ContentRequest = req.body

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
      keywords: mockKeywords
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error', success: false })
  }
}

export default handleGenerateContent
