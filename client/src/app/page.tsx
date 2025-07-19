'use client'
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  FileText, 
  Share2, 
  Target, 
  Lightbulb,
  Edit3,
  BarChart3,
  Loader2,
} from 'lucide-react';
import StepIndicator from '../components/StepIndicator';
import BusinessInfoStep from '../components/BuisnessInfoStep';
import KeywordsStep from '../components/KeywordsStep';
import TopicsStep from '../components/TopicsStep';
import BlueprintStep from '../components/BluePrintStep';
import ContentStep from '../components/ContetnStep';
import ScoreStep from '../components/ScoreStep';
import { ContentBlueprint, ContentType, FormData, GeneratedContent, Keyword, Topic } from '@/types/types';
import axios from 'axios';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    websiteUrl: '',
    competitorUrls: [],
    language: 'english',
    contentTypes: [],
    uploadedFile: null
  });
  const [newCompetitorUrl, setNewCompetitorUrl] = useState('');
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [blueprint, setBlueprint] = useState<ContentBlueprint | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const NEXT_PUBLIC_BASE_API_URL="http://localhost:8080"

  const steps = [
    { id: 1, title: 'Business Info', icon: Target },
    { id: 2, title: 'Keywords', icon: Search },
    { id: 3, title: 'Topics', icon: Lightbulb },
    { id: 4, title: 'Blueprint', icon: FileText },
    { id: 5, title: 'Content', icon: Edit3 },
    { id: 6, title: 'Score', icon: BarChart3 }
  ];

  const contentTypeIcons = {
    blog: FileText,
    linkedin: Share2,
    twitter: Share2,
    instagram: Share2
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    // Only update if the key exists in FormData
    if (name in formData) {
      console.log('updating form data');
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addCompetitorUrl = () => {
    if (newCompetitorUrl && !formData.competitorUrls.includes(newCompetitorUrl)) {
      setFormData(prev => ({
        ...prev,
        competitorUrls: [...prev.competitorUrls, newCompetitorUrl]
      }));
      setNewCompetitorUrl('');
    }
  };

  const removeCompetitorUrl = (url: string) => {
    setFormData(prev => ({
      ...prev,
      competitorUrls: prev.competitorUrls.filter(u => u !== url)
    }));
  };

  const toggleContentType = (type: ContentType) => {
    setFormData(prev => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(type)
        ? prev.contentTypes.filter(t => t !== type)
        : [...prev.contentTypes, type]
    }));
  };

  const generateKeywords = async () => {
    setIsLoading(true);
    setLoadingMessage('Analyzing your business and competitors...');
    
    const apiPayload = {
      businessName: formData.businessName,
      websiteUrl: formData.websiteUrl,
      competitorUrls: formData.competitorUrls,
      language: formData.language,
      contentTypes: formData.contentTypes,
      uploadedFile: formData.uploadedFile
    }
    console.log('generateKeywords', apiPayload);    

    try {
      const response = await axios.post(`${NEXT_PUBLIC_BASE_API_URL}/api/generate-content`, apiPayload)
      console.log('response', response)
      setKeywords(response.data.keywords)
      setIsLoading(false);
      setCurrentStep(2);
    }catch(err) {
      console.error(err)
    } finally {
      setIsLoading(false);
    }
  };

  const generateTopics = async () => {
    setIsLoading(true);
    setLoadingMessage('Creating content topics based on your keywords...');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockTopics: Topic[] = [
      { id: '1', title: '10 Digital Marketing Trends for 2025', contentType: 'blog', keyword: 'digital marketing', score: 92 },
      { id: '2', title: 'Why Your Content Strategy Needs a Refresh', contentType: 'blog', keyword: 'content strategy', score: 88 },
      { id: '3', title: 'Quick SEO wins for small businesses', contentType: 'linkedin', keyword: 'SEO optimization', score: 85 },
      { id: '4', title: 'Social media myths debunked 🧵', contentType: 'twitter', keyword: 'social media marketing', score: 90 },
      { id: '5', title: 'Building brand awareness on a budget', contentType: 'instagram', keyword: 'brand awareness', score: 87 }
    ];
    
    setTopics(mockTopics);
    setIsLoading(false);
    setCurrentStep(3);
  };

  const generateBlueprint = async (topic: Topic) => {
    setSelectedTopic(topic);
    setIsLoading(true);
    setLoadingMessage('Creating content blueprint...');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockBlueprint: ContentBlueprint = {
      id: '1',
      title: topic.title,
      outline: [
        'Introduction - Hook with current market statistics',
        'Main Point 1 - Trend analysis and impact',
        'Main Point 2 - Practical implementation strategies',
        'Main Point 3 - Real-world case studies',
        'Conclusion - Key takeaways and next steps'
      ],
      estimatedWords: 800,
      targetKeywords: ['digital marketing', 'trends 2025', 'marketing strategy']
    };
    
    setBlueprint(mockBlueprint);
    setIsLoading(false);
    setCurrentStep(4);
  };

  const generateContent = async () => {
    setIsLoading(true);
    setLoadingMessage('Generating your content...');
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockContent: GeneratedContent = {
      id: '1',
      title: blueprint!.title,
      content: `The digital marketing landscape is evolving rapidly, and 2025 promises to bring unprecedented changes that will reshape how businesses connect with their audiences.

As we navigate this transformation, understanding emerging trends becomes crucial for maintaining competitive advantage. From AI-powered personalization to immersive AR experiences, the tools and strategies that define success are becoming more sophisticated.

Recent studies show that businesses adapting to these trends see 40% higher engagement rates and 25% better conversion rates. The key lies in identifying which trends align with your specific business goals and audience needs.

Smart marketers are already preparing for voice search optimization, video-first content strategies, and privacy-focused marketing approaches. These aren't just buzzwords—they're the foundation of tomorrow's successful campaigns.

Ready to future-proof your marketing strategy? Start by auditing your current approach and identifying gaps where these trends can make the biggest impact.`,
      score: 89,
      contentType: selectedTopic!.contentType,
      wordCount: 156
    };
    
    setGeneratedContent(mockContent);
    setIsLoading(false);
    setCurrentStep(5);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-12 lg:px-32">
      <div className="max-w-4xl mx-auto">
        <StepIndicator 
          steps={steps}
          currentStep={currentStep}
        />
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-6" />
              <div className="text-lg font-medium text-blue-700 mb-2">{loadingMessage}</div>
              <div className="text-gray-500 text-sm">This may take a few seconds...</div>
            </div>
          ) : (
            <>
              {currentStep === 1 && (
                <BusinessInfoStep
                  formData={formData}
                  setFormData={setFormData}
                  newCompetitorUrl={newCompetitorUrl}
                  setNewCompetitorUrl={setNewCompetitorUrl}
                  addCompetitorUrl={addCompetitorUrl}
                  removeCompetitorUrl={removeCompetitorUrl}
                  handleInputChange={handleInputChange}
                  toggleContentType={toggleContentType}
                  generateKeywords={generateKeywords}
                  contentTypeIcons={contentTypeIcons}
                />
              )}
              {currentStep === 2 && (
                <KeywordsStep
                  keywords={keywords}
                  setCurrentStep={setCurrentStep}
                  generateTopics={generateTopics}
                />
              )}
              {currentStep === 3 && (
                <TopicsStep
                  topics={topics}
                  setCurrentStep={setCurrentStep}
                  generateBlueprint={generateBlueprint}
                  contentTypeIcons={contentTypeIcons}
                />
              )}
              {currentStep === 4 && (
                <BlueprintStep
                  blueprint={blueprint}
                  setCurrentStep={setCurrentStep}
                  generateContent={generateContent}
                />
              )}
              {currentStep === 5 && (
                <ContentStep
                  generatedContent={generatedContent}
                  setCurrentStep={setCurrentStep}
                />
              )}
              {currentStep === 6 && (
                <ScoreStep
                  generatedContent={generatedContent}
                  setCurrentStep={setCurrentStep}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}