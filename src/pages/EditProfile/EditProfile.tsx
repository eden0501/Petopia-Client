import { useState } from "react";
import styles from "./EditProfile.styles";
import AppBar from "../../components/AppBar";
import NavBar from "../../components/NavBar";
import EditProfileForm from "../../components/EditProfileForm";
import DeleteProfileModal from "../../components/DeleteProfileModal";
import { Box, Button, Container, Divider, Typography } from "@mui/material";

const EditProfile = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <>
      <Box sx={styles.container}>
        <AppBar />
        <Container sx={styles.contentContainer}>
          <Typography sx={styles.title}>Edit Profile</Typography>
          <Typography sx={styles.subtitle}>
            Update your personal information and how others see you
          </Typography>
          <EditProfileForm />
          <Divider sx={styles.divider} />
          <Box sx={styles.deleteSection}>
            <Box>
              <Typography sx={styles.deleteTitle}>Delete Account</Typography>
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
        onConfirm={() => {}}
      />
    </>
  );
};

export default EditProfile;
