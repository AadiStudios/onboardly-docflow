
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Badge from '@/components/common/Badge';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface VerificationStatusProps {
  onComplete: () => void;
}

const VerificationStatus = ({ onComplete }: VerificationStatusProps) => {
  const [docsVerified, setDocsVerified] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const documents = [
    { id: '1', name: 'Aadhaar Card', status: 'verified' },
    { id: '2', name: 'PAN Card', status: 'verified' },
    { id: '3', name: 'Educational Certificates', status: 'in-progress' },
    { id: '4', name: 'Previous Employment Certificate', status: 'in-progress' },
    { id: '5', name: 'Bank Account Details', status: 'not-started' },
  ];
  
  useEffect(() => {
    // Simulate gradual verification process
    const timeout1 = setTimeout(() => {
      setDocsVerified(2);
    }, 1000);
    
    const timeout2 = setTimeout(() => {
      setDocsVerified(3);
    }, 3000);
    
    const timeout3 = setTimeout(() => {
      setDocsVerified(4);
    }, 4500);
    
    const timeout4 = setTimeout(() => {
      setDocsVerified(5);
      setIsCompleted(true);
    }, 6000);
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
    };
  }, []);
  
  const getStatusIcon = (status: string, index: number) => {
    if (index < docsVerified) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (index === docsVerified) {
      return <Clock className="w-5 h-5 text-amber-500 animate-pulse" />;
    } else {
      return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };
  
  const getStatusBadge = (status: string, index: number) => {
    if (index < docsVerified) {
      return <Badge variant="success">Verified</Badge>;
    } else if (index === docsVerified) {
      return <Badge variant="warning">In Progress</Badge>;
    } else {
      return <Badge variant="default">Pending</Badge>;
    }
  };
  
  return (
    <div className="animate-fade-in space-y-6 py-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Verification Status</h2>
        <p className="text-muted-foreground">
          We're verifying your documents. This may take a few moments.
        </p>
      </div>
      
      <div className="mt-4 bg-muted/30 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium">Overall Progress</h3>
            <p className="text-sm text-muted-foreground">
              {docsVerified} of {documents.length} documents verified
            </p>
          </div>
          <div className="text-right">
            <span className="font-medium text-sm">
              {Math.round((docsVerified / documents.length) * 100)}%
            </span>
          </div>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(docsVerified / documents.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="space-y-4 mt-6">
        {documents.map((doc, index) => (
          <div 
            key={doc.id}
            className="bg-white border border-border rounded-lg p-4 flex items-center justify-between transition-all duration-300"
          >
            <div className="flex items-center space-x-3">
              <div>
                {getStatusIcon(doc.status, index)}
              </div>
              <div>
                <h3 className="font-medium">{doc.name}</h3>
                {getStatusBadge(doc.status, index)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {isCompleted && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
          <div className="mt-0.5">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-green-800">Verification Complete</h3>
            <p className="text-sm text-green-700">
              All documents have been successfully verified. You can now proceed with the next steps.
            </p>
          </div>
        </div>
      )}
      
      <div className="pt-4 flex justify-end">
        <Button 
          onClick={onComplete} 
          className="bg-primary hover:bg-primary/90"
          disabled={!isCompleted}
        >
          Complete Onboarding
        </Button>
      </div>
    </div>
  );
};

export default VerificationStatus;
