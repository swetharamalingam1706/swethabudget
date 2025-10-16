interface TransactionItemProps {
  name: string;
  category: string;
  amount: number;
  date: string;
  icon: string;
}

export const TransactionItem = ({ name, category, amount, date, icon }: TransactionItemProps) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
          {icon}
        </div>
        <div>
          <p className="font-medium text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{category} • {date}</p>
        </div>
      </div>
      <span className="font-semibold text-foreground">-${amount.toFixed(2)}</span>
    </div>
  );
};
