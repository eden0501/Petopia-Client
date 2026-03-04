import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, Container, Typography } from "@mui/material";

import Post from "@/components/Post";
import AppBar from "@/components/AppBar";
import NavBar from "@/components/NavBar";
import ProfileHeader from "@/components/ProfileHeader";
import { useUserContext } from "@/contexts/UserContext";
import { useInfinityScroll } from "@/hooks/useInfinityScroll";
import { BATCH_SIZE, getPosts } from "@/services/posts.service";

import styles from "./Profile.styles";

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
    refetchOnMount: "always",
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
    <Box sx={styles.container}>
      <AppBar />
      <Container sx={styles.contentContainer}>
        <ProfileHeader />
        <Typography variant="h5" sx={styles.sectionTitle}>My Posts</Typography>
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
