
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, CheckCircle, FileText, X, Eye, Download } from 'lucide-react';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Document {
  id: string;
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  uploaded: boolean;
  comment?: string;
  employeeName?: string;
  uploadDate?: string;
  fileType?: string;
  fileUrl?: string;
}

interface DocumentValidationProps {
  onComplete: () => void;
}

const DocumentValidation = ({ onComplete }: DocumentValidationProps) => {
  const [documents, setDocuments] = useState<Document[]>([
    { 
      id: '1', 
      name: 'Aadhaar Card', 
      status: 'pending', 
      uploaded: true,
      employeeName: 'Rahul Sharma',
      uploadDate: '2023-10-15',
      fileType: 'PDF',
      fileUrl: '/placeholder.svg' 
    },
    { 
      id: '2', 
      name: 'PAN Card', 
      status: 'pending', 
      uploaded: true,
      employeeName: 'Priya Patel',
      uploadDate: '2023-10-14',
      fileType: 'JPG',
      fileUrl: '/placeholder.svg'
    },
    { 
      id: '3', 
      name: 'Educational Certificates', 
      status: 'pending', 
      uploaded: true,
      employeeName: 'Amit Singh',
      uploadDate: '2023-10-13',
      fileType: 'PDF',
      fileUrl: '/placeholder.svg'
    },
    { 
      id: '4', 
      name: 'Previous Employment Certificate', 
      status: 'pending', 
      uploaded: true,
      employeeName: 'Sneha Gupta',
      uploadDate: '2023-10-12',
      fileType: 'PDF',
      fileUrl: '/placeholder.svg'
    },
    { 
      id: '5', 
      name: 'Bank Account Details', 
      status: 'pending', 
      uploaded: true,
      employeeName: 'Vikram Reddy',
      uploadDate: '2023-10-11',
      fileType: 'PDF',
      fileUrl: '/placeholder.svg'
    },
  ]);
  
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [allChecked, setAllChecked] = useState(false);
  const [editedDocumentData, setEditedDocumentData] = useState<Partial<Document>>({});
  
  const handleDocumentView = (doc: Document) => {
    setSelectedDocument(doc);
    setEditedDocumentData({
      name: doc.name,
      employeeName: doc.employeeName,
      uploadDate: doc.uploadDate,
      fileType: doc.fileType,
      comment: doc.comment
    });
  };
  
  const closeDocumentView = () => {
    setSelectedDocument(null);
    setEditedDocumentData({});
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

  const openPreviewDialog = (doc: Document) => {
    setSelectedDocument(doc);
    setPreviewDialogOpen(true);
  };

  const closePreviewDialog = () => {
    setPreviewDialogOpen(false);
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

  const handleSaveEdits = () => {
    if (selectedDocument && Object.keys(editedDocumentData).length > 0) {
      setDocuments(prevDocs =>
        prevDocs.map(doc =>
          doc.id === selectedDocument.id 
            ? { ...doc, ...editedDocumentData } 
            : doc
        )
      );
      
      toast.success(`Document ${selectedDocument.name} updated`, {
        description: 'Document information has been updated',
      });
      
      closeDocumentView();
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
                    <span className="text-xs text-muted-foreground">
                      {doc.employeeName} • {doc.uploadDate}
                    </span>
                    {doc.comment && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="h-6 px-2 rounded-full">
                            <span className="text-xs">Comment</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-medium">Comment</h4>
                            <p className="text-sm text-muted-foreground">{doc.comment}</p>
                          </div>
                        </PopoverContent>
                      </Popover>
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
                  Edit
                </Button>

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => openPreviewDialog(doc)}
                  className="flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  Preview
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
      
      {/* Document Edit Dialog */}
      <Dialog open={!!selectedDocument && !rejectDialogOpen && !approveDialogOpen && !previewDialogOpen} onOpenChange={closeDocumentView}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Document Information</DialogTitle>
            <DialogDescription>
              Update document details and annotations
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="doc-name">Document Name</label>
              <input
                id="doc-name"
                className="w-full p-2 border border-border rounded-md"
                value={editedDocumentData.name || ''}
                onChange={(e) => setEditedDocumentData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="employee-name">Employee Name</label>
              <input
                id="employee-name"
                className="w-full p-2 border border-border rounded-md"
                value={editedDocumentData.employeeName || ''}
                onChange={(e) => setEditedDocumentData(prev => ({ ...prev, employeeName: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="upload-date">Upload Date</label>
              <input
                id="upload-date"
                type="date"
                className="w-full p-2 border border-border rounded-md"
                value={editedDocumentData.uploadDate || ''}
                onChange={(e) => setEditedDocumentData(prev => ({ ...prev, uploadDate: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="file-type">File Type</label>
              <select
                id="file-type"
                className="w-full p-2 border border-border rounded-md"
                value={editedDocumentData.fileType || ''}
                onChange={(e) => setEditedDocumentData(prev => ({ ...prev, fileType: e.target.value }))}
              >
                <option value="PDF">PDF</option>
                <option value="JPG">JPG</option>
                <option value="PNG">PNG</option>
                <option value="DOC">DOC</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="comment">Internal Comment</label>
              <textarea
                id="comment"
                className="w-full p-2 border border-border rounded-md"
                rows={3}
                value={editedDocumentData.comment || ''}
                onChange={(e) => setEditedDocumentData(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="Add internal notes or comments about this document..."
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={closeDocumentView}>Cancel</Button>
            <Button onClick={handleSaveEdits}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Document Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={closePreviewDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
            <DialogDescription>
              {selectedDocument?.name} submitted by {selectedDocument?.employeeName}
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-muted/50 rounded-lg p-8 flex flex-col items-center justify-center h-96 relative">
            <img 
              src={selectedDocument?.fileUrl || '/placeholder.svg'} 
              alt="Document preview" 
              className="max-h-full object-contain border border-border rounded-md shadow-md"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><span className="font-medium">Document Type:</span> {selectedDocument?.name}</p>
              <p><span className="font-medium">Employee:</span> {selectedDocument?.employeeName}</p>
            </div>
            <div>
              <p><span className="font-medium">Upload Date:</span> {selectedDocument?.uploadDate}</p>
              <p><span className="font-medium">File Type:</span> {selectedDocument?.fileType}</p>
            </div>
            {selectedDocument?.comment && (
              <div className="col-span-2 mt-2 p-3 bg-muted rounded-md">
                <p className="font-medium">Comments:</p>
                <p className="text-muted-foreground">{selectedDocument.comment}</p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            {selectedDocument?.status === 'pending' && (
              <div className="flex space-x-2 w-full">
                <Button 
                  variant="outline" 
                  onClick={closePreviewDialog}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button 
                  variant="default" 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    closePreviewDialog();
                    setTimeout(() => openApproveDialog(selectedDocument), 100);
                  }}
                >
                  Approve
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={() => {
                    closePreviewDialog();
                    setTimeout(() => openRejectDialog(selectedDocument), 100);
                  }}
                >
                  Reject
                </Button>
              </div>
            )}
            {selectedDocument?.status !== 'pending' && (
              <Button onClick={closePreviewDialog}>Close</Button>
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
