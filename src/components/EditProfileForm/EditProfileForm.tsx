import { useNavigate } from "react-router";
import styles from "./EditProfileForm.styles";
import { useUserContext } from "../../contexts/UserContext";
import {
  Box,
  Stack,
  Avatar,
  Button,
  TextField,
  CardHeader,
  Typography,
} from "@mui/material";

const EditProfileForm = () => {
  const {
    userData: { profilePicture, username, petsCount },
  } = useUserContext();

  const navigate = useNavigate();

  return (
    <Stack sx={styles.container}>
      <CardHeader
        avatar={<Avatar sx={styles.avatar} src={profilePicture} />}
        title="Profile Picture"
        subheader="JPG, PNG or GIF, Max size 2MB."
        sx={styles.cardHeader}
      />
      <Box>
        <Typography sx={styles.label}>Username</Typography>
        <TextField
          value={username}
          // onChange={({ target }) => setSearchValue(target.value)}
        />
      </Box>
      <Box>
        <Typography sx={styles.label}>Number of Pets</Typography>
        <TextField
          value={petsCount}
          type="number"
          // onChange={({ target }) => setSearchValue(target.value)}
        />
      </Box>
      <Box sx={styles.actionsBox}>
        <Button variant="outlined" onClick={() => navigate("/profile")}>
          Cancel
        </Button>
        <Button variant="contained">Save Changes</Button>
      </Box>
    </Stack>
  );
};

export default EditProfileForm;
