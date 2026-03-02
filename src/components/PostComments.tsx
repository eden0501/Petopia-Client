import { formatDistanceToNowStrict } from "date-fns";
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
// Mock data structure based on your UserInterface
const mockComments = [
  {
    id: 1,
    author: {
      username: "Alex_Rescue",
      profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    text: "Thanks for sharing this alert! I'm nearby and will keep a lookout.",
    createdAt: new Date("2026-01-02T10:30:00"),
  },
  {
    id: 21,
    author: {
      username: "Alex_Rescue",
      profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    text: "Thanks for sharing this alert! I'm nearby and will keep a lookout.",
    createdAt: new Date("2026-01-02T10:30:00"),
  },
];

const PostComments = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        borderTop: "1px solid",
        borderColor: "divider",
        padding: 20,
      }}
    >
      <Stack sx={{ gap: 15 }}>
        {mockComments.map((comment) => (
          <Box key={comment.id} sx={{ display: "flex", gap: 10 }}>
            <Avatar
              sx={{ width: 32, height: 32 }}
              src={comment.author.profilePicture}
            />
            <Box
              sx={{
                flex: 1,
                backgroundColor: "#f6f3f4",
                borderRadius: 3,
                padding: "10px 15px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  mb: 0.5,
                }}
              >
                {comment.author.username}
              </Typography>
              <Typography sx={{ fontSize: "0.8rem" }}>
                {comment.text}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: "text.secondary",
                  marginTop: 0.5,
                }}
              >
                {formatDistanceToNowStrict(comment.createdAt, {
                  addSuffix: true,
                })}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>

      <Box
        // onSubmit={handleCommentSubmit}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          paddingTop: 10,
        }}
      >
        <Avatar sx={{ width: 32, height: 32 }} />
        <TextField
          multiline
          placeholder="Write a comment..."
          sx={{ "& .MuiOutlinedInput-root": { padding: 0 } }}
          //   value={commentText}
          //   onChange={(e) => setCommentText(e.target.value)}
        />
        <Button variant="contained">Post</Button>
      </Box>
    </Box>
  );
};

export default PostComments;
