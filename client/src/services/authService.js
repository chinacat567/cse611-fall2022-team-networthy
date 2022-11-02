import httpService from "./httpService";
import { toast } from "react-toastify";

import { API, getApi } from "./apiConfig";
import { ROLE_CONFIG } from "../components/AuthWizard/config";
import { ROUTES } from "../components/App/routeConfig";

const _signup = (payload) => {
  return httpService
    .post(getApi(API.SIGNUP), payload)
    .then((res) => {
      toast("You are registered, Welcome to Gooroo Wealth");
      toast("Check email for verification");
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

const _signin = (payload) => {
  return httpService
    .post(getApi(API.LOGIN), payload)
    .then((res) => {
      localStorage.setItem("USER_TOKEN", res?.data?.accessToken);
      localStorage.setItem("USER", JSON.stringify(res?.data));

      // Navigation to respective dashboard
      const role = res?.data?.roles[0],
        clientProfile = res?.data?.clientProfile,
        coachProfile = res?.data?.coachProfile;

      localStorage.setItem("USER_ROLE", role);

      if (role.includes(ROLE_CONFIG.CLIENT)) {
        window.location.href =
          "/" +
          (clientProfile
            ? ROUTES.CLIENT_DASHBOARD
            : ROUTES.CLIENT_PROFILE_SURVEY);
      } else if (role.includes(ROLE_CONFIG.COACH))
        window.location.href =
          "/" +
          (coachProfile ? ROUTES.COACH_DASHBOARD : ROUTES.COACH_PROFILE_SURVEY);
      else if (role.includes(ROLE_CONFIG.ADMIN))
        window.location.href = "/" + ROUTES.ADMIN_DASHBOARD;
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
  window.location.href = ROUTES.LOGIN;
};

const authService = {
  _signup,
  _signin,
  logoutService,
};

export default authService;
