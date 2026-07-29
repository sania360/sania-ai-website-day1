import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen grid place-items-center text-navy dark:text-mist">Checking session...</div>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
