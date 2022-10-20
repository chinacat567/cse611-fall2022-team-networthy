import httpService from "./httpService";
import { toast } from "react-toastify";
import { API, getApi } from "./apiConfig";

const _addClientProfile = (payload) => {
  return httpService
    .post(getApi(API.ADD_CLIENT_PROFILE), payload)
    .then(({ data }) => {
      if (data?.message) {
        toast.success("Client profile saved successfully.");
      }
      // returning the profile data to update in the "user" slice
      return payload;
    })
    .catch((err) => {
      toast.error(
        err?.data?.message || "Something went wrong, please try again.",
        {
          className: "warn-toast",
        }
      );
    });
};

const clientService = {
  _addClientProfile,
};

export default clientService;
