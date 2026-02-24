import axios from "axios";

export const createAxiosInstance = (service: string) => {
  const instance = axios.create({
    baseURL: service,
  });

  return instance;
};
