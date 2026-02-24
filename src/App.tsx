import { ROUTES } from "./constants/routes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {ROUTES.map(({ path, element: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path={"*"} element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
