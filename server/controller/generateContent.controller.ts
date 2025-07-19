import { Request, Response } from 'express';

const mockContents = [
  {
    id: '1',
    title: 'Digital Marketing Trends 2025',
    content: `The digital marketing landscape is evolving rapidly, and 2025 promises to bring unprecedented changes that will reshape how businesses connect with their audiences.\n\nAs we navigate this transformation, understanding emerging trends becomes crucial for maintaining competitive advantage. From AI-powered personalization to immersive AR experiences, the tools and strategies that define success are becoming more sophisticated.\n\nRecent studies show that businesses adapting to these trends see 40% higher engagement rates and 25% better conversion rates. The key lies in identifying which trends align with your specific business goals and audience needs.\n\nSmart marketers are already preparing for voice search optimization, video-first content strategies, and privacy-focused marketing approaches. These aren't just buzzwords—they're the foundation of tomorrow's successful campaigns.\n\nReady to future-proof your marketing strategy? Start by auditing your current approach and identifying gaps where these trends can make the biggest impact.`,
    score: 89,
    contentType: 'blog',
    wordCount: 156,
  },
  {
    id: '2',
    title: 'AI in Healthcare',
    content: `AI is revolutionizing healthcare by enabling faster diagnoses, personalized treatments, and improved patient outcomes.\n\nHospitals leveraging AI-powered tools have reported a 30% reduction in diagnostic errors. The future of healthcare will be shaped by the integration of machine learning and big data analytics.`,
    score: 92,
    contentType: 'linkedin',
    wordCount: 98,
  },
  {
    id: '3',
    title: 'Sustainable Business Practices',
    content: `Sustainable business practices are no longer optional—they are essential for long-term success.\n\nCompanies adopting green strategies have seen increased customer loyalty and reduced operational costs.\n\nStart by evaluating your supply chain and implementing eco-friendly policies.`,
    score: 85,
    contentType: 'blog',
    wordCount: 67,
  },
];

export default function handleGenerateContent(req: Request, res: Response) {
  const { title, contentType } = req.body;
  if(!title || !contentType) {
    return res.status(400).json({message: "Missing title or contentType", success: false})
  }

  try {
    const content = mockContents.find(
        (c) => c.title === title && c.contentType === contentType
      ) || mockContents[0];

    return res.status(200).json({message: "Content generated successfully", success: true, content: content})
  }catch(err) {
    return res.status(500).json({message: "Internal server error", success: false})
  }
  
}
