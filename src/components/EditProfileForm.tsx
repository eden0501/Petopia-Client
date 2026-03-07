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

import { useUserContext } from "../contexts/UserContext";
import { getDateStringWithoutTime } from "../utils/dateUtils";

const EditProfileForm = () => {
  const {
    userData: { profilePicture, username, petsCount, petOwnerSince },
  } = useUserContext();

  const navigate = useNavigate();
  const today = getDateStringWithoutTime();

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
          value={username}
        // onChange={({ target }) => setSearchValue(target.value)}
        />
      </Box>
      <Box>
        <Typography sx={{ fontWeight: "600" }}>Number of Pets</Typography>
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
