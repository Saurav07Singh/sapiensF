import { useLocation, Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ReqiureAuth = () => {
  const { isLoggedIn } = useAuth();
 // console.log("IsLoggedIN", isLoggedIn);
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ReqiureAuth;
