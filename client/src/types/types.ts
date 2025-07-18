export type ContentType = 'blog' | 'linkedin' | 'twitter' | 'instagram';
export type Language = 'english' | 'hindi' | 'spanish' | 'french';

export interface FormData {
    businessName: string;
    websiteUrl: string;
    competitorUrls: string[];
    language: Language;
    contentTypes: ContentType[];
    uploadedFile: File | null;
}
  
export interface Keyword {
    id: string;
    keyword: string;
    volume: number;
    difficulty: number;
    score: number;
}
  
export interface Topic {
    id: string;
    title: string;
    contentType: ContentType;
    keyword: string;
    score: number;
}
  
export interface ContentBlueprint {
    id: string;
    title: string;
    outline: string[];
    estimatedWords: number;
    targetKeywords: string[];
}
  
export interface GeneratedContent {
    id: string;
    title: string;
    content: string;
    score: number;
    contentType: ContentType;
    wordCount: number;
}