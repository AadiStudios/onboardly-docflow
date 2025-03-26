
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DocumentValidation from '@/components/onboarding/DocumentValidation';

const DocumentValidationPage = () => {
  const navigate = useNavigate();
  
  const handleCompletionSuccess = () => {
    toast.success('Document validation completed successfully!', {
      description: 'All documents have been approved and verified.',
      duration: 5000,
    });
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-6 bg-subtle-gradient">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Document Validation</h1>
            <p className="text-muted-foreground mt-1">
              Review and validate employee submitted documents
            </p>
          </div>
          
          <Card className="border border-border/50 shadow-soft animate-fade-in">
            <div className="p-6 md:p-8">
              <DocumentValidation onComplete={handleCompletionSuccess} />
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DocumentValidationPage;
