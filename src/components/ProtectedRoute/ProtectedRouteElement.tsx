import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../types/hooks";

interface ProtectedRouteElementProps {
  children: JSX.Element;
  onlyUnAuth?: boolean;
  requiresForgotPassword?: boolean;
}

const ProtectedRouteElement = ({
  children,
  onlyUnAuth = false,
  requiresForgotPassword = false,
}: ProtectedRouteElementProps) => {
  const user = useAppSelector(state => state.auth.user);
  const location = useLocation();
  const forgotPasswordVisited = sessionStorage.getItem("forgotPasswordVisited") === "true";

  if (requiresForgotPassword && !forgotPasswordVisited) {
    return <Navigate to="/forgot-password" replace />;
  }

  if (!user && !onlyUnAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && onlyUnAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRouteElement;
