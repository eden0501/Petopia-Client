import { useNavigate } from "react-router";
import {
  Box,
  Stack,
  Avatar,
  Button,
  TextField,
  CardHeader,
  Typography,
} from "@mui/material";
import type { UserInterface } from "../interfaces/user";

const EditProfileForm = ({ profilePicture, username }: UserInterface) => {
  const navigate = useNavigate();

  return (
    <Stack sx={{ paddingTop: 30, gap: 20 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              width: "auto",
              height: "80px",
              aspectRatio: "1/1",
            }}
            src={profilePicture}
          />
        }
        title="Profile Picture"
        subheader="JPG, PNG or GIF, Max size 2MB."
        sx={{
          padding: 0,
          ".MuiCardHeader-title": {
            fontSize: "1.2rem",
            fontWeight: "600",
          },
        }}
      />
      <Box>
        <Typography sx={{ fontWeight: "600" }}>Username</Typography>
        <TextField
          placeholder="Search posts, hashtags, authors..."
          value={username}
          // onChange={({ target }) => setSearchValue(target.value)}
        />
      </Box>
      <Box>
        <Typography sx={{ fontWeight: "600" }}>Number of Pets</Typography>
        <TextField
          placeholder="Search posts, hashtags, authors..."
          value={username}
          // onChange={({ target }) => setSearchValue(target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <Button variant="outlined" onClick={() => navigate("/profile")}>
          Cancel
        </Button>
        <Button variant="contained">Save Changes</Button>
      </Box>
    </Stack>
  );
};

export default EditProfileForm;
