const styles = {
    chatFab: {
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000,
        transition: "all 0.3s ease",
        "&:hover": { transform: "scale(1.1)", backgroundColor: "primary.dark" },
        backgroundColor: "primary.main",
    },
    chatContainer: {
        position: "fixed",
        bottom: 20,
        right: 20,
        width: { xs: "90%", sm: 320 },
        height: 480,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
    },
    chatPaper: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        overflow: "hidden",
    },
    chatHeader: {
        p: 10,
        backgroundColor: "primary.main",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerContent: {
        display: "flex",
        alignItems: "center",
        gap: 8,
    },
    avatar: {
        bgcolor: "rgba(255,255,255,0.2)",
    },
    headerText: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    title: {
        fontWeight: 600,
        lineHeight: 1.2,
    },
    subtitle: {
        opacity: 0.9,
        lineHeight: 1.2,
    },
    chatContent: {
        flexGrow: 1,
        overflowY: "auto",
        p: 16,
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
        gap: 16,
    },
    messageList: {
        p: 0,
    },
    listItem: (role: "user" | "assistant") => ({
        flexDirection: "column",
        alignItems: role === "user" ? "flex-end" : "flex-start",
        p: 0,
        mb: 16,
    }),
    messageBox: (role: "user" | "assistant") => ({
        maxWidth: "85%",
        display: "flex",
        flexDirection: "column",
        alignItems: role === "user" ? "flex-end" : "flex-start",
    }),
    assistantLabel: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        mb: 4,
    },
    petBotText: {
        fontSize: "0.8rem",
        fontWeight: 700,
        color: "primary.main",
    },
    messagePaper: (role: "user" | "assistant") => ({
        p: 8,
        borderRadius: role === "user" ? "20px" : "4px 20px 20px 20px",
        bgcolor: role === "user" ? "primary.main" : "#F1F3F4",
        color: role === "user" ? "white" : "text.primary",
        boxShadow: "none",
    }),
    inputContainer: {
        p: "12px",
        borderTop: "1px solid #ECECEC",
    },
    textField: {
        "& .MuiInputBase-input": {
            fontSize: "0.9rem",
            padding: "10px 16px",
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            bgcolor: "white",
            "& fieldset": {
                border: "1px solid #ECECEC",
            },
            "&:hover fieldset": {
                borderColor: "primary.main",
            },
            "&.Mui-focused fieldset": {
                borderColor: "primary.main",
                borderWidth: "1px",
            },
        },
    },
    inputWrapper: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    sendButton: {
        bgcolor: "primary.main",
        color: "white",
        width: 40,
        height: 40,
        transform: "rotate(315deg)",
        "&:hover": { bgcolor: "primary.dark" },
        "&.Mui-disabled": { bgcolor: "#FFD4B8", color: "white" },
    },
};

export default styles;

