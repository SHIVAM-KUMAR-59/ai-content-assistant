import { Request, Response } from 'express'
import { Keyword } from '../types/content.types'

const mockTopics = [
  { id: '1', title: '10 Digital Marketing Trends for 2025', contentType: 'blog', keyword: 'digital marketing', score: 92, relatedBlueprints: ['Digital Marketing Trends 2025'] },
  { id: '2', title: 'Why Your Content Strategy Needs a Refresh', contentType: 'blog', keyword: 'content strategy', score: 88, relatedBlueprints: ['Content Strategy Refresh Blueprint'] },
  { id: '3', title: 'Quick SEO wins for small businesses', contentType: 'linkedin', keyword: 'SEO optimization', score: 85, relatedBlueprints: ['SEO Wins Blueprint'] },
  { id: '4', title: 'Social media myths debunked 🧵', contentType: 'twitter', keyword: 'social media marketing', score: 90, relatedBlueprints: ['Social Media Myths Blueprint'] },
  { id: '5', title: 'Building brand awareness on a budget', contentType: 'instagram', keyword: 'brand awareness', score: 87, relatedBlueprints: ['Brand Awareness Blueprint'] }
];

const handleGenerateTopic = async (req: Request, res: Response) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: 'No request body provided', success: false })
  }

  const keywords: Keyword[] = req.body
  if(!keywords) {
    return res.status(400).json({message: "No keywords provided", success: false})
  }

  try {
    // Only return topics whose keyword is in the provided keywords
    const keywordStrings = keywords.map(k => k.keyword)
    const filteredTopics = mockTopics.filter(topic => keywordStrings.includes(topic.keyword))
    res.status(200).json({
      message: 'Content generated successfully',
      success: true,
      topics: filteredTopics
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error', success: false })
  }
}

export default handleGenerateTopic
