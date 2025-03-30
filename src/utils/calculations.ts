
import { IncomeItem } from "@/components/plan-track/IncomeForm";
import { ExpenseItem } from "@/components/plan-track/ExpenseForm";

export const calculateMonthlyAmount = (amount: number, frequency: string): number => {
  switch (frequency) {
    case "Weekly": return amount * 4;
    case "Bi-weekly": return amount * 2;
    case "Monthly": return amount;
    case "Yearly": return amount / 12;
    default: return amount;
  }
};

export const calculateTotalMonthlyIncome = (incomeItems: IncomeItem[]): number => {
  return incomeItems.reduce((sum, item) => {
    return sum + calculateMonthlyAmount(item.amount, item.frequency);
  }, 0);
};

export const calculateTotalMonthlyExpenses = (expenseItems: ExpenseItem[]): number => {
  return expenseItems.reduce((sum, item) => {
    return sum + calculateMonthlyAmount(item.amount, item.frequency);
  }, 0);
};

export const calculateMonthlyBalance = (totalIncome: number, totalExpenses: number): number => {
  return totalIncome - totalExpenses;
};

export const calculateSavingsRate = (totalIncome: number, monthlyBalance: number): number => {
  return totalIncome > 0 ? (monthlyBalance / totalIncome) * 100 : 0;
};
