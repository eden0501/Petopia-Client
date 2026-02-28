import { useState } from "react";
import AppBar from "../components/AppBar";
import NavBar from "../components/NavBar";
import { mockUsers } from "../services/mock";
import EditProfileForm from "../components/EditProfileForm";
import DeleteAccountModal from "../components/DeleteProfileModal";
import { Box, Button, Container, Divider, Typography } from "@mui/material";

const user = mockUsers["user1"];

const EditProfile = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <>
      <Box sx={{ backgroundColor: "#FBF9FA", minHeight: "100vh" }}>
        <AppBar />
        <Container sx={{ padding: 20, paddingTop: 30 }}>
          <Typography sx={{ fontSize: "1.3rem", fontWeight: "600" }}>
            Edit Profile
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Update your personal information and how others see you
          </Typography>
          <EditProfileForm {...user} />
          <Divider sx={{ marginTop: 20, marginBottom: 10 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: "600" }}>Delete Account</Typography>
              <Typography sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
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
      <DeleteAccountModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {}}
      />
    </>
  );
};

export default EditProfile;
