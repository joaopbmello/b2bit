import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.homologation.cliqdrive.com.br/auth",
});

instance.interceptors.request.use(
  function (config) {
    config.headers["Accept"] = "application/json;version=v1_web";
    config.headers["Content-Type"] = "application/json";

    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
