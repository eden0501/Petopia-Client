import axios from "axios";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

import Loader from "./pages/Loader";
import { ROUTES } from "./constants/routes";
import AuthPage from "./pages/Auth/AuthPage";

const queryClient = new QueryClient();

const useAuth = () =>
  useQuery({
    queryKey: ["auth"],
    queryFn: () => axios.get(`${import.meta.env.VITE_API_URL}/users`, { withCredentials: true }),
    retry: false,
    staleTime: Infinity,
  });

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError } = useAuth();

  if (isLoading) return <Loader />;
  if (isError || !data) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useAuth();

  if (isLoading) return <Loader />;
  if (data) return <Navigate to="/home" replace />;

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthRoute><AuthPage /></AuthRoute>} />
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

export default App;
