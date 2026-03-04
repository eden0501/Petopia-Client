import type { Ref } from "react";
import { useQuery } from "@tanstack/react-query";
import { AutoAwesomeOutlined, Cached } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";

import { getRandomFact } from "@/services/animalFact.service";

import styles from "./PetFact.styles";

const PetFact = ({
  index = 0,
  refElement,
}: {
  index?: number;
  refElement?: Ref<HTMLDivElement>;
}) => {
  const { data: fact, refetch } = useQuery({
    queryKey: ["animalFact", index],
    queryFn: getRandomFact,
  });

  return (
    <Box ref={refElement} sx={styles.container}>
      <Box sx={styles.headerBox}>
        <Avatar sx={styles.avatar}>
          <AutoAwesomeOutlined sx={styles.avatarIcon} />
        </Avatar>

        <Box sx={styles.titleBox}>
          <Typography sx={styles.title}>Fun Pet Fact</Typography>
          <Typography variant="body1">Sponsored</Typography>
        </Box>

        <IconButton onClick={() => refetch()} sx={styles.refreshButton}>
          <Cached sx={styles.refreshIcon} />
        </IconButton>
      </Box>

      <Typography>{fact}</Typography>
    </Box>
  );
};

export default PetFact;
