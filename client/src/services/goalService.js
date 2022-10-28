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

const _updateGoalStatus = (payload) => {
  return httpService
    .post(getApi(API.UPDATE_GOAL_STATUS), payload)
    .then((res) => {
      toast.success("Goal status updated");
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

const _addGoal = (payload) => {
  return httpService
    .post(getApi(API.ADD_GOAL), payload)
    .then((res) => {
      return res;
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

const _updateGoal = (payload) => {
  return httpService
    .put(getApi(API.UPDATE_GOAL), payload)
    .then((res) => {
      return res;
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

const goalService = {
  _getAllClientGoals,
  _updateGoalStatus,
  _addGoal,
  _updateGoal,
};

export default goalService;
