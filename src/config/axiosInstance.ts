import axios, { HttpStatusCode } from "axios";

export const createApiInstance = (basePath: string, addToken = true) => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/${basePath}`,
    ...(addToken && { withCredentials: true }),
  });

  if (addToken) {
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await axios.post(
              `${import.meta.env.VITE_SERVER_URL}/auth/refresh-token`,
              {},
              { withCredentials: true }
            );

            return instance(originalRequest);
          } catch (err) {
            if (window.location.pathname !== "/login") {
              window.location.href = "/login";
            }
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  return instance;
};
