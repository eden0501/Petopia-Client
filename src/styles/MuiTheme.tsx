import { CssBaseline } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { alpha, createTheme, ThemeProvider } from "@mui/material/styles";
import type { PropsWithChildren } from "react";

const theme = createTheme({
  spacing: 1,
  palette: {
    primary: {
      main: "#F54A00",
    },
    text: {
      primary: "#0A0A0A",
      secondary: "#364153",
    },
    error: {
      main: "#B91C1C",
    },
    warning: {
      main: "#D97706",
    },
  },
  typography: {
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
  },
  components: {
    MuiChip: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          height: "auto",
          borderRadius: "8px",
          fontWeight: 600,
          fontSize: "0.8rem",
          padding: 2,
        },
        outlined: ({ ownerState, theme }) => {
          const colorKey =
            ownerState.color && ownerState.color !== "default"
              ? ownerState.color
              : "primary";

          const paletteColor =
            theme.palette[
              colorKey as "primary" | "error" | "warning" | "info" | "success"
            ];

          return {
            // Use alpha for a much smoother, professional tint
            backgroundColor: alpha(paletteColor.main, 0.1),
            color: paletteColor.main,
            borderWidth: "1px",
            borderColor: alpha(paletteColor.main, 0.2),

            "& .MuiChip-label": {
              paddingLeft: "8px",
              paddingRight: "10px",
            },
            "& .MuiChip-icon": {
              marginLeft: "8px",
              marginRight: "-4px",
              fontSize: "18px",
              color: "inherit",
            },
          };
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          padding: 5,
          borderRadius: 12,
        },
        list: {
          padding: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: "auto",
          fontSize: "0.9rem",
          padding: 10,
          borderRadius: 12,
          "&.Mui-selected": {
            color: "primary.main",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        slotProps: {
          select: {
            IconComponent: ExpandMore,
          },
        },
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: "#F3F3F5",
            "& fieldset": {
              border: "none",
            },
          },
          "& .MuiInputBase-input": {
            padding: 10,
          },
          "& .MuiSelect-select": {
            fontWeight: 500,
          },
        },
      },
    },
  },
});

const MuiTheme = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default MuiTheme;
