# 🤖 AI Content Assistant

A comprehensive AI-powered content generation platform that helps businesses create engaging content through a step-by-step guided process. From keyword analysis to final content generation, this tool streamlines the content creation workflow.

## 🌐 Live Demo

- **Frontend (Vercel):** [https://ai-content-assistant-sepia.vercel.app/](https://ai-content-assistant-sepia.vercel.app/)
- **Backend (Render):** [https://ai-content-assistant-44zg.onrender.com](https://ai-content-assistant-44zg.onrender.com)

## ✨ Features

### 🎯 Multi-Step Content Generation Process
- **Business Information Collection:** Gather business details, competitor URLs, and content preferences
- **Keyword Analysis:** AI-powered keyword generation with volume, difficulty, and relevance scores
- **Topic Generation:** Create content topics based on selected keywords and content types
- **Blueprint Creation:** Generate detailed content outlines and structure
- **Content Generation:** Produce high-quality, SEO-optimized content
- **Performance Scoring:** Get content quality scores and optimization suggestions

### 📱 Content Type Support
- **Blog Posts:** Long-form articles with comprehensive outlines
- **LinkedIn Posts:** Professional networking content
- **Twitter Threads:** Engaging social media content
- **Instagram Posts:** Visual platform content

### 🛠️ Advanced Features
- **Real-time Progress Tracking:** Visual step indicator with progress status
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile
- **Error Handling:** Comprehensive error handling with user-friendly messages
- **Loading States:** Smooth loading animations with descriptive messages
- **Data Validation:** Input validation and error prevention

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 15.4.1 with React 19.1.0
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **Deployment:** Vercel

### Backend
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js 5.1.0
- **CORS:** Cross-origin resource sharing enabled
- **Environment:** Dotenv for configuration
- **Deployment:** Render

## 📁 Project Structure

```
ai-content-assistant/
├── client/                          # Frontend application
│   ├── src/
│   │   ├── app/                     # Next.js app directory
│   │   │   └── page.tsx            # Main application page
│   │   ├── components/              # React components
│   │   │   ├── StepIndicator.tsx   # Progress indicator
│   │   │   ├── BusinessInfoStep.tsx # Step 1: Business info
│   │   │   ├── KeywordsStep.tsx    # Step 2: Keywords
│   │   │   ├── TopicsStep.tsx      # Step 3: Topics
│   │   │   ├── BluePrintStep.tsx   # Step 4: Blueprint
│   │   │   ├── ContentStep.tsx     # Step 5: Content
│   │   │   └── ScoreStep.tsx       # Step 6: Scoring
│   │   └── types/                   # TypeScript type definitions
│   ├── package.json
│   └── tsconfig.json
├── server/                          # Backend API
│   ├── controller/                  # API controllers
│   │   ├── generateKeyword.controller.ts
│   │   ├── generateTopic.controller.ts
│   │   ├── generateBlueprint.controller.ts
│   │   └── generateContent.controller.ts
│   ├── routes/                      # API routes
│   │   └── route.ts
│   ├── types/                       # TypeScript types
│   │   └── content.types.ts
│   ├── index.ts                     # Server entry point
│   └── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SHIVAM-KUMAR-59/ai-content-assistant.git
   cd ai-content-assistant/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the client directory:
   ```env
   NEXT_PUBLIC_BASE_API_URL=http://localhost:8080
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd ../server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build and start production server**
   ```bash
   npm run build
   npm start
   ```

## 🔌 API Endpoints

### Content Generation Flow

1. **Generate Keywords**
   ```
   POST /api/generate-keyword
   Body: {
     businessName: string,
     websiteUrl: string,
     competitorUrls: string[],
     language: string,
     contentTypes: string[]
   }
   ```

2. **Generate Topics**
   ```
   POST /api/generate-topic
   Body: Keyword[]
   ```

3. **Generate Blueprint**
   ```
   POST /api/generate-blueprint
   Body: {
     title: string,
     contentType: string
   }
   ```

4. **Generate Content**
   ```
   POST /api/generate-content
   Body: {
     title: string,
     contentType: string
   }
   ```

## 🎨 Key Features in Detail

### Step-by-Step Process
1. **Business Information:** Collect business details, competitor analysis, and content preferences
2. **Keyword Analysis:** AI analyzes business and competitors to generate relevant keywords
3. **Topic Selection:** Choose from AI-generated topics based on selected keywords
4. **Blueprint Creation:** Get detailed content structure and outline
5. **Content Generation:** Generate high-quality, SEO-optimized content
6. **Performance Scoring:** Receive content quality metrics and optimization tips

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Smooth animations and transitions
- Intuitive user interface with clear visual hierarchy
- Loading states and progress indicators

### Data Flow
- Seamless integration between frontend and backend
- Real-time data validation and error handling
- Consistent data structure across all API endpoints
- Mock data that simulates real-world content generation

## 🚀 Deployment

### Frontend (Vercel)
- Automatic deployment from GitHub
- Environment variables configured in Vercel dashboard
- Custom domain support
- Edge functions and CDN optimization

### Backend (Render)
- Automatic deployment from GitHub
- Environment variables configured in Render dashboard
- Auto-scaling and load balancing
- SSL certificate management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

**Shivam Kumar**
- GitHub: [@shivamkumar](https://github.com/SHIVAM-KUMAR-59)
- LinkedIn: [Shivam Kumar](https://www.linkedin.com/in/shivam-kumar-946614277/)

