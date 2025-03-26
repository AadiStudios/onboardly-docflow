
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

const FeatureCard = ({ title, description, icon: Icon, className }: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "group h-full rounded-2xl p-6 border border-border/50 bg-card hover:border-primary/20 hover:shadow-soft transition-all duration-300",
        className
      )}
    >
      <div className="flex flex-col space-y-4 h-full">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-all duration-300">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        
        <h3 className="text-xl font-medium text-foreground">{title}</h3>
        
        <p className="text-muted-foreground flex-grow">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
