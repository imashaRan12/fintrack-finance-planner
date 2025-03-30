
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { collection, doc, getDocs, setDoc, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "@/lib/toast";
import SummaryCards from "@/components/plan-track/SummaryCards";
import CashFlowChart, { CashFlowData } from "@/components/plan-track/CashFlowChart";
import CashFlowTabs from "@/components/plan-track/CashFlowTabs";
import { IncomeItem } from "@/components/plan-track/IncomeForm";
import { ExpenseItem } from "@/components/plan-track/ExpenseForm";
import { 
  calculateTotalMonthlyIncome,
  calculateTotalMonthlyExpenses,
  calculateMonthlyBalance,
  calculateSavingsRate
} from "@/utils/calculations";

// Mock data for history chart (will be replaced with real data later)
const mockHistoryData: CashFlowData = [
  { month: "Jan", income: 5000, expenses: 3500, savings: 1500 },
  { month: "Feb", income: 5200, expenses: 3700, savings: 1500 },
  { month: "Mar", income: 4800, expenses: 3600, savings: 1200 },
  { month: "Apr", income: 5300, expenses: 3400, savings: 1900 },
  { month: "May", income: 5500, expenses: 3800, savings: 1700 },
  { month: "Jun", income: 5100, expenses: 3900, savings: 1200 },
];

const PlanTrack = () => {
  const { user } = useAuth();
  const [incomeItems, setIncomeItems] = useState<IncomeItem[]>([]);
  const [expenseItems, setExpenseItems] = useState<ExpenseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate totals
  const totalMonthlyIncome = calculateTotalMonthlyIncome(incomeItems);
  const totalMonthlyExpenses = calculateTotalMonthlyExpenses(expenseItems);
  const monthlyBalance = calculateMonthlyBalance(totalMonthlyIncome, totalMonthlyExpenses);
  const savingsRate = calculateSavingsRate(totalMonthlyIncome, monthlyBalance);

  // Load data from Firestore
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Load income items
        const incomeQuery = query(
          collection(db, "income"), 
          where("userId", "==", user.id)
        );
        const incomeSnapshot = await getDocs(incomeQuery);
        const incomeData: IncomeItem[] = [];
        
        incomeSnapshot.forEach((doc) => {
          incomeData.push({ id: doc.id, ...doc.data() } as IncomeItem);
        });
        
        // Load expense items
        const expenseQuery = query(
          collection(db, "expenses"), 
          where("userId", "==", user.id)
        );
        const expenseSnapshot = await getDocs(expenseQuery);
        const expenseData: ExpenseItem[] = [];
        
        expenseSnapshot.forEach((doc) => {
          expenseData.push({ id: doc.id, ...doc.data() } as ExpenseItem);
        });
        
        setIncomeItems(incomeData.length ? incomeData : [
          { id: "1", source: "Salary", amount: 5000, frequency: "Monthly" },
          { id: "2", source: "Freelance", amount: 1000, frequency: "Monthly" },
        ]);
        
        setExpenseItems(expenseData.length ? expenseData : [
          { id: "1", category: "Housing", description: "Rent", amount: 1800, frequency: "Monthly" },
          { id: "2", category: "Food", description: "Groceries", amount: 500, frequency: "Monthly" },
          { id: "3", category: "Transportation", description: "Gas", amount: 200, frequency: "Monthly" },
        ]);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load your financial data");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user]);

  // Custom setIncomeItems that saves to Firestore
  const handleSetIncomeItems = async (items: IncomeItem[]) => {
    if (!user) return;
    
    setIncomeItems(items);
    
    try {
      // Save each income item to Firestore
      for (const item of items) {
        await setDoc(doc(db, "income", item.id), {
          ...item,
          userId: user.id
        });
      }
    } catch (error) {
      console.error("Error saving income:", error);
      toast.error("Failed to save income data");
    }
  };

  // Custom setExpenseItems that saves to Firestore
  const handleSetExpenseItems = async (items: ExpenseItem[]) => {
    if (!user) return;
    
    setExpenseItems(items);
    
    try {
      // Save each expense item to Firestore
      for (const item of items) {
        await setDoc(doc(db, "expenses", item.id), {
          ...item,
          userId: user.id
        });
      }
    } catch (error) {
      console.error("Error saving expenses:", error);
      toast.error("Failed to save expense data");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Income & Expense Planning</h1>
        <p className="text-muted-foreground">
          Track your cash flow and plan your budget
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="h-8 w-8 border-4 border-fintrack-green border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <SummaryCards
            totalMonthlyIncome={totalMonthlyIncome}
            totalMonthlyExpenses={totalMonthlyExpenses}
            monthlyBalance={monthlyBalance}
            savingsRate={savingsRate}
          />

          <CashFlowChart data={mockHistoryData} />

          <CashFlowTabs
            incomeItems={incomeItems}
            setIncomeItems={handleSetIncomeItems}
            expenseItems={expenseItems}
            setExpenseItems={handleSetExpenseItems}
          />
        </>
      )}
    </div>
  );
};

export default PlanTrack;
