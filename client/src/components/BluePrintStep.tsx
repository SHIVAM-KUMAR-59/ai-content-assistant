import React from 'react';
import { Clock, Edit3 } from 'lucide-react';

type ContentBlueprint = {
  id: string;
  title: string;
  outline: string[];
  estimatedWords: number;
  targetKeywords: string[];
};

interface BlueprintStepProps {
  blueprint: ContentBlueprint | null;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  generateContent: () => void;
}

const BlueprintStep: React.FC<BlueprintStepProps> = ({ blueprint, setCurrentStep, generateContent }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Content Blueprint</h2>
      <p className="text-gray-600">Review and approve your content structure</p>
    </div>
    {blueprint && (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{blueprint.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Estimated Words</div>
            <div className="text-2xl font-bold text-gray-900">{blueprint.estimatedWords}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Target Keywords</div>
            <div className="text-2xl font-bold text-gray-900">{blueprint.targetKeywords.length}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Estimated Time</div>
            <div className="text-2xl font-bold text-gray-900">
              <Clock className="w-5 h-5 inline mr-1" />
              15 min
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-900 mb-3">Content Outline</h4>
          <div className="space-y-3">
            {blueprint.outline.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-900 mb-3">Target Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {blueprint.targetKeywords.map((keyword, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    )}
    <div className="flex justify-between">
      <button
        onClick={() => setCurrentStep(3)}
        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Back
      </button>
      <button
        onClick={generateContent}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        Generate Content
        <Edit3 className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default BlueprintStep;