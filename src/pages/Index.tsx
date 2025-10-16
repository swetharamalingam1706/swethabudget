import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, TrendingUp, TrendingDown, Plus, PieChart } from "lucide-react";
import { BudgetCard } from "@/components/BudgetCard";
import { TransactionItem } from "@/components/TransactionItem";
import { StatCard } from "@/components/StatCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const budgetData = [
  { category: "Food & Dining", spent: 450, budget: 600, icon: "🍔" },
  { category: "Shopping", spent: 320, budget: 400, icon: "🛍️" },
  { category: "Transportation", spent: 180, budget: 200, icon: "🚗" },
  { category: "Entertainment", spent: 150, budget: 250, icon: "🎬" },
];

const transactions = [
  { name: "Whole Foods", category: "Groceries", amount: 87.50, date: "Today", icon: "🛒" },
  { name: "Uber", category: "Transportation", amount: 24.30, date: "Yesterday", icon: "🚕" },
  { name: "Netflix", category: "Entertainment", amount: 15.99, date: "2 days ago", icon: "📺" },
  { name: "Starbucks", category: "Food & Dining", amount: 12.45, date: "2 days ago", icon: "☕" },
  { name: "Amazon", category: "Shopping", amount: 156.78, date: "3 days ago", icon: "📦" },
];

const chartData = [
  { name: "Mon", amount: 120 },
  { name: "Tue", amount: 89 },
  { name: "Wed", amount: 145 },
  { name: "Thu", amount: 67 },
  { name: "Fri", amount: 198 },
  { name: "Sat", amount: 234 },
  { name: "Sun", amount: 156 },
];

const Index = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Transaction added successfully!");
    setIsDialogOpen(false);
    setFormData({ name: "", amount: "", category: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-[hsl(var(--primary)_/_0.8)] text-primary-foreground p-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">MyBudget</h1>
            <Button variant="secondary" size="sm">Profile</Button>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <p className="text-sm text-primary-foreground/80 mb-2">Total Balance</p>
            <p className="text-4xl font-bold mb-4">$5,847.32</p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">Income: $3,200</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4" />
                <span className="text-sm">Expenses: $1,247</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 -mt-12 pb-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="budgets">Budgets</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard 
                title="This Month" 
                value="$1,247" 
                icon={Wallet}
                trend="-12% from last month"
              />
              <StatCard 
                title="Budget Left" 
                value="$903" 
                icon={TrendingUp}
                trend="58% remaining"
                variant="success"
              />
              <StatCard 
                title="Savings Goal" 
                value="$2,500" 
                icon={PieChart}
                trend="Target: $5,000"
                variant="warning"
              />
            </div>

            {/* Recent Transactions */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">Recent Transactions</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="shadow-[var(--shadow-button)]">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Transaction
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Transaction</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Description</Label>
                        <Input
                          id="name"
                          placeholder="e.g., Grocery shopping"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={formData.amount}
                          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                          required
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="food">Food & Dining</SelectItem>
                            <SelectItem value="shopping">Shopping</SelectItem>
                            <SelectItem value="transport">Transportation</SelectItem>
                            <SelectItem value="entertainment">Entertainment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" className="w-full">Add Transaction</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-1">
                {transactions.map((transaction, index) => (
                  <TransactionItem key={index} {...transaction} />
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="budgets" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">Budget Categories</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {budgetData.map((budget, index) => (
                <BudgetCard key={index} {...budget} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Weekly Spending</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Top Spending Categories</h3>
                <div className="space-y-3">
                  {budgetData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm text-foreground">{item.category}</span>
                      </div>
                      <span className="font-semibold text-foreground">${item.spent.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Financial Tips</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-[hsl(var(--success))]/10 rounded-lg">
                    <p className="text-sm text-foreground">
                      ✅ You're 12% under budget this month! Keep it up!
                    </p>
                  </div>
                  <div className="p-3 bg-[hsl(var(--warning))]/10 rounded-lg">
                    <p className="text-sm text-foreground">
                      ⚠️ Shopping expenses are approaching the limit
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm text-foreground">
                      💡 Consider setting aside $200 more for savings
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
