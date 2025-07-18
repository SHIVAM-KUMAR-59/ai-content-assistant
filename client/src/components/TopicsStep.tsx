import React from 'react';
import { ChevronRight } from 'lucide-react';

type ContentType = 'blog' | 'linkedin' | 'twitter' | 'instagram';

type Topic = {
  id: string;
  title: string;
  contentType: ContentType;
  keyword: string;
  score: number;
};

interface TopicsStepProps {
  topics: Topic[];
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  generateBlueprint: (topic: Topic) => void;
  contentTypeIcons: Record<ContentType, React.ElementType>;
}

const TopicsStep: React.FC<TopicsStepProps> = ({ topics, setCurrentStep, generateBlueprint, contentTypeIcons }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Content Topics</h2>
      <p className="text-gray-600">Select a topic to create your content blueprint</p>
    </div>
    <div className="grid gap-4">
      {topics.map((topic) => {
        const Icon = contentTypeIcons[topic.contentType];
        return (
          <div key={topic.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
               onClick={() => generateBlueprint(topic)}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">{topic.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {topic.contentType}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  topic.score >= 85 ? 'bg-green-100 text-green-800' :
                  topic.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {topic.score}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Target Keyword:</span> {topic.keyword}
            </div>
            <div className="mt-4 flex justify-end">
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1">
                Create Blueprint
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
    <div className="flex justify-between">
      <button
        onClick={() => setCurrentStep(2)}
        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Back
      </button>
    </div>
  </div>
);

export default TopicsStep;