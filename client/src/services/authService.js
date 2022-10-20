import httpService from "./httpService";
import { toast } from "react-toastify";

import { API, getApi, navigateTo } from "./apiConfig";
import { ROLE_CONFIG } from "../components/AuthWizard/config";
import { ROUTES } from "../components/App/routeConfig";
// import emailService from "./emailService";

const signup = (payload) => {
  return httpService
    .post(getApi(API.SIGNUP), payload)
    .then((res) => {
      toast("You are registered, Welcome to NetWorthy");
      // TODO: Replace with emailService
      toast("Check email for verification");
      // emailService.sendVerificationEmail(payload?.username, payload?.email);
    })
    .catch((err) => {
      toast.error(
        err?.data?.message || "Unable to register, please try again.",
        {
          className: "warn-toast",
        }
      );
    });
};

const signin = (payload) => {
  return httpService
    .post(getApi(API.LOGIN), payload)
    .then((res) => {
      localStorage.setItem("USER_TOKEN", res?.data?.accessToken);
      localStorage.setItem("USER", JSON.stringify(res?.data));

      // Navigation to respective dashboard
      const role = res?.data?.roles[0];

      if (role.includes(ROLE_CONFIG.CLIENT))
        window.location.href = "/" + ROUTES.CLIENT_DASHBOARD;
      else if (role.includes(ROLE_CONFIG.COACH))
        window.location.href = "/" + ROUTES.COACH_DASHBOARD;
      else
        toast.error("Role not found. Please try again later.", {
          className: "warn-toast",
        });
    })
    .catch((err) => {
      if (err?.status == 401) {
        toast.error("Please check your username or password", {
          className: "warn-toast",
        });
      } else {
        toast.error(
          err?.data?.message || "Unable to signin, please try again.",
          {
            className: "warn-toast",
          }
        );
      }
    });
};

const logoutService = () => {
  localStorage.removeItem("USER");
  localStorage.removeItem("USER_TOKEN");
  window.location.href = "/" + ROUTES.HOME;
};

const authService = {
  signup,
  signin,
  logoutService,
};

export default authService;
