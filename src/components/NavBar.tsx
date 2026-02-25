import { Add, Home, Person } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { BottomNavigation, BottomNavigationAction, Fab } from "@mui/material";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <BottomNavigation
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        position: "fixed",
        justifyContent: "space-around",
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
      }}
      showLabels
      value={location.pathname}
      onChange={(_, newValue) => {
        navigate(newValue);
      }}
    >
      <BottomNavigationAction value="/home" label="Home" icon={<Home />} />
      <Fab color="primary" sx={{ position: "relative", top: -20 }}>
        <Add />
      </Fab>
      <BottomNavigationAction
        value={"/profile"}
        label="Profile"
        icon={<Person />}
      />
    </BottomNavigation>
  );
};
export default NavBar;
