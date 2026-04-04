import Markdown from "react-markdown";
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  AutoAwesomeOutlined as SparklesIcon,
  Close as CloseIcon,
  SendOutlined as SendIcon,
} from "@mui/icons-material";
import {
  Box,
  Fab,
  Paper,
  Typography,
  IconButton,
  TextField,
  List,
  ListItem,
  Avatar,
  Fade,
  CircularProgress,
} from "@mui/material";

import styles from "./FloatingAIChat.styles";
import { sendMessage } from "../../services/chat.service";
import type { ChatHistory } from "../../interfaces/chatHistory";
import { UserContext } from "../../contexts/UserContext/UserContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const FloatingAIChat = () => {
  const { userId, userData } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedMessages = localStorage.getItem("petopia_ai_chat");
    if (storedMessages) {
      setMessages(
        JSON.parse(storedMessages, (key, value) => {
          if (key === "timestamp") return new Date(value);
          return value;
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const recentMessages = messages.slice(-20);
      localStorage.setItem("petopia_ai_chat", JSON.stringify(recentMessages));
    }
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!input.trim() || !userId) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history: ChatHistory[] = messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const response = await sendMessage(userMessage.content, userId, history);

      const assistantMessage: Message = {
        id: `msg-ai-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMsg: Message = {
        id: `msg-err-${Date.now()}`,
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const openChat = () => {
    setIsOpen(true);

    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: `Hi ${userData?.username || "there"}! 👋 I'm PetBot, your AI pet care assistant. Ask me anything about pet care, training, or health!`,
          timestamp: new Date(),
        },
      ]);
    }
  };

  if (!isOpen) {
    return (
      <Fade in={!isOpen}>
        <Fab
          color="primary"
          aria-label="chat"
          onClick={openChat}
          sx={styles.chatFab}
        >
          <SparklesIcon />
        </Fab>
      </Fade>
    );
  }

  return (
    <Fade in={isOpen}>
      <Box sx={styles.chatContainer}>
        <Paper elevation={10} sx={styles.chatPaper}>
          <Box sx={styles.chatHeader}>
            <Box sx={styles.headerContent}>
              <Avatar sx={styles.avatar}>
                <SparklesIcon sx={styles.sparklesIconHeader} />
              </Avatar>
              <Box sx={styles.headerText}>
                <Typography sx={styles.title}>PetBot AI</Typography>
                <Typography variant="caption" sx={styles.subtitle}>
                  Your pet care assistant
                </Typography>
              </Box>
            </Box>
            <IconButton
              size="small"
              onClick={() => setIsOpen(false)}
              sx={styles.closeButton}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={styles.chatContent}>
            <List sx={styles.messageList}>
              {messages.map((msg) => (
                <ListItem key={msg.id} sx={styles.listItem(msg.role)}>
                  <Box sx={styles.messageBox(msg.role)}>
                    <Paper elevation={0} sx={styles.messagePaper(msg.role)}>
                      {msg.role === "assistant" && (
                        <Box sx={styles.assistantLabel}>
                          <SparklesIcon sx={styles.sparklesIconLabel} />
                          <Typography sx={styles.petBotText}>PetBot</Typography>
                        </Box>
                      )}
                      <Box sx={styles.markdownContent}>
                        <Markdown>{msg.content}</Markdown>
                      </Box>
                    </Paper>
                  </Box>
                </ListItem>
              ))}
              {isLoading && (
                <ListItem sx={styles.listItem("assistant")}>
                  <Box sx={styles.messageBox("assistant")}>
                    <Paper elevation={0} sx={styles.messagePaper("assistant")}>
                      <Box sx={styles.assistantLabel}>
                        <SparklesIcon sx={styles.sparklesIconLabel} />
                        <Typography sx={styles.petBotText}>PetBot</Typography>
                      </Box>
                      <CircularProgress size={16} sx={styles.loadingSpinner} />
                    </Paper>
                  </Box>
                </ListItem>
              )}
              <div ref={scrollRef} />
            </List>
          </Box>
          <Box sx={styles.inputContainer}>
            <Box sx={styles.inputWrapper}>
              <TextField
                fullWidth
                size="small"
                placeholder="Ask about pet care..."
                value={input}
                variant="outlined"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
                sx={styles.textField}
              />
              <IconButton
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                sx={styles.sendButton}
              >
                <SendIcon sx={styles.sendIcon} />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default FloatingAIChat;
