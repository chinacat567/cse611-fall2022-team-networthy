import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ROUTES } from "./routeConfig";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  console.log(isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("Here");
      window.location.href = ROUTES.LOGIN;
    }
  }, []);

  return children;
};

export default PrivateRoute;
