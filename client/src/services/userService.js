import httpService from "./httpService";
import { toast } from "react-toastify";
import { API, getApi } from "./apiConfig";

const _getAllClients = () => {
  return httpService
    .get(getApi(API.GET_ALL_CLIENTS))
    .then((res) => {
      return res?.data || [];
    })
    .catch((err) => {
      toast.error(
        err?.data?.message || "Unable to fetch all clients, please try again.",
        {
          className: "warn-toast",
        }
      );
      return [];
    });
};

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
      return payload;
    });
};

const _updateClientProfile = (payload) => {
  return httpService
    .put(getApi(API.UPDATE_CLIENT_PROFILE), payload)
    .then(({ data }) => {
      if (data?.message) {
        toast.success("Client profile updated successfully.");
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
      return payload;
    });
};

const _addCoachProfile = (payload) => {
  return httpService
    .post(getApi(API.ADD_COACH_PROFILE), payload)
    .then(({ data }) => {
      if (data?.message) {
        toast.success("Coach profile saved successfully.");
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
      return payload;
    });
};

const _updateCoachProfile = (payload) => {
  return httpService
    .put(getApi(API.UPDATE_COACH_PROFILE), payload)
    .then(({ data }) => {
      if (data?.message) {
        toast.success("Coach profile updated successfully.");
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
      return payload;
    });
};

const _deleteClientProfile = ({ username }) => {
  return httpService
    .delete(getApi(API.DELETE_CLIENT_PROFILE) + "/" + username)
    .then(({ data }) => {
      if (data?.message) {
        toast.success("Client profile deleted successfully.");
      }
      return username;
    })
    .catch((err) => {
      toast.error(
        err?.data?.message || "Something went wrong, please try again.",
        {
          className: "warn-toast",
        }
      );
      return null;
    });
};

const userService = {
  _addClientProfile,
  _updateClientProfile,
  _addCoachProfile,
  _updateCoachProfile,
  _getAllClients,
  _deleteClientProfile,
};

export default userService;
