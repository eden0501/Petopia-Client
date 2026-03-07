import { useState } from "react";
import { Add, Home, Person } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { BottomNavigation, BottomNavigationAction, Fab } from "@mui/material";

import PostForm from "@/components/PostForm";

import styles from "./NavBar.styles";

const NavBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  return (
    <>
      <BottomNavigation
        sx={styles.bottomNavigation}
        showLabels
        value={pathname}
        onChange={(_, newValue) => {
          navigate(newValue);
        }}
      >
        <BottomNavigationAction value="/home" label="Home" icon={<Home />} />

        <BottomNavigationAction
          value={"/profile"}
          label="Profile"
          icon={<Person />}
        />
      </BottomNavigation>
      <Fab
        color="primary"
        sx={styles.fab(pathname !== "/edit-profile") }
        onClick={() => setIsCreatePostModalOpen(true)}
      >
        <Add />
      </Fab>
      <PostForm
        open={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
      />
    </>
  );
};
export default NavBar;
