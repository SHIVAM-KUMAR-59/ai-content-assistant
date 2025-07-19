export interface ContentRequest {
  businessName: string
  websiteUrl?: string
  competitorUrls: string[]
  language: string
  contentTypes: string[]
}

export interface Keyword {
  keyword: string
  volume: number
  difficulty: number
}