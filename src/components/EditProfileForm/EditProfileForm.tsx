import { useNavigate } from "react-router";
import {
  Stack,
  Avatar,
  Button,
  TextField,
  CardHeader,
  Typography,
  Box,
} from "@mui/material";

import { useUserContext } from "@/contexts/UserContext";
import { getDateStringWithoutTime } from "@/utils/dateUtils";

import styles from "./EditProfileForm.styles";

const EditProfileForm = () => {
  const {
    userData: { profilePicture, username, petsCount, petOwnerSince },
  } = useUserContext();

  const navigate = useNavigate();
  const today = getDateStringWithoutTime();

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
          value={petsCount || "0"}
          type="number"
        // onChange={({ target }) => setSearchValue(target.value)}
        />
      </Box>
      <Box>
        <Typography sx={{ fontWeight: "600" }}>When did you become a pet owner?</Typography>
        <TextField
          type="date"
          value={petOwnerSince ? getDateStringWithoutTime(petOwnerSince) : today}
          slotProps={{
            htmlInput: {
              max: today,
            }
          }}
          sx={{ "& input": { textAlign: "left" } }}
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
