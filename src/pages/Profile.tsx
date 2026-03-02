import Post from "../components/Post";
import AppBar from "../components/AppBar";
import NavBar from "../components/NavBar";
import ProfileHeader from "../components/ProfileHeader";
import { mockPosts, mockUsers } from "../services/mock";
import { Box, Container, Typography } from "@mui/material";

const user = mockUsers["user1"];
const posts = mockPosts.filter(
  (post) => post.author.username === user.username,
);

const Profile = () => {
  return (
    <Box sx={{ backgroundColor: "#FBF9FA", minHeight: "100vh" }}>
      <AppBar />
      <Container
        sx={{
          paddingBottom: 10,
          overflow: "auto",
          height: "calc(100vh - 110px)",
        }}
      >
        <ProfileHeader {...user} />
        <Typography sx={{ padding: 15, fontSize: "1.2rem", fontWeight: "600" }}>
          My Posts
        </Typography>
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </Container>
      <NavBar />
    </Box>
  );
};

export default Profile;
