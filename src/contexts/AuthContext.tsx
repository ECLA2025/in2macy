// contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/auth.types";
import { toast } from "react-toastify";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: any | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          console.log(token);
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/verify-token/`,
            // `/api/verify-token/`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            console.log(userData.user, "me too");
            setUser(userData);
          } else {
            // Handle invalid token
            localStorage.removeItem("accessToken");
          }
        }
      } catch (err) {
        console.log("Auth check failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login/`,
        // `/api/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      console.log(response.status, "looking for me??");
      toast.success(data.status);

      if (!response.ok) {
        toast.error(data.status);
        return false;
      }

      console.log("over here!!");
      localStorage.clear();
      localStorage.setItem("accessToken", data.token);
      console.log(localStorage.getItem("accessToken"));
      setUser(data.user);
      return true;
      // navigate("/chat");
    } catch (err) {
      console.log(err);
      setError({
        message: err instanceof Error ? err.message : "Login failed",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string,
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/signup/`,
        // `/api/signup/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, password }),
        }
      );

      if (!response.ok) {
        window.location.reload();
        return false;
      }

      // navigate("/Auth");
      return true;
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Signup failed",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("accessToken");

      if (token) {
        await fetch("/api/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
      setIsLoading(false);
      navigate("/login");
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        isAuthenticated: !!localStorage.getItem("accessToken"),
        login,
        signup,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
