import axios, { HttpStatusCode } from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await axios.post(
                    `${api.defaults.baseURL}/auth/refresh-token`,
                    {},
                    { withCredentials: true }
                );

                return api(originalRequest);
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

export default api;
