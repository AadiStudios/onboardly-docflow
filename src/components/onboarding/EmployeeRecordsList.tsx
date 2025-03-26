
import { useState } from 'react';
import { FileText, Search, Filter, Check, X, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Badge from '@/components/common/Badge';
import AnimatedCard from '@/components/common/AnimatedCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';

interface EmployeeRecord {
  id: string;
  name: string;
  email: string;
  department: string;
  documentStatus: 'pending' | 'approved' | 'rejected';
  submissionDate: string;
}

const EmployeeRecordsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof EmployeeRecord>('submissionDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Mock data for employee records
  const [records, setRecords] = useState<EmployeeRecord[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      department: 'Engineering',
      documentStatus: 'approved',
      submissionDate: '2023-06-15',
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      department: 'Human Resources',
      documentStatus: 'pending',
      submissionDate: '2023-06-18',
    },
    {
      id: '3',
      name: 'Amit Patel',
      email: 'amit.patel@example.com',
      department: 'Finance',
      documentStatus: 'rejected',
      submissionDate: '2023-06-10',
    },
    {
      id: '4',
      name: 'Neha Singh',
      email: 'neha.singh@example.com',
      department: 'Marketing',
      documentStatus: 'approved',
      submissionDate: '2023-06-05',
    },
    {
      id: '5',
      name: 'Vikram Reddy',
      email: 'vikram.reddy@example.com',
      department: 'Engineering',
      documentStatus: 'pending',
      submissionDate: '2023-06-20',
    },
  ]);

  const handleSort = (column: keyof EmployeeRecord) => {
    const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(newDirection);
  };

  const getSortedRecords = () => {
    const filtered = records.filter(record => 
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
      
      return 0;
    });
  };

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

  const handleViewDetails = (id: string) => {
    navigate(`/document-validation?employeeId=${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Employee Submitted Records</h2>
        <p className="text-muted-foreground">
          View and manage employee document submissions
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email or department..."
            className="pl-9 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="default" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <AnimatedCard className="border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>
                  <div 
                    className="flex items-center cursor-pointer" 
                    onClick={() => handleSort('name')}
                  >
                    Employee
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div 
                    className="flex items-center cursor-pointer" 
                    onClick={() => handleSort('department')}
                  >
                    Department
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div 
                    className="flex items-center cursor-pointer" 
                    onClick={() => handleSort('documentStatus')}
                  >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div 
                    className="flex items-center cursor-pointer" 
                    onClick={() => handleSort('submissionDate')}
                  >
                    Submitted On
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getSortedRecords().length > 0 ? (
                getSortedRecords().map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{record.name}</div>
                        <div className="text-sm text-muted-foreground">{record.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{record.department}</TableCell>
                    <TableCell>{getStatusBadge(record.documentStatus)}</TableCell>
                    <TableCell>
                      {new Date(record.submissionDate).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(record.id)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    No records found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default EmployeeRecordsList;
