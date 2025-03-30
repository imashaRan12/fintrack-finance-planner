
import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  User as FirebaseUser
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "@/lib/toast";

// Define types for our auth context
type User = {
  id: string;
  name: string | null;
  email: string | null;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Convert Firebase user to our User type
const formatUser = (user: FirebaseUser): User => ({
  id: user.uid,
  name: user.displayName,
  email: user.email,
});

// Helper function to handle Firebase errors
const handleFirebaseError = (error: any): string => {
  console.error("Firebase error:", error);
  
  // Handle specific Firebase error codes
  if (error.code === "auth/unauthorized-domain") {
    return "This domain is not authorized for authentication. Please use the app on the authorized domain.";
  } else if (error.code === "auth/invalid-credential") {
    return "Invalid credentials. Please check your email and password.";
  } else if (error.code === "auth/user-not-found") {
    return "User not found. Please check your email or sign up.";
  } else if (error.code === "auth/wrong-password") {
    return "Wrong password. Please try again.";
  } else if (error.code === "auth/email-already-in-use") {
    return "Email already in use. Try logging in instead.";
  } else if (error.code === "auth/weak-password") {
    return "Password is too weak. Please use a stronger password.";
  } else if (error.code === "auth/network-request-failed") {
    return "Network error. Please check your internet connection.";
  } else if (error.code === "auth/popup-closed-by-user") {
    return "Authentication popup was closed. Please try again.";
  }
  
  // Default error message
  return error.message || "An error occurred during authentication.";
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsLoading(true);
      if (currentUser) {
        setUser(formatUser(currentUser));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login function (email/password)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
    } catch (error) {
      const errorMessage = handleFirebaseError(error);
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Google login successful!");
    } catch (error) {
      const errorMessage = handleFirebaseError(error);
      console.error("Google login error:", error);
      
      // Special handling for unauthorized domain error
      if (error.code === "auth/unauthorized-domain") {
        toast.error("Google login not available in this environment. Please use email/password login instead.");
      } else {
        toast.error(errorMessage);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      toast.success("Account created successfully!");
    } catch (error) {
      const errorMessage = handleFirebaseError(error);
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (error) {
      const errorMessage = handleFirebaseError(error);
      toast.error(errorMessage);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, loginWithGoogle, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
