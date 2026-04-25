import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { formatDistanceToNowStrict } from "date-fns";
import { ChatBubbleOutlineRounded as Comment } from "@mui/icons-material";
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Stack,
  Drawer,
  IconButton,
  Divider,
} from "@mui/material";

import { resolveImageUrl } from "@/utils/images";
import type { CommentInterface } from "@/interfaces/comment";

import styles from "./PostComments.styles";

const PostCommentsDrawer = ({
  comments,
  open,
  onClose,
  addComment,
}: {
  comments: CommentInterface[];
  open: boolean;
  onClose: () => void;
  addComment: (comment: string) => void;
}) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (newComment.trim()) {
      addComment(newComment.trim());
      setNewComment("");
    }
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: styles.paper } }}
    >
      <Box sx={styles.header}>
        <Typography variant="h5">Comments ({comments.length})</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Divider />

      <Stack spacing={15} sx={styles.commentsStack}>
        {!comments.length ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={styles.emptyStateContainer}
          >
            <Box sx={styles.emptyStateIconBox}>
              <Comment sx={styles.emptyStateIcon} />
            </Box>
            <Typography variant="subtitle2" sx={styles.emptyStateTitle}>
              No comments yet
            </Typography>
            <Typography variant="body2" sx={styles.emptyStateSubtitle}>
              Be the first to comment!
            </Typography>
          </Stack>
        ) : (
          comments.map((comment) => (
            <Box key={comment._id}>
              <Stack direction="row" spacing={5} alignItems="flex-start">
                <Avatar
                  src={resolveImageUrl(comment.author.profilePicture)}
                  sx={styles.commentAvatar}
                />
                <Stack spacing={2}>
                  <Box sx={styles.commentBubble}>
                    <Typography variant="body2" sx={styles.commentAuthor}>
                      {comment.author.username}
                    </Typography>
                    <Typography sx={styles.commentContent}>
                      {comment.content}
                    </Typography>
                  </Box>
                  <Typography variant="caption">
                    {formatDistanceToNowStrict(comment.createdAt, {
                      addSuffix: true,
                    })}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          ))
        )}
      </Stack>

      <Divider />

      <Box sx={styles.inputContainer}>
        <Stack direction="row" spacing={5} alignItems="center">
          <TextField
            fullWidth
            placeholder="Write a comment..."
            value={newComment}
            onChange={({ target }) => setNewComment(target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Post
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default PostCommentsDrawer;
