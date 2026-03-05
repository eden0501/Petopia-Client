import { createAxiosInstance } from "../config/axiosInstance";

const axiosInstance = createAxiosInstance(
    `${import.meta.env.VITE_SERVER_URL}/chat`,
);

export const sendMessage = async (message: string, userId: string) => {
    const { data } = await axiosInstance.post<{ response: string }>("/", {
        message,
        userId,
    });
    return data.response;
};
