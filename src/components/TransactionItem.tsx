interface TransactionItemProps {
  name: string;
  category: string;
  amount: number;
  date: string;
  icon: string;
}

export const TransactionItem = ({ name, category, amount, date, icon }: TransactionItemProps) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-base">
          {icon}
        </div>
        <div>
          <p className="font-medium text-sm text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{category} • {date}</p>
        </div>
      </div>
      <span className="font-semibold text-sm text-foreground">-₹{amount.toLocaleString('en-IN')}</span>
    </div>
  );
};
