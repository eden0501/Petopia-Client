import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import Loader from "./pages/Loader";
import { ROUTES } from "./constants/routes";
import { useUserContext } from "./contexts/UserContext";

const App = () => {
  const { isLoading } = useUserContext();

  return isLoading ? (
    <Loader />
  ) : (
    <BrowserRouter>
      <Routes>
        {ROUTES.map(({ path, element: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path={"*"} element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
