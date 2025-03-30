
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/lib/toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  // If auth is still loading, show a loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-fintrack-dark">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-4 border-fintrack-green border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login page
  if (!user) {
    toast.error("Please sign in to access this page");
    return <Navigate to="/signin" replace />;
  }

  // Otherwise, render the protected route
  return <>{children}</>;
};

export default ProtectedRoute;
