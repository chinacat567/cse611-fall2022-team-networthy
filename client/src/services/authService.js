import httpService from "./httpService";
import { toast } from "react-toastify";
import { API, getApi } from "./apiConfig";

const signup = (payload) => {
  return httpService
    .post(getApi(API.CLIENT_SIGNUP), payload)
    .then((res) => {
      console.log("SIGNUP RESPONSE", res);
      toast("You are registered, Welcome to NetWorthy");
      toast("Check email for verification");
    })
    .catch((err) => {
      console.log(err);
      toast.error("Unable to register, please try again.", {
        className: "warn-toast",
      });
    });
};

const authService = {
  signup,
};

export default authService;
