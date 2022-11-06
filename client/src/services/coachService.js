import httpService from "./httpService";
import { toast } from "react-toastify";

import { API, getApi } from "./apiConfig";

const _getAllCoaches = () => {
  return httpService
    .get(getApi(API.GET_ALL_COACHES))
    .then((res) => {
      return res?.data || [];
    })
    .catch((err) => {
      toast.error(
        err?.data?.message || "Unable to fetch all coaches, please try again.",
        {
          className: "warn-toast",
        }
      );
      return [];
    });
};

const _getAllCoachClients = ({ coachUserName }) => {
  return httpService
    .get(getApi(API.GET_ALL_COACH_CLIENTS) + "/" + coachUserName)
    .then((res) => {
      return res?.data || [];
    })
    .catch((err) => {
      toast.error(
        err?.data?.message ||
          "Unable to fetch clients for the coach, please try again.",
        {
          className: "warn-toast",
        }
      );
      return [];
    });
};

const _getAssignedCoach = ({ clientUserName }) => {
  return httpService
    .get(getApi(API.GET_ASSIGNED_COACH) + "/" + clientUserName)
    .then((res) => {
      return res?.data || {};
    })
    .catch((err) => {
      toast.error(
        err?.data?.message ||
          "Unable to fetch assigned coach, please try again.",
        {
          className: "warn-toast",
        }
      );
      return {};
    });
};

const _deleteAssignedCoach = ({ clientUserName, assignedCoach }) => {
  return httpService
    .delete(
      getApi(API.DELETE_COACH_ASIGNMENT) +
        "/" +
        assignedCoach?.username +
        "/" +
        clientUserName
    )
    .then((res) => {
      return true;
    })
    .catch((err) => {
      toast.error(
        err?.data?.message ||
          "Unable to delete assigned coach, please try again.",
        {
          className: "warn-toast",
        }
      );
      return false;
    });
};

const _assignCoach = ({ clientUserName, newCoach }) => {
  return httpService
    .post(
      getApi(API.ASSIGN_COACH) + "/" + newCoach?.username + "/" + clientUserName
    )
    .then((res) => {
      toast.success("Coach Assigned");
      return newCoach;
    })
    .catch((err) => {
      toast.error(
        err?.data?.message || "Unable to assign coach, please try again.",
        {
          className: "warn-toast",
        }
      );
      return;
    });
};

const _deleteCoachProfile = ({ username }) => {
  return httpService
    .delete(getApi(API.DELETE_COACH_PROFILE) + "/" + username)
    .then(({ data }) => {
      if (data?.message) {
        toast.success("Coach profile deleted successfully.");
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

const _approveCoach = ({ username }) => {
  return httpService
    .put(getApi(API.APPROVE_COACH) + "/" + username + "/" + true)
    .then(({ data }) => {
      if (data?.message) {
        toast.success("Coach profile approved successfully.");
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

const coachService = {
  _getAllCoaches,
  _getAllCoachClients,
  _getAssignedCoach,
  _assignCoach,
  _deleteAssignedCoach,
  _deleteCoachProfile,
  _approveCoach,
};

export default coachService;
