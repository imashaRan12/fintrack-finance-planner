import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Calculator,
  DollarSign,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-fintrack-dark">
      {/* Hero Section */}
      <header className="py-6 px-4 md:px-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            <span className="text-fintrack-green">Fin</span>Track
          </span>
        </div>
        <div className="flex gap-4">
          <Link to="/signin">
            <Button variant="ghost" className="text-white hover:bg-gray-800">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-fintrack-green hover:bg-fintrack-green-dark">
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      <main>
        <section className="px-4 py-20 md:py-32 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Take Control of Your{" "}
            <span className="text-fintrack-green">Financial Future</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            FinTrack helps you manage your money with powerful tools for
            budgeting, financial planning, and more tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="text-lg py-6 px-8 bg-fintrack-green hover:bg-fintrack-green-dark w-full sm:w-auto">
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/signin">
              <Button
                variant="outline"
                className="text-lg py-6 px-8 border-gray-700 hover:bg-gray-800 w-full sm:w-auto"
              >
                Log In to Your Account
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-fintrack-dark-lighter">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">
              Everything You Need to Manage Your Finances
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6 rounded-lg">
                <div className="mb-4 bg-fintrack-green/10 p-3 rounded-full w-fit">
                  <TrendingUp className="h-6 w-6 text-fintrack-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">Financial Dashboard</h3>
                <p className="text-gray-400">
                  Get a complete overview of your financial health in one place
                  with visualizations.
                </p>
              </div>
              <div className="p-6 rounded-lg">
                <div className="mb-4 bg-fintrack-green/10 p-3 rounded-full w-fit">
                  <PieChart className="h-6 w-6 text-fintrack-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Income & Expense Planning
                </h3>
                <p className="text-gray-400">
                  Create budgets, track your spending, and plan for future
                  financial goals.
                </p>
              </div>
              <div className="p-6 rounded-lg">
                <div className="mb-4 bg-fintrack-green/10 p-3 rounded-full w-fit">
                  <Calculator className="h-6 w-6 text-fintrack-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Financial Calculators
                </h3>
                <p className="text-gray-400">
                  Calculate loans, mortgages, taxes, and more with our
                  easy-to-use calculators.
                </p>
              </div>
              <div className="p-6 rounded-lg">
                <div className="mb-4 bg-fintrack-green/10 p-3 rounded-full w-fit">
                  <DollarSign className="h-6 w-6 text-fintrack-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">Financial Insights</h3>
                <p className="text-gray-400">
                  Get insights and recommendations to improve your financial
                  situation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of users who are already using FinTrack to manage
              their money better.
            </p>
            <Link to="/signup">
              <Button className="text-lg py-6 px-8 bg-fintrack-green hover:bg-fintrack-green-dark">
                Create Your Free Account
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-10 text-gray-400">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-xl font-bold">
                <span className="text-fintrack-green">Fin</span>Track
              </span>
              <p className="mt-2">© 2023 FinTrack. All rights reserved.</p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">
                Terms
              </a>
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
