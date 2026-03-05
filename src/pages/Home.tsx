import { useState } from "react";
import Post from "../components/Post";
import AppBar from "../components/AppBar";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import PetFact from "../components/PetFact";
import FloatingAIChat from "../components/FloatingAIChat/FloatingAIChat";
import { Box, Container } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfinityScroll } from "../hooks/useInfinityScroll";
import { BATCH_SIZE, getPosts } from "../services/posts.service";
import type { PostTypes } from "../constants/postTypes";

const Home = () => {
  const [typeFilter, setTypeFilter] = useState<PostTypes | "All">("All");

  const {
    data: { pages = [] } = {},
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", typeFilter],
    initialPageParam: 0,
    refetchOnMount: "always",
    queryFn: ({ pageParam }) => getPosts(pageParam, { typeFilter }),
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
        <Search typeFilter={typeFilter} setTypeFilter={setTypeFilter} />
        {pages?.map((batch, batchIndex) => (
          <Box key={`batch-${batchIndex}`}>
            {batch?.map((post) => (
              <Post key={post._id} {...post} />
            ))}
            <PetFact
              index={batchIndex}
              refElement={
                batchIndex === pages.length - 1 ? lastElementRef : undefined
              }
            />
          </Box>
        ))}
      </Container>
      <NavBar />
      <FloatingAIChat />
    </Box>
  );
};

export default Home;
