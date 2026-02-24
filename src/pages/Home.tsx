import Post from "../components/Post";
import AppBar from "../components/AppBar";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import { Box, Container } from "@mui/material";

const Home = () => {
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
        <Search />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </Container>
      <NavBar />
    </Box>
  );
};

export default Home;
