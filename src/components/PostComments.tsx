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

import type { CommentInterface } from "../interfaces/comment";

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
      slotProps={{
        paper: {
          sx: {
            maxHeight: "60vh",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            overflow: "hidden",
          },
        },
      }}
    >
      <Box
        sx={{
          padding: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
          Comments ({comments.length})
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Divider />

      <Stack
        spacing={15}
        sx={{
          padding: 15,
          overflowY: "auto",
        }}
      >
        {!comments.length ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ padding: 40 }}
          >
            <Box
              sx={{
                padding: 15,
                borderRadius: "50%",
                display: "flex",
                backgroundColor: "#F3F3F5",
              }}
            >
              <Comment
                sx={{
                  fontSize: "3rem",
                  color: "text.secondary",
                }}
              />
            </Box>
            <Typography
              sx={{
                fontWeight: 600,
                color: "text.secondary",
              }}
            >
              No comments yet
            </Typography>
            <Typography sx={{ fontSize: "0.9rem", color: "text.secondary" }}>
              Be the first to comment!
            </Typography>
          </Stack>
        ) : (
          comments.map((comment) => (
            <Box key={comment._id}>
              <Stack direction="row" spacing={5} alignItems="flex-start">
                <Avatar
                  src={comment.author.profilePicture}
                  sx={{ width: 40, height: 40 }}
                />
                <Stack spacing={2}>
                  <Box
                    sx={{
                      bgcolor: "#f0f2f5",
                      borderRadius: 4,
                      padding: 10,
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
                      {comment.author.username}
                    </Typography>
                    <Typography sx={{ fontSize: "0.8rem", marginTop: 0.5 }}>
                      {comment.content}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      display: "block",
                      color: "text.secondary",
                    }}
                  >
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

      <Box sx={{ padding: 15 }}>
        <Stack direction="row" spacing={5} alignItems="center">
          <Avatar sx={{ width: 40, height: 40 }} />
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
