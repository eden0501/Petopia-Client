import { useState } from "react";
import { Box, Container } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";

import Post from "@/components/Post";
import AppBar from "@/components/AppBar";
import NavBar from "@/components/NavBar";
import Search from "@/components/Search";
import PetFact from "@/components/PetFact";
import type { PostTypes } from "@/constants/postTypes";
import { useInfinityScroll } from "@/hooks/useInfinityScroll";
import { BATCH_SIZE, getPosts } from "@/services/posts.service";

import styles from "./Home.styles";

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
    <Box sx={styles.container}>
      <AppBar />
      <Container sx={styles.contentContainer} maxWidth={false}>
        <Container sx={styles.innerContainer}>
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
      </Container>
      <NavBar />
    </Box>
  );
};

export default Home;
