import { CssBaseline } from "@mui/material";
import type { PropsWithChildren } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  spacing: 1,
  palette: {
    primary: {
      main: "#F54A00",
      dark: "#D93E00",
    },
    text: {
      primary: "#0A0A0A",
      secondary: "#364153",
    },
  },
  typography: {
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
  },
});

const MuiTheme = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default MuiTheme;
