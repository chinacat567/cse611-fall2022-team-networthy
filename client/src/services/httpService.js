import axios from "axios";
import { toast } from "react-toastify";

export const httpService = axios.create({
  withCredentials: true,
});

httpService.interceptors.request.use((config) => {
  return config;
});

httpService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    toast.error("Something went wrong!", {
      className: "warn-toast",
    });
    console.log(error);
    throw error.response;
  }
);

export default httpService;
