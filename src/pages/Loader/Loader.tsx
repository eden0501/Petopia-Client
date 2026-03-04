import styles from "./Loader.styles";
import PawPrint from "../../icons/PawPrint";
import { useQuery } from "@tanstack/react-query";
import { getRandomFact } from "../../services/animalFact.service";
import { Box, Skeleton, Stack, Typography } from "@mui/material";

const Loader = () => {
  const { data: fact, isLoading: loading } = useQuery({
    queryKey: ["animalFact"],
    queryFn: getRandomFact,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <Stack alignItems="center" sx={styles.container}>
      <Skeleton variant="circular" sx={styles.skeleton}>
        <PawPrint sx={styles.pawPrint} />
      </Skeleton>

      <Box>
        <Typography sx={styles.title}>Petopia</Typography>
        <Typography sx={styles.loadingText}>
          Loading your pet community...
        </Typography>
      </Box>

      {!loading && fact && (
        <Box sx={styles.factBox}>
          <Typography sx={styles.factLabel}>Did you know?</Typography>
          <Typography>{fact}</Typography>
        </Box>
      )}
    </Stack>
  );
};

export default Loader;
