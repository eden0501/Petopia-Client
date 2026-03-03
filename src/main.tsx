import "./index.scss";
import App from "./App.tsx";
import { StrictMode } from "react";
import MuiTheme from "./styles/MuiTheme.tsx";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContextProvider } from "./contexts/UserContext/UserContextProvider.tsx";

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
