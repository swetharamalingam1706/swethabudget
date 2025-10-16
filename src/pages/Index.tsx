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
  { category: "Food & Dining", spent: 3750, budget: 5000, icon: "🍔" },
  { category: "Shopping", spent: 2650, budget: 3300, icon: "🛍️" },
  { category: "Transportation", spent: 1500, budget: 1650, icon: "🚗" },
  { category: "Entertainment", spent: 1250, budget: 2100, icon: "🎬" },
];

const transactions = [
  { name: "Big Basket", category: "Groceries", amount: 725, date: "Today", icon: "🛒" },
  { name: "Ola", category: "Transportation", amount: 202, date: "Yesterday", icon: "🚕" },
  { name: "Netflix", category: "Entertainment", amount: 649, date: "2 days ago", icon: "📺" },
  { name: "Cafe Coffee Day", category: "Food & Dining", amount: 350, date: "2 days ago", icon: "☕" },
  { name: "Flipkart", category: "Shopping", amount: 4500, date: "3 days ago", icon: "📦" },
];

const chartData = [
  { name: "Mon", amount: 995 },
  { name: "Tue", amount: 738 },
  { name: "Wed", amount: 1203 },
  { name: "Thu", amount: 556 },
  { name: "Fri", amount: 1643 },
  { name: "Sat", amount: 1942 },
  { name: "Sun", amount: 1294 },
];

const Index = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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
            <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm">Profile</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-2xl">👤</span>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Rahul Sharma</p>
                      <p className="text-sm text-muted-foreground">rahul.sharma@email.com</p>
                    </div>
                  </div>
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member since</span>
                      <span className="font-medium">January 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly budget</span>
                      <span className="font-medium">₹12,050</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Savings goal</span>
                      <span className="font-medium">₹4,15,000</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button className="w-full" variant="outline">Edit Profile</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <p className="text-sm text-primary-foreground/80 mb-2">Total Balance</p>
            <p className="text-4xl font-bold mb-4">₹4,85,325</p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">Income: ₹2,65,600</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4" />
                <span className="text-sm">Expenses: ₹1,03,500</span>
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
                value="₹1,03,500" 
                icon={Wallet}
                trend="-12% from last month"
              />
              <StatCard 
                title="Budget Left" 
                value="₹74,950" 
                icon={TrendingUp}
                trend="58% remaining"
                variant="success"
              />
              <StatCard 
                title="Savings Goal" 
                value="₹2,07,500" 
                icon={PieChart}
                trend="Target: ₹4,15,000"
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
                        <Label htmlFor="amount">Amount (₹)</Label>
                        <Input
                          id="amount"
                          type="number"
                          step="1"
                          placeholder="0"
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
                      <span className="font-semibold text-foreground">₹{item.spent.toLocaleString('en-IN')}</span>
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
                      💡 Consider setting aside ₹16,600 more for savings
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
