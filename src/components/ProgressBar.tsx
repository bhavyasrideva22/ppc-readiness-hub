import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  sectionName: string;
  className?: string;
}

export function ProgressBar({ current, total, sectionName, className }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-foreground">{sectionName}</span>
        <span className="text-muted-foreground">{current} of {total}</span>
      </div>
      <div className="w-full bg-progress-background rounded-full h-2 overflow-hidden">
        <div 
          className="bg-progress h-full transition-smooth rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-xs text-muted-foreground text-center">
        {percentage}% Complete
      </div>
    </div>
  );
}