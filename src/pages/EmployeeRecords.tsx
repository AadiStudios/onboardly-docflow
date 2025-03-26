
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DocumentValidationMenu from '@/components/onboarding/DocumentValidationMenu';
import EmployeeRecordsList from '@/components/onboarding/EmployeeRecordsList';

const EmployeeRecordsPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  
  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
    toast.info('Refreshing employee records...', {
      duration: 2000,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-6 bg-subtle-gradient">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Employee Records</h1>
            <p className="text-muted-foreground mt-1">
              Review and manage employee document submissions
            </p>
          </div>
          
          <DocumentValidationMenu 
            onRefresh={handleRefresh}
            currentPage="employee-records" 
          />
          
          <Card className="border border-border/50 shadow-soft animate-fade-in">
            <div className="p-6 md:p-8">
              <EmployeeRecordsList key={refreshKey} />
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EmployeeRecordsPage;
