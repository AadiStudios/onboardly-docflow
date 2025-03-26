
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import Badge from '@/components/common/Badge';

interface Document {
  id: string;
  name: string;
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
}

interface DocumentUploadProps {
  onNext: () => void;
}

const DocumentUpload = ({ onNext }: DocumentUploadProps) => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Aadhaar Card', status: 'pending' },
    { id: '2', name: 'PAN Card', status: 'pending' },
    { id: '3', name: 'Educational Certificates', status: 'pending' },
    { id: '4', name: 'Previous Employment Certificate', status: 'pending' },
    { id: '5', name: 'Bank Account Details', status: 'pending' },
  ]);

  const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments(prevDocs =>
        prevDocs.map(doc =>
          doc.id === id ? { ...doc, status: 'uploaded' } : doc
        )
      );
    }
  };

  const removeDocument = (id: string) => {
    setDocuments(prevDocs =>
      prevDocs.map(doc =>
        doc.id === id ? { ...doc, status: 'pending' } : doc
      )
    );
  };

  const allUploaded = documents.every(doc => doc.status === 'uploaded' || doc.status === 'verified');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'uploaded':
        return <Badge variant="info">Uploaded</Badge>;
      case 'verified':
        return <Badge variant="success">Verified</Badge>;
      case 'rejected':
        return <Badge variant="danger">Rejected</Badge>;
      default:
        return <Badge variant="warning">Required</Badge>;
    }
  };

  return (
    <div className="animate-fade-in space-y-6 py-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Document Verification</h2>
        <p className="text-muted-foreground">
          Please upload the following documents for verification
        </p>
      </div>

      <div className="space-y-4 mt-6">
        {documents.map((doc) => (
          <div 
            key={doc.id}
            className="border border-border rounded-lg p-4 transition-all hover:border-primary/30 hover:shadow-soft"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{doc.name}</h3>
                  {getStatusBadge(doc.status)}
                </div>
              </div>

              {doc.status === 'pending' ? (
                <div>
                  <input 
                    type="file" 
                    id={`file-${doc.id}`} 
                    className="hidden" 
                    onChange={(e) => handleFileUpload(doc.id, e)}
                  />
                  <label 
                    htmlFor={`file-${doc.id}`}
                    className="cursor-pointer inline-flex items-center px-3 py-1.5 text-sm bg-secondary rounded-md hover:bg-secondary/70 transition-all"
                  >
                    <Upload className="w-4 h-4 mr-1.5" />
                    Upload
                  </label>
                </div>
              ) : (
                <div className="flex items-center">
                  {doc.status === 'uploaded' && (
                    <button 
                      className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                      onClick={() => removeDocument(doc.id)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {doc.status === 'verified' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              )}
            </div>

            {doc.status === 'uploaded' && (
              <div className="mt-3 flex items-center space-x-2">
                <div className="h-2 bg-primary/15 rounded-full flex-grow">
                  <div className="h-2 bg-primary rounded-full w-full animate-pulse"></div>
                </div>
                <span className="text-xs text-muted-foreground">Awaiting verification</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pt-4 flex justify-end">
        <Button 
          onClick={onNext} 
          className="bg-primary hover:bg-primary/90"
          disabled={!allUploaded}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default DocumentUpload;
