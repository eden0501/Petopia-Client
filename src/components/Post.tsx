import { reject } from "lodash";
import PostComments from "./PostComments";
import PostTypeChip from "./PostTypeChip";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { formatDistanceToNowStrict } from "date-fns";
import { toggleLike } from "../services/posts.service";
import { useUserContext } from "../contexts/UserContext";
import {
  FavoriteOutlined,
  FavoriteBorderRounded as Favorite,
  ChatBubbleOutlineRounded as Comment,
} from "@mui/icons-material";
import {
  Card,
  Stack,
  Button,
  Avatar,
  Divider,
  CardMedia,
  Typography,
  CardHeader,
  CardContent,
  CardActions,
} from "@mui/material";
import type { PostInterface } from "../interfaces/post";

const Post = ({
  _id: postId,
  author,
  createdAt,
  imageUrl,
  content,
  title,
  type,
  likes,
  hashtags,
  comments,
}: PostInterface) => {
  const { userId, updateLikeCount } = useUserContext();
  const [openComments, setOpenComments] = useState(false);
  const [likesState, setLikesState] = useState(likes ?? []);

  const liked = useMemo(
    () => likesState.includes(userId),
    [likesState, userId],
  );

  const { mutate: handleToggleLike } = useMutation({
    mutationFn: async () => {
      if (liked) {
        setLikesState((prev) => reject(prev, (id) => id === userId));
        updateLikeCount("unlike");
      } else {
        setLikesState((prev) => [...prev, userId]);
        updateLikeCount("like");
      }

      await toggleLike(postId, liked);
    },
  });

  return (
    <>
      <Card>
        <CardHeader
          avatar={<Avatar src={author.profilePicture} />}
          title={author.username}
          subheader={formatDistanceToNowStrict(createdAt, { addSuffix: true })}
          sx={{
            ".MuiCardHeader-title": {
              fontSize: "1rem",
              fontWeight: "600",
            },
          }}
        />
        <CardContent sx={{ paddingTop: 0 }}>
          <PostTypeChip postType={type} />
          <Typography
            sx={{
              marginTop: 5,
              fontWeight: "600",
              marginBottom: 20,
            }}
          >
            {title}
          </Typography>
          <Stack sx={{ gap: 10 }}>
            <Typography sx={{ color: "text.secondary" }}>{content}</Typography>
            {imageUrl && (
              <CardMedia
                sx={{ borderRadius: 2 }}
                component="img"
                src={imageUrl}
              />
            )}
            {!!hashtags?.length && (
              <Typography sx={{ color: "primary.main", fontSize: "0.9rem" }}>
                #{hashtags.join(" #")}
              </Typography>
            )}
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ padding: 20, justifyContent: "space-around" }}>
          <Button
            variant="text"
            startIcon={liked ? <FavoriteOutlined /> : <Favorite />}
            sx={{ color: liked ? "red" : "text.secondary" }}
            onClick={() => handleToggleLike()}
          >
            {likesState?.length ?? 0} Likes
          </Button>

          <Button
            variant="text"
            startIcon={<Comment />}
            onClick={() => setOpenComments((prev) => !prev)}
            sx={{
              color: openComments ? "primary.main" : "text.secondary",
            }}
          >
            {comments?.length ?? 0} Comments
          </Button>
        </CardActions>
      </Card>
      {openComments && <PostComments />}
    </>
  );
};

export default Post;
