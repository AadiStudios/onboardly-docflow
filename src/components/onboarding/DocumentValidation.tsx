
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, CheckCircle, FileText, X } from 'lucide-react';
import Badge from '@/components/common/Badge';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import AnimatedCard from '@/components/common/AnimatedCard';

interface Document {
  id: string;
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  uploaded: boolean;
  comment?: string;
}

interface DocumentValidationProps {
  onComplete: () => void;
}

const DocumentValidation = ({ onComplete }: DocumentValidationProps) => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Aadhaar Card', status: 'pending', uploaded: true },
    { id: '2', name: 'PAN Card', status: 'pending', uploaded: true },
    { id: '3', name: 'Educational Certificates', status: 'pending', uploaded: true },
    { id: '4', name: 'Previous Employment Certificate', status: 'pending', uploaded: true },
    { id: '5', name: 'Bank Account Details', status: 'pending', uploaded: true },
  ]);
  
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [allChecked, setAllChecked] = useState(false);
  
  const handleDocumentView = (doc: Document) => {
    setSelectedDocument(doc);
  };
  
  const closeDocumentView = () => {
    setSelectedDocument(null);
  };
  
  const openRejectDialog = (doc: Document) => {
    setSelectedDocument(doc);
    setRejectDialogOpen(true);
  };
  
  const closeRejectDialog = () => {
    setRejectDialogOpen(false);
    setComment('');
  };
  
  const openApproveDialog = (doc: Document) => {
    setSelectedDocument(doc);
    setApproveDialogOpen(true);
  };
  
  const closeApproveDialog = () => {
    setApproveDialogOpen(false);
  };
  
  const handleRejectDocument = () => {
    if (selectedDocument) {
      setDocuments(prevDocs =>
        prevDocs.map(doc =>
          doc.id === selectedDocument.id 
            ? { ...doc, status: 'rejected', comment: comment } 
            : doc
        )
      );
      
      toast.error(`Document ${selectedDocument.name} rejected`, {
        description: comment || 'Document has been rejected',
      });
      
      closeRejectDialog();
      setSelectedDocument(null);
    }
  };
  
  const handleApproveDocument = () => {
    if (selectedDocument) {
      setDocuments(prevDocs =>
        prevDocs.map(doc =>
          doc.id === selectedDocument.id 
            ? { ...doc, status: 'approved', comment: undefined } 
            : doc
        )
      );
      
      toast.success(`Document ${selectedDocument.name} approved`, {
        description: 'Document has passed verification',
      });
      
      closeApproveDialog();
      setSelectedDocument(null);
    }
  };
  
  const handleBulkApprove = () => {
    const pendingDocs = documents.filter(doc => doc.status === 'pending');
    if (pendingDocs.length === 0) return;
    
    setDocuments(prevDocs =>
      prevDocs.map(doc =>
        doc.status === 'pending' ? { ...doc, status: 'approved' } : doc
      )
    );
    
    toast.success(`${pendingDocs.length} documents approved`, {
      description: 'All pending documents have been approved',
    });
  };
  
  const isAllValidated = documents.every(doc => doc.status === 'approved' || doc.status === 'rejected');
  const canComplete = documents.every(doc => doc.status === 'approved');
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'rejected':
        return <Badge variant="danger">Rejected</Badge>;
      default:
        return <Badge variant="warning">Pending</Badge>;
    }
  };
  
  return (
    <div className="animate-fade-in space-y-6 py-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Document Validation</h2>
        <p className="text-muted-foreground">
          Review and validate employee submitted documents
        </p>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox 
            id="validate-all" 
            checked={allChecked}
            onCheckedChange={(checked) => {
              if (checked) {
                const pendingDocs = documents.filter(doc => doc.status === 'pending').length;
                if (pendingDocs > 0) {
                  setAllChecked(true);
                }
              } else {
                setAllChecked(false);
              }
            }}
          />
          <label htmlFor="validate-all" className="text-sm font-medium">
            Select all pending documents
          </label>
        </div>
        
        <Button 
          variant="default" 
          size="sm" 
          onClick={handleBulkApprove} 
          disabled={!allChecked}
        >
          Approve Selected
        </Button>
      </div>
      
      <div className="space-y-4 mt-4">
        {documents.map((doc) => (
          <AnimatedCard 
            key={doc.id}
            className="border border-border hover:border-primary/30 transition-all hover:shadow-soft"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {doc.status === 'pending' && (
                  <Checkbox 
                    checked={allChecked}
                    onCheckedChange={(checked) => {
                      if (!checked) setAllChecked(false);
                    }}
                  />
                )}
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{doc.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusBadge(doc.status)}
                    {doc.comment && (
                      <span className="text-xs text-muted-foreground">
                        {doc.comment.length > 30 ? `${doc.comment.substring(0, 30)}...` : doc.comment}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDocumentView(doc)}
                >
                  View
                </Button>
                
                {doc.status === 'pending' && (
                  <>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => openApproveDialog(doc)}
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => openRejectDialog(doc)}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
      
      <div className="pt-6 flex items-center justify-between">
        <div>
          {canComplete ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">All documents approved</span>
            </div>
          ) : isAllValidated ? (
            <div className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm font-medium">Some documents were rejected</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm font-medium">All documents must be validated</span>
            </div>
          )}
        </div>
        
        <Button 
          onClick={onComplete} 
          disabled={!canComplete}
        >
          Complete Validation
        </Button>
      </div>
      
      {/* Document View Dialog */}
      <Dialog open={!!selectedDocument && !rejectDialogOpen && !approveDialogOpen} onOpenChange={closeDocumentView}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.name}</DialogTitle>
            <DialogDescription>
              Document preview and details
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-muted/50 rounded-lg p-8 flex items-center justify-center">
            <FileText className="h-20 w-20 text-muted-foreground" />
          </div>
          
          <div className="text-sm">
            <p><span className="font-medium">Status:</span> {selectedDocument?.status}</p>
            {selectedDocument?.comment && (
              <p className="mt-2"><span className="font-medium">Comment:</span> {selectedDocument.comment}</p>
            )}
          </div>
          
          <DialogFooter>
            {selectedDocument?.status === 'pending' && (
              <div className="flex space-x-2 w-full">
                <Button 
                  variant="outline" 
                  onClick={closeDocumentView}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button 
                  variant="default" 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    closeDocumentView();
                    setTimeout(() => openApproveDialog(selectedDocument), 100);
                  }}
                >
                  Approve
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={() => {
                    closeDocumentView();
                    setTimeout(() => openRejectDialog(selectedDocument), 100);
                  }}
                >
                  Reject
                </Button>
              </div>
            )}
            {selectedDocument?.status !== 'pending' && (
              <Button onClick={closeDocumentView}>Close</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reject Dialog */}
      <AlertDialog open={rejectDialogOpen} onOpenChange={closeRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive">Reject Document</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to reject the {selectedDocument?.name}. Please provide a reason for rejection.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="my-4">
            <textarea 
              className="w-full p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              rows={3}
              placeholder="Enter reason for rejection..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeRejectDialog}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleRejectDocument}
              className="bg-destructive hover:bg-destructive/90"
            >
              Reject Document
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Approve Dialog */}
      <AlertDialog open={approveDialogOpen} onOpenChange={closeApproveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Document</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to approve the {selectedDocument?.name}. This document will be marked as verified.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeApproveDialog}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleApproveDocument}
              className="bg-green-600 hover:bg-green-700"
            >
              Approve Document
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DocumentValidation;
