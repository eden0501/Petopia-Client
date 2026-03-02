import Post from "../components/Post";
import AppBar from "../components/AppBar";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import PetFact from "../components/PetFact";
import { mockPosts } from "../services/mock";
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
        <PetFact />
        {mockPosts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </Container>
      <NavBar />
    </Box>
  );
};

export default Home;
