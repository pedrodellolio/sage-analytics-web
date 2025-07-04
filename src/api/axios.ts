import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { clearAccessToken, getAccessToken, setAccessToken } from "./auth";

const API_URL = "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const orig = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !orig._retry) {
      orig._retry = true;
      try {
        const resp = await axiosInstance.post<{ accessToken: string }>(
          "/auth/refresh"
        );
        setAccessToken(resp.data.accessToken);
        orig.headers!.Authorization = `Bearer ${resp.data.accessToken}`;
        return axiosInstance(orig);
      } catch (e) {
        clearAccessToken();
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
