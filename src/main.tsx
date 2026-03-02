import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.tsx";
import MuiTheme from "./styles/MuiTheme.tsx";

import "./index.scss";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <MuiTheme>
        <App />
      </MuiTheme>
    </GoogleOAuthProvider>
  </StrictMode>,
);
