import { createApiInstance } from "../config/axiosInstance";
import type { ChatHistory } from "../interfaces/chatHistory";

const axiosInstance = createApiInstance("chat");

export const sendMessage = async (message: string, userId: string, history: ChatHistory[]) => {
    const { response } = (await axiosInstance.post<{ response: string }>("/", {
        message,
        userId,
        history,
    })).data;
    
    return response;
};
