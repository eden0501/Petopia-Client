import type { SxProps, Theme } from "@mui/material";

export const authPageStyles: Record<string, SxProps<Theme>> = {
  pageWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #FFF5EC 0%, #FFF9EE 50%, #FFF0E0 100%)",
    boxSizing: "border-box",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
    minWidth: "400px",
    maxHeight: "90%",
  },
  logoSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mb: "24px",
  },
  logo: {
    fontSize: "5rem",
    mb: "8px",
    color: "white",

    padding: 15,
    borderRadius: "50%",
    backgroundColor: "primary.main",
  },
  card: {
    width: "100%",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 4px 32px rgba(0,0,0,0.09)",
    flex: 1,
    position: "relative",
    "&::before, &::after": {
      content: '" "',
      position: "absolute",
      left: 0,
      right: 0,
      height: "14px",
      pointerEvents: "none",
      zIndex: 1,
    },
    "&::before": {
      top: 0,
      background:
        "linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, transparent 100%)",
    },
    "&::after": {
      bottom: 0,
      background:
        "linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 100%)",
    },
  },
  cardInner: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    p: "20px",
    scrollBehavior: "smooth",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "rgba(0, 0, 0, 0.12)",
      borderRadius: "10px",
      "&:hover": {
        background: "rgba(0, 0, 0, 0.22)",
      },
    },
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(0,0,0,0.12) transparent",
  },
  headingSection: {
    mb: "12px",
  },
  dateInput: {
    width: "100%",
    mb: "8px",
    px: "14px",
    py: "8px",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    bgcolor: "#F3F4F6",
    border: "none",
    borderRadius: "10px",
    outline: "none",
    cursor: "pointer",
    boxSizing: "border-box",
    color: "text.primary",
    textAlign: "left",
    "&:focus": {
      outline: "1.5px solid",
      outlineColor: "primary.main",
    },
  },
  submitButton: {
    mt: 10,
    "&:hover": {
      bgcolor: "primary.dark",
    },
  },
  divider: {
    my: "12px",
    fontSize: "0.75rem",
    color: "text.secondary",
  },
  errorBanner: {
    mb: "12px",
    py: "8px",
    px: "12px",
    bgcolor: "#FFF0EE",
    color: "primary.main",
    borderRadius: "8px",
    textAlign: "center",
  },
  errorText: {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "0.8rem",
  },
  fieldLabel: {
    mb: "4px",
    fontSize: "0.85rem",
    fontWeight: 700,
    color: "text.primary",
  },
};
