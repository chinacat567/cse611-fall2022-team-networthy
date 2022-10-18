import httpService from "./httpService";
import { toast } from "react-toastify";

import { API, getApi, navigateTo } from "./apiConfig";
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
      toast("Signed In!");
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

const authService = {
  signup,
  signin,
};

export default authService;
