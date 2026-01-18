import { Crown, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumBadgeProps {
  variant?: "badge" | "overlay" | "icon";
  className?: string;
}

const PremiumBadge = ({ variant = "badge", className }: PremiumBadgeProps) => {
  if (variant === "icon") {
    return (
      <Crown className={cn("h-4 w-4 text-accent", className)} />
    );
  }

  if (variant === "overlay") {
    return (
      <div className={cn(
        "absolute inset-0 bg-background/60 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-lg z-10",
        className
      )}>
        <Lock className="h-8 w-8 text-accent mb-2" />
        <span className="text-sm font-medium text-foreground">Premium</span>
      </div>
    );
  }

  return (
    <span className={cn(
      "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent font-medium",
      className
    )}>
      <Crown className="h-3 w-3" />
      Premium
    </span>
  );
};

export default PremiumBadge;
