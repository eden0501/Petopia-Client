import { createApiInstance } from "../config/axiosInstance";

const axiosInstance = createApiInstance(
    `${import.meta.env.VITE_SERVER_URL}/chat`,
);

export const sendMessage = async (message: string, userId: string) => {
    const { data } = await axiosInstance.post<{ response: string }>("/", {
        message,
        userId,
    });
    return data.response;
};
