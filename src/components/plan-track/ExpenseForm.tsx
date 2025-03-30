import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/lib/toast";

export type ExpenseItem = {
  id: string;
  category: string;
  description: string;
  amount: number;
  frequency: string;
};

interface ExpenseFormProps {
  expenseItems: ExpenseItem[];
  setExpenseItems: (items: ExpenseItem[]) => void;
}

const ExpenseForm = ({ expenseItems, setExpenseItems }: ExpenseFormProps) => {
  const { user } = useAuth();
  const [newExpenseCategory, setNewExpenseCategory] = useState("");
  const [newExpenseDescription, setNewExpenseDescription] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [newExpenseFrequency, setNewExpenseFrequency] = useState("Monthly");

  const addExpense = () => {
    if (!newExpenseCategory || !newExpenseDescription || !newExpenseAmount) {
      toast.error("Please fill in all fields");
      return;
    }

    const newExpense: ExpenseItem = {
      id: Date.now().toString(),
      category: newExpenseCategory,
      description: newExpenseDescription,
      amount: parseFloat(newExpenseAmount),
      frequency: newExpenseFrequency,
    };

    setExpenseItems([...expenseItems, newExpense]);
    setNewExpenseCategory("");
    setNewExpenseDescription("");
    setNewExpenseAmount("");
    toast.success("Expense added successfully");
  };

  const removeExpense = async (id: string) => {
    // First update the UI
    setExpenseItems(expenseItems.filter((item) => item.id !== id));

    // Then delete from Firestore
    if (user) {
      try {
        await deleteDoc(doc(db, "expenses", id));
        toast.success("Expense removed");
      } catch (error) {
        console.error("Error removing expense:", error);
        toast.error("Failed to remove expense");
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Expense list */}
      {expenseItems.length > 0 ? (
        <div className="rounded-md border border-gray-700">
          <div className="grid grid-cols-12 p-3 font-medium border-b border-gray-700 bg-gray-800">
            <div className="col-span-3">Category</div>
            <div className="col-span-4">Description</div>
            <div className="col-span-2">Frequency</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-1"></div>
          </div>
          {expenseItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 p-3 border-b border-gray-700 last:border-0"
            >
              <div className="col-span-3">{item.category}</div>
              <div className="col-span-4">{item.description}</div>
              <div className="col-span-2">{item.frequency}</div>
              <div className="col-span-2">${item.amount.toLocaleString()}</div>
              <div className="col-span-1 flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExpense(item.id)}
                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-gray-800"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-4 text-muted-foreground">
          No expense items added yet.
        </div>
      )}

      <Separator className="bg-gray-700" />

      {/* Add expense form */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        <div className="md:col-span-3">
          <Label htmlFor="expense-category">Category</Label>
          <Select
            value={newExpenseCategory}
            onValueChange={setNewExpenseCategory}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="Housing">Housing</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Transportation">Transportation</SelectItem>
              <SelectItem value="Utilities">Utilities</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Debt">Debt</SelectItem>
              <SelectItem value="Savings">Savings</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-4">
          <Label htmlFor="expense-description">Description</Label>
          <Input
            id="expense-description"
            value={newExpenseDescription}
            onChange={(e) => setNewExpenseDescription(e.target.value)}
            placeholder="e.g. Rent, Groceries"
            className="bg-gray-800 border-gray-700"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="expense-frequency">Frequency</Label>
          <Select
            value={newExpenseFrequency}
            onValueChange={setNewExpenseFrequency}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
              <SelectItem value="Monthly">Monthly</SelectItem>
              <SelectItem value="Yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="expense-amount">Amount</Label>
          <Input
            id="expense-amount"
            value={newExpenseAmount}
            onChange={(e) => setNewExpenseAmount(e.target.value)}
            placeholder="0.00"
            type="number"
            className="bg-gray-800 border-gray-700"
          />
        </div>
        <div className="md:col-span-1">
          <Button
            onClick={addExpense}
            className="w-full bg-fintrack-green hover:bg-fintrack-green-dark"
          >
            <PlusCircle className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
