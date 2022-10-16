import axios from "axios";
import { toast } from "react-toastify";

export const httpService = axios.create({
  withCredentials: true,
});

httpService.interceptors.request.use((config) => {
  /*config.headers = {
    "Access-Control-Allow-Origin": "*"
    //"cache-control": "no-cache",
  };*/

  console.log(config);

  return config;
});

httpService.interceptors.response.use(
  (response) => {
	  console.log("Response");
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
