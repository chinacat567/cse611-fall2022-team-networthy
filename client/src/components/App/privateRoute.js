import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ROUTES } from "./routeConfig";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, user } = useSelector((state) => state?.auth);

  useEffect(() => {
    if (!isLoggedIn || !user) {
      window.location.href = ROUTES.LOGIN;
    }
  }, []);

  if (!isLoggedIn || !user) {
    return <></>;
  }

  return children;
};

export default PrivateRoute;
