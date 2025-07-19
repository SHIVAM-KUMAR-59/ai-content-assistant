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
  const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL

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
    // Only update if the key exists in FormData
    if (name in formData) {
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

    try {
      const response = await axios.post(`${apiUrl}/api/generate-keyword`, apiPayload)
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
    try {
      const response = await axios.post(`${apiUrl}/api/generate-topic`, keywords)
      setTopics(response.data.topics);
      setCurrentStep(3);
    }catch(err) {
      console.log(err)
    }finally {
      setIsLoading(false);
    }
  };

  const generateBlueprint = async (topic: Topic) => {
    setSelectedTopic(topic);
    setIsLoading(true);
    setLoadingMessage('Creating content blueprint...');
    try {
      const response = await axios.post(`${apiUrl}/api/generate-blueprint`, {
        title: topic.title,
        contentType: topic.contentType,
      });
      setBlueprint(response.data.blueprint);
      setCurrentStep(4);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateContent = async () => {
    if (!blueprint || !selectedTopic) return;
    setIsLoading(true);
    setLoadingMessage('Generating your content...');
    try {
      const response = await axios.post(`${apiUrl}/api/generate-content`, {
        title: blueprint.title,
        contentType: selectedTopic.contentType,
      });
      setGeneratedContent(response.data.content);
      setCurrentStep(5);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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