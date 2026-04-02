import reject from "lodash/reject";
import { useMemo, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FavoriteOutlined,
  FavoriteBorderRounded as Favorite,
  ChatBubbleOutlineRounded as Comment,
  EditOutlined,
  DeleteOutlined,
  MoreVert,
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
  IconButton,
  MenuItem,
  Menu,
  DialogActions,
} from "@mui/material";

import PostForm from "@/components/PostForm";
import PostComments from "@/components/PostComments";
import PostTypeChip from "@/components/PostTypeChip";
import type { PostInterface } from "@/interfaces/post";
import { useUserContext } from "@/contexts/UserContext";
import { createComment } from "@/services/comments.service";
import ConfirmationModal from "@/components/ConfirmationModal";
import { deletePost, toggleLike } from "@/services/posts.service";

import styles from "./Post.styles";

const Post = (postData: PostInterface) => {
  const {
    _id: postId,
    author,
    authorId,
    createdAt,
    imageUrl,
    content,
    title,
    type,
    likes,
    hashtags,
    comments,
  } = postData;

  const queryClient = useQueryClient();
  const { userId, updateLikeCount, addUserComment, userData, changePostCount } =
    useUserContext();
  const [openComments, setOpenComments] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [localPost, setLocalPost] = useState({
    likes: likes ?? [],
    comments: comments ?? [],
  });

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const liked = useMemo(
    () => localPost.likes.includes(userId),
    [localPost, userId],
  );

  const { mutate: handleToggleLike } = useMutation({
    mutationFn: () => toggleLike(postId, liked),
    onSuccess: () => {
      if (liked) {
        setLocalPost((prev) => ({
          ...prev,
          likes: reject(prev.likes, (id) => id === userId),
        }));
        updateLikeCount("unlike");
      } else {
        setLocalPost((prev) => ({
          ...prev,
          likes: [...prev.likes, userId],
        }));
        updateLikeCount("like");
      }

      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-post"] });
    },
  });

  const { mutate: addComment } = useMutation({
    mutationFn: (newComment: string) => createComment(postId, newComment),
    onSuccess: (_, newComment) => {
      setLocalPost((prev) => ({
        ...prev,
        comments: [
          ...prev.comments,
          {
            _id: new Date().getTime().toString(),
            postId,
            authorId: userId,
            content: newComment,
            createdAt: new Date().toISOString(),
            author: userData,
          },
        ],
      }));

      addUserComment();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-post"] });
    },
  });

  const { mutate: handleDelete } = useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      changePostCount(false);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-post"] });
    },
  });

  return (
    <>
      <Card sx={styles.card}>
        <CardHeader
          avatar={<Avatar src={author.profilePicture} />}
          title={author.username}
          subheader={formatDistanceToNowStrict(createdAt, { addSuffix: true })}
          sx={styles.cardHeader}
          action={
            userId === authorId && (
              <IconButton size="small" onClick={openMenu}>
                <MoreVert fontSize="small" />
              </IconButton>
            )
          }
        />
        <CardContent sx={styles.cardContent}>
          <PostTypeChip postType={type} />
          <Typography variant="h5" sx={styles.title}>
            {title}
          </Typography>
          <Stack sx={styles.contentStack}>
            <Typography variant="subtitle1">{content}</Typography>
            {imageUrl && (
              <CardMedia sx={styles.cardMedia} component="img" src={imageUrl} />
            )}
            {!!hashtags?.length && (
              <Typography variant="body2" sx={styles.hashtags}>
                #{hashtags.join(" #")}
              </Typography>
            )}
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={styles.cardActions}>
          <Button
            variant="text"
            startIcon={liked ? <FavoriteOutlined /> : <Favorite />}
            sx={styles.likeButton(liked)}
            onClick={() => handleToggleLike()}
          >
            {localPost.likes?.length ?? 0} Likes
          </Button>

          <Button
            variant="text"
            startIcon={<Comment />}
            onClick={() => setOpenComments((prev) => !prev)}
            sx={styles.commentButton(openComments)}
          >
            {localPost.comments?.length ?? 0} Comments
          </Button>
        </CardActions>
      </Card>
      <PostComments
        comments={localPost.comments ?? []}
        open={openComments}
        addComment={addComment}
        onClose={() => setOpenComments(false)}
      />
      <PostForm
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        post={postData}
      />
      <ConfirmationModal
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete post?"
        content="Say goodbye to this PAWsome memory?"
        variant="error"
        actions={
          <DialogActions sx={styles.dialogActions}>
            <Button
              fullWidth
              color="error"
              variant="outlined"
              sx={styles.buttonText}
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="error"
              sx={styles.buttonText}
              onClick={() => {
                handleDelete();
                setDeleteDialogOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogActions>
        }
      />
      <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={closeMenu}>
        <MenuItem
          onClick={() => {
            setEditDialogOpen(true);
            closeMenu();
          }}
        >
          <EditOutlined />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDeleteDialogOpen(true);
            closeMenu();
          }}
          sx={styles.deleteMenuItem}
        >
          <DeleteOutlined />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default Post;
