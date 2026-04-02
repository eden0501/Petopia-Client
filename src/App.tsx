import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import Loader from "./pages/Loader";
import { ROUTES } from "./constants/routes";
import AuthPage from "./pages/Auth/AuthPage";
import { useUserContext } from "./contexts/UserContext";

const App = () => {
  const { userId, isLoading, userData } = useUserContext();

  const isNewGoogleUser = 
    userId && !userData.petsCount && !userData.petOwnerSince;

  return isLoading ? (
    <Loader />
  ) : (
    <BrowserRouter>
      <Routes>
        {!userId ? (
          <Route path={"*"} element={<AuthPage />} />
        ) : (
          <>
            {ROUTES.map(({ path, element: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            <Route
              path={"*"}
              element={
                <Navigate to={isNewGoogleUser ? "/edit-profile" : "/home"} />
              }
            />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
