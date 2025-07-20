import React, { useRef } from 'react';
import { Plus, Trash2, ChevronRight, Upload } from 'lucide-react';

type ContentType = 'blog' | 'linkedin' | 'twitter' | 'instagram';
type Language = 'english' | 'hindi' | 'spanish' | 'french';

type FormData = {
  businessName: string;
  websiteUrl: string;
  competitorUrls: string[];
  language: Language;
  contentTypes: ContentType[];
  uploadedFile: File | null;
};

interface BusinessInfoStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  newCompetitorUrl: string;
  setNewCompetitorUrl: React.Dispatch<React.SetStateAction<string>>;
  addCompetitorUrl: () => void;
  removeCompetitorUrl: (url: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  toggleContentType: (type: ContentType) => void;
  generateKeywords: () => void;
  contentTypeIcons: Record<ContentType, React.ElementType>;
}

const BusinessInfoStep: React.FC<BusinessInfoStepProps> = ({
  formData,
  setFormData,
  newCompetitorUrl,
  setNewCompetitorUrl,
  addCompetitorUrl,
  removeCompetitorUrl,
  handleInputChange,
  toggleContentType,
  generateKeywords,
  contentTypeIcons
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev: FormData) => ({ ...prev, uploadedFile: e.target.files![0] }));
    }
  };

  const handleDeleteFile = () => {
    setFormData((prev: FormData) => ({ ...prev, uploadedFile: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Tell us about your business</h2>
        <p className="text-gray-600 text-sm md:text-base">We&apos;ll use this information to create personalized content suggestions</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="Your Company Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
          <input
            type="url"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Competitor URLs</label>
        <div className="flex gap-2 mb-3">
          <input
            type="url"
            value={newCompetitorUrl}
            onChange={e => setNewCompetitorUrl(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="https://competitor.com"
          />
          <button
            onClick={addCompetitorUrl}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        {formData.competitorUrls.length > 0 && (
          <div className="space-y-2">
            {formData.competitorUrls.map((url, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span className="text-sm text-gray-700">{url}</span>
                <button
                  onClick={() => removeCompetitorUrl(url)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Business Info</label>
          {formData.uploadedFile ? (
            <div className="flex items-center justify-between border-2 border-blue-400 bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Upload className="w-6 h-6 text-blue-500" />
                <span className="text-sm text-blue-700 font-medium">{formData.uploadedFile.name}</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                  Change
                </button>
                <button
                  type="button"
                  className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                  onClick={handleDeleteFile}
                >
                  Delete
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer block">
              <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">Upload PDF or TXT file</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Content Types *</label>
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
          {(['blog', 'linkedin', 'twitter', 'instagram'] as ContentType[]).map((type) => {
            const Icon = contentTypeIcons[type as ContentType];
            return (
              <button
                key={type}
                onClick={() => toggleContentType(type as ContentType)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  formData.contentTypes.includes(type as ContentType)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium capitalize">{type}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-end gap-2 md:gap-0">
        <button
          onClick={generateKeywords}
          disabled={!formData.businessName || formData.contentTypes.length === 0}
          className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
        >
          Generate Keywords
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default BusinessInfoStep;