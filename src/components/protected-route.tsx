import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { LoadingState } from "./loading-state";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthStore();
  if (isLoading) return <LoadingState message="Checking auth..." />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
