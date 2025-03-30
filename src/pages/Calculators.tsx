import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign, Home, Car, PiggyBank } from "lucide-react";

const Calculators = () => {
  // Loan calculator state
  const [loanAmount, setLoanAmount] = useState(10000);
  const [loanInterestRate, setLoanInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(3);
  const [loanMonthlyPayment, setLoanMonthlyPayment] = useState<number | null>(
    null
  );
  const [loanTotalPayment, setLoanTotalPayment] = useState<number | null>(null);
  const [loanTotalInterest, setLoanTotalInterest] = useState<number | null>(
    null
  );

  // Mortgage calculator state
  const [mortgagePrice, setMortgagePrice] = useState(300000);
  const [mortgageDownPayment, setMortgageDownPayment] = useState(60000);
  const [mortgageInterestRate, setMortgageInterestRate] = useState(4);
  const [mortgageTerm, setMortgageTerm] = useState(30);
  const [mortgageMonthlyPayment, setMortgageMonthlyPayment] = useState<
    number | null
  >(null);
  const [mortgageTotalPayment, setMortgageTotalPayment] = useState<
    number | null
  >(null);
  const [mortgageTotalInterest, setMortgageTotalInterest] = useState<
    number | null
  >(null);

  // Leasing calculator state
  const [leasingVehiclePrice, setLeasingVehiclePrice] = useState(30000);
  const [leasingResidualValue, setLeasingResidualValue] = useState(15000);
  const [leasingInterestRate, setLeasingInterestRate] = useState(3);
  const [leasingTerm, setLeasingTerm] = useState(36);
  const [leasingMonthlyPayment, setLeasingMonthlyPayment] = useState<
    number | null
  >(null);
  const [leasingTotalPayment, setLeasingTotalPayment] = useState<number | null>(
    null
  );

  // Tax calculator state
  const [taxableIncome, setTaxableIncome] = useState(60000);
  const [taxRate, setTaxRate] = useState(25);
  const [taxDeductions, setTaxDeductions] = useState(12000);
  const [taxResult, setTaxResult] = useState<number | null>(null);
  const [effectiveTaxRate, setEffectiveTaxRate] = useState<number | null>(null);

  // Loan calculator
  const calculateLoan = () => {
    const principal = loanAmount;
    const interest = loanInterestRate / 100 / 12;
    const payments = loanTerm * 12;

    const x = Math.pow(1 + interest, payments);
    const monthly = (principal * x * interest) / (x - 1);

    setLoanMonthlyPayment(monthly);
    setLoanTotalPayment(monthly * payments);
    setLoanTotalInterest(monthly * payments - principal);
  };

  // Mortgage calculator
  const calculateMortgage = () => {
    const principal = mortgagePrice - mortgageDownPayment;
    const interest = mortgageInterestRate / 100 / 12;
    const payments = mortgageTerm * 12;
    const x = Math.pow(1 + interest, payments);
    const monthly = (principal * x * interest) / (x - 1);
    setMortgageMonthlyPayment(monthly);
    setMortgageTotalPayment(monthly * payments);
    setMortgageTotalInterest(monthly * payments - principal);
  };

  // Leasing calculator
  const calculateLeasing = () => {
    const depreciationAmount = leasingVehiclePrice - leasingResidualValue;
    const depreciationFee = depreciationAmount / leasingTerm;
    const financeFee =
      (leasingVehiclePrice + leasingResidualValue) *
      (leasingInterestRate / 100 / 12);
    const monthlyPayment = depreciationFee + financeFee;

    setLeasingMonthlyPayment(monthlyPayment);
    setLeasingTotalPayment(monthlyPayment * leasingTerm);
  };

  // Tax calculator
  const calculateTax = () => {
    const taxableAmount = Math.max(0, taxableIncome - taxDeductions);
    const taxAmount = taxableAmount * (taxRate / 100);
    const effectiveRate = (taxAmount / taxableIncome) * 100;

    setTaxResult(taxAmount);
    setEffectiveTaxRate(effectiveRate);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Financial Calculators
        </h1>
        <p className="text-muted-foreground">
          Calculate loans, mortgages, leasing, and taxes
        </p>
      </div>

      <Tabs defaultValue="loan" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="loan">Loan</TabsTrigger>
          <TabsTrigger value="mortgage">Mortgage</TabsTrigger>
          <TabsTrigger value="leasing">Leasing</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
        </TabsList>

        {/* Loan Calculator */}
        <TabsContent value="loan">
          <Card className="bg-fintrack-dark-lighter border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-fintrack-green" />
                Loan Calculator
              </CardTitle>
              <CardDescription>
                Calculate your monthly loan payments, total payment amount, and
                total interest.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="loan-amount">Loan Amount ($)</Label>
                      <span className="text-sm font-medium">
                        ${loanAmount.toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      id="loan-amount"
                      min={1000}
                      max={100000}
                      step={1000}
                      value={[loanAmount]}
                      onValueChange={(value) => setLoanAmount(value[0])}
                      className="[&_[role=slider]]:bg-fintrack-green"
                    />
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="loan-interest">Interest Rate (%)</Label>
                      <span className="text-sm font-medium">
                        {loanInterestRate}%
                      </span>
                    </div>
                    <Slider
                      id="loan-interest"
                      min={0.1}
                      max={20}
                      step={0.1}
                      value={[loanInterestRate]}
                      onValueChange={(value) => setLoanInterestRate(value[0])}
                      className="[&_[role=slider]]:bg-fintrack-green"
                    />
                    <Input
                      type="number"
                      value={loanInterestRate}
                      onChange={(e) =>
                        setLoanInterestRate(Number(e.target.value))
                      }
                      className="bg-gray-800 border-gray-700"
                      step="0.1"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="loan-term">Loan Term (years)</Label>
                      <span className="text-sm font-medium">
                        {loanTerm} years
                      </span>
                    </div>
                    <Slider
                      id="loan-term"
                      min={1}
                      max={10}
                      step={1}
                      value={[loanTerm]}
                      onValueChange={(value) => setLoanTerm(value[0])}
                      className="[&_[role=slider]]:bg-fintrack-green"
                    />
                    <Input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <Button
                    onClick={calculateLoan}
                    className="w-full bg-fintrack-green hover:bg-fintrack-green-dark"
                  >
                    Calculate
                  </Button>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-medium">Loan Summary</h3>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Monthly Payment</p>
                      <p className="text-2xl font-bold">
                        {loanMonthlyPayment
                          ? `$${loanMonthlyPayment.toFixed(2)}`
                          : "-"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Total Payment</p>
                      <p className="text-xl font-semibold">
                        {loanTotalPayment
                          ? `$${loanTotalPayment.toFixed(2)}`
                          : "-"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Total Interest</p>
                      <p className="text-xl font-semibold">
                        {loanTotalInterest
                          ? `$${loanTotalInterest.toFixed(2)}`
                          : "-"}
                      </p>
                    </div>
                  </div>

                  {loanMonthlyPayment && (
                    <div className="pt-4 border-t border-gray-700">
                      <p className="text-sm text-gray-400">
                        A ${loanAmount.toLocaleString()} loan with{" "}
                        {loanInterestRate}% interest over {loanTerm} years will
                        cost ${loanTotalInterest?.toFixed(2)} in interest.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mortgage Calculator */}
        <TabsContent value="mortgage">
          <Card className="bg-fintrack-dark-lighter border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-fintrack-green" />
                Mortgage Calculator
              </CardTitle>
              <CardDescription>
                Calculate your monthly mortgage payments, total payment amount,
                and total interest.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="mortgage-price">Home Price ($)</Label>
                      <span className="text-sm font-medium">
                        ${mortgagePrice.toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      id="mortgage-price"
                      min={50000}
                      max={1000000}
                      step={10000}
                      value={[mortgagePrice]}
                      onValueChange={(value) => setMortgagePrice(value[0])}
                      className="[&_[role=slider]]:bg-fintrack-green"
                    />
                    <Input
                      type="number"
                      value={mortgagePrice}
                      onChange={(e) => setMortgagePrice(Number(e.target.value))}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="mortgage-down">Down Payment ($)</Label>
                      <span className="text-sm font-medium">
                        ${mortgageDownPayment.toLocaleString()} (
                        {((mortgageDownPayment / mortgagePrice) * 100).toFixed(
                          1
                        )}
                        %)
                      </span>
                    </div>
                    <Slider
                      id="mortgage-down"
                      min={0}
                      max={mortgagePrice * 0.5}
                      step={5000}
                      value={[mortgageDownPayment]}
                      onValueChange={(value) =>
                        setMortgageDownPayment(value[0])
                      }
                      className="[&_[role=slider]]:bg-fintrack-green"
                    />
                    <Input
                      type="number"
                      value={mortgageDownPayment}
                      onChange={(e) =>
                        setMortgageDownPayment(Number(e.target.value))
                      }
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="mortgage-interest">
                        Interest Rate (%)
                      </Label>
                      <span className="text-sm font-medium">
                        {mortgageInterestRate}%
                      </span>
                    </div>
                    <Slider
                      id="mortgage-interest"
                      min={0.1}
                      max={10}
                      step={0.1}
                      value={[mortgageInterestRate]}
                      onValueChange={(value) =>
                        setMortgageInterestRate(value[0])
                      }
                      className="[&_[role=slider]]:bg-fintrack-green"
                    />
                    <Input
                      type="number"
                      value={mortgageInterestRate}
                      onChange={(e) =>
                        setMortgageInterestRate(Number(e.target.value))
                      }
                      className="bg-gray-800 border-gray-700"
                      step="0.1"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="mortgage-term">Loan Term (years)</Label>
                      <span className="text-sm font-medium">
                        {mortgageTerm} years
                      </span>
                    </div>
                    <Slider
                      id="mortgage-term"
                      min={10}
                      max={30}
                      step={5}
                      value={[mortgageTerm]}
                      onValueChange={(value) => setMortgageTerm(value[0])}
                      className="[&_[role=slider]]:bg-fintrack-green"
                    />
                    <select
                      value={mortgageTerm}
                      onChange={(e) => setMortgageTerm(Number(e.target.value))}
                      className="w-full h-10 px-3 rounded-md bg-gray-800 border-gray-700"
                    >
                      <option value={10}>10 years</option>
                      <option value={15}>15 years</option>
                      <option value={20}>20 years</option>
                      <option value={25}>25 years</option>
                      <option value={30}>30 years</option>
                    </select>
                  </div>

                  <Button
                    onClick={calculateMortgage}
                    className="w-full bg-fintrack-green hover:bg-fintrack-green-dark"
                  >
                    Calculate
                  </Button>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-medium">Mortgage Summary</h3>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Monthly Payment</p>
                      <p className="text-2xl font-bold">
                        {mortgageMonthlyPayment
                          ? `$${mortgageMonthlyPayment.toFixed(2)}`
                          : "-"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Loan Amount</p>
                      <p className="text-xl font-semibold">
                        $
                        {(mortgagePrice - mortgageDownPayment).toLocaleString()}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Total Payment</p>
                      <p className="text-xl font-semibold">
                        {mortgageTotalPayment
                          ? `$${mortgageTotalPayment.toFixed(2)}`
                          : "-"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Total Interest</p>
                      <p className="text-xl font-semibold">
                        {mortgageTotalInterest
                          ? `$${mortgageTotalInterest.toFixed(2)}`
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leasing Calculator */}
        <TabsContent value="leasing">
          <Card className="bg-fintrack-dark-lighter border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-fintrack-green" />
                Leasing Calculator
              </CardTitle>
              <CardDescription>
                Calculate your monthly vehicle lease payments and total lease
                cost.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="leasing-price">Vehicle Price ($)</Label>
                      <span className="text-sm font-medium">
                        ${leasingVehiclePrice.toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      id="leasing-price"
                      min={10000}
                      max={100000}
                      step={1000}
                      value={[leasingVehiclePrice]}
                      onValueChange={(value) =>
                        setLeasingVehiclePrice(value[0])
                      }
                      className="[&_[role=slider]]:bg-fintrack-green"
                    />
                    <Input
                      type="number"
                      value={leasingVehiclePrice}
                      onChange={(e) =>
                        setLeasingVehiclePrice(Number(e.target.value))
                      }
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="leasing-residual">
                        Residual Value ($)
                      </Label>
                      <span className="text-sm font-medium">
                        ${leasingResidualValue.toLocaleString()} (
                        {(
                          (leasingResidualValue / leasingVehiclePrice) *
                          100
                        ).toFixed(1)}
                        %)
                      </span>
                    </div>
                    <Slider
                      id="leasing-residual"
                      min={0}
                      max={leasingVehiclePrice * 0.7}
                      step={1000}
                      value={[leasingResidualValue]}
                      onValueChange={(value) =>
                        setLeasingResidualValue(value[0])
                      }
                      className="[&_[role=slider]]:bg-fintrack-green"
                    />
                    <Input
                      type="number"
                      value={leasingResidualValue}
                      onChange={(e) =>
                        setLeasingResidualValue(Number(e.target.value))
                      }
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="leasing-interest">
                        Interest Rate (%)
                      </Label>
                      <span className="text-sm font-medium">
                        {leasingInterestRate}%
                      </span>
                    </div>
                    <Slider
                      id="leasing-interest"
                      min={0.1}
                      max={10}
                      step={0.1}
                      value={[leasingInterestRate]}
                      onValueChange={(value) =>
                        setLeasingInterestRate(value[0])
                      }
                      className="[&_[role=slider]]:bg-fintrack-green"
                    />
                    <Input
                      type="number"
                      value={leasingInterestRate}
                      onChange={(e) =>
                        setLeasingInterestRate(Number(e.target.value))
                      }
                      className="bg-gray-800 border-gray-700"
                      step="0.1"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="leasing-term">Lease Term (months)</Label>
                      <span className="text-sm font-medium">
                        {leasingTerm} months
                      </span>
                    </div>
                    <Slider
                      id="leasing-term"
                      min={12}
                      max={60}
                      step={12}
                      value={[leasingTerm]}
                      onValueChange={(value) => setLeasingTerm(value[0])}
                      className="[&_[role=slider]]:bg-fintrack-green"
                    />
                    <select
                      value={leasingTerm}
                      onChange={(e) => setLeasingTerm(Number(e.target.value))}
                      className="w-full h-10 px-3 rounded-md bg-gray-800 border-gray-700"
                    >
                      <option value={12}>12 months</option>
                      <option value={24}>24 months</option>
                      <option value={36}>36 months</option>
                      <option value={48}>48 months</option>
                      <option value={60}>60 months</option>
                    </select>
                  </div>

                  <Button
                    onClick={calculateLeasing}
                    className="w-full bg-fintrack-green hover:bg-fintrack-green-dark"
                  >
                    Calculate
                  </Button>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-medium">Lease Summary</h3>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Monthly Payment</p>
                      <p className="text-2xl font-bold">
                        {leasingMonthlyPayment
                          ? `$${leasingMonthlyPayment.toFixed(2)}`
                          : "-"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Depreciation</p>
                      <p className="text-xl font-semibold">
                        $
                        {(
                          leasingVehiclePrice - leasingResidualValue
                        ).toLocaleString()}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Lease Period</p>
                      <p className="text-xl font-semibold">
                        {leasingTerm} months ({(leasingTerm / 12).toFixed(1)}{" "}
                        years)
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Total Lease Cost</p>
                      <p className="text-xl font-semibold">
                        {leasingTotalPayment
                          ? `$${leasingTotalPayment.toFixed(2)}`
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Calculator */}
        <TabsContent value="tax">
          <Card className="bg-fintrack-dark-lighter border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-fintrack-green" />
                Income Tax Calculator
              </CardTitle>
              <CardDescription>
                Estimate your income tax based on your income, tax rate, and
                deductions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="tax-income">Taxable Income ($)</Label>
                      <span className="text-sm font-medium">
                        ${taxableIncome.toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      id="tax-income"
                      min={10000}
                      max={500000}
                      step={5000}
                      value={[taxableIncome]}
                      onValueChange={(value) => setTaxableIncome(value[0])}
                      className="[&_[role=slider]]:bg-fintrack-green"
                    />
                    <Input
                      type="number"
                      value={taxableIncome}
                      onChange={(e) => setTaxableIncome(Number(e.target.value))}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                      <span className="text-sm font-medium">{taxRate}%</span>
                    </div>
                    <Slider
                      id="tax-rate"
                      min={0}
                      max={50}
                      step={1}
                      value={[taxRate]}
                      onValueChange={(value) => setTaxRate(value[0])}
                      className="[&_[role=slider]]:bg-fintrack-green"
                    />
                    <Input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number(e.target.value))}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="tax-deductions">Deductions ($)</Label>
                      <span className="text-sm font-medium">
                        ${taxDeductions.toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      id="tax-deductions"
                      min={0}
                      max={50000}
                      step={1000}
                      value={[taxDeductions]}
                      onValueChange={(value) => setTaxDeductions(value[0])}
                      className="[&_[role=slider]]:bg-fintrack-green"
                    />
                    <Input
                      type="number"
                      value={taxDeductions}
                      onChange={(e) => setTaxDeductions(Number(e.target.value))}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <Button
                    onClick={calculateTax}
                    className="w-full bg-fintrack-green hover:bg-fintrack-green-dark"
                  >
                    Calculate
                  </Button>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-medium">Tax Summary</h3>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Estimated Tax</p>
                      <p className="text-2xl font-bold">
                        {taxResult ? `$${taxResult.toFixed(2)}` : "-"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Income After Tax</p>
                      <p className="text-xl font-semibold">
                        {taxResult
                          ? `$${(taxableIncome - taxResult).toFixed(2)}`
                          : "-"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">
                        Effective Tax Rate
                      </p>
                      <p className="text-xl font-semibold">
                        {effectiveTaxRate
                          ? `${effectiveTaxRate.toFixed(2)}%`
                          : "-"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">
                        Taxable Income (After Deductions)
                      </p>
                      <p className="text-xl font-semibold">
                        $
                        {Math.max(
                          0,
                          taxableIncome - taxDeductions
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Calculators;
