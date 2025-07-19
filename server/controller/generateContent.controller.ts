import { Request, Response } from 'express';

const mockContents = [
  {
    id: '1',
    blueprintId: '1',
    title: '10 Digital Marketing Trends for 2025',
    content: `The digital marketing landscape is evolving rapidly, and 2025 promises to bring unprecedented changes that will reshape how businesses connect with their audiences.\n\nAs we navigate this transformation, understanding emerging trends becomes crucial for maintaining competitive advantage. From AI-powered personalization to immersive AR experiences, the tools and strategies that define success are becoming more sophisticated.\n\nRecent studies show that businesses adapting to these trends see 40% higher engagement rates and 25% better conversion rates. The key lies in identifying which trends align with your specific business goals and audience needs.\n\nSmart marketers are already preparing for voice search optimization, video-first content strategies, and privacy-focused marketing approaches. These aren't just buzzwords—they're the foundation of tomorrow's successful campaigns.\n\nReady to future-proof your marketing strategy? Start by auditing your current approach and identifying gaps where these trends can make the biggest impact.`,
    score: 89,
    contentType: 'blog',
    wordCount: 156,
  },
  {
    id: '2',
    blueprintId: '2',
    title: 'Why Your Content Strategy Needs a Refresh',
    content: `Content strategies can become outdated quickly.\n\nIf your engagement is dropping, it's time for a refresh.\n\nStart by auditing your existing content, identifying gaps, and setting new goals.\n\nMeasure your results and iterate for continuous improvement.`,
    score: 88,
    contentType: 'blog',
    wordCount: 110,
  },
  {
    id: '3',
    blueprintId: '3',
    title: 'Quick SEO wins for small businesses',
    content: `Small businesses can achieve quick SEO wins by optimizing their Google My Business profile, targeting local keywords, and earning backlinks from local partners.\n\nFocus on technical SEO basics and keep your website fast and mobile-friendly.`,
    score: 85,
    contentType: 'linkedin',
    wordCount: 75,
  },
  {
    id: '4',
    blueprintId: '4',
    title: 'Social media myths debunked 🧵',
    content: `Myth #1: You need to be on every platform.\nMyth #2: More followers always means more success.\nMyth #3: Posting more is always better.\n\nFocus on quality, not quantity, and choose platforms that fit your audience.`,
    score: 90,
    contentType: 'twitter',
    wordCount: 60,
  },
  {
    id: '5',
    blueprintId: '5',
    title: 'Building brand awareness on a budget',
    content: `Brand awareness doesn't require a huge budget.\n\nLeverage social media, collaborate with micro-influencers, and create shareable content.\n\nTrack your results and double down on what works.`,
    score: 87,
    contentType: 'instagram',
    wordCount: 55,
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
    ) || null;
    if (!content) {
      return res.status(404).json({message: "Content not found", success: false})
    }
    return res.status(200).json({message: "Content generated successfully", success: true, content: content})
  }catch(err) {
    return res.status(500).json({message: "Internal server error", success: false})
  }
}
