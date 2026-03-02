import { Routes, Route, Navigate } from "react-router";

import AuthPage from "./pages/AuthPage";
import AppBar from "./components/AppBar";
import NavBar from "./components/NavBar";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const HomePage = () => (
  <>
    <AppBar displaySettings />
    <NavBar />
  </>
);

const App = () => (
  <Routes>
    <Route path="/login" element={<AuthPage />} />
    <Route path="/register" element={<AuthPage />} />
    <Route
      path="/*"
      element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default App;
