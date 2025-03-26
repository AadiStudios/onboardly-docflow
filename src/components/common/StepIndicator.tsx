
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

const StepIndicator = ({ steps, currentStep, className }: StepIndicatorProps) => {
  return (
    <nav className={cn('flex flex-col sm:flex-row w-full', className)}>
      <ol className="flex items-center w-full text-sm font-medium text-center">
        {steps.map((step, index) => {
          const isActive = currentStep === index;
          const isCompleted = currentStep > index;
          
          return (
            <li 
              key={step} 
              className={cn(
                "flex items-center",
                index !== steps.length - 1 && "flex-1"
              )}
            >
              <div className="flex items-center justify-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-all duration-200",
                    isActive && "bg-primary text-primary-foreground shadow-sm",
                    isCompleted && "bg-primary text-primary-foreground",
                    !isActive && !isCompleted && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span 
                  className={cn(
                    "ms-3 hidden sm:inline-flex",
                    isActive && "text-foreground",
                    !isActive && "text-muted-foreground"
                  )}
                >
                  {step}
                </span>
              </div>
              
              {index !== steps.length - 1 && (
                <div 
                  className={cn(
                    "flex-1 ms-3 me-3 h-0.5 md:h-px",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )}
                ></div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default StepIndicator;
