import { useState } from "react";
import { Add, Home, Person } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Fab } from "@mui/material";

const NavBar = () => {
  const [value, setValue] = useState(0);

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
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="Home" icon={<Home />} />
      <Fab color="primary" sx={{ position: "relative", top: -20 }}>
        <Add />
      </Fab>
      <BottomNavigationAction label="Profile" icon={<Person />} />
    </BottomNavigation>
  );
};
export default NavBar;
