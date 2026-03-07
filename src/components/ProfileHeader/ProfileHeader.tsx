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

import PawPrint from "@/icons/PawPrint";
import { useUserContext } from "@/contexts/UserContext";
import type { UserStatsInterface } from "@/interfaces/user";

import styles from "./ProfileHeader.styles";
import { isNil } from "lodash";

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
        title={<Typography variant="h4">{userData.username}</Typography>}
        subheader={
          <Stack sx={styles.subheaderStack}>
            {userData.petOwnerSince &&
              formatDistanceToNowStrict(userData.petOwnerSince)}
            <Chip
              color="warning"
              icon={<PawPrint sx={styles.chip} />}
              label={
                isNil(userData.petsCount)
                  ? "Unknown pets count"
                  : `${userData.petsCount} ${userData.petsCount === 1 ? "Pet" : "Pets"}`
              }
            />
          </Stack>
        }
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
