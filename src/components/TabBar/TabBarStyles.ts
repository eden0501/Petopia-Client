import type { SxProps, Theme } from "@mui/material";

export const tabBarStyles: Record<string, SxProps<Theme>> = {
    container: {
        display: "flex",
        bgcolor: "#EDEEF0",
        borderRadius: "50px",
        p: "4px",
        gap: "4px",
        flexShrink: 0,
        width: "100%",
        boxSizing: "border-box",
    },
    tab: {
        flex: 1,
        borderRadius: "50px",
        fontWeight: 600,
        fontSize: "0.85rem",
        border: "none",
        minWidth: 0,
        bgcolor: "transparent",
        color: "text.secondary",
        "&:hover": {
            bgcolor: "rgba(0,0,0,0.04)",
        },
    },
    activeTab: {
        fontWeight: 700,
        bgcolor: "#FFFFFF",
        color: "text.secondary",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        "&:hover": {
            bgcolor: "#FFFFFF",
        },
    },
};
