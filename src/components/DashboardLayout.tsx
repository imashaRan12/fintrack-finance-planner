import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  PieChart,
  Calculator,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Plan & Track",
      path: "/plan",
      icon: <PieChart className="h-5 w-5" />,
    },
    {
      name: "Calculators",
      path: "/calculators",
      icon: <Calculator className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-fintrack-dark text-white flex flex-col">
      {/* Mobile Header */}
      <header className="lg:hidden bg-fintrack-dark-lighter p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
          <h1 className="text-xl font-bold">
            <span className="text-fintrack-green">Fin</span>Track
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-fintrack-green">
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 z-10 flex-shrink-0 w-64 bg-fintrack-dark-lighter flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 
            ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:relative lg:translate-x-0`}
        >
          <div className="p-6 hidden lg:flex items-center">
            <h1 className="text-xl font-bold">
              <span className="text-fintrack-green">Fin</span>Track
            </h1>
          </div>

          <div className="mt-2 flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "bg-fintrack-green text-white"
                      : "text-gray-300 hover:bg-green-500"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4">
            <Separator className="my-4 bg-gray-700" />
            <div className="flex items-center gap-3 px-3 py-2">
              <Avatar className="h-9 w-9 bg-fintrack-green">
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-2 border-gray-700 hover:bg-gray-800"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
