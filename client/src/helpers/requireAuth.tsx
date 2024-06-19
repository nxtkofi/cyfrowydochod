import useAuth from "@/hooks/useAuth";
import { RoleType } from "@/types";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type RequireAuthProps = { allowedRoles: RoleType[] };

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { auth } = useAuth();
  const location = useLocation();
  return allowedRoles.includes(auth?.role) ? (
    <Outlet />
  ) : auth?.accessToken ? 
    <Navigate to="/unauthorized" state={{ from: location }} replace />
   : <Navigate to="/access" state={{ from: location }} replace />;
};
export default RequireAuth;
