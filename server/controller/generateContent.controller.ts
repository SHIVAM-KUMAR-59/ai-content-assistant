import { Request, Response } from 'express'
import { ContentRequest } from '../types/content.types'

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
    // const keywords = await extractKeywords(websiteUrl, competitorUrls);
    // const keywordTopics = await Promise.all(
    //   keywords.map(async (keyword) => {
    //     const topics = await generateTopics(keyword.keyword, contentTypes, language);
    //     return { ...keyword, topics };
    //   })
    // );
    // res.json({ keywords: keywordTopics });
    res.status(200).json({
      message: 'Content generated successfully',
      success: true,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error', success: false })
  }
}

export default handleGenerateContent
