
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncomeForm, { IncomeItem } from "./IncomeForm";
import ExpenseForm, { ExpenseItem } from "./ExpenseForm";

interface CashFlowTabsProps {
  incomeItems: IncomeItem[];
  setIncomeItems: (items: IncomeItem[]) => void;
  expenseItems: ExpenseItem[];
  setExpenseItems: (items: ExpenseItem[]) => void;
}

const CashFlowTabs = ({ 
  incomeItems, 
  setIncomeItems, 
  expenseItems, 
  setExpenseItems 
}: CashFlowTabsProps) => {
  return (
    <Tabs defaultValue="income" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="income">Income</TabsTrigger>
        <TabsTrigger value="expenses">Expenses</TabsTrigger>
      </TabsList>
      <TabsContent value="income">
        <Card className="bg-fintrack-dark-lighter border-gray-800">
          <CardHeader>
            <CardTitle>Income Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <IncomeForm 
              incomeItems={incomeItems} 
              setIncomeItems={setIncomeItems} 
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="expenses">
        <Card className="bg-fintrack-dark-lighter border-gray-800">
          <CardHeader>
            <CardTitle>Expense Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseForm 
              expenseItems={expenseItems} 
              setExpenseItems={setExpenseItems} 
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default CashFlowTabs;
