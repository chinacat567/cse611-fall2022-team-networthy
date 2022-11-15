export const EMAIL_API = "https://api.emailjs.com/api/v1.0/email/send";
export const EMAIL_API_2 =
  "https://emailvalidation.abstractapi.com/v1/" +
  process.env.REACT_APP_ABSTRACT_API_KEY;
export const BASE_URI = "http://localhost:8080";
// export const BASE_URI =
//   "http://ec2-3-19-61-63.us-east-2.compute.amazonaws.com:8080";
export const API = {
  SIGNUP: "/api/auth/signup",
  LOGIN: "/api/auth/signin",
  EMAIL_VERIFICATION: "/api/auth/verify",
  ADD_CLIENT_PROFILE: "/api/client/add/clientProfile",
  UPDATE_CLIENT_PROFILE: "/api/client/edit/clientProfile",
  ADD_COACH_PROFILE: "/api/coach/add/data",
  UPDATE_COACH_PROFILE: "/api/admin/edit/coachProfile",
  GET_ALL_CLIENT_GOALS: "/api/clientGoal/getAllGoals",
  UPDATE_GOAL_STATUS: "/api/clientGoal/updateGoal",
  ADD_GOAL: "/api/clientGoal/addGoal",
  UPDATE_GOAL: "/api/clientGoal/editGoal",
  GET_ALL_COACHES: "/api/coach/getAll",
  GET_ALL_COACHES_ADMIN: "/api/admin/getAll",
  GET_ASSIGNED_COACH: "/api/clientAndCoach/get/coach",
  DELETE_COACH_ASIGNMENT: "/api/clientAndCoach/delete",
  ASSIGN_COACH: "/api/clientAndCoach/add",
  GET_ALL_COACH_CLIENTS: "/api/clientAndCoach/get/clients",
  GET_ALL_CLIENTS: "/api/client/getAll",
  DELETE_CLIENT_PROFILE: "/api/admin/remove/clientProfile",
  DELETE_COACH_PROFILE: "/api/admin/remove/coachProfile",
  APPROVE_COACH: "/api/admin/coachProfile/approve",
  GET_CONTENT_FOR_GOAL: "/api/content/getAll/goal",
  GET_COMMENTS_FOR_CLIENT: "/api/comment/getComments/client",
  ADD_COMMENTS_FOR_CLIENT: "/api/comment/add",
};

// Helper Functions
export const navigateTo = (url) => {
  window.location.href = url;
};
export const getApi = (api) => {
  return BASE_URI + api;
};
export const getEmailVerificationApi = (username) => {
  return BASE_URI + API.EMAIL_VERIFICATION + "/" + username;
};
export const getAbstractEmailApi = (email) => {
  return EMAIL_API_2 + "&email=" + email;
};
