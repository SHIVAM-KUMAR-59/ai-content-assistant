import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Keyword } from '@/types/types';

interface KeywordsStepProps {
    keywords: Keyword[];
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    generateTopics: () => void;
}

const KeywordsStep: React.FC<KeywordsStepProps> = ({ keywords, setCurrentStep, generateTopics }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Keywords</h2>
      <p className="text-gray-600">AI-generated keywords ranked by relevance and opportunity</p>
    </div>
    <div className="grid gap-4">
      {keywords.map((keyword) => (
        <div key={keyword.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{keyword.keyword}</h3>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                keyword.score >= 85 ? 'bg-green-100 text-green-800' :
                keyword.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                Score: {keyword.score}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Monthly Volume:</span>
              <span className="ml-2 font-medium">{keyword.volume.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-500">Difficulty:</span>
              <span className="ml-2 font-medium">{keyword.difficulty}/100</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-between">
      <button
        onClick={() => setCurrentStep(1)}
        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Back
      </button>
      <button
        onClick={generateTopics}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        Generate Topics
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default KeywordsStep;