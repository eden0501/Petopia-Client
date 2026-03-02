import { useState } from "react";
import LogoutModal from "./LogoutModal";
import PawPrint from "../icons/PawPrint";
import { useLocation, useNavigate } from "react-router";
import { BorderColorRounded, LogoutRounded } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  AppBar as AppBarMui,
} from "@mui/material";

const AppBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <>
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
        <Box
          sx={{
            gap: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          onClick={() => navigate("/home")}
        >
          <PawPrint
            sx={{
              padding: 10,
              fontSize: "2.5rem",
              borderRadius: "50%",
              backgroundColor: "primary.main",
            }}
          />
          <Typography sx={{ fontSize: "1.2rem", color: "text.primary" }}>
            Petopia
          </Typography>
        </Box>
        {pathname === "/profile" && (
          <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
            <IconButton onClick={() => navigate("/edit-profile")}>
              <BorderColorRounded color="primary" />
            </IconButton>
            <IconButton onClick={() => setIsLogoutModalOpen(true)}>
              <LogoutRounded color="primary" />
            </IconButton>
          </Box>
        )}
      </AppBarMui>
      <LogoutModal
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
};

export default AppBar;
