
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardsProps {
  totalMonthlyIncome: number;
  totalMonthlyExpenses: number;
  monthlyBalance: number;
  savingsRate: number;
}

const SummaryCards = ({
  totalMonthlyIncome,
  totalMonthlyExpenses,
  monthlyBalance,
  savingsRate,
}: SummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-fintrack-dark-lighter border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Monthly Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-fintrack-green">
            ${totalMonthlyIncome.toLocaleString()}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-fintrack-dark-lighter border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">
            ${totalMonthlyExpenses.toLocaleString()}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-fintrack-dark-lighter border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Monthly Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${monthlyBalance >= 0 ? "text-fintrack-green" : "text-red-500"}`}>
            ${monthlyBalance.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">
            Savings Rate: {savingsRate.toFixed(1)}%
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
