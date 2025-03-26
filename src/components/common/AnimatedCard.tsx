
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedCard = ({ children, className, delay = 0 }: AnimatedCardProps) => {
  const delayStyle = delay ? { animationDelay: `${delay}ms` } : {};
  
  return (
    <div 
      className={cn(
        "animate-scale-in opacity-0 rounded-lg p-6 shadow-soft bg-white",
        className
      )}
      style={delayStyle}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
