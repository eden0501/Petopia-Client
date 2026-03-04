import PawPrint from "../../icons/PawPrint";
import styles from "./ProfileHeader.styles";
import { formatDistanceToNowStrict } from "date-fns";
import { useUserContext } from "../../contexts/UserContext";
import {
  Box,
  Chip,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  CardActions,
} from "@mui/material";
import type { UserStatsInterface } from "../../interfaces/user";

const stats: { title: string; userProperty: keyof UserStatsInterface }[] = [
  { title: "Posts", userProperty: "postsCount" },
  { title: "Likes", userProperty: "likesCount" },
  { title: "Comments", userProperty: "commentsCount" },
];

const ProfileHeader = () => {
  const { userData } = useUserContext();

  return (
    <Box sx={styles.container}>
      <CardHeader
        avatar={<Avatar sx={styles.avatar} src={userData.profilePicture} />}
        title={userData.username}
        subheader={
          <Stack sx={styles.subheaderStack}>
            {formatDistanceToNowStrict(userData.petOwnerSince)}
            <Chip
              color="warning"
              icon={<PawPrint sx={{ "& path": { stroke: "warning.main" } }} />}
              label={`${userData.petsCount} ${userData.petsCount === 1 ? "Pet" : "Pets"}`}
            />
          </Stack>
        }
        sx={styles.cardHeader}
      />

      <CardActions sx={styles.cardActions}>
        {stats.map(({ title, userProperty }) => (
          <Stack key={title} alignItems="center">
            <Typography sx={styles.statValue}>
              {String(userData[userProperty])}
            </Typography>
            <Typography variant="caption">{title}</Typography>
          </Stack>
        ))}
      </CardActions>
    </Box>
  );
};

export default ProfileHeader;
