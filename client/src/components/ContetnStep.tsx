import React, { useState } from 'react';
import { Edit3, Download, Eye, BarChart3, ChevronDown } from 'lucide-react';

type GeneratedContent = {
  id: string;
  title: string;
  content: string;
  score: number;
  contentType: string;
  wordCount: number;
};

interface ContentStepProps {
  generatedContent: GeneratedContent | null;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const ContentStep: React.FC<ContentStepProps> = ({ generatedContent, setCurrentStep }) => {
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  if (!generatedContent) return null;

  const handleDownload = (format: 'pdf' | 'csv') => {
    if (format === 'csv') {
     
      const csv = `Title,Content,Score,ContentType,WordCount\n"${generatedContent.title.replace(/"/g, '""')}","${generatedContent.content.replace(/"/g, '""')}",${generatedContent.score},${generatedContent.contentType},${generatedContent.wordCount}`;
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${generatedContent.title || 'content'}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      
      const win = window.open('', '_blank');
      if (win) {
        win.document.write(`
          <html><head><title>${generatedContent.title}</title></head><body>
          <h2>${generatedContent.title}</h2>
          <pre style="white-space: pre-wrap; font-family: inherit;">${generatedContent.content}</pre>
          <hr/>
          <div>Score: ${generatedContent.score} | Type: ${generatedContent.contentType} | Words: ${generatedContent.wordCount}</div>
          </body></html>
        `);
        win.document.close();
        win.print();
      }
    }
    setShowDownloadMenu(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Generated Content</h2>
        <p className="text-gray-600 text-sm md:text-base">Your AI-generated content is ready for review</p>
      </div>
      <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-2 md:gap-0">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">{generatedContent.title}</h3>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              generatedContent.score >= 85 ? 'bg-green-100 text-green-800' :
              generatedContent.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              Score: {generatedContent.score}/100
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Word Count</div>
            <div className="text-2xl font-bold text-gray-900">{generatedContent.wordCount}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Content Type</div>
            <div className="text-2xl font-bold text-gray-900 capitalize">{generatedContent.contentType}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Reading Time</div>
            <div className="text-2xl font-bold text-gray-900">2 min</div>
          </div>
        </div>
        <div className="mb-6">
          <h4 className="text-base md:text-lg font-medium text-gray-900 mb-3">Content Preview</h4>
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-sm md:text-base">
              {generatedContent.content}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-3">
          <button
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
            onClick={() => handleDownload('pdf')}
            type="button"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer"
            onClick={() => handleDownload('csv')}
            type="button"
          >
            <Download className="w-4 h-4" />
            Download CSV
          </button>
          <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer"
            onClick={() => setCurrentStep(6)}
          >
            <Eye className="w-4 h-4" />
            View Score
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0">
        <button
          onClick={() => setCurrentStep(4)}
          className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={() => setCurrentStep(6)}
          className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer"
        >
          View Detailed Score
          <BarChart3 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ContentStep;