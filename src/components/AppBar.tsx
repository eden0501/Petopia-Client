import PawPrint from "../icons/FilledPawPrints";
import { SettingsOutlined } from "@mui/icons-material";
import { AppBar as AppBarMui, IconButton, Typography } from "@mui/material";

const AppBar = ({ displaySettings = false }: { displaySettings?: boolean }) => (
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
    {displaySettings && (
      <IconButton sx={{ marginLeft: "auto" }}>
        <SettingsOutlined sx={{ color: "text.secondary" }} />
      </IconButton>
    )}
  </AppBarMui>
);

export default AppBar;
