import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router";

export default function AuthLayout() {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (user) return <Navigate to="/" />;
  return <Outlet />;
}
