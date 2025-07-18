import { CheckCircle, ChevronRight } from 'lucide-react';
import React from 'react';

type Step = {
  id: number;
  title: string;
  icon: React.ElementType;
};

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => (
  <div className="flex items-center justify-between mb-8">
    {steps.map((step, index) => (
      <div key={step.id} className="flex items-center">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
          currentStep >= step.id 
            ? 'bg-blue-600 border-blue-600 text-white' 
            : 'border-gray-300 text-gray-400'
        }`}>
          {currentStep > step.id ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <step.icon className="w-5 h-5" />
          )}
        </div>
        <span className={`ml-2 text-sm font-medium ${
          currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
        }`}>
          {step.title}
        </span>
        {index < steps.length - 1 && (
          <ChevronRight className="w-4 h-4 text-gray-300 mx-4" />
        )}
      </div>
    ))}
  </div>
);

export default StepIndicator;