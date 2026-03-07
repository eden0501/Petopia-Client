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

import PawPrint from "../icons/PawPrint";
import { useUserContext } from "../contexts/UserContext";
import type { UserStatsInterface } from "../interfaces/user";

const stats: { title: string; userProperty: keyof UserStatsInterface }[] = [
  { title: "Posts", userProperty: "postsCount" },
  { title: "Likes", userProperty: "likesCount" },
  { title: "Comments", userProperty: "commentsCount" },
];

const ProfileHeader = () => {
  const { userData } = useUserContext();

  return (
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
            src={userData.profilePicture}
          />
        }
        title={userData.username}
        subheader={
          <Stack sx={{ gap: 5, alignItems: "flex-start" }}>
            {formatDistanceToNowStrict(userData.petOwnerSince)}
            <Chip
              color="warning"
              icon={<PawPrint sx={{ "& path": { stroke: "warning.main" } }} />}
              label={`${userData.petsCount} ${userData.petsCount === 1 ? "Pet" : "Pets"}`}
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
        {stats.map(({ title, userProperty }) => (
          <Stack key={title} alignItems="center">
            <Typography sx={{ fontSize: "1.2rem" }}>
              {String(userData[userProperty])}
            </Typography>
            <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
              {title}
            </Typography>
          </Stack>
        ))}
      </CardActions>
    </Box>
  );
};

export default ProfileHeader;
