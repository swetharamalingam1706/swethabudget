import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BudgetCardProps {
  category: string;
  spent: number;
  budget: number;
  icon: string;
}

export const BudgetCard = ({ category, spent, budget, icon }: BudgetCardProps) => {
  const percentage = (spent / budget) * 100;
  const status = percentage >= 100 ? "over" : percentage >= 80 ? "warning" : "good";
  
  const statusColors = {
    good: "bg-[hsl(var(--success))]",
    warning: "bg-[hsl(var(--warning))]",
    over: "bg-[hsl(var(--destructive))]",
  };

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{icon}</div>
          <div>
            <h3 className="font-semibold text-card-foreground">{category}</h3>
            <p className="text-sm text-muted-foreground">
              ${spent.toFixed(2)} / ${budget.toFixed(2)}
            </p>
          </div>
        </div>
        <span className={`text-sm font-medium ${
          status === "good" ? "text-[hsl(var(--success))]" : 
          status === "warning" ? "text-[hsl(var(--warning))]" : 
          "text-[hsl(var(--destructive))]"
        }`}>
          {percentage.toFixed(0)}%
        </span>
      </div>
      <Progress value={percentage} className="h-2" indicatorClassName={statusColors[status]} />
    </Card>
  );
};
