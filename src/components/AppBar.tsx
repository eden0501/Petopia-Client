import { useLocation } from "react-router";
import PawPrint from "../icons/FilledPawPrints";
import { SettingsOutlined } from "@mui/icons-material";
import { AppBar as AppBarMui, IconButton, Typography } from "@mui/material";

const AppBar = () => {
  const { pathname } = useLocation();

  return (
    <AppBarMui
      position="static"
      sx={{
        gap: 10,
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <PawPrint sx={{ fontSize: "2.5rem" }} />
      <Typography sx={{ fontSize: "1.2rem", color: "text.primary" }}>
        Petopia
      </Typography>
      {pathname === "/profile" && (
        <IconButton sx={{ marginLeft: "auto" }}>
          <SettingsOutlined sx={{ color: "text.secondary" }} />
        </IconButton>
      )}
    </AppBarMui>
  );
};

export default AppBar;
