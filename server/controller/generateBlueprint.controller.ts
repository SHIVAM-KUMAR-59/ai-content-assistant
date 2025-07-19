import { Request, Response } from 'express';

const mockBlueprints = [
  {
    id: '1',
    title: 'Digital Marketing Trends 2025',
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
  },
  {
    id: '2',
    title: 'AI in Healthcare',
    outline: [
      'Introduction - The rise of AI in healthcare',
      'Benefits and challenges',
      'Case studies',
      'Future outlook',
      'Conclusion'
    ],
    estimatedWords: 1000,
    targetKeywords: ['AI', 'healthcare', 'technology'],
    contentType: 'linkedin',
  },
  {
    id: '3',
    title: 'Sustainable Business Practices',
    outline: [
      'Introduction - Why sustainability matters',
      'Key strategies',
      'Examples from industry leaders',
      'Measuring impact',
      'Conclusion'
    ],
    estimatedWords: 900,
    targetKeywords: ['sustainability', 'business', 'green'],
    contentType: 'blog',
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
      ) || mockBlueprints[0]; // fallback

    return res.status(200).json({message: "Blueprint generated successfully", success: true, blueprint: blueprint})
  }catch(err) {
    return res.status(500).json({message: "Internal server error", success: false})
  }
}
