export const EMAIL_API = "https://api.emailjs.com/api/v1.0/email/send";
export const EMAIL_API_2 =
  "https://emailvalidation.abstractapi.com/v1/" +
  process.env.REACT_APP_ABSTRACT_API_KEY;
export const BASE_URI = "http://localhost:8080";
export const API = {
  SIGNUP: "/api/auth/signup",
  LOGIN: "/api/auth/signin",
  EMAIL_VERIFICATION: "/api/auth/verify",
  ADD_CLIENT_PROFILE: "/api/client/add/clientProfile",
  UPDATE_CLIENT_PROFILE: "/api/client/edit/clientProfile",
  GET_ALL_CLIENT_GOALS: "/api/clientGoal/getAllGoals",
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
