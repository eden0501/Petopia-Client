import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Button,
  Container,
  DialogActions,
  Divider,
  Typography,
} from "@mui/material";

import AppBar from "@/components/AppBar";
import NavBar from "@/components/NavBar";
import { deleteUser } from "@/services/users.service";
import EditProfileForm from "@/components/EditProfileForm";
import ConfirmationModal from "@/components/ConfirmationModal";

import styles from "./EditProfile.styles";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const { mutate: handleDeleteAccount } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      navigate("/login");
    },
  });

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

      <ConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        variant="error"
        title="Are you absolutely sure?"
        content="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
        actions={
          <DialogActions sx={styles.dialogActions}>
            <Button
              fullWidth
              sx={styles.keepButton}
              onClick={() => setDeleteModalOpen(false)}
            >
              No, keep my account
            </Button>
            <Button
              fullWidth
              color="error"
              variant="contained"
              sx={styles.deleteButton}
              onClick={() => handleDeleteAccount()}
            >
              Yes, delete account
            </Button>
          </DialogActions>
        }
      />
    </>
  );
};

export default EditProfile;
