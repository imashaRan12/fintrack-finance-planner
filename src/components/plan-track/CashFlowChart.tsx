
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Chart data type
export type CashFlowData = {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}[];

interface CashFlowChartProps {
  data: CashFlowData;
}

const CashFlowChart = ({ data }: CashFlowChartProps) => {
  return (
    <Card className="bg-fintrack-dark-lighter border-gray-800">
      <CardHeader>
        <CardTitle>Cash Flow History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
                labelStyle={{ color: "white" }}
              />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#10B981" activeDot={{ r: 8 }} name="Income" />
              <Line type="monotone" dataKey="expenses" stroke="#EF4444" name="Expenses" />
              <Line type="monotone" dataKey="savings" stroke="#3B82F6" name="Savings" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CashFlowChart;
