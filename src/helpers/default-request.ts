import axios from "axios";

const defaultRequest = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
});

defaultRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export { defaultRequest };
