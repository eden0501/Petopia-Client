import { useState } from "react";
import styles from "./AppBar.styles";
import LogoutModal from "../LogoutModal";
import PawPrint from "../../icons/PawPrint";
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
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
};

export default AppBar;
