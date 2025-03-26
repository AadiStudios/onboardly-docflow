
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  FileCheck,
  FileText, 
  ClipboardCheck, 
  File
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from '@/components/ui/button';

interface DocumentValidationMenuProps {
  onRefresh?: () => void;
}

const DocumentValidationMenu = ({ onRefresh }: DocumentValidationMenuProps) => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <div className="flex items-center justify-between w-full mb-6">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-primary text-white hover:bg-primary/90">
              <FileText className="w-4 h-4 mr-2" />
              Document Actions
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4">
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-start"
                  onClick={() => navigate('/dashboard')}
                >
                  <FileCheck className="w-4 h-4 mr-2" />
                  View All Documents
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-start"
                  onClick={handleRefresh}
                >
                  <File className="w-4 h-4 mr-2" />
                  Refresh Document List
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-start"
                  onClick={() => navigate('/onboarding')}
                >
                  <ClipboardCheck className="w-4 h-4 mr-2" />
                  Go to Onboarding
                </Button>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Check className="w-4 h-4 mr-2" />
              Quick Actions
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4">
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-start"
                  onClick={() => navigate('/onboarding')}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Approve Selected
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-start text-destructive"
                  onClick={() => navigate('/onboarding')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Reject Selected
                </Button>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DocumentValidationMenu;
