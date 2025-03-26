
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/common/Badge';
import { Users, FileCheck, Clock, PlusCircle, BarChart3, UserCheck, Calendar } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const employees = [
    { 
      id: 1, 
      name: 'Rajesh Kumar', 
      position: 'Software Engineer',
      department: 'Engineering',
      status: 'verification-pending',
      progress: 75,
      joined: '2023-10-15'
    },
    { 
      id: 2, 
      name: 'Priya Sharma', 
      position: 'Marketing Specialist', 
      department: 'Marketing', 
      status: 'docs-pending',
      progress: 40,
      joined: '2023-11-20'
    },
    { 
      id: 3, 
      name: 'Ankit Patel', 
      position: 'Finance Analyst', 
      department: 'Finance', 
      status: 'completed',
      progress: 100,
      joined: '2023-09-05'
    },
    { 
      id: 4, 
      name: 'Divya Singh', 
      position: 'HR Assistant', 
      department: 'Human Resources', 
      status: 'in-progress',
      progress: 60,
      joined: '2023-12-10'
    },
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verification-pending':
        return <Badge variant="warning">Verification Pending</Badge>;
      case 'docs-pending':
        return <Badge variant="info">Documents Pending</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="default">In Progress</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage your employee onboarding process
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/onboarding">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  New Employee
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="animate-scale-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Employees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-primary mr-2" />
                  <span className="text-2xl font-bold">124</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">+12 this month</p>
              </CardContent>
            </Card>
            
            <Card className="animate-scale-in" style={{ animationDelay: '100ms' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <FileCheck className="w-5 h-5 text-amber-500 mr-2" />
                  <span className="text-2xl font-bold">17</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">5 urgent</p>
              </CardContent>
            </Card>
            
            <Card className="animate-scale-in" style={{ animationDelay: '200ms' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Onboarding Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-primary mr-2" />
                  <span className="text-2xl font-bold">3.2 days</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">-0.5 days from last month</p>
              </CardContent>
            </Card>
            
            <Card className="animate-scale-in" style={{ animationDelay: '300ms' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Onboarding Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <BarChart3 className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-2xl font-bold">94%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">+2% from last month</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="overview" onValueChange={setActiveTab} className="animate-fade-in">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="employees">Employees</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Onboarding Progress</CardTitle>
                      <CardDescription>
                        Status of employees currently in the onboarding process
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {employees.map((employee) => (
                          <div 
                            key={employee.id} 
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-border rounded-md hover:border-primary/20 hover:shadow-soft transition-all"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <UserCheck className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{employee.name}</h3>
                                <div className="flex flex-col sm:flex-row sm:items-center mt-1 text-xs text-muted-foreground">
                                  <span>{employee.position}</span>
                                  <span className="hidden sm:inline mx-2">•</span>
                                  <span>{employee.department}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-3 sm:mt-0 flex items-center space-x-4">
                              <div className="hidden sm:block">
                                {getStatusBadge(employee.status)}
                              </div>
                              
                              <div className="flex-grow sm:w-28">
                                <div className="flex justify-between text-xs mb-1">
                                  <span>{employee.status === 'completed' ? 'Completed' : 'In Progress'}</span>
                                  <span>{employee.progress}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-1.5">
                                  <div className="bg-primary h-1.5 rounded-full" style={{ width: `${employee.progress}%` }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Onboarding</CardTitle>
                      <CardDescription>
                        New employees starting in the next 30 days
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center p-3 border border-border rounded-md">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <Calendar className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Neha Gupta</h3>
                            <div className="text-xs text-muted-foreground mt-1">
                              <span>May 15, 2023</span>
                              <span className="px-1.5">•</span>
                              <span>Product Manager</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-3 border border-border rounded-md">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <Calendar className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Arun Mehta</h3>
                            <div className="text-xs text-muted-foreground mt-1">
                              <span>May 20, 2023</span>
                              <span className="px-1.5">•</span>
                              <span>UX Designer</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-3 border border-border rounded-md">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <Calendar className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Sanjay Verma</h3>
                            <div className="text-xs text-muted-foreground mt-1">
                              <span>June 1, 2023</span>
                              <span className="px-1.5">•</span>
                              <span>Sales Executive</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4">
                        View All
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="employees">
              <Card>
                <CardHeader>
                  <CardTitle>All Employees</CardTitle>
                  <CardDescription>
                    Manage all employees and their onboarding status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Employee management content will go here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Document Management</CardTitle>
                  <CardDescription>
                    Manage employee documents and verification status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Document management content will go here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Onboarding Reports</CardTitle>
                  <CardDescription>
                    View analytics and reports on onboarding metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Reports and analytics content will go here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
