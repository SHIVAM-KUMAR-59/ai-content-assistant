import { Request, Response } from 'express';

const mockBlueprints = [
  {
    id: '1',
    title: '10 Digital Marketing Trends for 2025',
    outline: [
      'Introduction - Hook with current market statistics',
      'Main Point 1 - Trend analysis and impact',
      'Main Point 2 - Practical implementation strategies',
      'Main Point 3 - Real-world case studies',
      'Conclusion - Key takeaways and next steps'
    ],
    estimatedWords: 800,
    targetKeywords: ['digital marketing', 'trends 2025', 'marketing strategy'],
    contentType: 'blog',
    relatedContent: ['Digital Marketing Trends 2025 Blog Content']
  },
  {
    id: '2',
    title: 'Why Your Content Strategy Needs a Refresh',
    outline: [
      'Introduction - Why content strategies get outdated',
      'Signs you need a refresh',
      'Steps to update your strategy',
      'Measuring success',
      'Conclusion'
    ],
    estimatedWords: 900,
    targetKeywords: ['content strategy', 'refresh', 'content marketing'],
    contentType: 'blog',
    relatedContent: ['Content Strategy Refresh Blog Content']
  },
  {
    id: '3',
    title: 'Quick SEO wins for small businesses',
    outline: [
      'Introduction - SEO for small businesses',
      'Quick win #1',
      'Quick win #2',
      'Quick win #3',
      'Conclusion'
    ],
    estimatedWords: 700,
    targetKeywords: ['SEO', 'small business', 'quick wins'],
    contentType: 'linkedin',
    relatedContent: ['SEO Wins LinkedIn Content']
  },
  {
    id: '4',
    title: 'Social media myths debunked 🧵',
    outline: [
      'Introduction - Common myths',
      'Myth #1',
      'Myth #2',
      'Myth #3',
      'Conclusion'
    ],
    estimatedWords: 500,
    targetKeywords: ['social media', 'myths', 'debunked'],
    contentType: 'twitter',
    relatedContent: ['Social Media Myths Twitter Content']
  },
  {
    id: '5',
    title: 'Building brand awareness on a budget',
    outline: [
      'Introduction - Why brand awareness matters',
      'Low-cost strategies',
      'Case studies',
      'Measuring impact',
      'Conclusion'
    ],
    estimatedWords: 600,
    targetKeywords: ['brand awareness', 'budget', 'marketing'],
    contentType: 'instagram',
    relatedContent: ['Brand Awareness Instagram Content']
  },
];

export default function handleGenerateBlueprint(req: Request, res: Response) {
  const { title, contentType } = req.body;
  if(!title || !contentType) {
    return res.status(400).json({message: "Missing title or contentType", success: false})
  }
  try {
    const blueprint = mockBlueprints.find(
      (bp) => bp.title === title && bp.contentType === contentType
    ) || null;
    if (!blueprint) {
      return res.status(404).json({message: "Blueprint not found", success: false})
    }
    return res.status(200).json({message: "Blueprint generated successfully", success: true, blueprint: blueprint})
  }catch(err) {
    return res.status(500).json({message: "Internal server error", success: false})
  }
}
