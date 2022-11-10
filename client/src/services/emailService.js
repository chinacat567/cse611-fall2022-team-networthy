import httpService from "./httpService";
import { toast } from "react-toastify";

import {
  EMAIL_API,
  getAbstractEmailApi,
  getEmailVerificationApi,
} from "./apiConfig";

const sendVerificationEmail = (username, email) => {
  const payload = {
    service_id: process.env.REACT_APP_EMAILJS_SERVICE_ID,
    template_id: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
    user_id: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
    template_params: {
      message: getEmailVerificationApi(username),
    },
  };
  return httpService
    .get(getAbstractEmailApi(email), payload)
    .then((res) => {
      toast("Check email for verification");
    })
    .catch((err) => {
      toast.error(
        err?.data?.message ||
          "Unable to send verification email, please try again.",
        {
          className: "warn-toast",
        }
      );
    });
};

const emailService = {
  sendVerificationEmail,
};

export default emailService;
