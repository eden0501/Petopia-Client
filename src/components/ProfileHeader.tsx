import PawPrint from "../icons/PawPrint";
import { formatDistanceToNowStrict } from "date-fns";
import {
  Box,
  Chip,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  CardActions,
} from "@mui/material";
import type { UserInterface } from "../interfaces/user";

const stab = [
  { title: "Posts", count: 0 },
  { title: "Likes", count: 0 },
  { title: "Comments", count: 0 },
];

const ProfileHeader = ({
  profilePicture,
  username,
  petsCount,
  dateOfBirth,
}: UserInterface) => (
  <Box
    sx={{
      margin: 10,
      borderRadius: "10px",
      background: "white",
      border: "1px solid #E0E0E0",
    }}
  >
    <CardHeader
      avatar={
        <Avatar
          sx={{
            width: "auto",
            height: "90px",
            aspectRatio: "1/1",
          }}
          src={profilePicture}
        />
      }
      title={username}
      subheader={
        <Stack sx={{ gap: 5, alignItems: "flex-start" }}>
          {formatDistanceToNowStrict(dateOfBirth)}{" "}
          <Chip
            color="warning"
            icon={<PawPrint sx={{ "& path": { stroke: "warning.main" } }} />}
            label={`${petsCount} ${petsCount === 1 ? "Pet" : "Pets"}`}
          />
        </Stack>
      }
      sx={{
        ".MuiCardHeader-title": {
          fontSize: "1.4rem",
          fontWeight: "600",
        },
      }}
    />

    <CardActions sx={{ padding: 20, justifyContent: "space-around" }}>
      {stab.map((item) => (
        <Stack key={item.title} alignItems="center">
          <Typography sx={{ fontSize: "1.2rem" }}>{item.count}</Typography>
          <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
            {item.title}
          </Typography>
        </Stack>
      ))}
    </CardActions>
  </Box>
);

export default ProfileHeader;
