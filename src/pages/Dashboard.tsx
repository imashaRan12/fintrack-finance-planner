
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet, CreditCard, PiggyBank } from "lucide-react";

// Mock data for dashboard
const incomeExpenseData = [
  { name: "Jan", income: 4000, expenses: 2400 },
  { name: "Feb", income: 3000, expenses: 1398 },
  { name: "Mar", income: 2000, expenses: 3800 },
  { name: "Apr", income: 2780, expenses: 3908 },
  { name: "May", income: 1890, expenses: 4800 },
  { name: "Jun", income: 2390, expenses: 3800 },
];

const expenseCategoryData = [
  { name: "Housing", value: 35 },
  { name: "Food", value: 20 },
  { name: "Transportation", value: 15 },
  { name: "Utilities", value: 10 },
  { name: "Entertainment", value: 15 },
  { name: "Other", value: 5 },
];

const COLORS = ["#10B981", "#3B82F6", "#F97316", "#8B5CF6", "#EF4444", "#F59E0B"];

const Dashboard = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("");

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  // Calculate total income, expenses and savings
  const totalIncome = incomeExpenseData.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = incomeExpenseData.reduce((sum, item) => sum + item.expenses, 0);
  const savingsRate = Math.round(((totalIncome - totalExpenses) / totalIncome) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {greeting}, {user?.name}
        </h1>
        <p className="text-muted-foreground">
          Here's a summary of your financial activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-fintrack-dark-lighter border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-fintrack-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalIncome - totalExpenses).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-fintrack-dark-lighter border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <Wallet className="h-4 w-4 text-fintrack-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalIncome.toLocaleString()}</div>
            <div className="flex items-center text-green-500 text-xs">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>12% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-fintrack-dark-lighter border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
            <div className="flex items-center text-red-500 text-xs">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              <span>8% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-fintrack-dark-lighter border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
            <PiggyBank className="h-4 w-4 text-fintrack-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savingsRate}%</div>
            <div className="flex items-center text-green-500 text-xs">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>2% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-fintrack-dark-lighter border-gray-800">
          <CardHeader>
            <CardTitle>Income vs. Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={incomeExpenseData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
                    labelStyle={{ color: "white" }}
                  />
                  <Bar dataKey="income" fill="#10B981" name="Income" />
                  <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-fintrack-dark-lighter border-gray-800">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
                    labelStyle={{ color: "white" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
