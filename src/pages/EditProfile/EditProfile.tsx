import { useState } from "react";
import { Box, Button, Container, Divider, Typography } from "@mui/material";

import AppBar from "@/components/AppBar";
import NavBar from "@/components/NavBar";
import EditProfileForm from "@/components/EditProfileForm";
import DeleteProfileModal from "@/components/DeleteProfileModal";

import styles from "./EditProfile.styles";

const EditProfile = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <>
      <Box sx={styles.container}>
        <AppBar />
        <Container sx={styles.contentContainer}>
          <Typography variant="h4">Edit Profile</Typography>
          <Typography variant="subtitle1">
            Update your personal information and how others see you
          </Typography>
          <EditProfileForm />
          <Divider sx={styles.divider} />
          <Box sx={styles.deleteSection}>
            <Box>
              <Typography variant="subtitle2">Delete Account</Typography>
              <Typography variant="caption">
                Permanently remove all your data
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setDeleteModalOpen(true)}
            >
              Delete Profile
            </Button>
          </Box>
        </Container>
        <NavBar />
      </Box>
      <DeleteProfileModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => { }}
      />
    </>
  );
};

export default EditProfile;
