import { createApiInstance } from "../config/axiosInstance";
import type { ChatHistory } from "../interfaces/chatHistory";

const axiosInstance = createApiInstance("chat");

export const sendMessage = async (message: string, userId: string, history: ChatHistory[]) => {
    const { data } = await axiosInstance.post<{ response: string }>("/", {
        message,
        userId,
        history,
    });
    return data.response;
};
