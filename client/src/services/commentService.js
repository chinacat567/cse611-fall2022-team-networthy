import httpService from "./httpService";
import { toast } from "react-toastify";
import { API, getApi } from "./apiConfig";

const _getClientComments = ({ clientId }) => {
  return httpService
    .get(getApi(API.GET_COMMENTS_FOR_CLIENT) + "/" + clientId)
    .then((res) => {
      return res?.data || [];
    })
    .catch((err) => {
      toast.error(
        err?.data?.message || "Something went wrong, please try again.",
        {
          className: "warn-toast",
        }
      );
      return [];
    });
};

const _addClientComments = (payload) => {
  return httpService
    .post(getApi(API.ADD_COMMENTS_FOR_CLIENT), payload)
    .then((res) => {
      toast.success("Client comments added");
      return payload;
    })
    .catch((err) => {
      toast.error(
        err?.data?.message || "Something went wrong, please try again.",
        {
          className: "warn-toast",
        }
      );
      return;
    });
};

const commentService = {
  _getClientComments,
  _addClientComments,
};

export default commentService;
