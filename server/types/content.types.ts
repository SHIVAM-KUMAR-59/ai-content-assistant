export interface ContentRequest {
  businessName: string
  websiteUrl?: string
  competitorUrls: string[]
  language: string
  contentTypes: string[]
  uploadedFile?: any // File object, handled by multer
}

export interface Keyword {
  keyword: string
  volume: number
  difficulty: number
}