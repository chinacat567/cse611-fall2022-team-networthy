export const getApi = (api) => {
  return BASE_URI + api;
};

export const BASE_URI = "http://localhost:8080";

export const API = {
  CLIENT_SIGNUP: "/api/auth/signup",
};
