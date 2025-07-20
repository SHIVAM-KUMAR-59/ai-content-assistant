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
  <div className="mb-8">
    <div className="flex overflow-x-auto flex-nowrap gap-1 sm:gap-2 md:gap-4 scrollbar-hide py-2 px-0.5 md:px-0">
      {steps.map((step, idx) => (
        <div
          key={step.id}
          className={`flex flex-col items-center min-w-[64px] sm:min-w-[80px] md:min-w-[120px] flex-shrink-0 ${currentStep === step.id ? 'text-blue-600 font-bold' : 'text-gray-400'}`}
        >
          <div className={`rounded-full border-2 ${currentStep === step.id ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-white'} w-9 h-9 md:w-10 md:h-10 flex items-center justify-center mb-1`}
          >
            <step.icon className="w-5 h-5" />
          </div>
          <span className="text-xs md:text-sm text-center leading-tight px-0.5 md:px-2">
            {step.title}
          </span>
          <div className="hidden md:block w-12 h-0.5 bg-gray-300 mt-2" />
        </div>
      ))}
    </div>
    <div className="border-b border-gray-200 mt-2 md:hidden" />
  </div>
);

export default StepIndicator;