import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps): ReactNode {
  const location = useLocation();
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;