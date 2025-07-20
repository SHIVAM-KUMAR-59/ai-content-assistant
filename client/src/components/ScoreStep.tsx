import React from 'react';
import { RefreshCw } from 'lucide-react';

type GeneratedContent = {
  id: string;
  title: string;
  content: string;
  score: number;
  contentType: string;
  wordCount: number;
};

interface ScoreStepProps {
  generatedContent: GeneratedContent | null;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const ScoreStep: React.FC<ScoreStepProps> = ({ generatedContent, setCurrentStep }) => (
  <div className="space-y-6">
    <div className="text-center mb-6 md:mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Content Score Analysis</h2>
      <p className="text-gray-600 text-sm md:text-base">Detailed breakdown of your content performance</p>
    </div>
    {generatedContent && (
      <div className="space-y-6">
        <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
          <div className="text-center mb-6">
            <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">{generatedContent.score}</div>
            <div className="text-base md:text-lg text-gray-600">Overall Score</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-green-600 font-semibold mb-1 text-sm md:text-base">SEO Score</div>
              <div className="text-lg md:text-2xl font-bold text-green-700">92/100</div>
              <div className="text-xs md:text-sm text-green-600">Excellent keyword usage</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-blue-600 font-semibold mb-1 text-sm md:text-base">Readability</div>
              <div className="text-lg md:text-2xl font-bold text-blue-700">85/100</div>
              <div className="text-xs md:text-sm text-blue-600">Clear and concise writing</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-yellow-600 font-semibold mb-1 text-sm md:text-base">Originality</div>
              <div className="text-lg md:text-2xl font-bold text-yellow-700">80/100</div>
              <div className="text-xs md:text-sm text-yellow-600">Unique insights provided</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-red-600 font-semibold mb-1 text-sm md:text-base">Engagement</div>
              <div className="text-lg md:text-2xl font-bold text-red-700">78/100</div>
              <div className="text-xs md:text-sm text-red-600">Good call-to-action</div>
            </div>
          </div>
        </div>
      </div>
    )}
    <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0">
      <button
        onClick={() => setCurrentStep(5)}
        className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base"
      >
        Back
      </button>
      <button
        onClick={() => setCurrentStep(1)}
        className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
      >
        Start Over
        <RefreshCw className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default ScoreStep;