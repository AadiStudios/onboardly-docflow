
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StepIndicator from '@/components/common/StepIndicator';
import EmployeeForm from '@/components/onboarding/EmployeeForm';
import DocumentUpload from '@/components/onboarding/DocumentUpload';
import VerificationStatus from '@/components/onboarding/VerificationStatus';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const steps = [
    'Employee Information',
    'Document Upload',
    'Verification Status'
  ];
  
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handleCompletionSuccess = () => {
    toast.success('Onboarding completed successfully!', {
      description: 'The employee has been successfully onboarded.',
      duration: 5000,
    });
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };
  
  const renderStepContent = () => {
    switch(currentStep) {
      case 0:
        return <EmployeeForm onNext={handleNextStep} />;
      case 1:
        return <DocumentUpload onNext={handleNextStep} />;
      case 2:
        return <VerificationStatus onComplete={handleCompletionSuccess} />;
      default:
        return <EmployeeForm onNext={handleNextStep} />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-6 bg-subtle-gradient">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Employee Onboarding</h1>
            <p className="text-muted-foreground mt-1">
              Complete the following steps to onboard a new employee
            </p>
          </div>
          
          <div className="mb-8">
            <StepIndicator 
              steps={steps} 
              currentStep={currentStep} 
            />
          </div>
          
          <Card className="border border-border/50 shadow-soft animate-fade-in">
            <div className="p-6 md:p-8">
              {renderStepContent()}
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Onboarding;
