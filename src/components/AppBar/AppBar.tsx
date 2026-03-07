import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { BorderColorRounded, LogoutRounded } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  AppBar as AppBarMui,
} from "@mui/material";

import PawPrint from "@/icons/PawPrint";
import { logout } from "@/services/auth.service";
import LogoutModal from "@/components/LogoutModal";

import styles from "./AppBar.styles";

const AppBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    setIsLogoutModalOpen(false);
    await logout();
    await queryClient.resetQueries({ queryKey: ["userInfo"] });
  };

  return (
    <>
      <AppBarMui position="static" sx={styles.appBar}>
        <Box sx={styles.logoBox} onClick={() => navigate("/home")}>
          <PawPrint sx={styles.pawPrint} />
          <Typography sx={styles.title}>Petopia</Typography>
        </Box>
        {pathname === "/profile" && (
          <Box sx={styles.actionsBox}>
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
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
};

export default AppBar;
