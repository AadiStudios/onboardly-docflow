
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DocumentValidation from '@/components/onboarding/DocumentValidation';
import DocumentValidationMenu from '@/components/onboarding/DocumentValidationMenu';

const DocumentValidationPage = () => {
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  
  const handleCompletionSuccess = () => {
    toast.success('Document validation completed successfully!', {
      description: 'All documents have been approved and verified.',
      duration: 5000,
    });
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };
  
  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
    toast.info('Refreshing document list...', {
      duration: 2000,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-6 bg-subtle-gradient">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Document Validation</h1>
            <p className="text-muted-foreground mt-1">
              Review, edit and validate employee submitted documents
            </p>
          </div>
          
          <DocumentValidationMenu 
            onRefresh={handleRefresh} 
            currentPage="document-validation"
          />
          
          <Card className="border border-border/50 shadow-soft animate-fade-in">
            <div className="p-6 md:p-8">
              <DocumentValidation 
                key={refreshKey}
                onComplete={handleCompletionSuccess} 
              />
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DocumentValidationPage;
