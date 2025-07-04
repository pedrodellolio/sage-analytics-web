import { createContext, useState, useEffect, type ReactNode } from "react";
import axiosInstance from "../api/axios";
import type { LoginFormData } from "@/schemas/login-schema";
import type { RegisterFormData } from "@/schemas/register-schema";
import type { User } from "@/models/user";
import { setAccessToken } from "@/api/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/user/me");
      setUser(res.data);
      setError(null);
    } catch (err: any) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.post("/auth/login", data);
      setAccessToken(res.data.accessToken);
      await refreshUser();
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await axiosInstance.post("/auth/logout");
      setUser(null);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      setError(null);
      await axiosInstance.post("/auth/register", data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
