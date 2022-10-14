import axios from "axios";
import { toast } from "react-toastify";

export const httpService = axios.create({
  withCredentials: false,
});

httpService.interceptors.request.use((config) => {
  config.headers = {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    // "Access-Control-Request-Headers": "Content-Type",
    // "Access-Control-Request-Method": "POST",
    // "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE",
    // "cache-control": "no-cache",
  };

  console.log(config);

  return config;
});

httpService.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    toast.error("Something went wrong!", {
      className: "warn-toast",
    });
    throw new Error(error.response);
  }
);

export default httpService;
