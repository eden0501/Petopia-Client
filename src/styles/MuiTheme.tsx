import { CssBaseline } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
  },
  typography: {
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
  },
  components: {
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
        },
        selected: {
          color: "primary.main",
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
