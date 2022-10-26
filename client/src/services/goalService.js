import httpService from "./httpService";
import { toast } from "react-toastify";
import { API, getApi } from "./apiConfig";

const _getAllClientGoals = ({ username }) => {
  return httpService
    .get(getApi(API.GET_ALL_CLIENT_GOALS) + "/" + username)
    .then((res) => {
      return res?.data?.goalList || [];
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

const goalService = {
  _getAllClientGoals,
};

export default goalService;
