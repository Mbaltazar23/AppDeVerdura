import axios from "axios";
import { LocalStorage } from "../../local/LocalStorage";
import { User } from "../../../../Domain/entities/User";

//URL API LOCAL : http://192.168.1.88:3000/api
//URL API WEB: https://api.deverdura.cl/api

const ApiDeVerdura = axios.create({
  baseURL: "https://api.deverdura.cl/api",
  headers: {
    "Content-type": "application/json",
  },
});

const ApiDeVerduraWithImage = axios.create({
  baseURL: "https://api.deverdura.cl/api",
  headers: {
    "Content-type": "multipart/form-data",
    accept: "application/json",
  },
});

// INTERCEPTORS
ApiDeVerdura.interceptors.request.use(async (config) => {
  const data = await LocalStorage().getItem("user");
  if (data) {
    const user: User = JSON.parse(data);
    config.headers["Authorization"] = user?.session_token;
  }
  return config;
});

ApiDeVerduraWithImage.interceptors.request.use(async (config) => {
  const data = await LocalStorage().getItem("user");
  if (data) {
    const user: User = JSON.parse(data);
    config.headers["Authorization"] = user?.session_token;
  }
  return config;
});

export { ApiDeVerdura, ApiDeVerduraWithImage };
