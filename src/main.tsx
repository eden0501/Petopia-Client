import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import MuiTheme from "./styles/MuiTheme.tsx";
import { UserContextProvider } from "./contexts/UserContext/UserContextProvider.tsx";

import "./index.scss";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MuiTheme>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </QueryClientProvider>
    </MuiTheme>
  </StrictMode>,
);
