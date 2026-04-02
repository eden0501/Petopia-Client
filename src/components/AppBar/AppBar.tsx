import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { BorderColorRounded, LogoutRounded } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  AppBar as AppBarMui,
  DialogActions,
  Button,
} from "@mui/material";

import PawPrint from "@/icons/PawPrint";
import { logout } from "@/services/auth.service";
import { useUserContext } from "@/contexts/UserContext";

import styles from "./AppBar.styles";
import ConfirmationModal from "../ConfirmationModal";

const AppBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const { logoutUser } = useUserContext();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    setIsLogoutModalOpen(false);
    logoutUser();
    await logout();
    localStorage.clear();
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

      <ConfirmationModal
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Logging out?"
        content="Are you sure you want to log out? You will need to enter your credentials again to access your Petopia account."
        actions={
          <DialogActions sx={styles.dialogActions}>
            <Button
              fullWidth
              variant="outlined"
              sx={styles.buttonText}
              onClick={handleLogout}
            >
              Yes, Log Me Out
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={styles.buttonText}
              onClick={() => setIsLogoutModalOpen(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        }
      />
    </>
  );
};

export default AppBar;
