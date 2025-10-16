import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "success" | "warning";
}

export const StatCard = ({ title, value, icon: Icon, trend, variant = "default" }: StatCardProps) => {
  const variantStyles = {
    default: "bg-gradient-to-br from-primary/10 to-primary/5",
    success: "bg-gradient-to-br from-[hsl(var(--success))]/10 to-[hsl(var(--success))]/5",
    warning: "bg-gradient-to-br from-[hsl(var(--warning))]/10 to-[hsl(var(--warning))]/5",
  };

  return (
    <Card className={`p-4 ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className="text-xs text-muted-foreground mt-1">{trend}</p>
          )}
        </div>
        <div className={`p-2 rounded-lg ${
          variant === "success" ? "bg-[hsl(var(--success))]/20" :
          variant === "warning" ? "bg-[hsl(var(--warning))]/20" :
          "bg-primary/20"
        }`}>
          <Icon className={`h-5 w-5 ${
            variant === "success" ? "text-[hsl(var(--success))]" :
            variant === "warning" ? "text-[hsl(var(--warning))]" :
            "text-primary"
          }`} />
        </div>
      </div>
    </Card>
  );
};
