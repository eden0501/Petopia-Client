import Post from "../components/Post";
import AppBar from "../components/AppBar";
import NavBar from "../components/NavBar";
import ProfileHeader from "../components/ProfileHeader";
import { useUserContext } from "../contexts/UserContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, Container, Typography } from "@mui/material";
import { useInfinityScroll } from "../hooks/useInfinityScroll";
import { BATCH_SIZE, getPosts } from "../services/posts.service";

const Profile = () => {
  const { userId } = useUserContext();

  const {
    data: { pages = [] } = {},
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["user-post"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getPosts(pageParam, { userId }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.length === BATCH_SIZE ? allPages?.length : undefined,
  });

  const { lastElementRef } = useInfinityScroll({
    isLoading: isFetchingNextPage,
    hasMoreData: !!hasNextPage,
    loadMoreData: fetchNextPage,
  });

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
        <ProfileHeader />
        <Typography sx={{ padding: 15, fontSize: "1.2rem", fontWeight: "600" }}>
          My Posts
        </Typography>
        {pages?.map((batch, batchIndex) => (
          <Box key={`batch-${batchIndex}`}>
            {batch?.map((post) => (
              <Post key={post._id} {...post} />
            ))}
            <Box
              ref={batchIndex === pages.length - 1 ? lastElementRef : undefined}
            />
          </Box>
        ))}
      </Container>
      <NavBar />
    </Box>
  );
};

export default Profile;
