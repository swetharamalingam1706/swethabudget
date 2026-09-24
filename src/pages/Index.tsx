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

interface Budget {
  category: string;
  spent: number;
  budget: number;
  icon: string;
}

const initialBudgets: Budget[] = [
  { category: "Food & Dining", spent: 3750, budget: 5000, icon: "🍔" },
  { category: "Shopping", spent: 2650, budget: 3300, icon: "🛍️" },
  { category: "Transportation", spent: 1500, budget: 1650, icon: "🚗" },
  { category: "Entertainment", spent: 1250, budget: 2100, icon: "🎬" },
];

const categoryMap: Record<string, string> = {
  food: "Food & Dining",
  shopping: "Shopping",
  transport: "Transportation",
  entertainment: "Entertainment",
};

const initialTransactions = [
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

const formatINR = (value: number) => `₹${value.toLocaleString("en-IN")}`;

const Index = () => {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    savingsGoal: "415000",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
  });
  const [editingBudgetIndex, setEditingBudgetIndex] = useState<number | null>(null);
  const [editBudgetValue, setEditBudgetValue] = useState("");

  // Derived totals — everything recalculates from the budgets you set
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalBudget = budgets.reduce((sum, b) => sum + b.budget, 0);
  const budgetLeft = totalBudget - totalSpent;
  const percentRemaining = totalBudget > 0 ? Math.max(0, Math.round((budgetLeft / totalBudget) * 100)) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);
    const categoryName = categoryMap[formData.category];
    if (!amount || !categoryName) return;

    // Add to recent transactions list
    const icons: Record<string, string> = {
      "Food & Dining": "🍔",
      Shopping: "🛍️",
      Transportation: "🚗",
      Entertainment: "🎬",
    };
    setTransactions((prev) => [
      { name: formData.name, category: categoryName, amount, date: "Today", icon: icons[categoryName] },
      ...prev,
    ]);

    // Update the matching budget's spent amount
    setBudgets((prev) =>
      prev.map((b) => (b.category === categoryName ? { ...b, spent: b.spent + amount } : b))
    );

    toast.success("Transaction added and budget updated!");
    setIsDialogOpen(false);
    setFormData({ name: "", amount: "", category: "" });
  };

  const handleProfileSave = () => {
    toast.success("Profile updated successfully!");
    setIsEditingProfile(false);
  };

  const handleProfileCancel = () => {
    setIsEditingProfile(false);
  };

  const openEditBudget = (index: number) => {
    setEditingBudgetIndex(index);
    setEditBudgetValue(String(budgets[index].budget));
  };

  const handleBudgetSave = () => {
    const value = parseFloat(editBudgetValue);
    if (editingBudgetIndex === null || !value || value <= 0) {
      toast.error("Please enter a valid budget amount");
      return;
    }
    setBudgets((prev) =>
      prev.map((b, i) => (i === editingBudgetIndex ? { ...b, budget: value } : b))
    );
    toast.success(`${budgets[editingBudgetIndex].category} budget updated to ${formatINR(value)}`);
    setEditingBudgetIndex(null);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-[hsl(var(--primary)_/_0.8)] text-primary-foreground p-4 pb-6 sticky top-0 z-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">MyBudget</h1>
            <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="h-9">Profile</Button>
              </DialogTrigger>
              <DialogContent className="w-[90vw] max-w-md mx-auto">
                <DialogHeader>
                  <DialogTitle>Profile</DialogTitle>
                </DialogHeader>
                {!isEditingProfile ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-2xl">👤</span>
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{profileData.name}</p>
                        <p className="text-sm text-muted-foreground">{profileData.email}</p>
                      </div>
                    </div>
                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Member since</span>
                        <span className="font-medium">January 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total monthly budget</span>
                        <span className="font-medium">{formatINR(totalBudget)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Savings goal</span>
                        <span className="font-medium">₹{parseInt(profileData.savingsGoal).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button className="w-full" variant="outline" onClick={() => setIsEditingProfile(true)}>
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="profile-name">Full Name</Label>
                        <Input
                          id="profile-name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="profile-email">Email</Label>
                        <Input
                          id="profile-email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="profile-savings">Savings Goal (₹)</Label>
                        <Input
                          id="profile-savings"
                          type="number"
                          value={profileData.savingsGoal}
                          onChange={(e) => setProfileData({ ...profileData, savingsGoal: e.target.value })}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1" onClick={handleProfileSave}>
                        Save Changes
                      </Button>
                      <Button className="flex-1" variant="outline" onClick={handleProfileCancel}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-xs text-primary-foreground/80 mb-1">Total Balance</p>
            <p className="text-3xl font-bold mb-3">₹4,85,325</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3.5 w-3.5" />
                <span className="text-xs">Income: ₹2,65,600</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="h-3.5 w-3.5" />
                <span className="text-xs">Expenses: {formatINR(totalSpent)}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 pb-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 h-11">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="budgets" className="text-xs">Budgets</TabsTrigger>
            <TabsTrigger value="insights" className="text-xs">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-3">
              <StatCard 
                title="This Month" 
                value={formatINR(totalSpent)} 
                icon={Wallet}
                trend={`of ${formatINR(totalBudget)} budgeted`}
              />
              <StatCard 
                title="Budget Left" 
                value={formatINR(budgetLeft)} 
                icon={TrendingUp}
                trend={`${percentRemaining}% remaining`}
                variant="success"
              />
              <StatCard 
                title="Savings Goal" 
                value="₹2,07,500" 
                icon={PieChart}
                trend={`Target: ₹${parseInt(profileData.savingsGoal).toLocaleString('en-IN')}`}
                variant="warning"
              />
            </div>

            {/* Recent Transactions */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Recent Transactions</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="shadow-[var(--shadow-button)] h-9">
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90vw] max-w-md mx-auto">
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
                          className="h-11"
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
                          className="h-11"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                          required
                        >
                          <SelectTrigger id="category" className="h-11">
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
                      <Button type="submit" className="w-full h-11">Add Transaction</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-2">
                {transactions.map((transaction, index) => (
                  <TransactionItem key={index} {...transaction} />
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="budgets" className="space-y-4">
            <div className="mb-3">
              <h2 className="text-lg font-bold text-foreground">Budget Categories</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Total: {formatINR(totalSpent)} spent of {formatINR(totalBudget)} · Tap the pencil to change a budget
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {budgets.map((budget, index) => (
                <BudgetCard key={index} {...budget} onEdit={() => openEditBudget(index)} />
              ))}
            </div>

            {/* Edit Budget Dialog */}
            <Dialog open={editingBudgetIndex !== null} onOpenChange={(open) => !open && setEditingBudgetIndex(null)}>
              <DialogContent className="w-[90vw] max-w-md mx-auto">
                <DialogHeader>
                  <DialogTitle>
                    Edit {editingBudgetIndex !== null ? budgets[editingBudgetIndex].category : ""} Budget
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="budget-amount">Monthly Budget (₹)</Label>
                    <Input
                      id="budget-amount"
                      type="number"
                      min="1"
                      value={editBudgetValue}
                      onChange={(e) => setEditBudgetValue(e.target.value)}
                      placeholder="0"
                      className="h-11"
                    />
                    {editingBudgetIndex !== null && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Currently spent: {formatINR(budgets[editingBudgetIndex].spent)}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 h-11" onClick={handleBudgetSave}>Save Budget</Button>
                    <Button className="flex-1 h-11" variant="outline" onClick={() => setEditingBudgetIndex(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <Card className="p-4">
              <h2 className="text-lg font-bold text-foreground mb-4">Weekly Spending</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
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

            <Card className="p-4">
              <h3 className="text-base font-semibold text-foreground mb-3">Top Spending Categories</h3>
              <div className="space-y-3">
                {[...budgets]
                  .sort((a, b) => b.spent - a.spent)
                  .map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm text-foreground">{item.category}</span>
                      </div>
                      <span className="font-semibold text-foreground text-sm">{formatINR(item.spent)}</span>
                    </div>
                  ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-base font-semibold text-foreground mb-3">Financial Tips</h3>
              <div className="space-y-2">
                {budgetLeft >= 0 ? (
                  <div className="p-3 bg-[hsl(var(--success))]/10 rounded-lg">
                    <p className="text-xs text-foreground">
                      ✅ You have {formatINR(budgetLeft)} left from your {formatINR(totalBudget)} budget. Keep it up!
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-[hsl(var(--destructive))]/10 rounded-lg">
                    <p className="text-xs text-foreground">
                      🚨 You're over budget by {formatINR(Math.abs(budgetLeft))}. Time to slow down spending!
                    </p>
                  </div>
                )}
                {budgets.some((b) => b.spent / b.budget >= 0.8 && b.spent / b.budget < 1) && (
                  <div className="p-3 bg-[hsl(var(--warning))]/10 rounded-lg">
                    <p className="text-xs text-foreground">
                      ⚠️ {budgets.find((b) => b.spent / b.budget >= 0.8 && b.spent / b.budget < 1)?.category} is approaching its limit
                    </p>
                  </div>
                )}
                {budgets.some((b) => b.spent > b.budget) && (
                  <div className="p-3 bg-[hsl(var(--destructive))]/10 rounded-lg">
                    <p className="text-xs text-foreground">
                      🚨 {budgets.find((b) => b.spent > b.budget)?.category} has exceeded its budget
                    </p>
                  </div>
                )}
                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="text-xs text-foreground">
                    💡 Setting aside {formatINR(Math.max(0, Math.round(budgetLeft * 0.5)))} of your remaining budget could boost your savings goal
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
