export interface ChatHistory {
    role: "user" | "model";
    parts: { text: string }[];
}