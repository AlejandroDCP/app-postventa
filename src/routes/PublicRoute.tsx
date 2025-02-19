import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const auth = useAuth();
  return !auth.isAuth ? children : <Navigate to="/inicio" />;
};

export default PublicRoute;
