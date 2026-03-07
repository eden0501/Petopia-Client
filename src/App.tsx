import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import Loader from "./pages/Loader";
import { ROUTES } from "./constants/routes";
import AuthPage from "./pages/Auth/AuthPage";
import { useUserContext } from "./contexts/UserContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { userId, isLoading } = useUserContext();

  if (isLoading) return <Loader />;
  if (!userId) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { userId, isLoading } = useUserContext();

  if (isLoading) return <Loader />;
  if (userId) return <Navigate to="/home" replace />;

  return <>{children}</>;
};

const App = () => (
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
);

export default App;
