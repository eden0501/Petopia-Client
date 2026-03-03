import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

import { ROUTES } from "./constants/routes";
import AuthPage from "./pages/Auth/AuthPage";
import api from "./api/axios";
import Loader from "./pages/Loader";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth"],
    queryFn: () => api.get("/users", { withCredentials: true }),
    retry: false,
    staleTime: Infinity,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          {ROUTES.map(({ path, element: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute>
                  <Component />
                </ProtectedRoute>
              }
            />
          ))}
          <Route path={"*"} element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
