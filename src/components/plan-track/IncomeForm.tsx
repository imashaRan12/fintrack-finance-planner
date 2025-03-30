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

export type IncomeItem = {
  id: string;
  source: string;
  amount: number;
  frequency: string;
};

interface IncomeFormProps {
  incomeItems: IncomeItem[];
  setIncomeItems: (items: IncomeItem[]) => void;
}

const IncomeForm = ({ incomeItems, setIncomeItems }: IncomeFormProps) => {
  const { user } = useAuth();
  const [newIncomeSource, setNewIncomeSource] = useState("");
  const [newIncomeAmount, setNewIncomeAmount] = useState("");
  const [newIncomeFrequency, setNewIncomeFrequency] = useState("Monthly");

  const addIncome = () => {
    if (!newIncomeSource || !newIncomeAmount) {
      toast.error("Please fill in all fields");
      return;
    }

    const newIncome: IncomeItem = {
      id: Date.now().toString(),
      source: newIncomeSource,
      amount: parseFloat(newIncomeAmount),
      frequency: newIncomeFrequency,
    };

    setIncomeItems([...incomeItems, newIncome]);
    setNewIncomeSource("");
    setNewIncomeAmount("");
    toast.success("Income added successfully");
  };

  const removeIncome = async (id: string) => {
    // First update the UI
    setIncomeItems(incomeItems.filter((item) => item.id !== id));

    // Then delete from Firestore
    if (user) {
      try {
        await deleteDoc(doc(db, "income", id));
        toast.success("Income removed");
      } catch (error) {
        console.error("Error removing income:", error);
        toast.error("Failed to remove income");
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Income list */}
      {incomeItems.length > 0 ? (
        <div className="rounded-md border border-gray-700">
          <div className="grid grid-cols-12 p-3 font-medium border-b border-gray-700 bg-gray-800">
            <div className="col-span-5">Source</div>
            <div className="col-span-3">Frequency</div>
            <div className="col-span-3">Amount</div>
            <div className="col-span-1"></div>
          </div>
          {incomeItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 p-3 border-b border-gray-700 last:border-0"
            >
              <div className="col-span-5">{item.source}</div>
              <div className="col-span-3">{item.frequency}</div>
              <div className="col-span-3">${item.amount.toLocaleString()}</div>
              <div className="col-span-1 flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeIncome(item.id)}
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
          No income sources added yet.
        </div>
      )}

      <Separator className="bg-gray-700" />

      {/* Add income form */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        <div className="md:col-span-5">
          <Label htmlFor="income-source">Source</Label>
          <Input
            id="income-source"
            value={newIncomeSource}
            onChange={(e) => setNewIncomeSource(e.target.value)}
            placeholder="e.g. Salary, Freelance"
            className="bg-gray-800 border-gray-700"
          />
        </div>
        <div className="md:col-span-3">
          <Label htmlFor="income-frequency">Frequency</Label>
          <Select
            value={newIncomeFrequency}
            onValueChange={setNewIncomeFrequency}
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
        <div className="md:col-span-3">
          <Label htmlFor="income-amount">Amount</Label>
          <Input
            id="income-amount"
            value={newIncomeAmount}
            onChange={(e) => setNewIncomeAmount(e.target.value)}
            placeholder="0.00"
            type="number"
            className="bg-gray-800 border-gray-700"
          />
        </div>
        <div className="md:col-span-1">
          <Button
            onClick={addIncome}
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

export default IncomeForm;
